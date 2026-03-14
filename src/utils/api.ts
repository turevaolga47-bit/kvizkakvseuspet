import type { AdminSubmission, SubmissionPayload } from '../types'
import { getSegmentLabel } from './scoring'

// ─── Google Sheets via Apps Script Web App ─────────────────────────────────
async function saveToGoogleSheets(payload: SubmissionPayload): Promise<void> {
  const url = import.meta.env.VITE_GOOGLE_SCRIPT_URL
  if (!url || url === 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec') {
    console.warn('[Sheets] VITE_GOOGLE_SCRIPT_URL не настроен — пропускаем запись.')
    return
  }

  const row = {
    action: 'save',
    timestamp: payload.timestamp,
    name: payload.name,
    contact: payload.contact,
    email: payload.email,
    preferred_time: payload.preferredTime,
    main_concern: payload.concern,
    q1_answer: payload.answers[0]?.answerText ?? '',
    q2_answer: payload.answers[1]?.answerText ?? '',
    q3_answer: payload.answers[2]?.answerText ?? '',
    q4_answer: payload.answers[3]?.answerText ?? '',
    q5_answer: payload.answers[4]?.answerText ?? '',
    q6_answer: payload.answers[5]?.answerText ?? '',
    score_q1: payload.answers[0]?.score ?? 0,
    score_q2: payload.answers[1]?.score ?? 0,
    score_q3: payload.answers[2]?.score ?? 0,
    score_q4: payload.answers[3]?.score ?? 0,
    score_q5: payload.answers[4]?.score ?? 0,
    score_q6: payload.answers[5]?.score ?? 0,
    total_score: payload.totalScore,
    result_segment: getSegmentLabel(payload.resultSegment),
    clicked_channel: payload.clickedChannel ? 'да' : 'нет',
    clicked_personal_tg: payload.clickedPersonalTg ? 'да' : 'нет',
    clicked_website: payload.clickedWebsite ? 'да' : 'нет',
  }

  const response = await fetch(url, {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(row),
  })
  void response
}

// ─── Admin: fetch submissions ───────────────────────────────────────────────
export async function fetchSubmissions(adminPassword: string): Promise<AdminSubmission[]> {
  const url = import.meta.env.VITE_GOOGLE_SCRIPT_URL
  if (!url || url === 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec') {
    throw new Error('VITE_GOOGLE_SCRIPT_URL не настроен')
  }

  const res = await fetch(
    `${url}?action=list&pwd=${encodeURIComponent(adminPassword)}`,
    { redirect: 'follow' },
  )

  if (!res.ok) throw new Error(`Ответ сервера: ${res.status}`)
  const json = await res.json()
  if (json.error) throw new Error(json.error)
  return json.data as AdminSubmission[]
}

// ─── Admin: send broadcast via Telegram ────────────────────────────────────
export async function sendBroadcast(
  usernames: string[],
  message: string,
): Promise<{ ok: string[]; failed: string[] }> {
  const token = import.meta.env.VITE_TELEGRAM_BOT_TOKEN
  if (!token || token === 'YOUR_BOT_TOKEN_HERE') {
    throw new Error('Telegram Bot Token не настроен')
  }

  const ok: string[] = []
  const failed: string[] = []

  for (const username of usernames) {
    const chatId = username.startsWith('@') ? username : `@${username}`
    try {
      const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: chatId, text: message }),
      })
      const data = await res.json()
      if (data.ok) ok.push(username)
      else failed.push(username)
    } catch {
      failed.push(username)
    }
  }

  return { ok, failed }
}

// ─── Email via EmailJS ──────────────────────────────────────────────────────
async function sendEmailNotification(payload: SubmissionPayload): Promise<void> {
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

  if (!serviceId || serviceId === 'YOUR_SERVICE_ID') {
    console.warn('[Email] EmailJS не настроен — пропускаем.')
    return
  }

  const res = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      service_id: serviceId,
      template_id: templateId,
      user_id: publicKey,
      template_params: {
        timestamp: payload.timestamp,
        name: payload.name,
        contact: payload.contact,
        email: payload.email,
        preferred_time: payload.preferredTime,
        main_concern: payload.concern || '—',
        q1_answer: payload.answers[0]?.answerText ?? '',
        q2_answer: payload.answers[1]?.answerText ?? '',
        q3_answer: payload.answers[2]?.answerText ?? '',
        q4_answer: payload.answers[3]?.answerText ?? '',
        q5_answer: payload.answers[4]?.answerText ?? '',
        q6_answer: payload.answers[5]?.answerText ?? '',
        total_score: payload.totalScore,
        result_segment: getSegmentLabel(payload.resultSegment),
      },
    }),
  })

  if (!res.ok) throw new Error(`EmailJS: ${res.status}`)
}

// ─── Telegram: new application notification ────────────────────────────────
async function sendTelegramNotification(payload: SubmissionPayload): Promise<void> {
  const token = import.meta.env.VITE_TELEGRAM_BOT_TOKEN
  const chatId = import.meta.env.VITE_TELEGRAM_CHAT_ID

  if (!token || token === 'YOUR_BOT_TOKEN_HERE') {
    console.warn('[Telegram] Токен не настроен.')
    return
  }

  const clicks = [
    payload.clickedChannel ? '📢 канал' : '',
    payload.clickedPersonalTg ? '💬 личка' : '',
    payload.clickedWebsite ? '🌸 сайт' : '',
  ].filter(Boolean).join(', ') || '—'

  const text =
    `🔔 <b>Новая заявка</b> — квиз «Устала от "должна"»\n\n` +
    `👤 Имя: ${payload.name}\n` +
    `📱 Контакт: ${payload.contact}\n` +
    `📧 Email: ${payload.email}\n` +
    `🕐 Удобное время: ${payload.preferredTime}\n\n` +
    `📊 Сегмент: ${getSegmentLabel(payload.resultSegment)}\n` +
    `🎯 Балл: ${payload.totalScore}\n` +
    `🔗 Кликала: ${clicks}` +
    (payload.concern ? `\n\n💬 ${payload.concern}` : '')

  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text, parse_mode: 'HTML' }),
  })

  if (!res.ok) {
    const err = await res.text()
    throw new Error(`Telegram API: ${err}`)
  }
}

// ─── Main submit ────────────────────────────────────────────────────────────
export async function submitApplication(payload: SubmissionPayload): Promise<void> {
  await saveToGoogleSheets(payload)

  try { await sendEmailNotification(payload) } catch (e) {
    console.error('[Email]', e)
  }
  try { await sendTelegramNotification(payload) } catch (e) {
    console.error('[Telegram]', e)
  }
}

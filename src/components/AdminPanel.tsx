import { useState, useEffect, useMemo } from 'react'
import type { AdminSubmission } from '../types'
import { fetchSubmissions, sendBroadcast } from '../utils/api'

// ── Helpers ──────────────────────────────────────────────────────────────────

function segmentColor(seg: string) {
  if (seg.includes('Высокая') || seg === 'high') return { bg: '#FEE2E2', text: '#B91C1C' }
  if (seg.includes('Средняя') || seg === 'medium') return { bg: '#F3E8FF', text: '#7C3AED' }
  return { bg: '#D1FAE5', text: '#065F46' }
}

function isTelegram(contact: string) {
  return contact.trim().startsWith('@')
}

// ── Main component ────────────────────────────────────────────────────────────

export default function AdminPanel({ onExit }: { onExit: () => void }) {
  const [authed, setAuthed] = useState(false)
  const [password, setPassword] = useState('')
  const [pwdError, setPwdError] = useState('')

  const ADMIN_PWD = import.meta.env.VITE_ADMIN_PASSWORD || 'admin123'

  function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    if (password === ADMIN_PWD) {
      setAuthed(true)
    } else {
      setPwdError('Неверный пароль')
    }
  }

  if (!authed) {
    return (
      <div
        className="min-h-screen flex items-center justify-center px-4"
        style={{ backgroundColor: '#FDF7F3' }}
      >
        <div
          className="w-full max-w-sm rounded-3xl p-8"
          style={{ backgroundColor: '#fff', boxShadow: '0 6px 40px rgba(15,23,42,0.08)' }}
        >
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg mb-6"
            style={{ backgroundColor: '#E9A6B2' }}
          >
            🔐
          </div>
          <h1 className="font-bold text-xl mb-1" style={{ color: '#2F3337' }}>
            Панель администратора
          </h1>
          <p className="text-sm mb-6" style={{ color: '#6B7280' }}>
            Квиз Ольги Турьевой
          </p>
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <input
              type="password"
              placeholder="Пароль"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setPwdError('') }}
              className="w-full border rounded-xl px-4 py-3 text-sm outline-none"
              style={{ borderColor: pwdError ? '#E38C9C' : '#E5E7EB', color: '#2F3337' }}
              autoFocus
            />
            {pwdError && <p className="text-xs" style={{ color: '#E38C9C' }}>{pwdError}</p>}
            <button
              type="submit"
              className="w-full font-semibold text-white rounded-full py-3 transition-all"
              style={{ backgroundColor: '#E9A6B2' }}
            >
              Войти
            </button>
          </form>
          <button
            onClick={onExit}
            className="mt-4 w-full text-sm text-center transition-opacity hover:opacity-60"
            style={{ color: '#9CA3AF' }}
          >
            ← Вернуться к квизу
          </button>
        </div>
      </div>
    )
  }

  return <AdminDashboard onExit={onExit} adminPassword={password} />
}

// ── Dashboard ─────────────────────────────────────────────────────────────────

function AdminDashboard({ onExit, adminPassword }: { onExit: () => void; adminPassword: string }) {
  const [tab, setTab] = useState<'stats' | 'table' | 'broadcast'>('stats')
  const [data, setData] = useState<AdminSubmission[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')
  const [segFilter, setSegFilter] = useState('all')
  const [expanded, setExpanded] = useState<number | null>(null)

  useEffect(() => {
    fetchSubmissions(adminPassword)
      .then(setData)
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false))
  }, [adminPassword])

  const filtered = useMemo(() => {
    return data.filter((row) => {
      const matchSearch =
        !search ||
        row.name.toLowerCase().includes(search.toLowerCase()) ||
        row.contact.toLowerCase().includes(search.toLowerCase()) ||
        row.email.toLowerCase().includes(search.toLowerCase())
      const matchSeg = segFilter === 'all' || row.result_segment.toLowerCase().includes(segFilter)
      return matchSearch && matchSeg
    })
  }, [data, search, segFilter])

  // Stats
  const stats = useMemo(() => {
    const total = data.length
    const high = data.filter((r) => r.result_segment.includes('Высокая')).length
    const medium = data.filter((r) => r.result_segment.includes('Средняя')).length
    const low = data.filter((r) => r.result_segment.includes('Лёгкая')).length
    const tgContacts = data.filter((r) => isTelegram(r.contact)).length
    return { total, high, medium, low, tgContacts }
  }, [data])

  const TABS = [
    { id: 'stats', label: '📊 Статистика' },
    { id: 'table', label: '📋 Заявки' },
    { id: 'broadcast', label: '📢 Рассылка' },
  ] as const

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FDF7F3' }}>
      {/* Header */}
      <div
        className="sticky top-0 z-10 px-4 py-4 flex items-center justify-between border-b"
        style={{ backgroundColor: '#FDF7F3', borderColor: '#E5E7EB' }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold"
            style={{ backgroundColor: '#E9A6B2' }}
          >
            ОТ
          </div>
          <div>
            <p className="font-semibold text-sm" style={{ color: '#2F3337' }}>Панель администратора</p>
            <p className="text-xs" style={{ color: '#9CA3AF' }}>Квиз «Устала от "должна"»</p>
          </div>
        </div>
        <button
          onClick={onExit}
          className="text-sm px-3 py-1.5 rounded-full border transition-all hover:opacity-70"
          style={{ color: '#6B7280', borderColor: '#E5E7EB' }}
        >
          ← Квиз
        </button>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-6">
        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className="flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all"
              style={{
                backgroundColor: tab === t.id ? '#E9A6B2' : '#fff',
                color: tab === t.id ? '#fff' : '#6B7280',
                border: tab === t.id ? 'none' : '1px solid #E5E7EB',
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Loading / Error */}
        {loading && (
          <div className="text-center py-16">
            <div className="flex justify-center gap-2 mb-4">
              {[0, 1, 2].map((i) => (
                <div key={i} className="w-2.5 h-2.5 rounded-full" style={{
                  backgroundColor: '#E9A6B2',
                  animation: `dots 1.4s ease-in-out ${i * 0.2}s infinite`,
                }} />
              ))}
            </div>
            <p style={{ color: '#6B7280' }}>Загружаем данные…</p>
          </div>
        )}

        {error && !loading && (
          <div
            className="rounded-2xl p-5 mb-6"
            style={{ backgroundColor: '#FEF2F2', border: '1px solid #FECACA' }}
          >
            <p className="font-medium text-sm mb-1" style={{ color: '#B91C1C' }}>Ошибка загрузки данных</p>
            <p className="text-sm" style={{ color: '#6B7280' }}>{error}</p>
            <p className="text-xs mt-2" style={{ color: '#9CA3AF' }}>
              Убедитесь, что настроен VITE_GOOGLE_SCRIPT_URL и пароль совпадает с VITE_ADMIN_PASSWORD в .env
            </p>
          </div>
        )}

        {!loading && (
          <>
            {/* ── STATS TAB ── */}
            {tab === 'stats' && (
              <div className="animate-fade-in">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
                  <StatCard label="Всего заявок" value={stats.total} color="#E9A6B2" />
                  <StatCard label="Много «должна»" value={stats.high} color="#F87171" />
                  <StatCard label="Средняя усталость" value={stats.medium} color="#C4B5FD" />
                  <StatCard label="Лёгкая усталость" value={stats.low} color="#6EE7B7" />
                  <StatCard label="Telegram-контакты" value={stats.tgContacts} color="#38BDF8" />
                  <StatCard
                    label="Конверсия в форму"
                    value={stats.total > 0 ? `${Math.round((stats.total / Math.max(stats.total, 1)) * 100)}%` : '—'}
                    color="#FB923C"
                  />
                </div>

                {/* Click tracking summary */}
                {data.length > 0 && (
                  <div
                    className="rounded-2xl p-5"
                    style={{ backgroundColor: '#fff', border: '1px solid #E5E7EB' }}
                  >
                    <h3 className="font-semibold mb-4 text-sm" style={{ color: '#2F3337' }}>
                      Куда кликали перед заявкой
                    </h3>
                    <div className="flex flex-col gap-3">
                      {[
                        { key: 'clicked_channel', label: '📢 Telegram-канал', color: '#E9A6B2' },
                        { key: 'clicked_personal_tg', label: '💬 Личка @OlgaTurreva', color: '#C4B5FD' },
                        { key: 'clicked_website', label: '🌸 Сайт turevaolga.space', color: '#6EE7B7' },
                      ].map(({ key, label, color }) => {
                        const count = data.filter((r) => (r as unknown as Record<string, string>)[key] === 'да').length
                        const pct = data.length ? Math.round((count / data.length) * 100) : 0
                        return (
                          <div key={key}>
                            <div className="flex justify-between text-xs mb-1" style={{ color: '#6B7280' }}>
                              <span>{label}</span>
                              <span>{count} ({pct}%)</span>
                            </div>
                            <div className="h-2 rounded-full" style={{ backgroundColor: '#F3F4F6' }}>
                              <div
                                className="h-2 rounded-full transition-all duration-500"
                                style={{ width: `${pct}%`, backgroundColor: color }}
                              />
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ── TABLE TAB ── */}
            {tab === 'table' && (
              <div className="animate-fade-in">
                {/* Filters */}
                <div className="flex flex-col sm:flex-row gap-3 mb-4">
                  <input
                    type="text"
                    placeholder="Поиск по имени, контакту, email…"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="flex-1 border rounded-xl px-4 py-2.5 text-sm outline-none"
                    style={{ borderColor: '#E5E7EB', color: '#2F3337' }}
                  />
                  <select
                    value={segFilter}
                    onChange={(e) => setSegFilter(e.target.value)}
                    className="border rounded-xl px-4 py-2.5 text-sm outline-none"
                    style={{ borderColor: '#E5E7EB', color: '#2F3337' }}
                  >
                    <option value="all">Все сегменты</option>
                    <option value="высокая">Много «должна»</option>
                    <option value="средняя">Средняя усталость</option>
                    <option value="лёгкая">Лёгкая усталость</option>
                  </select>
                </div>

                <p className="text-xs mb-3" style={{ color: '#9CA3AF' }}>
                  Показано: {filtered.length} из {data.length}
                </p>

                {filtered.length === 0 && (
                  <div className="text-center py-12" style={{ color: '#9CA3AF' }}>
                    {data.length === 0
                      ? 'Заявок пока нет. Как только кто-то заполнит форму — они появятся здесь.'
                      : 'Ничего не найдено по вашему запросу.'}
                  </div>
                )}

                <div className="flex flex-col gap-3">
                  {filtered.map((row, i) => {
                    const sc = segmentColor(row.result_segment)
                    const isOpen = expanded === i
                    const tg = isTelegram(row.contact)
                    return (
                      <div
                        key={i}
                        className="rounded-2xl overflow-hidden"
                        style={{ backgroundColor: '#fff', border: '1px solid #E5E7EB' }}
                      >
                        {/* Row header */}
                        <button
                          onClick={() => setExpanded(isOpen ? null : i)}
                          className="w-full text-left px-5 py-4 flex items-start gap-3"
                        >
                          <div
                            className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                            style={{ backgroundColor: '#E9A6B2' }}
                          >
                            {row.name.charAt(0).toUpperCase()}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="font-medium text-sm" style={{ color: '#2F3337' }}>{row.name}</span>
                              <span
                                className="text-xs font-medium px-2 py-0.5 rounded-full"
                                style={{ backgroundColor: sc.bg, color: sc.text }}
                              >
                                {row.result_segment}
                              </span>
                              <span className="text-xs px-2 py-0.5 rounded-full" style={{
                                backgroundColor: '#F0FDF4', color: '#15803D'
                              }}>
                                {row.total_score} баллов
                              </span>
                            </div>
                            <div className="flex items-center gap-3 mt-1 flex-wrap">
                              <span className="text-xs" style={{ color: '#6B7280' }}>
                                {tg ? '💬' : '📱'} {row.contact}
                              </span>
                              <span className="text-xs" style={{ color: '#9CA3AF' }}>
                                {row.timestamp}
                              </span>
                            </div>
                          </div>
                          <span className="text-sm ml-auto flex-shrink-0 mt-1" style={{ color: '#9CA3AF' }}>
                            {isOpen ? '▲' : '▼'}
                          </span>
                        </button>

                        {/* Expanded details */}
                        {isOpen && (
                          <div className="border-t px-5 pb-5" style={{ borderColor: '#F3F4F6' }}>
                            <div className="grid sm:grid-cols-2 gap-4 mt-4">
                              <Detail label="Email" value={row.email} />
                              <Detail label="Удобное время" value={row.preferred_time} />
                              {row.main_concern && (
                                <div className="sm:col-span-2">
                                  <Detail label="О чём хочет поговорить" value={row.main_concern} />
                                </div>
                              )}
                              <Detail label="Кликала: канал" value={row.clicked_channel || '—'} />
                              <Detail label="Кликала: личка" value={row.clicked_personal_tg || '—'} />
                              <Detail label="Кликала: сайт" value={row.clicked_website || '—'} />
                            </div>

                            {/* Quiz answers */}
                            <div className="mt-4">
                              <p className="text-xs font-semibold mb-2" style={{ color: '#6B7280' }}>
                                Ответы на вопросы
                              </p>
                              {[1, 2, 3, 4, 5, 6].map((n) => {
                                const ans = (row as unknown as Record<string, string>)[`q${n}_answer`]
                                const sc = (row as unknown as Record<string, string>)[`score_q${n}`]
                                return ans ? (
                                  <div key={n} className="flex gap-2 mb-1.5">
                                    <span
                                      className="flex-shrink-0 text-xs font-medium w-5 h-5 rounded-full flex items-center justify-center"
                                      style={{ backgroundColor: '#FCE7F3', color: '#E38C9C' }}
                                    >
                                      {n}
                                    </span>
                                    <span className="text-xs flex-1" style={{ color: '#2F3337', lineHeight: 1.5 }}>
                                      {ans}
                                    </span>
                                    <span className="text-xs flex-shrink-0" style={{ color: '#9CA3AF' }}>
                                      {sc} б.
                                    </span>
                                  </div>
                                ) : null
                              })}
                            </div>

                            {/* Quick actions */}
                            {tg && (
                              <div className="mt-4 pt-4 border-t flex gap-2" style={{ borderColor: '#F3F4F6' }}>
                                <a
                                  href={`https://t.me/${row.contact.replace('@', '')}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-xs font-medium px-3 py-1.5 rounded-full flex items-center gap-1.5 transition-opacity hover:opacity-70"
                                  style={{ backgroundColor: '#FCE7F3', color: '#E38C9C' }}
                                >
                                  💬 Написать в Telegram
                                </a>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {/* ── BROADCAST TAB ── */}
            {tab === 'broadcast' && (
              <BroadcastTab data={data} />
            )}
          </>
        )}
      </div>

      <style>{`
        @keyframes dots {
          0%, 80%, 100% { opacity: 0.2; transform: scale(0.85); }
          40%            { opacity: 1;   transform: scale(1); }
        }
      `}</style>
    </div>
  )
}

// ── Broadcast Tab ────────────────────────────────────────────────────────────

function BroadcastTab({ data }: { data: AdminSubmission[] }) {
  const [segFilter, setSegFilter] = useState('all')
  const [message, setMessage] = useState('')
  const [sending, setSending] = useState(false)
  const [result, setResult] = useState<{ ok: string[]; failed: string[] } | null>(null)

  const tgContacts = useMemo(() => {
    return data
      .filter((r) => {
        const matchSeg = segFilter === 'all' || r.result_segment.toLowerCase().includes(segFilter)
        return isTelegram(r.contact) && matchSeg
      })
      .map((r) => r.contact)
  }, [data, segFilter])

  async function handleSend() {
    if (!message.trim() || tgContacts.length === 0) return
    setSending(true)
    setResult(null)
    try {
      const res = await sendBroadcast(tgContacts, message)
      setResult(res)
    } catch (e) {
      setResult({ ok: [], failed: tgContacts })
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="animate-fade-in max-w-2xl">
      <div
        className="rounded-2xl p-5 mb-5"
        style={{ backgroundColor: '#FEF3C7', border: '1px solid #FDE68A' }}
      >
        <p className="text-sm font-medium mb-1" style={{ color: '#92400E' }}>⚠️ Важно про рассылку</p>
        <p className="text-xs" style={{ color: '#78350F', lineHeight: 1.6 }}>
          Сообщения отправляются только тем, кто указал Telegram-ник (@username) и <strong>уже
          начинал диалог с вашим ботом</strong>. Если пользователь не писал боту — сообщение не
          дойдёт. Для рассылки по номерам телефона используйте другой инструмент.
        </p>
      </div>

      {/* Segment filter */}
      <div className="mb-4">
        <label className="text-sm font-medium mb-2 block" style={{ color: '#2F3337' }}>
          Кому отправить
        </label>
        <div className="flex flex-wrap gap-2">
          {[
            { val: 'all', label: 'Все сегменты' },
            { val: 'высокая', label: 'Много «должна»' },
            { val: 'средняя', label: 'Средняя усталость' },
            { val: 'лёгкая', label: 'Лёгкая усталость' },
          ].map(({ val, label }) => (
            <button
              key={val}
              onClick={() => setSegFilter(val)}
              className="px-3 py-1.5 rounded-full text-sm transition-all"
              style={{
                backgroundColor: segFilter === val ? '#E9A6B2' : '#fff',
                color: segFilter === val ? '#fff' : '#6B7280',
                border: `1px solid ${segFilter === val ? '#E9A6B2' : '#E5E7EB'}`,
              }}
            >
              {label}
            </button>
          ))}
        </div>
        <p className="text-xs mt-2" style={{ color: '#9CA3AF' }}>
          Telegram-контактов для отправки: <strong style={{ color: '#E38C9C' }}>{tgContacts.length}</strong>
        </p>
      </div>

      {/* Message */}
      <div className="mb-4">
        <label className="text-sm font-medium mb-2 block" style={{ color: '#2F3337' }}>
          Текст сообщения
        </label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Напишите текст рассылки…&#10;&#10;Например: «Привет! Это Ольга Турьева. Приглашаю на бесплатную встречу — записаться можно здесь: ...»"
          rows={7}
          className="w-full border rounded-xl px-4 py-3 text-sm outline-none resize-none"
          style={{ borderColor: '#E5E7EB', color: '#2F3337', lineHeight: 1.65 }}
          onFocus={(e) => (e.target.style.borderColor = '#E9A6B2')}
          onBlur={(e) => (e.target.style.borderColor = '#E5E7EB')}
        />
        <p className="text-xs mt-1 text-right" style={{ color: '#9CA3AF' }}>
          {message.length} символов
        </p>
      </div>

      {/* Send button */}
      <button
        onClick={handleSend}
        disabled={sending || !message.trim() || tgContacts.length === 0}
        className="w-full font-semibold text-white rounded-full py-4 transition-all"
        style={{
          backgroundColor: (sending || !message.trim() || tgContacts.length === 0) ? '#F3D0D7' : '#E9A6B2',
          cursor: (sending || !message.trim() || tgContacts.length === 0) ? 'not-allowed' : 'pointer',
          boxShadow: sending ? 'none' : '0 10px 25px rgba(233,166,178,0.3)',
        }}
      >
        {sending
          ? 'Отправляем…'
          : `Отправить ${tgContacts.length} получател${tgContacts.length === 1 ? 'ю' : 'ям'}`}
      </button>

      {/* Result */}
      {result && (
        <div
          className="mt-4 rounded-2xl p-4"
          style={{
            backgroundColor: result.failed.length === 0 ? '#D1FAE5' : '#FEF3C7',
            border: `1px solid ${result.failed.length === 0 ? '#A7F3D0' : '#FDE68A'}`,
          }}
        >
          <p className="text-sm font-medium mb-1" style={{ color: '#1F2937' }}>
            {result.failed.length === 0
              ? `✅ Отправлено: ${result.ok.length}`
              : `⚠️ Доставлено: ${result.ok.length} / Не доставлено: ${result.failed.length}`}
          </p>
          {result.failed.length > 0 && (
            <p className="text-xs" style={{ color: '#78350F' }}>
              Не дошло: {result.failed.join(', ')}
            </p>
          )}
        </div>
      )}
    </div>
  )
}

// ── Sub-components ────────────────────────────────────────────────────────────

function StatCard({ label, value, color }: { label: string; value: number | string; color: string }) {
  return (
    <div
      className="rounded-2xl p-5"
      style={{ backgroundColor: '#fff', border: '1px solid #E5E7EB' }}
    >
      <p
        className="font-bold mb-1"
        style={{ color, fontSize: '28px', lineHeight: 1 }}
      >
        {value}
      </p>
      <p className="text-xs" style={{ color: '#6B7280' }}>{label}</p>
    </div>
  )
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs mb-0.5" style={{ color: '#9CA3AF' }}>{label}</p>
      <p className="text-sm" style={{ color: '#2F3337', lineHeight: 1.5 }}>{value || '—'}</p>
    </div>
  )
}

import { useState, useEffect } from 'react'
import type { ResultSegment } from '../types'

interface ResultScreenProps {
  segment: ResultSegment
  totalScore: number
  onClickChannel: () => void
  onClickPersonalTg: () => void
  onClickWebsite: () => void
}

const CHANNEL_URL = 'https://t.me/+HSTRjggTNjNhZWRi'
const PERSONAL_TG = 'https://t.me/OlgaTurreva'
const WEBSITE_URL = 'http://turevaolga.space'

const content: Record<
  ResultSegment,
  {
    title: string
    titleAccent: string
    now: string
    strength: string
    risks: string
    steps: string[]
    invite: string
    primaryButton: string
    isHighOrMedium: boolean
  }
> = {
  high: {
    title: 'Вы — женщина‑оркестр,',
    titleAccent: 'которая уже начинает уставать от своего концерта',
    now: 'Вы просыпаетесь утром и уже чувствуете усталость — ещё до того, как встали с постели. День расписан по минутам: дети, работа, дом, и где‑то в самом конце списка — вы сами. Вы живёте с мыслью «ещё чуть‑чуть, а потом отдохну» — но это «потом» всё никак не наступает. Бывает, что ловите себя на том, как повышаете голос на детей из‑за мелочи — и потом злитесь на себя за это.',
    strength: 'При этом вы держите очень много: дети накормлены, дела сделаны, близкие поддержаны. Это огромная работа, которую часто никто не замечает — но она есть. С вами всё в порядке — вы так реагируете на перегруз, а не потому что вы «слабая» или «не справляетесь».',
    risks: 'Если продолжать в том же ритме, тело рано или поздно выставит счёт: простуды, которые не проходят, бессонница, нарастающее раздражение на всё и всех. Усталость, накопленная годами, не уходит сама — она превращается в хроническое состояние, когда уже не помогает ни отпуск, ни выходные.',
    steps: [
      'Выделить 15 минут в день, когда вы ничего не делаете для других — не «полезные» дела, просто тишина или то, что нравится лично вам.',
      'Замечать момент, когда вы снова говорите себе «потерплю» — и хотя бы раз в день выбирать по‑другому: сказать «нет», попросить помощи, отложить.',
      'Подумать, одно какое дело вы готовы делать не идеально на этой неделе — и позволить себе это без чувства вины.',
    ],
    invite: 'На бесплатной 30‑минутной встрече мы разберём, где именно вы перегружаете себя как «женщина‑оркестр», и что можно снять с себя уже в ближайший месяц. Это не обязательство — просто возможность не оставаться с этим одной и посмотреть на свою ситуацию со стороны.',
    primaryButton: 'Написать Ольге в Telegram',
    isHighOrMedium: true,
  },
  medium: {
    title: 'Вы держитесь,',
    titleAccent: 'но внутри всё чаще хочется просто выдохнуть и лечь',
    now: 'Вы справляетесь — но всё чаще замечаете, что к вечеру уже нет сил на себя. Бывают дни, когда хочется просто чтобы никто ничего не просил. Живёте в режиме «надо» — и это работает, но радости в этом становится всё меньше.',
    strength: 'Вы уже замечаете, что что‑то не так, и это очень важно — многие доходят до полного выгорания, не замечая сигналов. С вами всё в порядке — так реагирует любой человек на накопленную нагрузку, а не потому что вы «недостаточно стараетесь».',
    risks: 'Если ничего не менять, постепенно ресурс будет убывать: меньше терпения с детьми, больше раздражения на партнёра из‑за мелочей, ощущение, что вы «пашете, а толку нет». Усталость имеет свойство накапливаться незаметно — лучше выровнять ритм сейчас, чем потом восстанавливаться месяцами.',
    steps: [
      'Один раз в день спросить себя: «Что мне сейчас нужно?» — не что нужно сделать, а что нужно именно вам.',
      'Выбрать одно дело на неделю, которое вы делегируете или откладываете без чувства вины.',
      'Замечать, когда вы говорите себе «я должна» — и проверять: это правда «должна», или просто привычка тянуть всё на себе?',
    ],
    invite: 'На бесплатной 30‑минутной встрече мы посмотрим, где в вашей жизни накопилось лишнее и как выстроить более бережный ритм — без рывков и кардинальных перемен. Это просто возможность разобраться, что именно сейчас съедает ваши силы, и не оставаться с этим вопросом одной.',
    primaryButton: 'Написать Ольге в Telegram',
    isHighOrMedium: true,
  },
  low: {
    title: 'Вы держите баланс —',
    titleAccent: 'но усталость уже даёт о себе знать',
    now: 'В целом у вас неплохо: вы замечаете свои состояния, умеете восстанавливаться. Но бывают периоды, когда чувствуете, что «тянете на зубах» — и тогда немного теряете себя в потоке задач. Иногда ловите себя на мысли: «Хорошо бы просто остановиться и побыть только для себя».',
    strength: 'Вы умеете замечать, когда устали — а это большая редкость. С вами всё в порядке — усталость, которую вы иногда чувствуете, это нормальная реакция на нагрузку, а не слабость.',
    risks: 'Если продолжать жить в режиме «я справлюсь», не выстраивая опоры, запас постепенно будет убывать. Небольшие сигналы усталости накапливаются — и то, что сейчас кажется просто «трудной неделей», может стать хроническим фоном.',
    steps: [
      'Один раз в эту неделю сделать что‑то только для себя — не «полезное», а то, что приносит удовольствие именно вам.',
      'Подумать, что в вашем расписании занимает много сил, но не даёт ничего взамен — и посмотреть, как это можно уменьшить.',
      'Замечать моменты, когда вам хорошо — и позволять себе в них задерживаться дольше.',
    ],
    invite: 'Если хочется разобраться, как поддержать себя в долгосрочной перспективе, — приглашаю на бесплатную 30‑минутную встречу. Мы посмотрим, что уже работает в вашей жизни и что можно выстроить, чтобы запас сил не убывал, а накапливался.',
    primaryButton: 'Подписаться на канал «Секреты женской энергии»',
    isHighOrMedium: false,
  },
}

function scoreBand(segment: ResultSegment) {
  if (segment === 'high') return { label: 'Много «должна», мало ресурса', color: '#E38C9C' }
  if (segment === 'medium') return { label: 'Усталость заметна, ресурс ещё есть', color: '#C4B5FD' }
  return { label: 'Лёгкая усталость', color: '#6EE7B7' }
}

export default function ResultScreen({ segment, totalScore, onClickChannel, onClickPersonalTg, onClickWebsite }: ResultScreenProps) {
  const [visible, setVisible] = useState(false)
  const c = content[segment]
  const band = scoreBand(segment)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 60)
    return () => clearTimeout(t)
  }, [])

  return (
    <div
      className="min-h-screen flex flex-col items-center px-4 py-10 relative overflow-hidden"
      style={{ backgroundColor: '#FDF7F3' }}
    >
      {/* Background decoration */}
      <div
        className="absolute top-0 left-0 w-80 h-80 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(233,166,178,0.08) 0%, transparent 70%)',
          transform: 'translate(-40%, -40%)',
        }}
      />

      <div
        className={`w-full max-w-2xl transition-all duration-500 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
        }`}
      >
        {/* Score badge */}
        <div className="flex items-center gap-2 mb-6">
          <span
            className="inline-flex items-center gap-2 text-xs font-semibold rounded-full px-4 py-1.5 uppercase tracking-wide"
            style={{ backgroundColor: '#FCE7F3', color: band.color }}
          >
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: band.color }} />
            {band.label} · {totalScore} баллов
          </span>
        </div>

        {/* Title */}
        <h1
          className="font-bold leading-snug mb-7"
          style={{ color: '#2F3337', fontSize: 'clamp(22px, 4vw, 30px)', lineHeight: 1.3 }}
        >
          {c.title}{' '}
          <span style={{ color: '#E9A6B2' }}>{c.titleAccent}</span>
        </h1>

        {/* Section: What's happening now */}
        <Section label="Что сейчас происходит">
          <p style={{ color: '#2F3337', fontSize: '15px', lineHeight: 1.75 }}>{c.now}</p>
        </Section>

        {/* Section: What you're doing well */}
        <Section label="Что вы уже делаете хорошо">
          <p style={{ color: '#2F3337', fontSize: '15px', lineHeight: 1.75 }}>{c.strength}</p>
        </Section>

        {/* Section: Risks */}
        <Section label="Что будет, если ничего не менять">
          <p style={{ color: '#2F3337', fontSize: '15px', lineHeight: 1.75 }}>{c.risks}</p>
        </Section>

        {/* Section: 3 steps */}
        <Section label="3 шага на ближайшую неделю">
          <ol className="flex flex-col gap-3">
            {c.steps.map((step, i) => (
              <li key={i} className="flex gap-3 items-start">
                <span
                  className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold mt-0.5"
                  style={{ backgroundColor: '#E9A6B2' }}
                >
                  {i + 1}
                </span>
                <span style={{ color: '#2F3337', fontSize: '15px', lineHeight: 1.7 }}>{step}</span>
              </li>
            ))}
          </ol>
        </Section>

        {/* Invite block */}
        <div
          className="rounded-2xl p-5 mb-7"
          style={{ backgroundColor: '#FDF2F4', borderLeft: '4px solid #E9A6B2' }}
        >
          <div className="flex items-start gap-3">
            <div
              className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-white text-xs font-semibold mt-0.5"
              style={{ backgroundColor: '#E9A6B2' }}
            >
              ОТ
            </div>
            <p style={{ color: '#2F3337', fontSize: '15px', lineHeight: 1.7 }}>
              {c.invite}
            </p>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col gap-3">
          {c.isHighOrMedium ? (
            <>
              <SecondaryLink href={PERSONAL_TG} onClick={onClickPersonalTg}>
                Написать Ольге напрямую в Telegram
              </SecondaryLink>
              <SecondaryLink href={CHANNEL_URL} onClick={onClickChannel}>
                Подписаться на канал «Секреты женской энергии»
              </SecondaryLink>
            </>
          ) : (
            <>
              <PrimaryLink href={CHANNEL_URL} onClick={onClickChannel}>{c.primaryButton}</PrimaryLink>
              <SecondaryLink href={WEBSITE_URL} onClick={onClickWebsite}>
                Посмотреть сайт Ольги Турьевой
              </SecondaryLink>
              <SecondaryLink href={PERSONAL_TG} onClick={onClickPersonalTg}>
                Написать Ольге в Telegram
              </SecondaryLink>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="mt-10 pt-6 border-t flex flex-wrap items-center gap-4" style={{ borderColor: '#E5E7EB' }}>
          <a href={CHANNEL_URL} target="_blank" rel="noopener noreferrer"
            className="text-xs hover:opacity-70 transition-opacity" style={{ color: '#6B7280' }}>
            Telegram-канал
          </a>
          <a href="https://www.youtube.com/@olgatureva_psycholog" target="_blank" rel="noopener noreferrer"
            className="text-xs hover:opacity-70 transition-opacity" style={{ color: '#6B7280' }}>
            YouTube
          </a>
          <a href={WEBSITE_URL} target="_blank" rel="noopener noreferrer"
            className="text-xs hover:opacity-70 transition-opacity" style={{ color: '#6B7280' }}>
            turevaolga.space
          </a>
          <span className="text-xs ml-auto" style={{ color: '#9CA3AF' }}>
            Ольга Турьева · кризисный психолог
          </span>
        </div>
      </div>
    </div>
  )
}

// ── Layout helpers ─────────────────────────────────────────────────────────────

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mb-6">
      <p
        className="text-xs font-semibold uppercase tracking-widest mb-3"
        style={{ color: '#E9A6B2', letterSpacing: '0.1em' }}
      >
        {label}
      </p>
      {children}
    </div>
  )
}

// ── Shared button components ───────────────────────────────────────────────────

function PrimaryLink({ children, href, onClick }: { children: React.ReactNode; href: string; onClick?: () => void }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onClick}
      className="w-full font-semibold text-white rounded-full transition-all duration-150 text-center block"
      style={{
        backgroundColor: '#E9A6B2',
        boxShadow: '0 10px 25px rgba(233, 166, 178, 0.3)',
        padding: '15px 32px',
        fontSize: '15px',
      }}
    >
      {children}
    </a>
  )
}

function SecondaryLink({ children, href, onClick }: { children: React.ReactNode; href: string; onClick?: () => void }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onClick}
      className="w-full font-medium rounded-full text-center block transition-all duration-150"
      style={{
        border: '1px solid #E9A6B2',
        color: '#E9A6B2',
        padding: '13px 32px',
        fontSize: '15px',
      }}
      onMouseEnter={(e) =>
        ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = 'rgba(233,166,178,0.08)')
      }
      onMouseLeave={(e) =>
        ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = 'transparent')
      }
    >
      {children}
    </a>
  )
}

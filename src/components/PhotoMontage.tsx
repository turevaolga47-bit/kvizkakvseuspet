/**
 * Фотомонтаж: центральный портрет деловой женщины
 * + 5 сцен из её жизни по кругу (как в AI-коллажах).
 *
 * Чтобы вставить свои AI-фото — замените URL в константах CENTRAL и SCENES.
 */

// ── Центральный портрет (замените на свою AI-фотографию) ─────────────────────
const CENTRAL =
  'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=440&h=560&q=85'

// ── 5 сцен по кругу (замените URL на свои AI-фотографии) ─────────────────────
const SCENES = [
  {
    src: 'https://images.unsplash.com/photo-1497366754035-f200968a5d4c?auto=format&fit=crop&w=160&h=160&q=75',
    label: 'Работа',
    bg: '#EDE7FF',
    border: '#C4B5FD',
    angle: 0,
  },
  {
    src: 'https://images.unsplash.com/photo-1476703993599-0035a21b17a9?auto=format&fit=crop&w=160&h=160&q=75',
    label: 'Дети',
    bg: '#F0FDF4',
    border: '#86EFAC',
    angle: 72,
  },
  {
    src: 'https://images.unsplash.com/photo-1484665754804-74b091211472?auto=format&fit=crop&w=160&h=160&q=75',
    label: 'Семья',
    bg: '#FFFBEB',
    border: '#FCD34D',
    angle: 144,
  },
  {
    src: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=160&h=160&q=75',
    label: 'Дом',
    bg: '#FFF1F2',
    border: '#FDA4AF',
    angle: 216,
  },
  {
    src: 'https://images.unsplash.com/photo-1541199249251-f713e6145474?auto=format&fit=crop&w=160&h=160&q=75',
    label: 'Не успею',
    bg: '#FEF3F7',
    border: '#E9A6B2',
    angle: 288,
  },
]

const CX = 240, CY = 275, R_OUTER = 160, R_INNER = 110, R_SMALL = 42

export default function PhotoMontage() {
  return (
    <div className="photo-montage-wrapper">
      <div className="photo-montage-inner">

        {/* ── Декоративный круговой фон ── */}
        <div
          className="absolute rounded-full"
          style={{
            width: 420, height: 420,
            left: CX - 210, top: CY - 210,
            background: 'radial-gradient(circle, #FDF2F4 0%, #EDE8E2 70%)',
            opacity: 0.7,
          }}
        />

        {/* ── Пунктирная орбита ── */}
        <svg
          className="absolute"
          style={{ left: CX - R_OUTER - 5, top: CY - R_OUTER - 5, overflow: 'visible' }}
          width={2 * (R_OUTER + 5)}
          height={2 * (R_OUTER + 5)}
        >
          <circle
            cx={R_OUTER + 5}
            cy={R_OUTER + 5}
            r={R_OUTER}
            fill="none"
            stroke="#E9A6B2"
            strokeWidth="1.5"
            strokeDasharray="6 5"
            opacity="0.35"
          />
          {/* Лучи от центра к сценам */}
          {SCENES.map(({ angle }, i) => {
            const rad = ((angle - 90) * Math.PI) / 180
            const x1 = (R_OUTER + 5) + R_INNER * Math.cos(rad)
            const y1 = (R_OUTER + 5) + R_INNER * Math.sin(rad)
            const x2 = (R_OUTER + 5) + (R_OUTER - R_SMALL) * Math.cos(rad)
            const y2 = (R_OUTER + 5) + (R_OUTER - R_SMALL) * Math.sin(rad)
            return (
              <line
                key={i}
                x1={x1} y1={y1}
                x2={x2} y2={y2}
                stroke="#E9A6B2"
                strokeWidth="1.5"
                strokeDasharray="4 3"
                opacity="0.45"
              />
            )
          })}
        </svg>

        {/* ── Центральный портрет ── */}
        <div
          className="absolute rounded-full overflow-hidden"
          style={{
            width: 224, height: 224,
            left: CX - 112, top: CY - 112,
            boxShadow: '0 20px 60px rgba(47,51,55,0.22)',
            border: '5px solid #fff',
            zIndex: 10,
          }}
        >
          <img
            src={CENTRAL}
            alt="Деловая женщина"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            onError={(e) => {
              e.currentTarget.style.display = 'none'
            }}
          />
          {/* Градиент снизу + подпись */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: 'linear-gradient(to bottom, transparent 50%, rgba(47,51,55,0.6) 100%)',
            }}
          />
          <p
            className="absolute bottom-3 w-full text-center font-semibold text-white"
            style={{ fontSize: 11, letterSpacing: '0.02em' }}
          >
            «Я должна всё успеть»
          </p>
        </div>

        {/* ── Сцены по кругу ── */}
        {SCENES.map(({ src, label, bg, border, angle }, i) => {
          const rad = ((angle - 90) * Math.PI) / 180
          const x = CX + R_OUTER * Math.cos(rad)
          const y = CY + R_OUTER * Math.sin(rad)

          return (
            <div key={i}>
              {/* Фото-кружок */}
              <div
                className="absolute rounded-full overflow-hidden"
                style={{
                  width: 84, height: 84,
                  left: x - 42, top: y - 42,
                  border: `3px solid ${border}`,
                  boxShadow: `0 8px 24px rgba(0,0,0,0.13)`,
                  backgroundColor: bg,
                  zIndex: 8,
                }}
              >
                <img
                  src={src}
                  alt={label}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={(e) => {
                    e.currentTarget.style.display = 'none'
                  }}
                />
              </div>

              {/* Лейбл */}
              <div
                className="absolute font-semibold text-center"
                style={{
                  left: x - 36, top: y + 46,
                  width: 72,
                  fontSize: 10,
                  color: '#2F3337',
                  backgroundColor: '#fff',
                  border: `1px solid ${border}`,
                  borderRadius: 20,
                  padding: '2px 0',
                  zIndex: 9,
                }}
              >
                {label}
              </div>
            </div>
          )
        })}

      </div>

      <style>{`
        .photo-montage-wrapper {
          display: flex;
          justify-content: center;
          overflow: visible;
        }
        .photo-montage-inner {
          position: relative;
          width: 480px;
          height: 550px;
          flex-shrink: 0;
          transform-origin: top center;
        }
        @media (max-width: 380px) {
          .photo-montage-inner { transform: scale(0.52); margin-bottom: -260px; }
        }
        @media (min-width: 381px) and (max-width: 479px) {
          .photo-montage-inner { transform: scale(0.62); margin-bottom: -210px; }
        }
        @media (min-width: 480px) and (max-width: 639px) {
          .photo-montage-inner { transform: scale(0.72); margin-bottom: -155px; }
        }
        @media (min-width: 640px) and (max-width: 767px) {
          .photo-montage-inner { transform: scale(0.78); margin-bottom: -122px; }
        }
        @media (min-width: 768px) {
          .photo-montage-inner { transform: scale(0.9); margin-bottom: -55px; }
        }
        @media (min-width: 1024px) {
          .photo-montage-inner { transform: scale(1); margin-bottom: 0; }
        }
      `}</style>
    </div>
  )
}

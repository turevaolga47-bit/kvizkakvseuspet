import { useState, useEffect } from 'react'

const GOOGLE_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLScxx-lWpGwe8dwvgf3K2iR7xylHzdJLXXEDMHT3sSHNIOCxtw/viewform?usp=header'

interface FormGateProps {
  onDone: () => void
}

export default function FormGate({ onDone }: FormGateProps) {
  const [visible, setVisible] = useState(false)
  const [opened, setOpened] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 60)
    return () => clearTimeout(t)
  }, [])

  function handleFormClick() {
    setOpened(true)
    window.open(GOOGLE_FORM_URL, '_blank', 'noopener,noreferrer')
  }

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 py-10"
      style={{ backgroundColor: '#FDF7F3' }}
    >
      <div
        className={`w-full max-w-lg transition-all duration-500 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
        }`}
      >
        {/* Icon */}
        <div
          className="w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-lg mb-6 mx-auto"
          style={{ backgroundColor: '#E9A6B2' }}
        >
          ОТ
        </div>

        {/* Heading */}
        <h2
          className="font-bold text-center mb-4"
          style={{ color: '#2F3337', fontSize: 'clamp(20px, 4vw, 26px)', lineHeight: 1.3 }}
        >
          Ваши результаты готовы!
        </h2>

        <p
          className="text-center mb-6 leading-relaxed"
          style={{ color: '#5A5F65', fontSize: '15px', lineHeight: 1.7 }}
        >
          Чтобы я могла подготовить для вас персональный разбор и рекомендации — заполните короткую форму. Там вы оставите своё имя и e-mail, а я отправлю вам материалы и, при желании, предложу формат дальнейшей работы.
        </p>

        {/* Google Form button */}
        <button
          onClick={handleFormClick}
          className="w-full font-semibold text-white rounded-full transition-all duration-150 active:scale-95 mb-3"
          style={{
            backgroundColor: '#E9A6B2',
            boxShadow: '0 10px 25px rgba(233, 166, 178, 0.35)',
            padding: '15px 32px',
            fontSize: '15px',
            border: 'none',
            cursor: 'pointer',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#E38C9C'
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#E9A6B2'
          }}
        >
          Заполнить форму →
        </button>

        {/* Show results button — appears after form was opened */}
        {opened && (
          <button
            onClick={onDone}
            className="w-full font-medium rounded-full transition-all duration-150 mt-2"
            style={{
              border: '1px solid #E9A6B2',
              color: '#E9A6B2',
              padding: '13px 32px',
              fontSize: '15px',
              backgroundColor: 'transparent',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLButtonElement).style.backgroundColor = 'rgba(233,166,178,0.08)')
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLButtonElement).style.backgroundColor = 'transparent')
            }
          >
            Я заполнила форму — показать результаты
          </button>
        )}

        {/* Privacy policy */}
        <p className="mt-6 text-xs leading-relaxed text-center" style={{ color: '#9CA3AF', lineHeight: 1.6 }}>
          <strong style={{ color: '#6B7280' }}>Политика конфиденциальности (кратко):</strong>{' '}
          Я, Ольга Турьева, психолог, работающий онлайн из Чехии, обрабатываю ваши данные (имя, e-mail, контакты и ответы на вопросы) только для связи с вами, отправки материалов по результатам квиза и, при вашем желании, для записи на консультацию. Данные хранятся в сервисах Google, не передаются третьим лицам, кроме случаев, когда это требуется по закону. Вы можете в любой момент написать мне и попросить удалить свои данные.
        </p>
      </div>
    </div>
  )
}

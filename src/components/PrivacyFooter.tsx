import { useState } from 'react'

export default function PrivacyFooter() {
  const [open, setOpen] = useState(false)

  return (
    <div style={{ backgroundColor: '#F9F4F0', borderTop: '1px solid #EDE7E1' }}>
      {/* Collapsed footer line */}
      <div className="max-w-4xl mx-auto px-6 py-4 flex flex-wrap items-center justify-between gap-3 text-xs" style={{ color: '#9CA3AF' }}>
        <span>© 2025 Ольга Турьева · Кризисный психолог · Чехия</span>
        <button
          onClick={() => setOpen(!open)}
          className="underline hover:opacity-70 transition-opacity"
          style={{ color: '#9CA3AF', fontSize: '12px', background: 'none', border: 'none', cursor: 'pointer' }}
        >
          {open ? 'Скрыть политику конфиденциальности ↑' : 'Политика конфиденциальности (GDPR) ↓'}
        </button>
      </div>

      {/* Expanded policy text */}
      {open && (
        <div className="max-w-4xl mx-auto px-6 pb-8 pt-2" style={{ color: '#4B5563', fontSize: '13px', lineHeight: 1.7 }}>
          <h3 className="font-semibold mb-4 text-sm" style={{ color: '#2F3337' }}>
            Политика конфиденциальности
          </h3>

          <p className="mb-3">
            Я, <strong>Ольга Турьева</strong>, психолог, работающий онлайн из Чехии, являюсь оператором персональных данных в смысле Регламента (ЕС) 2016/679 (GDPR).
          </p>

          <p className="mb-3">
            <strong>Какие данные я обрабатываю.</strong> Я обрабатываю следующие данные, которые вы добровольно оставляете в форме: имя, e-mail, контакт в мессенджере (при наличии), ваши ответы на вопросы квиза и формы.
          </p>

          <p className="mb-3">
            <strong>Цель обработки.</strong> Связаться с вами, отправить результаты квиза и материалы, а также, при вашем желании, обсудить возможность консультации.
          </p>

          <p className="mb-3">
            <strong>Правовое основание.</strong> Ваше явное согласие, которое вы даёте, отмечая соответствующий чекбокс под формой.
          </p>

          <p className="mb-3">
            <strong>Хранение данных.</strong> Данные хранятся в сервисах Google (Google Forms, Google Sheets) и не передаются третьим лицам, за исключением случаев, когда это прямо требуется по закону. Срок хранения — не более 3 лет с момента последнего контакта, либо меньше, если вы попросите удалить данные раньше.
          </p>

          <p className="mb-3">
            <strong>Ваши права.</strong> Вы имеете право запросить доступ к своим данным, их исправление или удаление, а также отозвать согласие на обработку. Для этого напишите мне на e-mail:{' '}
            <a href="mailto:info@turevaolga.space" className="underline hover:opacity-70" style={{ color: '#E9A6B2' }}>
              info@turevaolga.space
            </a>
          </p>

          <p style={{ color: '#6B7280' }}>
            Если вы считаете, что ваши права на защиту данных нарушены, вы можете подать жалобу в надзорный орган по защите данных страны вашего проживания или Чехии.
          </p>
        </div>
      )}
    </div>
  )
}

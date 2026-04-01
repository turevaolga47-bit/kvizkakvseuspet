import { useState } from 'react'
import type { FormData, SubmissionPayload } from '../types'
import { submitApplication } from '../utils/api'
import CalendarPicker from './CalendarPicker'

interface BookingFormProps {
  payload: Omit<SubmissionPayload, 'timestamp' | 'name' | 'contact' | 'email' | 'preferredTime' | 'concern'>
  onClose: () => void
}


const EMPTY_FORM: FormData = {
  name: '',
  contact: '',
  email: '',
  preferredTime: '',
  concern: '',
}

export default function BookingForm({ payload, onClose }: BookingFormProps) {
  const [form, setForm] = useState<FormData>(EMPTY_FORM)
  const [errors, setErrors] = useState<Partial<FormData>>({})
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)

  function validate(): boolean {
    const e: Partial<FormData> = {}
    if (!form.name.trim()) e.name = 'Пожалуйста, укажите имя'
    if (!form.contact.trim()) e.contact = 'Укажите телефон или Telegram'
    if (!form.email.trim()) {
      e.email = 'Укажите email'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      e.email = 'Проверьте формат email'
    }
    if (!form.preferredTime) e.preferredTime = 'Выберите удобное время'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validate()) return
    setSubmitting(true)

    const fullPayload: SubmissionPayload = {
      timestamp: new Date().toLocaleString('ru-RU'),
      name: form.name.trim(),
      contact: form.contact.trim(),
      email: form.email.trim(),
      preferredTime: form.preferredTime,
      concern: form.concern.trim(),
      ...payload,
    }

    try {
      await submitApplication(fullPayload)
    } catch (err) {
      console.error('[Form] Ошибка отправки:', err)
    } finally {
      setSubmitting(false)
      setSuccess(true)
      setForm(EMPTY_FORM)
    }
  }

  function set(field: keyof FormData) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      setForm((f) => ({ ...f, [field]: e.target.value }))
      if (errors[field]) setErrors((err) => ({ ...err, [field]: undefined }))
    }
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 flex items-end sm:items-center justify-center p-0 sm:p-4"
        style={{ backgroundColor: 'rgba(47, 51, 55, 0.55)', backdropFilter: 'blur(3px)' }}
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose()
        }}
      >
        {/* Modal */}
        <div
          className="relative w-full sm:max-w-lg max-h-screen overflow-y-auto rounded-t-3xl sm:rounded-3xl animate-slide-up"
          style={{ backgroundColor: '#FDF7F3' }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            aria-label="Закрыть"
            className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-full transition-colors duration-150"
            style={{ color: '#6B7280', backgroundColor: 'rgba(107, 114, 128, 0.08)' }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLButtonElement).style.backgroundColor =
                'rgba(107, 114, 128, 0.14)')
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLButtonElement).style.backgroundColor =
                'rgba(107, 114, 128, 0.08)')
            }
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M14 4L4 14M4 4L14 14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>

          <div className="p-6 sm:p-8">
            {success ? (
              /* ── Success state ── */
              <div className="text-center py-6 animate-fade-in">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5"
                  style={{ backgroundColor: '#A7F3D0' }}
                >
                  <svg width="28" height="21" viewBox="0 0 28 21" fill="none">
                    <path
                      d="M2 10.5L10 18.5L26 2"
                      stroke="white"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <h3
                  className="font-semibold mb-3"
                  style={{ color: '#2F3337', fontSize: '20px' }}
                >
                  Спасибо!
                </h3>
                <p style={{ color: '#6B7280', fontSize: '16px', lineHeight: 1.6 }}>
                  Ваша заявка отправлена. Мы свяжемся с вами в течение 24 часов.
                </p>
                <button
                  onClick={onClose}
                  className="mt-6 font-medium text-white rounded-full transition-all duration-150"
                  style={{
                    backgroundColor: '#E9A6B2',
                    padding: '12px 28px',
                    fontSize: '15px',
                  }}
                >
                  Закрыть
                </button>
              </div>
            ) : (
              /* ── Form ── */
              <>
                <h2
                  className="font-bold mb-1"
                  style={{ color: '#2F3337', fontSize: '22px', paddingRight: '32px' }}
                >
                  Записаться на встречу
                </h2>
                <p className="mb-6 text-sm" style={{ color: '#6B7280' }}>
                  Бесплатная онлайн‑встреча · 30 минут
                </p>

                <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
                  {/* Name */}
                  <Field
                    label="Имя"
                    required
                    error={errors.name}
                  >
                    <input
                      type="text"
                      placeholder="Как к вам обращаться"
                      value={form.name}
                      onChange={set('name')}
                      className="field-input"
                    />
                  </Field>

                  {/* Contact */}
                  <Field
                    label="Телефон или Telegram"
                    required
                    error={errors.contact}
                    hint="Напишите номер телефона или @ник в Telegram — как вам комфортнее."
                  >
                    <input
                      type="text"
                      placeholder="Где вам удобнее всего ответить"
                      value={form.contact}
                      onChange={set('contact')}
                      className="field-input"
                    />
                  </Field>

                  {/* Email */}
                  <Field
                    label="Email"
                    required
                    error={errors.email}
                  >
                    <input
                      type="email"
                      placeholder="Чтобы дублировать вам детали встречи"
                      value={form.email}
                      onChange={set('email')}
                      className="field-input"
                    />
                  </Field>

                  {/* Preferred time — calendar */}
                  <Field
                    label="Выберите дату и время встречи"
                    required
                    error={errors.preferredTime}
                    hint="Пн–Чт: 10:00–20:00 · Пт: 15:00–18:00 · Сб–Вс: выходной"
                  >
                    <CalendarPicker
                      value={form.preferredTime}
                      onChange={(v) => {
                        setForm(f => ({ ...f, preferredTime: v }))
                        if (errors.preferredTime) setErrors(e => ({ ...e, preferredTime: undefined }))
                      }}
                    />
                    {form.preferredTime && (
                      <p className="text-xs font-medium mt-1" style={{ color: '#E9A6B2' }}>
                        Выбрано: {form.preferredTime}
                      </p>
                    )}
                  </Field>

                  {/* Concern */}
                  <Field
                    label="О чём вам особенно хочется поговорить на встрече"
                    hint="Не обязательно, но поможет мне лучше подготовиться."
                  >
                    <textarea
                      placeholder="Пару фраз: что сейчас больше всего волнует."
                      value={form.concern}
                      onChange={set('concern')}
                      rows={3}
                      className="field-input resize-none"
                    />
                  </Field>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full font-semibold text-white rounded-full transition-all duration-150 active:scale-95 mt-1"
                    style={{
                      backgroundColor: submitting ? '#F3D0D7' : '#E9A6B2',
                      boxShadow: submitting ? 'none' : '0 10px 25px rgba(233, 166, 178, 0.25)',
                      padding: '15px 32px',
                      fontSize: '16px',
                      cursor: submitting ? 'not-allowed' : 'pointer',
                    }}
                  >
                    {submitting ? 'Отправляем…' : 'Отправить заявку'}
                  </button>

                  {/* Telegram alternative */}
                  <div className="text-center mt-4">
                    <p className="text-xs mb-2" style={{ color: '#9CA3AF' }}>или напишите напрямую</p>
                    <a
                      href="https://t.me/OlgaTurreva"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-medium rounded-full px-5 py-2.5 transition-all duration-150"
                      style={{ backgroundColor: '#FCE7F3', color: '#E38C9C' }}
                      onMouseEnter={(e) =>
                        ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = '#F9D4DC')
                      }
                      onMouseLeave={(e) =>
                        ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = '#FCE7F3')
                      }
                    >
                      <svg width="14" height="12" viewBox="0 0 24 20" fill="currentColor">
                        <path d="M23.9 1.8L20.3 18.2C20 19.3 19.4 19.6 18.5 19.1L13 14.9L10.4 17.4C10.1 17.7 9.8 17.9 9.2 17.9L9.6 12.3L19.6 3.3C20.1 2.9 19.4 2.6 18.7 3L6.4 10.8L1 9.2C-.1 8.8-.1 8 1.2 7.5L22.4.2C23.3-.1 24.1.5 23.9 1.8Z" />
                      </svg>
                      Написать @OlgaTurreva в Telegram
                    </a>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Inline styles for inputs */}
      <style>{`
        .field-input {
          width: 100%;
          background-color: #FFFFFF;
          border: 1px solid #E5E7EB;
          border-radius: 12px;
          padding: 12px 16px;
          font-size: 15px;
          color: #2F3337;
          outline: none;
          transition: border-color 0.15s, box-shadow 0.15s;
          font-family: inherit;
        }
        .field-input:focus {
          border-color: #E9A6B2;
          box-shadow: 0 0 0 3px rgba(233, 166, 178, 0.15);
        }
        .field-input::placeholder {
          color: #9CA3AF;
        }
      `}</style>
    </>
  )
}

// ─── Reusable field wrapper ───────────────────────────────────────────────────

interface FieldProps {
  label: string
  required?: boolean
  error?: string
  hint?: string
  children: React.ReactNode
}

function Field({ label, required, error, hint, children }: FieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium" style={{ color: '#2F3337' }}>
        {label}
        {required && (
          <span className="ml-0.5" style={{ color: '#E9A6B2' }}>
            *
          </span>
        )}
      </label>
      {children}
      {hint && !error && (
        <p className="text-xs" style={{ color: '#9CA3AF' }}>
          {hint}
        </p>
      )}
      {error && (
        <p className="text-xs font-medium" style={{ color: '#D96F85' }}>
          {error}
        </p>
      )}
    </div>
  )
}

import { useState } from 'react'

interface CalendarPickerProps {
  value: string
  onChange: (value: string) => void
}

// Mon–Thu: 10–19 (last slot 19:00), Fri: 15–17 (last slot 17:00), Sat–Sun: off
const SLOTS_BY_DOW: Record<number, number[]> = {
  1: [10,11,12,13,14,15,16,17,18,19],
  2: [10,11,12,13,14,15,16,17,18,19],
  3: [10,11,12,13,14,15,16,17,18,19],
  4: [10,11,12,13,14,15,16,17,18,19],
  5: [15,16,17],
}

function isAvailableDay(date: Date): boolean {
  const dow = date.getDay() // 0=Sun,1=Mon,...,6=Sat
  return dow >= 1 && dow <= 5
}

function isPastDay(date: Date): boolean {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return date < today
}

function formatHour(h: number) {
  return `${String(h).padStart(2, '0')}:00`
}

const MONTHS_RU = [
  'Январь','Февраль','Март','Апрель','Май','Июнь',
  'Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь',
]
const DAYS_RU = ['Пн','Вт','Ср','Чт','Пт','Сб','Вс']

export default function CalendarPicker({ value, onChange }: CalendarPickerProps) {
  const today = new Date()
  const [viewYear, setViewYear] = useState(today.getFullYear())
  const [viewMonth, setViewMonth] = useState(today.getMonth())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  // Parse existing value back to date if set
  const selectedDateStr = selectedDate
    ? `${selectedDate.getFullYear()}-${selectedDate.getMonth()}-${selectedDate.getDate()}`
    : null

  function prevMonth() {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1) }
    else setViewMonth(m => m - 1)
  }
  function nextMonth() {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1) }
    else setViewMonth(m => m + 1)
  }

  // Build calendar grid (Mon-first)
  const firstDay = new Date(viewYear, viewMonth, 1)
  const lastDay = new Date(viewYear, viewMonth + 1, 0)
  // dow of first: 0=Sun → shift to Mon-first
  let startDow = firstDay.getDay() // 0=Sun
  startDow = startDow === 0 ? 6 : startDow - 1 // Mon=0

  const cells: (Date | null)[] = []
  for (let i = 0; i < startDow; i++) cells.push(null)
  for (let d = 1; d <= lastDay.getDate(); d++) cells.push(new Date(viewYear, viewMonth, d))
  while (cells.length % 7 !== 0) cells.push(null)

  function selectDay(date: Date) {
    if (isPastDay(date) || !isAvailableDay(date)) return
    setSelectedDate(date)
    onChange('') // reset time when day changes
  }

  function selectSlot(hour: number) {
    if (!selectedDate) return
    const d = selectedDate
    const day = String(d.getDate()).padStart(2, '0')
    const month = String(d.getMonth() + 1).padStart(2, '0')
    const year = d.getFullYear()
    const dayName = DAYS_RU[(d.getDay() === 0 ? 6 : d.getDay() - 1)]
    onChange(`${dayName}, ${day}.${month}.${year} в ${formatHour(hour)} (МСК)`)
  }

  const slots = selectedDate ? (SLOTS_BY_DOW[selectedDate.getDay()] ?? []) : []

  // Check if a slot is selected
  function isSlotSelected(hour: number): boolean {
    return value.includes(formatHour(hour))
  }

  return (
    <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid #E5E7EB' }}>
      {/* Month nav */}
      <div
        className="flex items-center justify-between px-4 py-3"
        style={{ backgroundColor: '#FDF2F4' }}
      >
        <button
          type="button"
          onClick={prevMonth}
          className="w-8 h-8 flex items-center justify-center rounded-full transition-colors"
          style={{ color: '#E9A6B2' }}
          onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'rgba(233,166,178,0.15)')}
          onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
        >
          <svg width="8" height="13" viewBox="0 0 8 13" fill="none">
            <path d="M7 1L1 6.5L7 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <span className="text-sm font-semibold" style={{ color: '#2F3337' }}>
          {MONTHS_RU[viewMonth]} {viewYear}
        </span>
        <button
          type="button"
          onClick={nextMonth}
          className="w-8 h-8 flex items-center justify-center rounded-full transition-colors"
          style={{ color: '#E9A6B2' }}
          onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'rgba(233,166,178,0.15)')}
          onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
        >
          <svg width="8" height="13" viewBox="0 0 8 13" fill="none">
            <path d="M1 1L7 6.5L1 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      {/* Day headers */}
      <div className="grid grid-cols-7 px-3 pt-2 pb-1">
        {DAYS_RU.map(d => (
          <div key={d} className="text-center text-xs font-medium py-1" style={{ color: d === 'Сб' || d === 'Вс' ? '#D1D5DB' : '#9CA3AF' }}>
            {d}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 px-3 pb-3 gap-y-1">
        {cells.map((date, i) => {
          if (!date) return <div key={i} />
          const past = isPastDay(date)
          const available = isAvailableDay(date)
          const isToday = date.toDateString() === today.toDateString()
          const isSelected =
            selectedDateStr ===
            `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`

          return (
            <button
              key={i}
              type="button"
              disabled={past || !available}
              onClick={() => selectDay(date)}
              className="relative mx-auto flex items-center justify-center rounded-full text-sm transition-all"
              style={{
                width: '36px',
                height: '36px',
                fontWeight: isSelected || isToday ? '600' : '400',
                backgroundColor: isSelected
                  ? '#E9A6B2'
                  : isToday && !isSelected
                  ? 'rgba(233,166,178,0.12)'
                  : 'transparent',
                color: isSelected
                  ? '#fff'
                  : past || !available
                  ? '#D1D5DB'
                  : '#2F3337',
                cursor: past || !available ? 'default' : 'pointer',
              }}
            >
              {date.getDate()}
              {isToday && !isSelected && (
                <span
                  className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                  style={{ backgroundColor: '#E9A6B2' }}
                />
              )}
            </button>
          )
        })}
      </div>

      {/* Time slots */}
      {selectedDate && (
        <div className="px-4 pb-4 pt-1" style={{ borderTop: '1px solid #F3F4F6' }}>
          <p className="text-xs font-medium mb-2" style={{ color: '#9CA3AF' }}>
            Выберите время (МСК)
          </p>
          <div className="flex flex-wrap gap-2">
            {slots.map(hour => (
              <button
                key={hour}
                type="button"
                onClick={() => selectSlot(hour)}
                className="rounded-full text-sm font-medium transition-all"
                style={{
                  padding: '6px 14px',
                  backgroundColor: isSlotSelected(hour) ? '#E9A6B2' : 'rgba(233,166,178,0.1)',
                  color: isSlotSelected(hour) ? '#fff' : '#E9A6B2',
                  border: `1px solid ${isSlotSelected(hour) ? '#E9A6B2' : 'rgba(233,166,178,0.3)'}`,
                }}
              >
                {formatHour(hour)}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

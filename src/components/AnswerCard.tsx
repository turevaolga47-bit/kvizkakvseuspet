interface AnswerCardProps {
  text: string
  selected: boolean
  onClick: () => void
  index: number
}

export default function AnswerCard({ text, selected, onClick, index }: AnswerCardProps) {
  return (
    <button
      onClick={onClick}
      className="w-full text-left rounded-2xl p-5 border transition-all duration-150 cursor-pointer"
      style={{
        backgroundColor: selected ? '#E9A6B2' : '#FFFFFF',
        borderColor: selected ? '#E9A6B2' : '#E5E7EB',
        color: selected ? '#FFFFFF' : '#2F3337',
        boxShadow: selected
          ? '0 6px 20px rgba(233, 166, 178, 0.3)'
          : '0 6px 20px rgba(15, 23, 42, 0.04)',
        animationDelay: `${index * 60}ms`,
      }}
      aria-pressed={selected}
    >
      <div className="flex items-start gap-3">
        {/* Checkmark circle */}
        <div
          className="flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center mt-0.5 transition-all duration-150"
          style={{
            backgroundColor: selected ? '#A7F3D0' : 'transparent',
            borderColor: selected ? '#A7F3D0' : (selected ? '#E9A6B2' : '#E5E7EB'),
          }}
        >
          {selected && (
            <svg
              width="12"
              height="9"
              viewBox="0 0 12 9"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 4L4.5 7.5L11 1"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </div>
        <span className="text-base leading-relaxed">{text}</span>
      </div>
    </button>
  )
}

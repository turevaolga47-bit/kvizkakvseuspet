import { useState, useEffect } from 'react'
import type { Question } from '../types'
import ProgressBar from './ProgressBar'
import AnswerCard from './AnswerCard'

interface QuizQuestionProps {
  question: Question
  questionNumber: number
  totalQuestions: number
  selectedAnswerIndex: number | null
  onAnswer: (answerIndex: number) => void
  onBack: () => void
  canGoBack: boolean
}

export default function QuizQuestion({
  question,
  questionNumber,
  totalQuestions,
  selectedAnswerIndex,
  onAnswer,
  onBack,
  canGoBack,
}: QuizQuestionProps) {
  const [visible, setVisible] = useState(false)
  const [key, setKey] = useState(0)
  const [imgLoaded, setImgLoaded] = useState(false)
  const [imgError, setImgError] = useState(false)

  useEffect(() => {
    setVisible(false)
    setImgLoaded(false)
    setImgError(false)
    setKey((k) => k + 1)
    const t = setTimeout(() => setVisible(true), 30)
    return () => clearTimeout(t)
  }, [question.id])

  return (
    <div
      className="min-h-screen flex flex-col items-center px-4 py-6 relative overflow-hidden"
      style={{ backgroundColor: '#FDF7F3' }}
    >
      <div
        className="absolute top-0 right-0 w-72 h-72 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(196,181,253,0.09) 0%, transparent 70%)',
          transform: 'translate(35%, -35%)',
        }}
      />
      <div className="w-full max-w-2xl">
        <ProgressBar current={questionNumber} total={totalQuestions} />
        <div
          key={key}
          className={`transition-all duration-350 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}
        >
          {question.photo && !imgError && (
            <div className="w-full rounded-2xl overflow-hidden mb-6 relative" style={{ height: 200 }}>
              <img
                src={question.photo}
                alt=""
                className={`w-full h-full object-cover transition-opacity duration-500 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
                style={{ objectPosition: 'center 30%' }}
                onLoad={() => setImgLoaded(true)}
                onError={() => setImgError(true)}
              />
              <div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(to bottom, rgba(253,247,243,0) 40%, rgba(253,247,243,0.85) 100%)' }}
              />
              {!imgLoaded && (
                <div className="absolute inset-0 animate-pulse" style={{ backgroundColor: '#F3EDE9' }} />
              )}
            </div>
          )}
          <h2
            className="font-semibold mb-7 leading-snug"
            style={{ color: '#2F3337', fontSize: 'clamp(20px, 3.5vw, 26px)', lineHeight: 1.35 }}
          >
            {question.text}
          </h2>
          <div className="flex flex-col gap-3">
            {question.answers.map((answer, idx) => (
              <div
                key={idx}
                className="animate-slide-up"
                style={{ animationDelay: `${idx * 70}ms`, animationFillMode: 'both' }}
              >
                <AnswerCard
                  text={answer.text}
                  selected={selectedAnswerIndex === idx}
                  onClick={() => onAnswer(idx)}
                  index={idx}
                />
              </div>
            ))}
          </div>
          {canGoBack && (
            <button
              onClick={onBack}
              className="mt-6 flex items-center gap-2 text-sm transition-colors duration-150"
              style={{ color: '#6B7280' }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = '#E9A6B2')}
              onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = '#6B7280')}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Назад
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
import PrivacyFooter from './components/PrivacyFooter'
import { useState, useCallback, useEffect } from 'react'
import type { Screen, QuizAnswer, ResultSegment } from './types'
import { questions } from './data/questions'
import { getResultSegment } from './utils/scoring'

import StartScreen from './components/StartScreen'
import QuizQuestion from './components/QuizQuestion'
import AnalyzingScreen from './components/AnalyzingScreen'
import ResultScreen from './components/ResultScreen'
import FormGate from './components/FormGate'
import BookingForm from './components/BookingForm'
import AdminPanel from './components/AdminPanel'

export default function App() {
  const [screen, setScreen] = useState<Screen>('start')
  const [isAdmin, setIsAdmin] = useState(false)
  const [currentQ, setCurrentQ] = useState(0)
  const [answers, setAnswers] = useState<(number | null)[]>(Array(questions.length).fill(null))
  const [segment, setSegment] = useState<ResultSegment>('medium')
  const [totalScore, setTotalScore] = useState(0)
  const [showForm, setShowForm] = useState(false)

  // Click tracking
  const [clickedChannel, setClickedChannel] = useState(false)
  const [clickedPersonalTg, setClickedPersonalTg] = useState(false)
  const [clickedWebsite, setClickedWebsite] = useState(false)

  // Admin route via URL hash #admin
  useEffect(() => {
    const check = () => setIsAdmin(window.location.hash === '#admin')
    check()
    window.addEventListener('hashchange', check)
    return () => window.removeEventListener('hashchange', check)
  }, [])

  function exitAdmin() {
    window.location.hash = ''
    setIsAdmin(false)
  }

  // ── Quiz handlers ────────────────────────────────────────────────────────

  function handleStart() {
    setCurrentQ(0)
    setAnswers(Array(questions.length).fill(null))
    setClickedChannel(false)
    setClickedPersonalTg(false)
    setClickedWebsite(false)
    setScreen('quiz')
  }

  function handleAnswer(answerIndex: number) {
    const updated = [...answers]
    updated[currentQ] = answerIndex
    setAnswers(updated)

    setTimeout(() => {
      if (currentQ < questions.length - 1) {
        setCurrentQ((q) => q + 1)
      } else {
        const score = questions.reduce((sum, q, i) => {
          const ai = updated[i]
          return sum + (ai !== null ? q.answers[ai].score : 0)
        }, 0)
        setTotalScore(score)
        setSegment(getResultSegment(score))
        setScreen('analyzing')
      }
    }, 250)
  }

  function handleBack() {
    if (currentQ > 0) setCurrentQ((q) => q - 1)
    else setScreen('start')
  }

  const handleAnalyzingDone = useCallback(() => {
    setScreen('form')
  }, [])

  // ── Build submission payload ─────────────────────────────────────────────

  const quizAnswers: QuizAnswer[] = questions.map((q, i) => {
    const ai = answers[i]
    return {
      questionIndex: i,
      answerIndex: ai ?? -1,
      answerText: ai !== null ? q.answers[ai].text : '',
      score: ai !== null ? q.answers[ai].score : 0,
    }
  })

  // ── Admin panel ──────────────────────────────────────────────────────────

  if (isAdmin) {
    return <AdminPanel onExit={exitAdmin} />
  }

  // ── Quiz ─────────────────────────────────────────────────────────────────

  return (
    <div style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
      {screen === 'start' && <StartScreen onStart={handleStart} />}

      {screen === 'quiz' && (
        <QuizQuestion
          question={questions[currentQ]}
          questionNumber={currentQ + 1}
          totalQuestions={questions.length}
          selectedAnswerIndex={answers[currentQ]}
          onAnswer={handleAnswer}
          onBack={handleBack}
          canGoBack={currentQ > 0}
        />
      )}

      {screen === 'analyzing' && <AnalyzingScreen onDone={handleAnalyzingDone} />}

      {screen === 'form' && <FormGate onDone={() => setScreen('result')} />}

      {screen === 'result' && (
        <ResultScreen
          segment={segment}
          totalScore={totalScore}
          onClickChannel={() => setClickedChannel(true)}
          onClickPersonalTg={() => setClickedPersonalTg(true)}
          onClickWebsite={() => setClickedWebsite(true)}
        />
      )}

      {showForm && (
        <BookingForm
          payload={{
            answers: quizAnswers,
            totalScore,
            resultSegment: segment,
            clickedChannel,
            clickedPersonalTg,
            clickedWebsite,
          }}
          onClose={() => setShowForm(false)}
        />
      )}

      {/* Privacy footer */}
      {screen !== 'start' || true ? <PrivacyFooter /> : null}

      {/* Hidden admin link (tiny, bottom-right corner) */}
      <a
        href="#admin"
        className="fixed bottom-3 right-3 text-xs opacity-10 hover:opacity-40 transition-opacity select-none"
        style={{ color: '#9CA3AF', fontSize: '10px' }}
      >
        ⚙
      </a>
    </div>
  )
}

export type Screen = 'start' | 'quiz' | 'analyzing' | 'result' | 'form'

export interface Answer {
  text: string
  score: number
}

export interface Question {
  id: number
  text: string
  answers: Answer[]
  photo?: string
}

export type ResultSegment = 'high' | 'medium' | 'low'

export interface QuizAnswer {
  questionIndex: number
  answerIndex: number
  answerText: string
  score: number
}

export interface FormData {
  name: string
  contact: string
  email: string
  preferredTime: string
  concern: string
}

export interface SubmissionPayload {
  timestamp: string
  name: string
  contact: string
  email: string
  preferredTime: string
  concern: string
  answers: QuizAnswer[]
  totalScore: number
  resultSegment: ResultSegment
  clickedChannel?: boolean
  clickedPersonalTg?: boolean
  clickedWebsite?: boolean
}

// ── Admin ────────────────────────────────────────────────────────────────────

export interface AdminSubmission {
  timestamp: string
  name: string
  contact: string
  email: string
  preferred_time: string
  main_concern: string
  q1_answer: string
  q2_answer: string
  q3_answer: string
  q4_answer: string
  q5_answer: string
  q6_answer: string
  score_q1: string
  score_q2: string
  score_q3: string
  score_q4: string
  score_q5: string
  score_q6: string
  total_score: string
  result_segment: string
  clicked_channel?: string
  clicked_personal_tg?: string
  clicked_website?: string
}


import type { ResultSegment } from '../types'

// Max score: 3+3+3+3+3+3 = 18
// Low:    0–6   → «Усталость есть, но у вас ещё хороший запас»
// Medium: 7–12  → «Вы устали, но ситуацию ещё можно мягко выровнять»
// High:   13–18 → «Вы очень много держите на себе»

export function getResultSegment(totalScore: number): ResultSegment {
  if (totalScore >= 13) return 'high'
  if (totalScore >= 7) return 'medium'
  return 'low'
}

export function getSegmentLabel(segment: ResultSegment): string {
  switch (segment) {
    case 'high': return 'Высокая усталость'
    case 'medium': return 'Средняя усталость'
    case 'low': return 'Лёгкая усталость'
  }
}

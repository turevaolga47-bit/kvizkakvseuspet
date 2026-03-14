import { useEffect } from 'react'

interface AnalyzingScreenProps {
  onDone: () => void
}

export default function AnalyzingScreen({ onDone }: AnalyzingScreenProps) {
  useEffect(() => {
    const t = setTimeout(onDone, 2600)
    return () => clearTimeout(t)
  }, [onDone])

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4"
      style={{ backgroundColor: '#FDF7F3' }}
    >
      <div className="w-full max-w-sm text-center animate-fade-in">
        {/* Animated dots */}
        <div className="flex justify-center gap-2 mb-8">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-3 h-3 rounded-full"
              style={{
                backgroundColor: '#E9A6B2',
                animation: `dots 1.4s ease-in-out ${i * 0.2}s infinite`,
              }}
            />
          ))}
        </div>

        <h2
          className="font-semibold mb-3"
          style={{ color: '#2F3337', fontSize: '22px' }}
        >
          Анализируем ваши ответы…
        </h2>
        <p style={{ color: '#6B7280', fontSize: '16px', lineHeight: 1.6 }}>
          Секунду — подбираем разбор специально для вас
        </p>
      </div>

      <style>{`
        @keyframes dots {
          0%, 80%, 100% { opacity: 0.2; transform: scale(0.85); }
          40%            { opacity: 1;   transform: scale(1);    }
        }
      `}</style>
    </div>
  )
}

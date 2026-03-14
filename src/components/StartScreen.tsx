import { useState, useEffect } from 'react'
interface StartScreenProps { onStart: () => void }
const BASE = 'https://images.pexels.com/photos/3986984/pexels-photo-3986984.jpeg?auto=compress&cs=tinysrgb&w=900&h=900&dpr=1'
const BUBBLES = [
  { src: 'https://images.pexels.com/photos/3905848/pexels-photo-3905848.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=1', top: '4%', left: '6%', w: 110, h: 100 },
  { src: 'https://images.pexels.com/photos/1684913/pexels-photo-1684913.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=1', top: '-2%', left: '38%', w: 130, h: 118 },
  { src: 'https://images.pexels.com/photos/1462636/pexels-photo-1462636.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=1', top: '5%', left: '70%', w: 115, h: 105 },
  { src: 'https://images.pexels.com/photos/4386339/pexels-photo-4386339.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=1', top: '27%', left: '2%', w: 100, h: 92 },
]
export default function StartScreen({ onStart }: StartScreenProps) {
  const [vis, setVis] = useState(false)
  useEffect(() => { const t = setTimeout(() => setVis(true), 60); return () => clearTimeout(t) }, [])
  return (
    <div className="min-h-screen flex flex-col lg:flex-row overflow-hidden" style={{ backgroundColor: '#FDF7F3' }}>
      <div className={`relative order-1 w-full lg:w-[52%] transition-opacity duration-700 ${vis ? 'opacity-100' : 'opacity-0'}`} style={{ minHeight: 420, maxHeight: '100vh' }}>
        <img src={BASE} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block', position: 'absolute', inset: 0 }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, transparent 70%, #FDF7F3 100%)', pointerEvents: 'none' }} />
        <div className="lg:hidden" style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 55%, #FDF7F3 100%)', pointerEvents: 'none' }} />
        <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible', pointerEvents: 'none' }}>
          {[{cx:'22%',cy:'28%'},{cx:'18%',cy:'33%'},{cx:'15%',cy:'38%'},{cx:'48%',cy:'22%'},{cx:'47%',cy:'27%'},{cx:'46%',cy:'32%'},{cx:'71%',cy:'28%'},{cx:'65%',cy:'32%'},{cx:'59%',cy:'36%'},{cx:'14%',cy:'42%'},{cx:'18%',cy:'45%'},{cx:'23%',cy:'47%'}].map((d,i) => (
            <circle key={i} cx={d.cx} cy={d.cy} r="4.5" fill="rgba(0,0,0,0.6)" />
          ))}
        </svg>
        {BUBBLES.map((b, i) => (
          <div key={i} style={{ position: 'absolute', top: b.top, left: b.left, width: b.w, height: b.h, borderRadius: '45% 55% 42% 58% / 50% 46% 54% 50%', overflow: 'hidden', border: '3px solid rgba(0,0,0,0.75)', boxShadow: '0 4px 18px rgba(0,0,0,0.3)', backgroundColor: '#ddd' }}>
            <img src={b.src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none' }} />
          </div>
        ))}
      </div>
      <div className={`flex-1 order-2 flex flex-col justify-center px-8 md:px-12 lg:px-14 py-10 lg:py-16 transition-all duration-700 ${vis ? 'opacity-100' : 'opacity-0'}`}>
        <div className="flex items-center gap-3 mb-7">
          <div className="w-11 h-11 rounded-full flex items-center justify-center text-white text-sm font-semibold flex-shrink-0" style={{ backgroundColor: '#E9A6B2' }}>ОТ</div>
          <p className="text-sm" style={{ color: '#6B7280' }}>Кризисный психолог{' '}<span className="font-semibold" style={{ color: '#2F3337' }}>Ольга Турьева</span>{' '}· 34 года практики</p>
        </div>
        <h1 className="font-bold leading-tight mb-5" style={{ color: '#2F3337', fontSize: 'clamp(26px, 3.5vw, 40px)', lineHeight: 1.15 }}>
          Как всё успеть{' '}<span style={{ color: '#E9A6B2' }}>и не разорваться</span>{' '}на части
        </h1>
        <p className="mb-8 leading-relaxed" style={{ color: '#6B7280', fontSize: 'clamp(15px, 1.6vw, 17px)', lineHeight: 1.75 }}>
          Снаружи у вас всё под контролем — работа, дела, семья. А внутри — усталость и ощущение, что живёте в режиме «надо», а не «хочу». Ответьте на 6 вопросов, чтобы увидеть, что именно сейчас забирает больше всего сил.
        </p>
        <button onClick={onStart} className="font-semibold text-white rounded-full transition-all duration-150 active:scale-95" style={{ backgroundColor: '#E9A6B2', boxShadow: '0 10px 28px rgba(233,166,178,0.4)', padding: '16px 40px', fontSize: '16px', maxWidth: 440 }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#E38C9C' }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#E9A6B2' }}>
          Пройти 6 вопросов про мои «должна» и состояние
        </button>
        <p className="mt-4 text-sm" style={{ color: '#9CA3AF' }}>В конце — разбор от психолога и запись на бесплатную 30-минутную встречу.</p>
        <div className="flex flex-wrap gap-3 mt-6">
          <a href="https://t.me/+HSTRjggTNjNhZWRi" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs font-medium rounded-full px-3 py-1.5 hover:opacity-75 transition-opacity" style={{ backgroundColor: '#FCE7F3', color: '#E38C9C' }}><TgIcon /> Telegram-канал</a>
          <a href="https://www.youtube.com/@olgatureva_psycholog" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs font-medium rounded-full px-3 py-1.5 hover:opacity-75 transition-opacity" style={{ backgroundColor: '#FEE2E2', color: '#EF4444' }}><YtIcon /> YouTube</a>
          <a href="http://turevaolga.space" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs font-medium rounded-full px-3 py-1.5 hover:opacity-75 transition-opacity" style={{ backgroundColor: '#F3E8FF', color: '#9333EA' }}>🌸 Сайт</a>
        </div>
      </div>
    </div>
  )
}
function TgIcon() { return (<svg width="13" height="11" viewBox="0 0 24 20" fill="currentColor"><path d="M23.9 1.8L20.3 18.2C20 19.3 19.4 19.6 18.5 19.1L13 14.9L10.4 17.4C10.1 17.7 9.8 17.9 9.2 17.9L9.6 12.3L19.6 3.3C20.1 2.9 19.4 2.6 18.7 3L6.4 10.8L1 9.2C-.1 8.8-.1 8 1.2 7.5L22.4.2C23.3-.1 24.1.5 23.9 1.8Z" /></svg>) }
function YtIcon() { return (<svg width="14" height="10" viewBox="0 0 24 17" fill="currentColor"><path d="M23.5 2.7C23.2 1.6 22.4.8 21.3.5 19.4 0 12 0 12 0S4.6 0 2.7.5C1.6.8.8 1.6.5 2.7 0 4.6 0 8.5 0 8.5S0 12.4.5 14.3C.8 15.4 1.6 16.2 2.7 16.5 4.6 17 12 17 12 17S19.4 17 21.3 16.5C22.4 16.2 23.2 15.4 23.5 14.3 24 12.4 24 8.5 24 8.5S24 4.6 23.5 2.7ZM9.5 12.1V4.9L15.8 8.5 9.5 12.1Z" /></svg>) }

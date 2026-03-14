/**
 * Иллюстрация: современная женщина стоит у окна офиса,
 * смотрит на город, и её окружают 5 мыслей-«должна».
 */
export default function HeroIllustration() {
  return (
    <svg
      viewBox="0 0 520 420"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Женщина у окна офиса, окружённая мыслями о работе, семье и заботах"
    >
      {/* ══ ОФИСНЫЙ ФОН ══════════════════════════════════════════════════ */}
      <rect width="520" height="420" fill="#EDE8E2" />
      {/* Пол */}
      <rect x="0" y="385" width="520" height="35" fill="#D4C9BC" />
      {/* Плинтус */}
      <rect x="0" y="382" width="520" height="5" fill="#C8BDB0" />

      {/* ══ ОКНО ═════════════════════════════════════════════════════════ */}
      {/* Небо */}
      <rect x="182" y="22" width="328" height="352" rx="2" fill="#B8D0E5" />
      {/* Горизонт чуть светлее */}
      <rect x="182" y="295" width="328" height="79" fill="#CCE2F0" opacity="0.55" />

      {/* Тяжёлые облака — намёк на серость */}
      <ellipse cx="270" cy="52" rx="42" ry="16" fill="#D5E5F0" opacity="0.85" />
      <ellipse cx="304" cy="44" rx="32" ry="13" fill="#D5E5F0" opacity="0.75" />
      <ellipse cx="435" cy="68" rx="35" ry="12" fill="#D5E5F0" opacity="0.65" />
      <ellipse cx="467" cy="58" rx="22" ry="9" fill="#D5E5F0" opacity="0.55" />

      {/* Силуэты домов — серый-синий мегаполис */}
      <rect x="190" y="260" width="24" height="114" fill="#8CA6BC" rx="1" />
      <rect x="218" y="232" width="30" height="142" fill="#84A0B8" rx="1" />
      <rect x="252" y="248" width="22" height="126" fill="#88A5BC" rx="1" />
      <rect x="278" y="205" width="40" height="169" fill="#7A9CB5" rx="1" />
      <rect x="322" y="222" width="27" height="152" fill="#80A2BA" rx="1" />
      <rect x="353" y="188" width="46" height="186" fill="#75998F" rx="1" />
      <rect x="403" y="172" width="34" height="202" fill="#6B93AB" rx="1" />
      <rect x="441" y="156" width="40" height="218" fill="#6890A8" rx="1" />
      <rect x="485" y="192" width="36" height="182" fill="#6C94AC" rx="1" />

      {/* Огни в окнах зданий */}
      {([
        [226,242],[234,242],[226,254],[234,254],
        [284,216],[296,220],[284,232],
        [360,198],[372,204],[360,216],[372,216],
        [408,182],[416,188],[408,198],
        [448,166],[458,172],[448,184],[458,184],
      ] as [number,number][]).map(([x, y], i) => (
        <rect key={i} x={x} y={y} width="5" height="5" fill="#F4DB7A" opacity="0.65" />
      ))}

      {/* Рама окна */}
      <rect x="180" y="20" width="332" height="356" fill="none" stroke="#C4B6A8" strokeWidth="8" rx="2" />
      {/* Вертикальный переплёт */}
      <rect x="342" y="20" width="5" height="356" fill="#C4B6A8" />
      {/* Горизонтальный переплёт */}
      <rect x="180" y="196" width="332" height="5" fill="#C4B6A8" />

      {/* Подоконник */}
      <rect x="164" y="368" width="356" height="20" rx="3" fill="#C0B2A4" />
      <rect x="160" y="381" width="364" height="10" rx="2" fill="#B5A798" />

      {/* ══ ЖЕНЩИНА ══════════════════════════════════════════════════════ */}
      {/* Тень */}
      <ellipse cx="122" cy="410" rx="52" ry="9" fill="#BCB0A4" opacity="0.38" />

      {/* Туфли */}
      <ellipse cx="105" cy="400" rx="13" ry="6" fill="#1E1A18" />
      <ellipse cx="133" cy="400" rx="13" ry="6" fill="#1E1A18" />

      {/* Брюки */}
      <rect x="96" y="338" width="18" height="64" rx="4" fill="#38395A" />
      <rect x="122" y="338" width="18" height="64" rx="4" fill="#363758" />

      {/* Пиджак/жакет */}
      <path d="M 80 368 Q 78 306 96 278 Q 110 260 128 260 Q 148 260 163 278 Q 180 306 178 368 Z" fill="#38395A" />

      {/* Лацканы */}
      <path d="M 96 278 Q 108 261 128 264 L 118 294 Q 98 286 96 278 Z" fill="#2E2F4E" />
      <path d="M 163 278 Q 151 261 130 264 L 140 294 Q 162 286 163 278 Z" fill="#2E2F4E" />

      {/* Белая блузка в вырезе */}
      <path d="M 118 274 Q 128 282 140 274 L 139 292 Q 128 297 118 292 Z" fill="#EDE9E4" />

      {/* Левая рука — вытянута, опирается на подоконник */}
      <path d="M 80 318 Q 58 340 66 372 Q 128 386 170 378 Q 174 368 166 364 Q 118 374 74 362 Q 68 342 84 316 Z" fill="#38395A" />
      {/* Рука на подоконнике */}
      <ellipse cx="162" cy="372" rx="15" ry="7" fill="#C07444" transform="rotate(-12,162,372)" />
      <path d="M 153 368 Q 160 364 170 367" stroke="#A85E30" strokeWidth="1.5" strokeLinecap="round" fill="none" />

      {/* Правая рука вдоль тела */}
      <path d="M 164 308 Q 178 328 174 364 L 162 362 Q 168 332 156 310 Z" fill="#38395A" />

      {/* Шея */}
      <rect x="119" y="248" width="20" height="27" rx="5" fill="#C07444" />

      {/* Голова — повёрнута к окну (вид 3/4 сзади) */}
      <ellipse cx="130" cy="228" rx="30" ry="34" fill="#C07444" />

      {/* Ухо */}
      <ellipse cx="102" cy="232" rx="8" ry="11" fill="#AE6238" />
      <ellipse cx="102" cy="232" rx="5" ry="7" fill="#9C5830" />

      {/* Волосы — строгий пучок, деловой образ */}
      <path d="M 102 218 Q 106 180 130 177 Q 155 180 161 212 Q 153 198 148 220 Q 138 203 130 203 Q 122 203 116 222 Z" fill="#1A120C" />
      <ellipse cx="154" cy="215" rx="15" ry="13" fill="#1A120C" />
      <ellipse cx="158" cy="207" rx="10" ry="9" fill="#221810" />
      {/* Шпилька */}
      <rect x="147" y="213" width="12" height="3" rx="1.5" fill="#E9A6B2" />

      {/* Лицо — усталость, напряжение */}
      {/* Глаз */}
      <path d="M 148 221 Q 157 217 163 221 Q 157 228 148 224 Z" fill="#5C301A" />
      <circle cx="154" cy="222" r="2.2" fill="#1C0C08" />
      <circle cx="152" cy="221" r="1" fill="white" opacity="0.65" />
      {/* Тени под глазом — усталость */}
      <path d="M 147 227 Q 156 226 163 227" stroke="#9A5030" strokeWidth="1" fill="none" opacity="0.55" />
      {/* Напряжённая бровь */}
      <path d="M 145 213 Q 153 209 162 213" stroke="#A85828" strokeWidth="2" fill="none" strokeLinecap="round" />
      {/* Сжатые губы */}
      <path d="M 155 239 Q 161 238 165 239" stroke="#985028" strokeWidth="1.8" fill="none" strokeLinecap="round" />

      {/* ══ МЫСЛИ-ПУЗЫРИ ════════════════════════════════════════════════ */}

      {/* Точечные линии от головы к пузырям */}
      {([
        { cx: 112, cy: 196 }, { cx: 98,  cy: 178 }, { cx: 84,  cy: 162 },
      ] as {cx:number,cy:number}[]).map((p, i) => (
        <circle key={`a${i}`} cx={p.cx} cy={p.cy} r={2.4 - i * 0.3} fill="#A0A0B0" opacity={0.45 - i * 0.04} />
      ))}
      {([
        { cx: 130, cy: 192 }, { cx: 130, cy: 172 }, { cx: 130, cy: 153 },
      ] as {cx:number,cy:number}[]).map((p, i) => (
        <circle key={`b${i}`} cx={p.cx} cy={p.cy} r={2.4 - i * 0.3} fill="#A0A0B0" opacity={0.45 - i * 0.04} />
      ))}
      {([
        { cx: 150, cy: 194 }, { cx: 164, cy: 177 }, { cx: 178, cy: 160 },
      ] as {cx:number,cy:number}[]).map((p, i) => (
        <circle key={`c${i}`} cx={p.cx} cy={p.cy} r={2.4 - i * 0.3} fill="#A0A0B0" opacity={0.45 - i * 0.04} />
      ))}

      {/* ── 1. ДОМ ── */}
      <g transform="rotate(-6,68,135)">
        <rect x="10" y="94" width="116" height="72" rx="14" fill="#FEF3F7" stroke="#E9A6B2" strokeWidth="1.5" />
        <path d="M 36 152 L 36 134 L 48 122 L 60 134 L 60 152 Z" fill="#E9A6B2" opacity="0.8" />
        <rect x="43" y="139" width="10" height="13" rx="1" fill="#FEF3F7" />
        <path d="M 28 136 L 48 118 L 68 136" stroke="#E9A6B2" strokeWidth="2" fill="none" strokeLinecap="round" />
        <rect x="52" y="120" width="5" height="8" fill="#E9A6B2" opacity="0.55" />
        <text x="74" y="118" fontSize="12" fontWeight="700" fill="#2F3337" fontFamily="Inter,sans-serif">Дом</text>
        <text x="70" y="134" fontSize="9" fill="#9CA3AF" fontFamily="Inter,sans-serif">убрать, готовить,</text>
        <text x="70" y="148" fontSize="9" fill="#9CA3AF" fontFamily="Inter,sans-serif">ремонт, счета…</text>
      </g>

      {/* ── 2. ДЕТИ ── */}
      <g transform="rotate(4,128,60)">
        <rect x="66" y="28" width="122" height="72" rx="14" fill="#F0FDF4" stroke="#86EFAC" strokeWidth="1.5" />
        <circle cx="94" cy="54" r="10" fill="#4ADE80" opacity="0.65" />
        <path d="M 86 74 Q 94 64 102 74 L 99 82 L 89 82 Z" fill="#4ADE80" opacity="0.65" />
        <circle cx="108" cy="60" r="7" fill="#86EFAC" opacity="0.55" />
        <text x="122" y="54" fontSize="12" fontWeight="700" fill="#2F3337" fontFamily="Inter,sans-serif">Дети</text>
        <text x="116" y="68" fontSize="9" fill="#9CA3AF" fontFamily="Inter,sans-serif">уроки, кружки,</text>
        <text x="116" y="82" fontSize="9" fill="#9CA3AF" fontFamily="Inter,sans-serif">врачи, эмоции…</text>
      </g>

      {/* ── 3. РАБОТА ── */}
      <g transform="rotate(-4,205,65)">
        <rect x="147" y="26" width="118" height="72" rx="14" fill="#F5F3FF" stroke="#C4B5FD" strokeWidth="1.5" />
        <rect x="163" y="54" width="24" height="18" rx="3" fill="#C4B5FD" opacity="0.8" />
        <path d="M 168 54 L 168 50 Q 168 47 171 47 L 181 47 Q 184 47 184 50 L 184 54" stroke="#C4B5FD" strokeWidth="2" fill="none" strokeLinecap="round" />
        <rect x="173" y="59" width="3" height="10" fill="#F5F3FF" opacity="0.9" />
        <text x="194" y="50" fontSize="12" fontWeight="700" fill="#2F3337" fontFamily="Inter,sans-serif">Работа</text>
        <text x="192" y="65" fontSize="9" fill="#9CA3AF" fontFamily="Inter,sans-serif">проект, команда,</text>
        <text x="192" y="79" fontSize="9" fill="#9CA3AF" fontFamily="Inter,sans-serif">дедлайны, планы…</text>
      </g>

      {/* ── 4. СЕМЬЯ ── */}
      <g transform="rotate(7,58,208)">
        <rect x="4" y="178" width="108" height="70" rx="14" fill="#FFFBEB" stroke="#FCD34D" strokeWidth="1.5" />
        <circle cx="26" cy="202" r="9" fill="#FCD34D" opacity="0.7" />
        <path d="M 18 222 Q 26 213 34 222" stroke="#FCD34D" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <circle cx="42" cy="207" r="7" fill="#FDE68A" opacity="0.7" />
        <path d="M 35 222 Q 42 215 49 222" stroke="#FDE68A" strokeWidth="2" fill="none" strokeLinecap="round" />
        <text x="58" y="202" fontSize="12" fontWeight="700" fill="#2F3337" fontFamily="Inter,sans-serif">Семья</text>
        <text x="56" y="217" fontSize="9" fill="#9CA3AF" fontFamily="Inter,sans-serif">муж, родители,</text>
        <text x="56" y="231" fontSize="9" fill="#9CA3AF" fontFamily="Inter,sans-serif">забота, тревога…</text>
      </g>

      {/* ── 5. ВСЁ УСПЕТЬ — самый острый, красный ── */}
      <g transform="rotate(-8,95,175)">
        <rect x="40" y="143" width="108" height="70" rx="14" fill="#FFF1F2" stroke="#FDA4AF" strokeWidth="2.2" />
        {/* Часы */}
        <circle cx="67" cy="174" r="15" fill="#FDA4AF" opacity="0.18" />
        <circle cx="67" cy="174" r="15" stroke="#F43F5E" strokeWidth="2" fill="none" />
        <line x1="67" y1="174" x2="67" y2="162" stroke="#F43F5E" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="67" y1="174" x2="76" y2="178" stroke="#F43F5E" strokeWidth="2" strokeLinecap="round" />
        <circle cx="67" cy="174" r="2.5" fill="#F43F5E" />
        {/* Восклицательный знак */}
        <rect x="65.5" y="159" width="3" height="1.5" rx="0.5" fill="#F43F5E" opacity="0.9" />
        <text x="88" y="165" fontSize="11" fontWeight="700" fill="#E11D48" fontFamily="Inter,sans-serif">Всё успеть!</text>
        <text x="88" y="180" fontSize="9" fill="#9CA3AF" fontFamily="Inter,sans-serif">времени нет,</text>
        <text x="88" y="194" fontSize="9" fill="#F43F5E" fontFamily="Inter,sans-serif">сил не осталось…</text>
      </g>

      {/* ══ ЛУЧ СВЕТА ИЗ ОКНА — надежда ══ */}
      <path d="M 185 82 L 95 380 L 132 380 L 218 82 Z" fill="#FFFCF0" opacity="0.07" />
      <path d="M 200 68 L 108 380 L 148 380 L 240 68 Z" fill="#FFFCF0" opacity="0.05" />

      {/* Блик на подоконнике */}
      <rect x="168" y="380" width="200" height="7" rx="3" fill="#D4C9BC" opacity="0.35" />
    </svg>
  )
}

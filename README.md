# Квиз «Как всё успеть и не разорваться на части»

Лендинг-квиз для записи на консультацию к кризисному психологу Ольге Турьевой.

## Быстрый старт

```bash
npm install
npm run dev
```

Открыть: http://localhost:5173

## Сборка для продакшна

```bash
npm run build
# dist/ готов к деплою
```

---

## Настройка интеграций

### 1. Скопируйте .env.example → .env

```bash
cp .env.example .env
```

---

### 2. Google Sheets (сохранение заявок)

1. Создайте Google Таблицу.
2. В таблице откройте **Расширения → Apps Script**.
3. Вставьте содержимое файла `google-apps-script.js`.
4. Нажмите **Развернуть → Новое развёртывание**:
   - Тип: **Веб-приложение**
   - Выполнять от имени: **Я (Me)**
   - Доступ: **Все (Anyone)**
5. Скопируйте URL и вставьте в `.env`:
   ```
   VITE_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/.../exec
   ```

---

### 3. Email-уведомления (EmailJS)

Бесплатный план — 200 писем/месяц.

1. Зарегистрируйтесь на [emailjs.com](https://www.emailjs.com/).
2. Добавьте Email-сервис (Gmail, Outlook и др.).
3. Создайте шаблон письма. Используйте переменные:
   ```
   {{timestamp}}, {{name}}, {{contact}}, {{email}},
   {{preferred_time}}, {{main_concern}},
   {{q1_answer}} ... {{q6_answer}},
   {{score_q1}} ... {{score_q6}},
   {{total_score}}, {{result_segment}}
   ```
   Тема письма: `Новая заявка с квиза «Устала от бесконечных "должна"»`
4. Скопируйте Service ID, Template ID, Public Key в `.env`.

---

### 4. Telegram-уведомления

1. Создайте бота через [@BotFather](https://t.me/BotFather) → `/newbot`.
2. Скопируйте токен в `VITE_TELEGRAM_BOT_TOKEN`.
3. Узнайте ваш Chat ID:
   - Напишите боту любое сообщение.
   - Откройте: `https://api.telegram.org/bot<TOKEN>/getUpdates`
   - Найдите `"chat":{"id": ...}` — это ваш Chat ID.
4. Вставьте Chat ID в `VITE_TELEGRAM_CHAT_ID`.

---

### 5. Замените placeholder-ссылки

В файле `src/components/ResultScreen.tsx` замените:
```ts
const CHANNEL_URL = 'https://t.me/YOUR_CHANNEL'
const CLUB_URL = 'https://YOUR_CLUB_URL'
```
на реальные ссылки на Telegram-канал и женский клуб.

---

## Структура проекта

```
src/
├── App.tsx                  # Главный компонент, управление экранами
├── components/
│   ├── StartScreen.tsx      # Стартовый экран
│   ├── ProgressBar.tsx      # Прогресс-бар (6 шагов)
│   ├── QuizQuestion.tsx     # Экран вопроса
│   ├── AnswerCard.tsx       # Карточка ответа
│   ├── AnalyzingScreen.tsx  # «Анализируем ваши ответы...»
│   ├── ResultScreen.tsx     # Экран результата (3 сценария)
│   └── BookingForm.tsx      # Модальная форма записи
├── data/
│   └── questions.ts         # Вопросы и баллы квиза
├── utils/
│   ├── scoring.ts           # Логика подсчёта баллов
│   └── api.ts               # Интеграции (Sheets, Email, Telegram)
└── types/
    └── index.ts             # TypeScript-типы
```

## Скоринг

| Диапазон | Сегмент | Заголовок результата |
|----------|---------|----------------------|
| 0–6      | low     | Усталость есть, но у вас ещё хороший запас |
| 7–12     | medium  | Вы устали, но ситуацию ещё можно мягко выровнять |
| 13–18    | high    | Вы очень много держите на себе |

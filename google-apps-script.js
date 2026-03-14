/**
 * Google Apps Script — вставьте этот код в редактор Apps Script.
 *
 * Инструкция:
 * 1. Откройте Google Таблицу → Расширения → Apps Script
 * 2. Вставьте этот код
 * 3. Задайте пароль администратора в константе ADMIN_PASSWORD (строка ниже)
 * 4. Нажмите «Развернуть» → «Новое развёртывание» → Тип: «Веб-приложение»
 *    - Выполнять от имени: Я (Me)
 *    - Кто имеет доступ: Все (Anyone)
 * 5. Скопируйте URL → вставьте в .env → VITE_GOOGLE_SCRIPT_URL
 * 6. В .env также задайте VITE_ADMIN_PASSWORD тем же паролем
 */

var ADMIN_PASSWORD = 'ВашПаролькАдминке2024'; // ← замените на свой
var SHEET_NAME = 'Заявки';

// ── POST: сохранение новой заявки ────────────────────────────────────────────
function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName(SHEET_NAME);

    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      sheet.appendRow([
        'Дата и время', 'Имя', 'Контакт', 'Email', 'Удобное время',
        'О чём поговорить',
        'Вопрос 1', 'Вопрос 2', 'Вопрос 3', 'Вопрос 4', 'Вопрос 5', 'Вопрос 6',
        'Балл 1', 'Балл 2', 'Балл 3', 'Балл 4', 'Балл 5', 'Балл 6',
        'Итого баллов', 'Сегмент результата',
        'Клик: канал', 'Клик: личка', 'Клик: сайт',
      ]);
    }

    sheet.appendRow([
      data.timestamp, data.name, data.contact, data.email, data.preferred_time,
      data.main_concern,
      data.q1_answer, data.q2_answer, data.q3_answer,
      data.q4_answer, data.q5_answer, data.q6_answer,
      data.score_q1, data.score_q2, data.score_q3,
      data.score_q4, data.score_q5, data.score_q6,
      data.total_score, data.result_segment,
      data.clicked_channel || 'нет',
      data.clicked_personal_tg || 'нет',
      data.clicked_website || 'нет',
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// ── GET: получение данных для админки ────────────────────────────────────────
function doGet(e) {
  var action = e.parameter.action;

  // Проверка пароля
  if (action === 'list') {
    if (e.parameter.pwd !== ADMIN_PASSWORD) {
      return jsonResponse({ error: 'Неверный пароль' });
    }

    try {
      var ss = SpreadsheetApp.getActiveSpreadsheet();
      var sheet = ss.getSheetByName(SHEET_NAME);

      if (!sheet) {
        return jsonResponse({ data: [] });
      }

      var values = sheet.getDataRange().getValues();
      if (values.length <= 1) {
        return jsonResponse({ data: [] });
      }

      var headers = [
        'timestamp', 'name', 'contact', 'email', 'preferred_time',
        'main_concern',
        'q1_answer', 'q2_answer', 'q3_answer', 'q4_answer', 'q5_answer', 'q6_answer',
        'score_q1', 'score_q2', 'score_q3', 'score_q4', 'score_q5', 'score_q6',
        'total_score', 'result_segment',
        'clicked_channel', 'clicked_personal_tg', 'clicked_website',
      ];

      var rows = [];
      for (var i = values.length - 1; i >= 1; i--) { // обратный порядок (новые сначала)
        var row = {};
        for (var j = 0; j < headers.length; j++) {
          row[headers[j]] = values[i][j] !== undefined ? String(values[i][j]) : '';
        }
        rows.push(row);
      }

      return jsonResponse({ data: rows });

    } catch (err) {
      return jsonResponse({ error: err.toString() });
    }
  }

  // Статус (проверка работоспособности)
  return jsonResponse({ status: 'ok', message: 'Apps Script работает' });
}

function jsonResponse(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

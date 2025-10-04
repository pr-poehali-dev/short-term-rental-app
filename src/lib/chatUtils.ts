// Утилиты для модерации сообщений в чате

// Регулярные выражения для поиска контактных данных
const phonePatterns = [
  /\+?\d[\d\s\-\(\)]{7,}\d/g, // Общий паттерн для телефонов
  /\b\d{3}[-.\s]?\d{3}[-.\s]?\d{4}\b/g, // 555-123-4567
  /\b\d{3}[-.\s]?\d{2}[-.\s]?\d{2}\b/g, // 555-12-34
  /\b8\s?\d{3}\s?\d{3}\s?\d{2}\s?\d{2}\b/g, // 8 900 123 45 67
  /\b\+?7\s?\d{3}\s?\d{3}\s?\d{2}\s?\d{2}\b/g, // +7 900 123 45 67
  /\bтел\.?\s*:?\s*\d/gi,
  /\bномер\s*:?\s*\d/gi,
  /\bзвони\s+\d/gi,
];

const emailPatterns = [
  /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g,
  /\b[A-Za-z0-9._%+-]+\s*@\s*[A-Za-z0-9.-]+\s*\.\s*[A-Z|a-z]{2,}\b/g,
  /\bпочта\s*:?\s*[A-Za-z0-9]/gi,
  /\bemail\s*:?\s*[A-Za-z0-9]/gi,
  /\bмыло\s*:?\s*[A-Za-z0-9]/gi, // сленговое "мыло"
];

const messengerPatterns = [
  /\b(whatsapp|вотсап|ватсап|вацап)\b/gi,
  /\b(telegram|телеграм|телега|тг)\b/gi,
  /\b(viber|вайбер)\b/gi,
  /\b(skype|скайп)\b/gi,
  /\b(instagram|инста|инстаграм)\b/gi,
  /\b@[A-Za-z0-9_]+\b/g, // Ники в соц.сетях
];

// Попытки обхода: замена символов
const obfuscationPatterns = [
  /\d[\s._\-@*#]+\d[\s._\-@*#]+\d/g, // 8_9_0_0
  /во?сем[ьъ]?\s*девя(т|ть)/gi, // восемь девять...
  /[oо0][dд][иi1][нh][н]\s*[дd][вb][аa]/gi, // один два три (цифры словами)
];

export const moderateMessage = (message: string): { 
  isBlocked: boolean; 
  cleanMessage: string; 
  reason?: string;
} => {
  let cleanMessage = message;
  let isBlocked = false;
  let reason = '';

  // Проверка на телефоны
  for (const pattern of phonePatterns) {
    if (pattern.test(message)) {
      isBlocked = true;
      reason = 'Обнаружен номер телефона';
      cleanMessage = message.replace(pattern, '[скрыто]');
    }
  }

  // Проверка на email
  for (const pattern of emailPatterns) {
    if (pattern.test(message)) {
      isBlocked = true;
      reason = 'Обнаружен email адрес';
      cleanMessage = cleanMessage.replace(pattern, '[скрыто]');
    }
  }

  // Проверка на мессенджеры
  for (const pattern of messengerPatterns) {
    if (pattern.test(message)) {
      isBlocked = true;
      reason = 'Обнаружено упоминание мессенджера';
      cleanMessage = cleanMessage.replace(pattern, '[скрыто]');
    }
  }

  // Проверка на обход фильтра
  for (const pattern of obfuscationPatterns) {
    if (pattern.test(message)) {
      isBlocked = true;
      reason = 'Попытка обхода фильтра контактов';
      cleanMessage = cleanMessage.replace(pattern, '[скрыто]');
    }
  }

  return {
    isBlocked,
    cleanMessage,
    reason: isBlocked ? reason : undefined
  };
};

export const canAccessContacts = (hasActiveBooking: boolean): boolean => {
  return hasActiveBooking;
};

# Загрузка данных Торы

Это руководство объясняет, как загрузить полный корпус текстов Торы с переводами и морфологическим анализом в ваше приложение.

## 🎯 Обзор системы

Система загрузки данных поддерживает несколько источников:

- **Sefaria API** - Hebrew и русские тексты
- **Westminster Leningrad Codex** - морфологический анализ  
- **Brown-Driver-Briggs** - полный лексикон иврита
- **Open Scriptures** - кантилляционные знаки
- **Локальные файлы** - предварительно загруженные данные

## 🚀 Быстрый старт

### 1. Автоматическая загрузка

```bash
# Загрузить все данные Торы
npm run download-torah

# Или полная настройка
npm run setup-data
```

### 2. Запуск приложения

```bash
npm run dev
```

Приложение автоматически загрузит данные при первом запуске.

## 📊 Структура данных

### Основные типы

```typescript
interface TorahDatabase {
  books: TorahBook[];           // 5 книг Торы
  lexicon: HebrewLexicon;       // Словарь иврита
  commentaries: Commentary[];   // Комментарии
  metadata: DatabaseMetadata;   // Метаданные
}

interface HebrewWord {
  hebrew: string;               // בְּרֵאשִׁית
  transliteration: string;      // b'reshit  
  root: string;                // ראש
  translations: Translation[];  // Все возможные значения
  morphology?: MorphologyInfo; // Грамматический разбор
  occurrences?: number;        // Частота в Торе
}
```

### Словарь иврита

Каждое слово содержит:

- **Множественные переводы** - все возможные значения
- **Контекст** - где и как используется
- **Грамматика** - часть речи, биньян, и т.д.
- **Этимология** - происхождение слова
- **Связанные слова** - однокоренные слова
- **Статистика** - частота использования

Пример:
```typescript
{
  'ברא': {
    root: 'ברא',
    meanings: [
      { 
        meaning: 'создавать', 
        context: 'божественное творение из ничего', 
        grammar: 'глагол Qal' 
      },
      { 
        meaning: 'творить', 
        context: 'приводить в существование нечто новое' 
      },
      { 
        meaning: 'созидать', 
        context: 'формировать или устраивать' 
      }
    ],
    frequency: 48,
    binyanim: ['Qal', 'Niphal', 'Piel'],
    etymology: 'Семитский корень, связанный с разделением',
    relatedWords: ['בריה', 'בראשית', 'ברואה'],
    firstOccurrence: { book: 'Genesis', chapter: 1, verse: 1 }
  }
}
```

## 🔧 Настройка источников данных

### Sefaria API

```typescript
const SEFARIA_CONFIG = {
  baseUrl: 'https://www.sefaria.org/api',
  endpoints: {
    hebrew: '/texts/{book}.he',
    russian: '/texts/{book}.ru',
    english: '/texts/{book}.en'
  },
  rateLimit: 100 // мс между запросами
};
```

### Локальные файлы

Создайте папку `public/data/` с файлами:

```
public/data/
├── torah-complete.json      # Полная база данных
├── hebrew-lexicon.json      # Словарь иврита  
├── genesis.json            # Берешит
├── exodus.json             # Шмот
├── leviticus.json          # Вайикра
├── numbers.json            # Бамидбар
├── deuteronomy.json        # Дварим
└── metadata.json           # Метаданные
```

## 📥 Источники данных

### 1. Sefaria - Тексты и переводы

```javascript
// Загрузка Hebrew текста
const hebrewResponse = await fetch('https://www.sefaria.org/api/texts/Genesis.he');
const hebrewData = await hebrewResponse.json();

// Загрузка русского перевода
const russianResponse = await fetch('https://www.sefaria.org/api/texts/Genesis.ru');
const russianData = await russianResponse.json();
```

### 2. Westminster Hebrew Morphology

```javascript
// Морфологический анализ каждого слова
const morphologyData = await fetch('https://github.com/openscriptures/morphhb/master/wlc/Genesis.xml');
```

### 3. Brown-Driver-Briggs Lexicon

```javascript
// Полный лексикон иврита
const lexiconData = await fetch('https://github.com/openscriptures/HebrewLexicon/master/BrownDriverBriggs.xml');
```

## 🛠 Расширенная настройка

### Добавление новых источников

```typescript
// В src/utils/dataLoader.ts
const DATA_SOURCES = {
  // Существующие источники...
  
  // Добавить новый источник
  myCustomSource: 'https://my-torah-api.com/api',
  strongsLexicon: 'https://strongslexicon.org/api'
};

class TorahDataLoader {
  // Добавить метод загрузки
  private async loadFromCustomSource(): Promise<any> {
    const response = await fetch(`${DATA_SOURCES.myCustomSource}/torah`);
    return await response.json();
  }
}
```

### Кастомная обработка слов

```typescript
// Создать собственный анализатор
class HebrewWordAnalyzer {
  analyzeWord(hebrew: string): HebrewWord {
    return {
      hebrew,
      transliteration: this.transliterate(hebrew),
      root: this.extractRoot(hebrew),
      translations: this.getTranslations(hebrew),
      morphology: this.analyzeMorphology(hebrew)
    };
  }
  
  private extractRoot(hebrew: string): string {
    // Ваша логика извлечения корня
    return hebrew.replace(/^[והב]/, '').slice(0, 3);
  }
}
```

## 📱 Использование в компонентах

### Загрузка данных в React

```tsx
import { useTorahData } from '@/hooks/useTorahData';

function TorahReader() {
  const { 
    database, 
    currentBook, 
    isLoading, 
    loadBook,
    searchWord,
    getWordTranslations 
  } = useTorahData();

  if (isLoading) {
    return <DataLoader />;
  }

  // Поиск слова в лексиконе
  const wordData = searchWord('ברא');
  
  // Получение всех переводов
  const translations = getWordTranslations('אלהים');
  
  return (
    <div>
      {currentBook?.chapters.map(chapter => (
        <div key={chapter.number}>
          {chapter.verses.map(verse => (
            <div key={verse.number}>
              {verse.words.map((word, i) => (
                <TorahWord 
                  key={i}
                  {...word}
                  translations={getWordTranslations(word.hebrew)}
                />
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
```

### Кэширование и оптимизация

```typescript
// Автоматическое кэширование
const { database } = useTorahData(); // Загружает из кэша если доступно

// Принудительное обновление
const { refreshData } = useTorahData();
await refreshData(); // Перезагружает все данные

// Загрузка конкретной книги
const { loadBook } = useTorahData();
await loadBook('Exodus'); // Догружает книгу если не загружена
```

## 🎛 Конфигурация

### Переменные окружения

```bash
# .env.local
VITE_SEFARIA_API_KEY=your_api_key
VITE_TORAH_DATA_URL=https://your-torah-api.com
VITE_CACHE_DURATION=604800000  # Неделя в миллисекундах
```

### Настройки кэша

```typescript
// В src/utils/dataLoader.ts
const CACHE_CONFIG = {
  maxAge: 7 * 24 * 60 * 60 * 1000, // Неделя
  useIndexedDB: true,               // Для больших данных
  compression: true                 // Сжатие данных
};
```

## 📊 Статистика и мониторинг

### Метрики загрузки

```typescript
interface LoadingMetrics {
  totalWords: number;        // 79,847 слов в Торе
  uniqueWords: number;       // ~8,000 уникальных слов  
  booksLoaded: number;       // 0-5 книг
  lexiconEntries: number;    // Записей в словаре
  loadTime: number;          // Время загрузки в мс
  cacheHitRate: number;      // Процент попаданий в кэш
}
```

### Отслеживание прогресса

```tsx
const { progress } = useTorahData();

console.log(`${progress.loaded}/${progress.total} - ${progress.currentOperation}`);
// "3/5 - Загрузка морфологических данных..."
```

## 🚨 Обработка ошибок

### Стратегии восстановления

```typescript
const { error, refreshData } = useTorahData();

if (error) {
  // Попробовать перезагрузить
  await refreshData();
  
  // Или использовать fallback данные
  const fallbackData = createMinimalTorahData();
}
```

### Типичные проблемы

1. **Нет интернета** - используется кэш
2. **API недоступен** - fallback на локальные файлы  
3. **Поврежденный кэш** - автоматическая очистка
4. **Превышен лимит API** - переключение на альтернативные источники

## 📈 Оптимизация производительности

### Ленивая загрузка

```typescript
// Загружать книги по требованию
await loadBook('Genesis');  // Загружает только Берешит

// Предварительная загрузка
useEffect(() => {
  setTimeout(() => loadBook('Exodus'), 5000); // Через 5 сек
}, []);
```

### Сжатие данных

```javascript
// В downloadTorahData.js
const compressedData = JSON.stringify(database, null, 0); // Без форматирования
```

## 🔒 Безопасность

### Валидация данных

```typescript
function validateTorahData(data: unknown): data is TorahDatabase {
  return (
    typeof data === 'object' &&
    data !== null &&
    'books' in data &&
    'lexicon' in data &&
    Array.isArray(data.books)
  );
}
```

### Санитизация

```typescript
function sanitizeHebrewText(text: string): string {
  // Удалить недопустимые символы
  return text.replace(/[^\u0590-\u05FF\u200E\u200F\s]/g, '');
}
```

## 📄 Лицензии

Убедитесь, что соблюдаете лицензии источников данных:

- **Sefaria** - CC BY-SA
- **Westminster Leningrad Codex** - Public Domain
- **Brown-Driver-Briggs** - Public Domain  
- **Open Scriptures** - CC BY-SA

## 🤝 Вклад в развитие

Для добавления новых источников данных:

1. Создайте loader класс
2. Добавьте типы в `torah.ts`
3. Обновите документацию
4. Добавьте тесты
5. Создайте Pull Request

---

*Для получения помощи обращайтесь к [Issues](https://github.com/your-repo/issues)*
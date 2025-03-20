# StocksForecast AI

Приложение для прогнозирования движения цен акций с использованием искусственного интеллекта.

## Технологии

- Next.js 15
- React 19
- Tailwind CSS
- Supabase (аутентификация и база данных)
- OpenAI API (для генерации прогнозов)
- Chart.js (для визуализации графиков)

## Основные функции

- Поиск акций по символу
- Анализ исторических данных
- Прогнозирование будущих цен с помощью ИИ
- Подробные объяснения прогнозов
- Пользовательские аккаунты для сохранения прогнозов

## Локальная разработка

```bash
# Установка зависимостей
npm install

# Запуск сервера разработки
npm run dev

# Сборка для production
npm run build

# Запуск production версии
npm start
```

## Переменные окружения

Создайте `.env.local` файл в корне проекта со следующими переменными:

```
# Supabase configuration
NEXT_PUBLIC_SUPABASE_URL=ваш_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=ваш_supabase_ключ

# OpenAI configuration
OPENAI_API_KEY=ваш_openai_ключ

# Stock API configuration
ALPHA_VANTAGE_API_KEY=ваш_alpha_vantage_ключ

# Режим моков (true для тестирования, false для реальных API)
USE_MOCK_DATA=true
```

## Структура проекта

- `/app` - Next.js App Router компоненты и страницы
- `/components` - Переиспользуемые UI компоненты
- `/lib` - Библиотеки, утилиты и API интеграции
- `/public` - Статические ресурсы

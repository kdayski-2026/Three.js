# One AI (oneai-front)

Фронтенд **Telegram Mini App** на React: подключение кошелька TON через **TonConnect**, авторизация по данным Telegram и взаимодействие с бэкендом для AI-запросов и пополнения баланса в TON.

## Возможности

- **TonConnect** — без кошелька показывается экран с кнопкой подключения; после подключения адреса открывается основной интерфейс.
- **Авторизация** — при загрузке отправляется `POST` на `/auth` с `queryId` и данными пользователя из `Telegram.WebApp` (включая адрес кошелька); с сервера приходит баланс.
- **Главная страница** — поле ввода запроса и отправка на `/prompt`; отображается ответ сервера и обновляется баланс.
- **Страница платежей** (`/payment`) — кнопки пополнения на фиксированные суммы (0.01–10 TON); запросы уходят на `/payment` с `queryId`, сгенерированным `hash` и суммой в нанотонах.

Навигация между главной и оплатой — через иконку в шапке (переключение маршрутов `/` и `/payment`).

## Стек

- React 18, React Router 6
- Create React App (`react-scripts` 5)
- `@tonconnect/ui-react` — провайдер и кнопка TonConnect
- Telegram Web App API (`telegram-web-app.js` в `public/index.html`)

## Бэкенд

API по умолчанию: `https://saturn.fanil.ru`

| Метод | Назначение |
|--------|------------|
| `POST /auth` | Авторизация и получение баланса |
| `POST /prompt` | Отправка промпта (`queryId`, `message`, `address`) |
| `POST /payment` | Инициация/учёт платежа (`queryId`, `hash`, `amount`, `address`) |

Манифест TonConnect: `https://saturn.fanil.ru/tonconnect-manifest.json` (задаётся в `src/index.js` у `TonConnectUIProvider`).

## Требования

- Node.js и npm (версии, совместимые с CRA 5)

## Установка и запуск

```bash
npm install
npm start
```

Сборка для продакшена:

```bash
npm build
```

Тесты (шаблон CRA):

```bash
npm test
```

## Структура проекта (основное)

```
src/
  App.jsx              — маршруты, TonConnect, авторизация, баланс
  index.js             — TonConnectUIProvider, BrowserRouter
  hooks/useTelegram.js — Telegram WebApp, fetch /auth
  pages/
    MainPage/          — промпт и ответ
    PaymentPage/       — пополнение баланса
  components/          — Header, Button
  lib/hashGenerate.js  — генерация hash для платежей
```

## Запуск в Telegram

Приложение рассчитано на открытие внутри Telegram как Web App (нужны `initData` и `Telegram.WebApp`). Для локальной разработки без Telegram потребуется мок окружения или прокси — иначе `window.Telegram.WebApp` может быть недоступен.

## Лицензия

Приватный проект (`"private": true` в `package.json`).

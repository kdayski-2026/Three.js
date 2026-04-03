# ghub-front

Фронтенд веб-приложения **Global Hub** — маркетплейса с каталогом товаров, корзиной и оплатой через криптокошелёк (Ethereum / Arbitrum). В репозитории пакет npm назван `tymio`; интерфейс и часть ссылок ориентированы на бренд Tymio.

## Возможности

- **Главная и каталог** — дерево категорий (`/:parentId`), загрузка данных с бэкенда.
- **Карточка товара** — `/product/:id`, галерея изображений, вкладки с описанием.
- **Корзина** — `/basket`, управление позициями.
- **Оформление заказа** — `/order`: данные получателя, доставка, оплата USDT (ERC-20) через **MetaMask** или **WalletConnect** (переключение сети на Arbitrum Sepolia в коде заказа).

## Технологии

| Область | Стек |
|--------|------|
| UI | React 18, React Router 6 |
| Сборка | Create React App (`react-scripts` 5) |
| Стили | styled-components, Emotion |
| Состояние сервисов | RxJS (Subject / BehaviorSubject) |
| Формы | Formik, Yup |
| Web3 | web3.js, MetaMask SDK, WalletConnect Ethereum Provider |
| Прочее | react-google-recaptcha, universal-cookie, react-pro-sidebar |

## Требования

- Node.js с поддержкой актуального npm/yarn
- Бэкенд API (базовый URL задаётся в `.env`)

## Установка и запуск

```bash
npm install
```

Скопируйте переменные окружения и заполните значения:

```bash
cp .env.example .env
```

Запуск dev-сервера (по умолчанию порт **9001**):

```bash
npm start
# или
npm run dev
```

Сборка production:

```bash
npm run build
```

Тесты:

```bash
npm test
```

## Переменные окружения

| Переменная | Назначение |
|------------|------------|
| `REACT_APP_API_URL` | Базовый URL REST API (каталог, товары, корзина) |
| `REACT_APP_PROJECT_ID` | Project ID для WalletConnect (опционально; в коде есть fallback) |
| `REACT_APP_CAPTCHA` | Ключ для Google reCAPTCHA, если используется |
| `PORT` | Порт dev-сервера (в скриптах задан 9001) |
| `SKIP_PREFLIGHT_CHECK` | При необходимости для обхода проверок CRA |

## Структура проекта (кратко)

- `src/App.js` — маршруты приложения
- `src/pages/` — страницы: Main, Catalogue, Product, Basket, Order
- `src/components/` — общие компоненты и layout
- `src/services/` — API и кошелёк (catalog, product, basket, wallet и др.)
- `src/hooks/` — хуки для каталога, корзины, кошелька, маршрутов
- `src/api/` — HTTP-клиент к бэкенду

## Лицензия

Проект помечен как `private` в `package.json`; условия распространения уточняйте у владельцев репозитория.

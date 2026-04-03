# weezi-web

Веб‑клиент (React + CRA) для Weezi / DAO‑функциональности с интеграцией Web3 (Metamask) и получением данных с backend API.

## Требования

- Node.js: **20.x** (см. `package.json -> engines`)
- Yarn: рекомендуется (см. `vercel.json` / `yarn.lock`)

## Быстрый старт

Установка зависимостей:

```bash
yarn install --frozen-lockfile
```

Запуск в dev-режиме:

```bash
yarn start
```

Сборка production:

```bash
yarn build
```

Тесты:

```bash
yarn test
```

Авто‑фикс линтинга:

```bash
yarn lint:fix
```

## Деплой (Vercel)

В репозитории есть `vercel.json` с командами и переменными окружения для сборки:

- `installCommand`: `yarn install --frozen-lockfile`
- `buildCommand`: `yarn build`
- `build.env.CI`: `false`
- `build.env.NODE_OPTIONS`: `--openssl-legacy-provider`

Если вы деплоите не в Vercel, эти параметры можно перенести в окружение CI/сборки.

## Конфигурация и окружение

- **Web API**: запрос `GET https://webapi.weezi.io/dao-info` (см. `src/api/api.js`)
- **Web3**: подключение через `window.ethereum` / Metamask (см. `src/api/bia.js`)
- **ProxyBot/контракты**: настройки сетей и адресов лежат в `src/config/*.json`

В этом проекте не обнаружены файлы `.env*`. Если вы добавите конфигурацию через переменные окружения CRA, используйте префикс `REACT_APP_` и документируйте значения в этом README.

## Структура

- `src/views/` — экраны/страницы
- `src/components/` — UI компоненты
- `src/api/` — работа с HTTP/Web3
- `src/config/` — JSON‑конфиги (адреса/ABI/сети)
- `public/` — статические файлы CRA

## Полезно знать

- Приложение использует `react-router-dom` для маршрутизации (см. `src/App.js`).
- Подключена метрика Yandex (`react-yandex-metrika`).

## Weezi Web App

Weezi — веб‑приложение (CRM/панель управления) для **DAO Asset Management**: управление процессами и активами в **DeFi / NFT / GameFi**. Проект собран на **React (Create React App)** и предназначен для деплоя как статический фронтенд (например, на **Vercel**).

## Демо

- **Записанное демо‑видео**: `https://youtu.be/et_QuKOrEUQ`

## Технологии

- **Frontend**: React 17, React Router
- **UI**: Material UI v4, Bootstrap/Reactstrap, styled-components
- **Web3**: web3, web3modal, MEWconnect web client
- **Сборка**: Create React App (`react-scripts`)

## Требования

- **Node.js**: 20.x
- **Yarn**: рекомендуется (в репозитории есть `yarn.lock`)

## Быстрый старт (локально)

```bash
yarn install
yarn start
```

Приложение будет доступно на `http://localhost:3000`.

## Скрипты

- **dev**: `yarn start`
- **build**: `yarn build`
- **test**: `yarn test`
- **lint fix**: `yarn lint:fix`

## Деплой (Vercel)

В `vercel.json` настроены команды:

- **install**: `yarn install --frozen-lockfile`
- **build**: `yarn build`

Также для сборки заданы переменные окружения:

- **CI**: `false`
- **NODE_OPTIONS**: `--openssl-legacy-provider`

## Переменные окружения

Отдельный шаблон `.env.example` в проекте не обнаружен. Если вы используете переменные окружения (ключи API, RPC URL и т.п.), добавьте:

- файл `.env.example` со списком переменных без секретов
- файл `.env` в `.gitignore` (если репозиторий будет в git)

## Контакты

- **Контактное лицо**: Aleksandr Doronin
- **Discord**: `aleksdor`
- **Email**: `aleksdor84@gmail.com`

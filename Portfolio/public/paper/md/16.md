# Cripto DAO App (`dao-app-src`)

## Что это
`dao-app-src` — фронтенд-приложение (SPA) на Vue 2 + Vuetify для работы с DAO: просмотр, создание, голосования, а также отдельная форма обновления/обслуживания (software update).

## Стек
- Vue 2
- Vue Router
- Vuex
- Vuetify 2
- PWA (service worker через Workbox)
- Интеграции с Web3 (например `web3` / `web3modal` и связанные библиотеки)

## Роуты / экраны
Основные маршруты (из `src/router/index.js`):
- `/` — редирект на `/main`
- `/main` — `MainScreen`
- `/createDaoEth` — создание DAO (Ethereum)
- `/about` — `AboutScreen`
- `/dashboard` — `DashboardScreen`
- `/dao/depositor` — `DaoDepositorScreen`
- `/dao/manager` — `DaoManagerScreen`
- `/dao/vote` — `DaoVoteScreen`
- `/dao/new` — `DaoNewScreen`
- `/dao/view/:daoAddress` — просмотр DAO:
  - `:appAddress` — `DaoAppScreen`
- `/software-update` — `SoftwareUpdateScreen`

## Установка
1. Требуемая версия Node.js: `24.x` (указано в `package.json`)
2. В корне проекта:
   - `npm install`

Если при установке возникают проблемы с peer-dependencies, можно использовать параметры, как в `vercel.json`:
- `npm install --legacy-peer-deps --omit=optional --ignore-scripts`

## Запуск (dev)
`npm run serve`

## Сборка (prod)
`npm run build`

Выходные каталоги настраиваются в `vue.config.js`:
- production: `prod/`
- иначе: `dist/`

## Линт
`npm run lint`

## PWA / обновление
В `vue.config.js` включён PWA:
- `workboxPluginMode: 'GenerateSW'`
- исключения для map/manifest/robots (`workboxOptions.exclude`)

Сервис-воркер:
- регистрируется в `src/registerServiceWorker.js` (использует `process.env.BASE_URL`)
- обработка обновления в `src/App.vue`:
  - подписка на событие `serviceWorkerUpdated`
  - показ уведомления и запуск обновления через store/dispatch.

## Алиасы импортов
В `vue.config.js` настроены алиасы:
- `@` -> `src/`
- `_api`, `_entities`, `_features`, `_router`, `_screens`, `_services`, `_store`, `_ui`, `_utils`

## Деплой (Vercel)
`vercel.json` включает rewrite для SPA:
- `/(.*)` -> `/index.html`

## Контракты и модель DAO
Описание DAO/ACL механики вынесено отдельно:
- `contracts/Readme.md`


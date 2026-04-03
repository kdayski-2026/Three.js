# MasterGo (izi-master)

Мобильное приложение на базе **React Native** и **Expo** для взаимодействия заказчиков и исполнителей услуг.  
Основные возможности:

- поиск и просмотр мастеров и их профилей;
- создание и управление заявками на услуги;
- система отзывов и рейтингов;
- встроенный чат в реальном времени (через `socket.io-client`);
- авторизация и управление учетной записью пользователя.

Приложение использует:

- **React Navigation** (`@react-navigation/native`, `@react-navigation/bottom-tabs`, `@react-navigation/stack`) для навигации;
- **Expo SDK** (геолокация, работа с камерой/галереей, splash screen и др.);
- **AsyncStorage** для локального хранения данных;
- **rxjs** для реактивного управления данными.

## Структура проекта

- `pages/` — основные экраны приложения (`Login`, `Register`, `Profile`, `Requests`, `RequestDetails`, `Settings`, `Payments`, `Pincode`, `Reviews`, `ReferalList`, `OtherUserProfile` и др.);
- `components/` — переиспользуемые UI‑компоненты: карточки, инпуты, контейнеры, вкладки, чат;
- `services/` — обращения к API и работа с данными (`user.service`, `request.service`, `login.service`, `chat.service` и др.);
- `hooks/` — кастомные хуки (`useUser`, `useRequests`, `useRequest`, `useNeural` и др.);
- `shared/` — общие константы, токены и обработка ошибок;
- `lib/` — вспомогательные утилиты, например работа с датами.

## Требования

- Node.js и npm/yarn;
- Expo CLI (устанавливается как зависимость проекта);
- при сборке APK/IPA потребуется аккаунт Expo и соответствующие инструменты платформ.

## Установка и запуск

1. Установите зависимости:

   ```bash
   npm install
   ```

2. Запустите Metro‑сервер и приложение:

   ```bash
   npm start
   ```

   Либо:

   ```bash
   npm run android
   npm run ios
   npm run web
   ```

## Сборка APK/IPA через EAS

1. Установите EAS CLI:  
   `npm install -g eas-cli`  

2. Авторизуйтесь:  
   `eas login`  

3. Настройте проект для EAS:
   `eas build:configure`

4. Соберите APK:  
   `eas build -p android --profile preview`  

5. Для iOS:  
   `eas build -p ios --profile preview`  

Актуальная документация:  
- `https://docs.expo.dev/build/setup/`  
- `https://docs.expo.dev/build-reference/apk/`
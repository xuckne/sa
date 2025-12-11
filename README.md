# Калькулятор подсетей Торговцева

Учебный проект на Vue 3 + TypeScript для расчета сетевых параметров по введенному IP и выбранной маске подсети.

## Стек
- Vite
- Vue 3 (script setup)
- TypeScript
- SCSS

## Быстрый старт
```bash
npm install
npm run dev -- --host --port 5173 --clearScreen false --strictPort
```
Dev-сервер слушает `http://localhost:5173`.

Полезные команды:
- `npm run build` — продакшен-сборка.
- `npm run lint` — ESLint + Stylelint.
- `npm run ts` — проверка типов.

## Структура
- `src/pages/HomePage.vue` — основная страница, рендерит калькулятор.
- `src/components/SubnetCalculator.vue` — форма ввода IP/маски, вывод результатов и состояния валидации.
- `src/constants/subnetMasks.ts` — список 33 масок для селекта.
- `src/utils/isIpValid.ts` — проверка корректности IP (шаблон + диапазон октетов).
- `src/utils/getNetworkAdress.ts` — расчет адреса сети.
- `src/utils/getAddressesCount.ts` — расчет количества доступных адресов.
- `src/styles/main.scss` — глобальные переменные и базовые стили.

## Как работает калькулятор
1. Поле для ввода IP (`192.168.1.150`) и селект с маской.
2. Валидация `isIpValid`: формат `d.d.d.d` и каждое значение ≤ 255. Кнопка "Рассчитать" отключена, если IP некорректен.
3. После сабмита показываются:
   - Введенный IP и выбранная маска.
   - Адрес сети из `getNetworkAdress`.
   - Количество возможных адресов по формуле в `getAddressesCount` (учет спецслучаев /32 и /31).

## Стиль и UI
- CSS-переменные для цветов, flex/grid для раскладки.
- Компонент стилизован локально (scoped SCSS); фон страницы и размещение карточки задаются в `HomePage`.

## Рекомендации по IDE
- Включить автоформатирование при сохранении.
- Полезные расширения VS Code: ESLint, Stylelint, Prettier, Vue Official.

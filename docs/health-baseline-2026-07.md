# Baseline здоровья сайта ITCODER — Фаза 0 (ITC-12)

Дата: 2026-07-03 · Ветка: `main` · Next.js 15.5.19 · Node deps по `package.json`

Зафиксировано исходное состояние основного сайта перед началом сопровождения/модернизации.
Изменений в код не вносилось. Деплой не выполнялся.

## 1. Сборка и линт

| Проверка | Результат |
|----------|-----------|
| `npm run build` | ✅ Успешно (compiled 7.6s, 27 статических страниц сгенерированы) |
| `npm run lint` | ✅ No ESLint warnings or errors |

Замечание: `next lint` помечен как deprecated и будет удалён в Next.js 16 —
потребуется миграция на ESLint CLI (`@next/codemod next-lint-to-eslint-cli`). Не срочно.

Размеры бандла (First Load JS): shared 102 kB; главная `/` — 218 kB; тяжёлые разделы
`/contact` 180 kB, `/header` 185 kB, `/project-builder` 186 kB. Приемлемо, MUI даёт основной вес.

## 2. Зависимости и безопасность (`npm audit`)

3 уязвимости: **1 high, 2 moderate**.

| Пакет | Severity | Суть | Реальный риск для сайта |
|-------|----------|------|--------------------------|
| `nodemailer` <=9.0.0 | **high** | raw-option обходит disableFileAccess/disableUrlAccess (arbitrary file read / SSRF) | **Ноль** — пакет числится в зависимостях, но **нигде не импортируется** (grep по `app/` пусто). Форма контактов давно переведена на `fetch` к бэкенду. Мёртвая зависимость. |
| `postcss` <8.5.10 (внутри `next`) | moderate | XSS через unescaped `</style>` в CSS-stringify | Низкий — только на этапе сборки, транзитивно из Next. Уходит после апдейта Next до патча. |
| `next` (зависит от уязвимого postcss) | moderate | см. выше | см. выше |

`npm audit fix --force` предлагает деструктивные/ошибочные шаги (downgrade next до 9.x) — **не применять**.

Устаревшие пакеты (major, требуют отдельной проработки, НЕ в этой фазе):
`@mui/material` 7→9, `react`/`react-dom` 18→19, `next` 15→16, `eslint` 9→10,
`typescript` 5→6, `@vercel/analytics` 1→2. Патч-обновления доступны: `next` 15.5.19→15.5.20,
`tailwindcss` 4.3.1→4.3.2.

## 3. SEO

| Элемент | Статус |
|---------|--------|
| `app/sitemap.ts` | ✅ Динамический, blog/cases подтягиваются из реестров контента. Base `https://www.itcoder.ca`. Отдаётся как `/sitemap.xml` (force-static). |
| `app/robots.ts` | ✅ Корректно: allow all + disallow `/api/`,`/_next/`,`/static/`; отдельные правила для GPTBot и PerplexityBot; ссылка на sitemap. |
| `app/metadata.tsx` | ✅ `metadataBase`, title template, description, keywords, OpenGraph, Twitter card, robots/googleBot, `alternates.canonical`. |
| Canonical по разделам | ⚠️ Root задаёт canonical на главную; каждый раздел ДОЛЖЕН переопределять `alternates.canonical` (комментарий в metadata.tsx это фиксирует) — проверить по разделам в отдельной задаче. |
| `opengraph-image.tsx` | ✅ Присутствует. |
| Домен-редиректы | ✅ 301 с `it-coder.com`/`www.it-coder.com` → `www.itcoder.ca` в `next.config.ts`. |

## 4. Форма контактов (`app/api/send-email/route.ts`)

✅ Функциональна. POST принимает `firstName/lastName/email/phone/message`, валидирует обязательные
поля (400 при отсутствии), форвардит на бэкенд `${NEXT_PUBLIC_API}/leads/contact` с заголовком
`x-api-key: BACKEND_LEADS_API_KEY`. Ошибки бэкенда логируются и возвращают 500.

Замечания (не блокеры): имя роута `send-email` историческое — отправку писем делает бэкенд, не
nodemailer. Нет rate-limiting/анти-спама на самом Next-роуте (полагается на бэкенд). `.env`
содержит `BACKEND_LEADS_API_KEY` — секрет не в гите (проверено, `.env` в `.gitignore`).

## 5. Блог

✅ Работает. 3 статьи (SSG через `generateStaticParams`):
`integrating-claude-api-production`, `nestjs-monolith-to-microservices`, `reliable-web3-event-indexing`.
Реестр `app/blog/content/index.ts` (сортировка по дате desc), детальные страницы 148 kB First Load.
Кейсы (`/cases/[slug]`) устроены аналогично, 3 штуки.

## 6. Core Web Vitals / Lighthouse

Vercel **Analytics** и **Speed Insights** подключены в `layout.tsx` — полевые метрики собираются
в проде. Для LCP главной сделана оптимизация: preload hero-фонов (CSS backgrounds не видны
preload-сканеру). Полный лабораторный прогон Lighthouse требует запущенного прод-сервера + Chrome
и вынесен в ручную/отдельную проверку (см. быстрые починки).

---

## Список быстрых починок (приоритизировано)

1. **[high, безопасно]** Удалить неиспользуемые `nodemailer` + `@types/nodemailer` из
   `package.json` — закрывает единственную high-уязвимость, снижает вес зависимостей. Проверить
   сборку. Риск минимальный (пакет не импортируется).
2. **[low, безопасно]** Патч-апдейт `next` 15.5.19→15.5.20 и `tailwindcss`→4.3.2 — снимает
   moderate postcss-уязвимость, без breaking changes.
3. **[low]** Пройтись по разделам и убедиться, что каждый переопределяет `alternates.canonical`
   (иначе дубли для Google).
4. **[low]** Запланировать миграцию `next lint` → ESLint CLI (до апгрейда на Next 16).
5. **[backlog]** Прогнать реальный Lighthouse по `/`, `/contact`, `/blog/[slug]` на прод-сборке,
   зафиксировать цифры CWV.
6. **[backlog]** Оценить анти-спам/rate-limit на форме контактов (сейчас только на бэкенде).

Major-апгрейды (MUI 9, React 19, Next 16, ESLint 10, TS 6) — отдельными задачами фазы модернизации,
не быстрые починки.

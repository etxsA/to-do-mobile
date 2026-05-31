# EduTask — To-Do Mobile

A cross-platform **task & list manager** built with **Expo / React Native**, consuming a deployed **Quarkus REST backend**, with **Firebase Authentication** (email/password) and JWT-authorized API calls.

> Individual final project — TEC S6 *Desarrollo de Aplicaciones*. This iteration is **mobile only** (demoed on the iOS simulator).

---

## Features

- **Authentication** — Firebase email/password sign-in + sign-up, with the backend's two-system onboarding (`POST /user`). Session persists across restarts; protected routes; working logout.
- **Home dashboard** — “Due Today” + task-list cards with progress, pull-to-refresh and infinite paging.
- **Lists** — full CRUD (create/edit/delete) with a color picker and an icon picker (backend catalog).
- **Tasks** — full CRUD with priority, due date/time and multi-list membership; optimistic completion toggle with haptics; swipe-to-delete.
- **Smart lists** — Today / Overdue / High Priority / All, aggregated client-side.
- **Search** — debounced search across lists and tasks.
- **Profile** — user details, a stats dashboard (completion %, counts, priority breakdown), light/dark/system theme toggle, and logout.
- **UX** — consistent loading / error / empty states everywhere; HTTP errors normalized and surfaced to the user.

## Tech stack

| Concern | Choice |
|---|---|
| Framework | Expo SDK 56, React Native 0.85, React 19, TypeScript (strict) |
| Routing | expo-router (file-based, typed routes) |
| Auth | Firebase JS SDK (AsyncStorage persistence) |
| Networking | Axios — custom instance + request/response interceptors (Bearer token, 401 refresh+retry, error normalization) |
| Server state | TanStack Query (caching, refetch, optimistic updates) |
| Client state | Zustand (auth session, theme preference) |
| Styling | NativeWind (Tailwind) + Gluestack UI |
| Forms | react-hook-form + zod |
| Testing | Jest + React Native Testing Library |

## Architecture

```
src/
├── app/            # expo-router screens ((app)/(tabs) + lists/tasks/smart routes, login/register)
├── config/         # env (EXPO_PUBLIC_* + platform base URL)
├── lib/            # firebase init; axios instance + interceptors; query client
├── stores/         # zustand (auth, theme)
├── services/       # typed API calls (auth, user, tasklist, task, icon, search)
├── hooks/          # TanStack Query hooks
├── components/     # ui/ (Gluestack), feedback/, lists/, tasks/, common/, layout/
├── types/          # API DTO types
└── utils/          # errors, format, query keys, validation, sorting, smart lists
```

Data flow: **screen → query hook → service → axios instance → backend**. Screens never call axios directly. The Firebase ID token is attached by the request interceptor and refreshed on 401.

## Prerequisites

- Node.js ≥ 20, npm
- Xcode + iOS Simulator (for the iOS demo) — or Expo Go on a device
- A Firebase project with Email/Password sign-in enabled (the one the backend verifies tokens against)

## Setup

```bash
git clone https://github.com/etxsA/to-do-mobile.git
cd to-do-mobile
npm install

# create your env file from the example, then fill in the values
cp .env.example .env
```

### Environment variables

All vars are prefixed `EXPO_PUBLIC_` (inlined into the client bundle by Expo — public by design; the Firebase web apiKey is not a secret). See **`.env.example`**:

```env
EXPO_PUBLIC_API_BASE_URL=https://to-do-860378882125.us-central1.run.app
EXPO_PUBLIC_FIREBASE_API_KEY=
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=
EXPO_PUBLIC_FIREBASE_PROJECT_ID=
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
EXPO_PUBLIC_FIREBASE_APP_ID=
```

> The exact Firebase config values for this project are provided **with the submission** (intentionally not committed to this public repository). Paste them into your local `.env`.

## Run

```bash
npx expo start --ios     # open in the iOS Simulator (demo target)
# or
npx expo start           # then press i (iOS) / a (Android), or scan the QR with Expo Go
```

## Test

```bash
npm test                 # Jest + React Native Testing Library
npx tsc --noEmit         # type-check
```

## Backend

- Deployed (Google Cloud Run): **https://to-do-860378882125.us-central1.run.app** — health check: `GET /status`.
- The backend is not modified by this project. Note: its database **resets to seed data on each restart/redeploy**.

## Test users

Seed accounts (Firebase + backend rows already exist):

| Email | Role |
|---|---|
| `dav@gmail.com` | USER |
| `dav1@gmail.com` | USER |
| `2@gmail.com` | Teacher |

> Password is **provided to the evaluator with the submission** (a shared test-environment password; intentionally not stored in this public repo).

## Notes & known limitations

- **Mobile only** this iteration (a web app is a possible later iteration).
- The backend's `/task/{id}` endpoints don't enforce per-user ownership; the client only ever acts on the signed-in user's own data.
- `PATCH /task/{id}` is a full replace — the task edit form always sends every field.

## Git workflow

Gitflow: `main` (releases) ← `develop` (integration) ← `feature/*`. Pull requests are created and merged via the GitHub CLI (`gh`).

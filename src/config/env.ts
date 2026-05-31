import { Platform } from 'react-native';

/**
 * Centralized, typed access to environment configuration.
 *
 * All values come from `EXPO_PUBLIC_*` vars (see `.env` / `.env.example`),
 * which Expo inlines into the client bundle at build time. These are public
 * by design (the Firebase web apiKey is not a secret).
 */

/** Platform-aware fallback for local development when no env URL is set. */
function defaultApiBaseUrl(): string {
  // Android emulator reaches the host machine via 10.0.2.2; iOS sim uses localhost.
  return Platform.OS === 'android' ? 'http://10.0.2.2:8080' : 'http://localhost:8080';
}

export const API_BASE_URL =
  process.env.EXPO_PUBLIC_API_BASE_URL?.replace(/\/+$/, '') ?? defaultApiBaseUrl();

export const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY ?? '',
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN ?? '',
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID ?? '',
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET ?? '',
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ?? '',
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID ?? '',
} as const;

/** Throws early (dev only) if Firebase config is incomplete, to fail fast. */
export function assertFirebaseConfig(): void {
  const missing = Object.entries(firebaseConfig)
    .filter(([, v]) => !v)
    .map(([k]) => k);
  if (missing.length > 0 && __DEV__) {
    console.warn(
      `[config] Missing Firebase env vars: ${missing.join(', ')}. ` +
        `Copy .env.example to .env and fill them in.`,
    );
  }
}

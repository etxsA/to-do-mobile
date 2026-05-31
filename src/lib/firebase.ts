import { getApp, getApps, initializeApp } from 'firebase/app';
// NOTE: import auth from the scoped `@firebase/auth` package, not the `firebase/auth`
// umbrella. As of firebase 12.x the umbrella's `./auth` subpath dropped the
// `react-native` export condition, so Metro resolves its browser build, which no
// longer ships `getReactNativePersistence`. The scoped package keeps the RN build
// (with AsyncStorage persistence); Metro resolves it via the `react-native` condition.
import * as firebaseAuth from '@firebase/auth';
import { getAuth, initializeAuth, type Auth, type Persistence } from '@firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { assertFirebaseConfig, firebaseConfig } from '@/config/env';

// `getReactNativePersistence` exists in the RN build that Metro loads, but the
// package's top-level `types` entry (resolved first by TS) hides it. Reach it
// through a typed indirection so both the bundler and the type-checker are happy.
const getReactNativePersistence = (
  firebaseAuth as unknown as {
    getReactNativePersistence: (storage: unknown) => Persistence;
  }
).getReactNativePersistence;

assertFirebaseConfig();

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

// initializeAuth must run exactly once; on Fast Refresh it may already exist,
// in which case fall back to getAuth.
let auth: Auth;
try {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
} catch {
  auth = getAuth(app);
}

export { app, auth };

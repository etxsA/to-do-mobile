import { Stack } from 'expo-router';

/**
 * Authed area container. Phase 3 replaces this with the bottom-tab navigator;
 * for now it's a headerless stack so the placeholder home renders.
 */
export default function AppLayout() {
  return <Stack screenOptions={{ headerShown: false }} />;
}

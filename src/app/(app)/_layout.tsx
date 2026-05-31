import { Stack } from 'expo-router';

/**
 * Authed area stack. Holds the tab navigator plus full-screen pushed routes
 * (list detail, create/edit modals) added in later phases.
 */
export default function AppStackLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}

import { Stack } from 'expo-router';

/**
 * Authed area stack: the tab navigator plus full-screen / modal pushed routes
 * (list detail, create/edit list). Task routes are added in Phase 5.
 */
export default function AppStackLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="lists/[id]/index" />
      <Stack.Screen name="lists/new" options={{ presentation: 'modal' }} />
      <Stack.Screen name="lists/[id]/edit" options={{ presentation: 'modal' }} />
      <Stack.Screen name="tasks/new" options={{ presentation: 'modal' }} />
      <Stack.Screen name="tasks/[id]/edit" options={{ presentation: 'modal' }} />
    </Stack>
  );
}

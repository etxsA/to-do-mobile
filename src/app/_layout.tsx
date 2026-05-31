import { QueryClientProvider } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import { queryClient } from '@/lib/queryClient';
import { useAuthStore } from '@/stores/authStore';
import '../global.css';

// Keep the native splash up until we know whether there is a restored session,
// so we never flash the login screen during async session restore.
void SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const status = useAuthStore((s) => s.status);
  const bootstrap = useAuthStore((s) => s.bootstrap);

  // Wire the http token bridge + restore the persisted Firebase session.
  useEffect(() => {
    const unsubscribe = bootstrap();
    return unsubscribe;
  }, [bootstrap]);

  useEffect(() => {
    if (status !== 'init') void SplashScreen.hideAsync();
  }, [status]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <QueryClientProvider client={queryClient}>
          <GluestackUIProvider mode="dark">
            <Stack screenOptions={{ headerShown: false }}>
              {/* Authed area */}
              <Stack.Protected guard={status === 'authed'}>
                <Stack.Screen name="(app)" />
              </Stack.Protected>
              {/* Guest area — only once we know the user is signed out (not during init) */}
              <Stack.Protected guard={status === 'guest'}>
                <Stack.Screen name="login" />
                <Stack.Screen name="register" />
              </Stack.Protected>
            </Stack>
            <StatusBar style="light" />
          </GluestackUIProvider>
        </QueryClientProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

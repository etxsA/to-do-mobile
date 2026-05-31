import { Screen } from '@/components/layout/Screen';
import { Button, ButtonText } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { useAuthStore } from '@/stores/authStore';

/**
 * Placeholder authed home — proves login + session + logout work end to end.
 * Replaced by the real Home (progress rings + today) in Phase 4.
 */
export default function HomePlaceholder() {
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);

  return (
    <Screen center testID="screen-home">
      <VStack space="lg" className="items-center">
        <Heading size="xl" className="text-center text-typography-900">
          Hello, {user?.fullName ?? 'there'}
        </Heading>
        <Text className="text-center text-typography-500">
          You&apos;re signed in. Home, lists, tasks and search arrive in the next phases.
        </Text>
        <Button action="negative" variant="outline" onPress={() => logout()} testID="btn-logout">
          <ButtonText>Log out</ButtonText>
        </Button>
      </VStack>
    </Screen>
  );
}

import { ThemeToggle } from '@/components/common/ThemeToggle';
import { Screen } from '@/components/layout/Screen';
import { Avatar, AvatarFallbackText, AvatarImage } from '@/components/ui/avatar';
import { Button, ButtonText } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { useAuthStore } from '@/stores/authStore';

/**
 * Profile / About. Phase 9 adds the stats dashboard; here we show the user's
 * details and a working logout (the required Logout action).
 */
export default function ProfileScreen() {
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);

  return (
    <Screen scroll testID="screen-profile">
      <VStack space="xl" className="items-center py-6">
        <Avatar size="2xl" className="bg-primary-200">
          {user?.firebaseImage ? (
            <AvatarImage source={{ uri: user.firebaseImage }} />
          ) : (
            <AvatarFallbackText>{user?.fullName ?? 'User'}</AvatarFallbackText>
          )}
        </Avatar>

        <VStack space="xs" className="items-center">
          <Heading size="xl" className="text-brand-ink">
            {user?.fullName ?? 'Your profile'}
          </Heading>
          {user?.email ? <Text className="text-brand-soft">{user.email}</Text> : null}
          {user?.role ? (
            <Text className="text-xs uppercase tracking-wide text-brand-soft">{user.role}</Text>
          ) : null}
        </VStack>

        {user?.description ? (
          <Text className="text-center text-brand-muted">{user.description}</Text>
        ) : null}
        {user?.interest ? (
          <Text className="text-center text-brand-soft">Interested in {user.interest}</Text>
        ) : null}

        <VStack space="sm" className="mt-2 w-full">
          <Text className="text-[11px] font-bold uppercase tracking-[2px] text-brand-muted">
            Appearance
          </Text>
          <ThemeToggle />
        </VStack>

        <Button
          action="negative"
          variant="outline"
          onPress={() => logout()}
          testID="btn-logout"
          className="w-full"
        >
          <ButtonText>Log out</ButtonText>
        </Button>
      </VStack>
    </Screen>
  );
}

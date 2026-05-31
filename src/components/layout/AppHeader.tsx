import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useRouter } from 'expo-router';
import { Pressable, View } from 'react-native';

import { Avatar, AvatarFallbackText, AvatarImage } from '@/components/ui/avatar';
import { Text } from '@/components/ui/text';
import { brand } from '@/constants/tokens';
import { useAuthStore } from '@/stores/authStore';

/** Top app bar (EduTask brand + profile avatar). Avatar opens the profile screen. */
export function AppHeader() {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);

  return (
    <View className="flex-row items-center justify-between bg-brand-bg px-6 py-4">
      <View className="flex-row items-center gap-2">
        <MaterialCommunityIcons name="book-open-variant" size={22} color={brand.primaryStrong} />
        <Text className="text-[20px] font-bold tracking-tight text-brand-primaryStrong">EduTask</Text>
      </View>

      <Pressable
        onPress={() => router.push('/profile')}
        accessibilityRole="button"
        accessibilityLabel="Open profile"
        testID="btn-open-profile"
      >
        <Avatar size="md" className="border-2 border-brand-border bg-primary-200">
          {user?.firebaseImage ? (
            <AvatarImage source={{ uri: user.firebaseImage }} />
          ) : (
            <AvatarFallbackText>{user?.fullName ?? 'User'}</AvatarFallbackText>
          )}
        </Avatar>
      </Pressable>
    </View>
  );
}

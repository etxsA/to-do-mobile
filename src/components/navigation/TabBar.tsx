import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Pressable, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Text } from '@/components/ui/text';
import { brand } from '@/constants/tokens';

type TabName = 'index' | 'search';

const TABS: Record<TabName, { label: string; icon: keyof typeof MaterialIcons.glyphMap }> = {
  index: { label: 'Dashboard', icon: 'dashboard' },
  search: { label: 'Search', icon: 'search' },
};

/**
 * Custom bottom tab bar matching the Figma design: rounded top, brand-blue
 * active pill, only the two primary destinations (profile is reached via the
 * header avatar, so its route is hidden from the bar).
 */
export function TabBar({ state, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{ paddingBottom: insets.bottom + 12 }}
      className="flex-row items-center justify-center gap-12 rounded-t-3xl border-t border-brand-border bg-brand-bg pt-3"
    >
      {state.routes.map((route: (typeof state.routes)[number], index: number) => {
        const config = TABS[route.name as TabName];
        if (!config) return null;

        const focused = state.index === index;
        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });
          if (!focused && !event.defaultPrevented) navigation.navigate(route.name);
        };

        return (
          <Pressable
            key={route.key}
            onPress={onPress}
            accessibilityRole="button"
            accessibilityState={focused ? { selected: true } : {}}
            testID={`tab-${route.name}`}
            className={`items-center rounded-2xl px-6 py-2 ${focused ? 'bg-brand-primarySoft' : ''}`}
          >
            <MaterialIcons
              name={config.icon}
              size={18}
              color={focused ? brand.primaryDark : brand.soft}
            />
            <Text
              className={`mt-1 text-[11px] font-medium uppercase ${
                focused ? 'text-brand-primaryDark' : 'text-brand-soft'
              }`}
            >
              {config.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

import { Pressable, View } from 'react-native';

import { Text } from '@/components/ui/text';
import { useThemeStore, type ThemeMode } from '@/stores/themeStore';

const MODES: ThemeMode[] = ['light', 'dark', 'system'];
const LABELS: Record<ThemeMode, string> = { light: 'Light', dark: 'Dark', system: 'System' };

/** Segmented control for the persisted theme preference. */
export function ThemeToggle() {
  const mode = useThemeStore((s) => s.mode);
  const setMode = useThemeStore((s) => s.setMode);

  return (
    <View className="w-full flex-row gap-2">
      {MODES.map((m) => {
        const selected = mode === m;
        return (
          <Pressable
            key={m}
            onPress={() => setMode(m)}
            testID={`theme-${m}`}
            accessibilityRole="button"
            accessibilityState={{ selected }}
            className={`flex-1 items-center rounded-xl border py-2.5 ${
              selected ? 'border-brand-primary bg-brand-primarySoft' : 'border-brand-border bg-brand-surface'
            }`}
          >
            <Text
              className={`text-[13px] ${selected ? 'font-semibold text-brand-primaryDark' : 'text-brand-muted'}`}
            >
              {LABELS[m]}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

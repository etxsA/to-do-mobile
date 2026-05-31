import { Pressable, View } from 'react-native';

const PALETTE = [
  '#005BBF',
  '#1D4ED8',
  '#006D2C',
  '#0F766E',
  '#BA1A1A',
  '#DB2777',
  '#7C3AED',
  '#C2410C',
  '#CA8A04',
  '#0891B2',
] as const;

/** Preset swatch picker for a list color (matches the Figma create-list modal). */
export function ColorPicker({
  value,
  onChange,
}: {
  value?: string;
  onChange: (color: string) => void;
}) {
  return (
    <View className="flex-row flex-wrap gap-3">
      {PALETTE.map((color) => {
        const selected = value?.toLowerCase() === color.toLowerCase();
        return (
          <Pressable
            key={color}
            onPress={() => onChange(color)}
            testID={`color-${color}`}
            accessibilityRole="button"
            accessibilityLabel={`Color ${color}`}
            accessibilityState={{ selected }}
            style={{ backgroundColor: color }}
            className={`h-9 w-9 rounded-full ${selected ? 'border-[3px] border-brand-ink' : ''}`}
          />
        );
      })}
    </View>
  );
}

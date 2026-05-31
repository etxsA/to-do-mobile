import { Pressable, View } from 'react-native';

import { ListIcon } from '@/components/common/ListIcon';
import { Spinner } from '@/components/ui/spinner';
import { Text } from '@/components/ui/text';
import { brand } from '@/constants/tokens';
import { useIcons } from '@/hooks/useIcons';

/** Grid picker for the seeded icon catalog. */
export function IconPicker({
  value,
  onChange,
}: {
  value?: number;
  onChange: (iconId: number) => void;
}) {
  const { data, isPending, isError } = useIcons();

  if (isPending) return <Spinner />;
  if (isError || !data) return <Text className="text-brand-soft">Couldn&apos;t load icons.</Text>;

  return (
    <View className="flex-row flex-wrap gap-3">
      {data.map((icon) => {
        const selected = value === icon.id;
        return (
          <Pressable
            key={icon.id}
            onPress={() => onChange(icon.id)}
            testID={`icon-${icon.id}`}
            accessibilityRole="button"
            accessibilityLabel={icon.name}
            accessibilityState={{ selected }}
            className={`h-12 w-12 items-center justify-center rounded-xl border ${
              selected ? 'border-brand-primary bg-brand-primarySoft' : 'border-brand-border bg-brand-surface'
            }`}
          >
            <ListIcon icon={icon} color={selected ? brand.primaryDark : brand.muted} size={22} />
          </Pressable>
        );
      })}
    </View>
  );
}

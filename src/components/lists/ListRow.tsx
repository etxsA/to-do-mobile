import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Pressable, View } from 'react-native';

import { ListIcon } from '@/components/common/ListIcon';
import { Text } from '@/components/ui/text';
import { brand } from '@/constants/tokens';
import type { TaskList } from '@/types/api';

/** Compact list row (used in search results). */
export function ListRow({ list, onPress }: { list: TaskList; onPress: () => void }) {
  const color = list.color || brand.primary;
  return (
    <Pressable
      onPress={onPress}
      testID={`row-list-${list.id}`}
      accessibilityRole="button"
      accessibilityLabel={`Open list ${list.name}`}
      className="flex-row items-center rounded-xl border border-brand-border bg-brand-surface p-4"
    >
      <View style={{ backgroundColor: color }} className="mr-3 h-9 w-9 items-center justify-center rounded-lg">
        <ListIcon icon={list.icon} color="#FFFFFF" size={18} />
      </View>
      <View className="flex-1 pr-2">
        <Text numberOfLines={1} className="font-semibold text-brand-ink">
          {list.name}
        </Text>
        {list.description ? (
          <Text numberOfLines={1} className="text-[12px] text-brand-soft">
            {list.description}
          </Text>
        ) : null}
      </View>
      <MaterialIcons name="chevron-right" size={22} color={brand.soft} />
    </Pressable>
  );
}

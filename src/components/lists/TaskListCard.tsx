import { Pressable, View } from 'react-native';

import { ListIcon } from '@/components/common/ListIcon';
import { ProgressBar } from '@/components/common/ProgressBar';
import { Text } from '@/components/ui/text';
import { brand } from '@/constants/tokens';
import type { TaskListWithOldestPending } from '@/types/api';

/** Home list card: colored left border, title, next-task preview, progress. */
export function TaskListCard({
  list,
  onPress,
}: {
  list: TaskListWithOldestPending;
  onPress: () => void;
}) {
  const color = list.color || brand.primary;
  const pct = Math.round(list.progress);

  return (
    <Pressable
      onPress={onPress}
      testID={`card-list-${list.id}`}
      accessibilityRole="button"
      accessibilityLabel={`Open list ${list.name}`}
      className="rounded-xl border border-brand-border bg-brand-surface p-4"
      style={{ borderLeftWidth: 4, borderLeftColor: color }}
    >
      <View className="flex-row items-start justify-between">
        <View className="flex-1 pr-3">
          <Text className="text-[18px] font-bold text-brand-ink">{list.name}</Text>
          {list.description ? (
            <Text numberOfLines={1} className="mt-0.5 text-[13px] text-brand-soft">
              {list.description}
            </Text>
          ) : null}
        </View>
        <ListIcon icon={list.icon} color={color} />
      </View>

      <View className="mt-3 flex-row items-center justify-between">
        <Text numberOfLines={1} className="flex-1 pr-3 text-[13px] text-brand-muted">
          {list.oldestPendingTask ? `Next: ${list.oldestPendingTask.title}` : 'All caught up 🎉'}
        </Text>
        <Text className="text-[14px] font-bold" style={{ color }}>
          {pct}%
        </Text>
      </View>

      <View className="mt-2">
        <ProgressBar progress={list.progress} color={color} />
      </View>
    </Pressable>
  );
}

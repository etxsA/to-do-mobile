import { View } from 'react-native';

import { Text } from '@/components/ui/text';
import { brand } from '@/constants/tokens';
import type { Task } from '@/types/api';
import { formatDueTime, isOverdue } from '@/utils/format';

/** Compact "due today" row: colored dot + title + due time (red if overdue). */
export function DueTodayItem({ task }: { task: Task }) {
  const color = task.taskListColor || brand.primary;
  const overdue = isOverdue(task.dueDate);

  return (
    <View
      testID={`due-today-${task.id}`}
      className="flex-row items-center justify-between rounded-xl border border-brand-border bg-brand-surface p-4"
    >
      <View className="flex-1 flex-row items-center gap-3 pr-3">
        <View style={{ backgroundColor: color }} className="h-2 w-2 rounded-full" />
        <Text numberOfLines={1} className="flex-1 font-semibold text-brand-ink">
          {task.title}
        </Text>
      </View>
      {task.dueDate ? (
        <Text
          className="text-[12px] font-bold"
          style={{ color: overdue ? brand.danger : brand.muted }}
        >
          {formatDueTime(task.dueDate)}
        </Text>
      ) : null}
    </View>
  );
}

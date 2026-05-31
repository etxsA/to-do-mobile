import { Pressable, View } from 'react-native';

import { Text } from '@/components/ui/text';
import type { Task } from '@/types/api';
import { formatDueDateTime, PRIORITY_META } from '@/utils/format';

/** Basic task row (title, due, priority badge). Phase 5 adds toggle + swipe. */
export function TaskRow({ task, onPress }: { task: Task; onPress?: () => void }) {
  const priority = PRIORITY_META[task.priority];

  return (
    <Pressable
      onPress={onPress}
      disabled={!onPress}
      testID={`row-task-${task.id}`}
      className="flex-row items-center justify-between rounded-xl border border-brand-border bg-brand-surface p-4"
    >
      <View className="flex-1 pr-3">
        <Text
          numberOfLines={1}
          className={`font-semibold ${task.completed ? 'text-brand-soft line-through' : 'text-brand-ink'}`}
        >
          {task.title}
        </Text>
        {task.dueDate ? (
          <Text className="mt-0.5 text-[12px] text-brand-soft">{formatDueDateTime(task.dueDate)}</Text>
        ) : null}
      </View>
      <View style={{ backgroundColor: priority.bg }} className="rounded-full px-2.5 py-1">
        <Text style={{ color: priority.color }} className="text-[11px] font-bold uppercase">
          {priority.label}
        </Text>
      </View>
    </Pressable>
  );
}

import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import * as Haptics from 'expo-haptics';
import { Pressable, View } from 'react-native';

import { Text } from '@/components/ui/text';
import type { Task } from '@/types/api';
import { formatDueDateTime, PRIORITY_META } from '@/utils/format';

/**
 * Task row with an optional completion checkbox (haptic + line-through) and an
 * optional tap target (edit). Wrapped by SwipeableTaskRow for swipe-to-delete.
 */
export function TaskRow({
  task,
  onToggle,
  onPress,
}: {
  task: Task;
  onToggle?: (completed: boolean) => void;
  onPress?: () => void;
}) {
  const priority = PRIORITY_META[task.priority];

  const toggle = () => {
    if (!onToggle) return;
    void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onToggle(!task.completed);
  };

  return (
    <Pressable
      onPress={onPress}
      disabled={!onPress}
      testID={`row-task-${task.id}`}
      className="flex-row items-center rounded-xl border border-brand-border bg-brand-surface p-4"
    >
      {onToggle ? (
        <Pressable
          onPress={toggle}
          hitSlop={8}
          testID={`toggle-task-${task.id}`}
          accessibilityRole="checkbox"
          accessibilityState={{ checked: task.completed }}
          className="mr-3"
        >
          <View
            className={`h-6 w-6 items-center justify-center rounded-full border-2 ${
              task.completed ? 'border-brand-success bg-brand-success' : 'border-brand-border'
            }`}
          >
            {task.completed ? <MaterialIcons name="check" size={16} color="#FFFFFF" /> : null}
          </View>
        </Pressable>
      ) : null}

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

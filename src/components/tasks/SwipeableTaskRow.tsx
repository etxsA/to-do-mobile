import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Pressable } from 'react-native';
import ReanimatedSwipeable from 'react-native-gesture-handler/ReanimatedSwipeable';

import { TaskRow } from '@/components/tasks/TaskRow';
import type { Task } from '@/types/api';

function RightActions({ onDelete }: { onDelete: () => void }) {
  return (
    <Pressable
      onPress={onDelete}
      testID="swipe-delete"
      accessibilityRole="button"
      accessibilityLabel="Delete task"
      className="ml-2 w-20 items-center justify-center rounded-xl bg-brand-danger"
    >
      <MaterialIcons name="delete" size={22} color="#FFFFFF" />
    </Pressable>
  );
}

/** TaskRow with swipe-left-to-delete (plus the row's own toggle + tap-to-edit). */
export function SwipeableTaskRow({
  task,
  onToggle,
  onPress,
  onDelete,
}: {
  task: Task;
  onToggle?: (completed: boolean) => void;
  onPress?: () => void;
  onDelete: () => void;
}) {
  return (
    <ReanimatedSwipeable
      friction={2}
      rightThreshold={40}
      renderRightActions={() => <RightActions onDelete={onDelete} />}
    >
      <TaskRow task={task} onToggle={onToggle} onPress={onPress} />
    </ReanimatedSwipeable>
  );
}

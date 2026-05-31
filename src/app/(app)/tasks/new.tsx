import { useLocalSearchParams, useRouter } from 'expo-router';

import { ModalHeader } from '@/components/layout/ModalHeader';
import { Screen } from '@/components/layout/Screen';
import { TaskForm } from '@/components/tasks/TaskForm';
import { useCreateTask } from '@/hooks/useTaskMutations';
import type { Priority } from '@/types/api';
import type { TaskValues } from '@/utils/validation';

export default function NewTaskScreen() {
  const { listId } = useLocalSearchParams<{ listId?: string }>();
  const router = useRouter();
  const create = useCreateTask();

  const preselected = listId ? [Number(listId)] : [];

  const onSubmit = async (values: TaskValues) => {
    try {
      await create.mutateAsync({
        title: values.title,
        description: values.description || undefined,
        priority: values.priority as Priority,
        dueDate: values.dueDate,
        isCompleted: values.isCompleted,
        taskListIds: values.taskListIds,
      });
      router.back();
    } catch {
      // surfaced in the form
    }
  };

  return (
    <Screen scroll testID="screen-new-task">
      <ModalHeader title="New Task" onClose={() => router.back()} />
      <TaskForm
        submitLabel="Create task"
        submitting={create.isPending}
        error={create.error}
        initial={{ taskListIds: preselected }}
        onSubmit={onSubmit}
      />
    </Screen>
  );
}

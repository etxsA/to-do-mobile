import { useLocalSearchParams, useRouter } from 'expo-router';

import { ErrorState } from '@/components/feedback/ErrorState';
import { LoadingState } from '@/components/feedback/LoadingState';
import { ModalHeader } from '@/components/layout/ModalHeader';
import { Screen } from '@/components/layout/Screen';
import { TaskForm } from '@/components/tasks/TaskForm';
import { useTask } from '@/hooks/useTasks';
import { useUpdateTask } from '@/hooks/useTaskMutations';
import type { Priority } from '@/types/api';
import type { TaskValues } from '@/utils/validation';

export default function EditTaskScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const taskId = Number(id);
  const router = useRouter();

  const taskQ = useTask(taskId);
  const update = useUpdateTask(taskId);

  // PATCH /task/{id} is a FULL REPLACE — always send every field.
  const onSubmit = async (values: TaskValues) => {
    try {
      await update.mutateAsync({
        title: values.title,
        description: values.description || undefined,
        priority: values.priority as Priority,
        dueDate: values.dueDate,
        isCompleted: values.isCompleted ?? false,
        taskListIds: values.taskListIds,
      });
      router.back();
    } catch {
      // surfaced in the form
    }
  };

  return (
    <Screen scroll testID="screen-edit-task">
      <ModalHeader title="Edit Task" onClose={() => router.back()} />
      {taskQ.isPending ? (
        <LoadingState />
      ) : taskQ.isError ? (
        <ErrorState error={taskQ.error} onRetry={() => taskQ.refetch()} />
      ) : (
        <TaskForm
          submitLabel="Save changes"
          submitting={update.isPending}
          error={update.error}
          initial={{
            title: taskQ.data.title,
            description: taskQ.data.description ?? '',
            priority: taskQ.data.priority,
            dueDate: taskQ.data.dueDate,
            isCompleted: taskQ.data.completed,
            taskListIds: taskQ.data.taskListIds,
          }}
          onSubmit={onSubmit}
        />
      )}
    </Screen>
  );
}

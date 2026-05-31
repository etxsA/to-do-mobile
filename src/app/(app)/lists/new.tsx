import { useRouter } from 'expo-router';

import { ModalHeader } from '@/components/layout/ModalHeader';
import { Screen } from '@/components/layout/Screen';
import { ListForm } from '@/components/lists/ListForm';
import { useCreateTaskList } from '@/hooks/useTaskListMutations';
import type { TaskListValues } from '@/utils/validation';

export default function NewListScreen() {
  const router = useRouter();
  const create = useCreateTaskList();

  const onSubmit = async (values: TaskListValues) => {
    try {
      await create.mutateAsync(values);
      router.back();
    } catch {
      // error surfaced inside the form via `error`
    }
  };

  return (
    <Screen scroll testID="screen-new-list">
      <ModalHeader title="New List" onClose={() => router.back()} />
      <ListForm
        submitLabel="Create list"
        submitting={create.isPending}
        error={create.error}
        onSubmit={onSubmit}
      />
    </Screen>
  );
}

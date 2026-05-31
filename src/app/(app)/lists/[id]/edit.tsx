import { useLocalSearchParams, useRouter } from 'expo-router';

import { ErrorState } from '@/components/feedback/ErrorState';
import { LoadingState } from '@/components/feedback/LoadingState';
import { ModalHeader } from '@/components/layout/ModalHeader';
import { Screen } from '@/components/layout/Screen';
import { ListForm } from '@/components/lists/ListForm';
import { useTaskList } from '@/hooks/useTaskLists';
import { useUpdateTaskList } from '@/hooks/useTaskListMutations';
import type { TaskListValues } from '@/utils/validation';

export default function EditListScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const listId = Number(id);
  const router = useRouter();

  const listQ = useTaskList(listId);
  const update = useUpdateTaskList(listId);

  const onSubmit = async (values: TaskListValues) => {
    try {
      await update.mutateAsync(values);
      router.back();
    } catch {
      // surfaced in the form
    }
  };

  return (
    <Screen scroll testID="screen-edit-list">
      <ModalHeader title="Edit List" onClose={() => router.back()} />
      {listQ.isPending ? (
        <LoadingState />
      ) : listQ.isError ? (
        <ErrorState error={listQ.error} onRetry={() => listQ.refetch()} />
      ) : (
        <ListForm
          submitLabel="Save changes"
          submitting={update.isPending}
          error={update.error}
          initial={{
            name: listQ.data.name,
            description: listQ.data.description,
            color: listQ.data.color,
            iconId: listQ.data.icon?.id,
          }}
          onSubmit={onSubmit}
        />
      )}
    </Screen>
  );
}

import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { FlatList, Pressable, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AddFab } from '@/components/common/AddFab';
import { ConfirmDialog } from '@/components/common/ConfirmDialog';
import { ListIcon } from '@/components/common/ListIcon';
import { EmptyState } from '@/components/feedback/EmptyState';
import { ErrorState } from '@/components/feedback/ErrorState';
import { LoadingState } from '@/components/feedback/LoadingState';
import { SwipeableTaskRow } from '@/components/tasks/SwipeableTaskRow';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { brand } from '@/constants/tokens';
import { useTaskList } from '@/hooks/useTaskLists';
import { useDeleteTaskList } from '@/hooks/useTaskListMutations';
import { useDeleteTask, useToggleTaskCompleted } from '@/hooks/useTaskMutations';
import { useTasksByList } from '@/hooks/useTasks';

export default function ListDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const listId = Number(id);
  const router = useRouter();

  const listQ = useTaskList(listId);
  const tasksQ = useTasksByList(listId);
  const delList = useDeleteTaskList();
  const toggle = useToggleTaskCompleted(listId);
  const delTask = useDeleteTask();
  const [confirm, setConfirm] = useState(false);

  const color = listQ.data?.color || brand.primary;

  const onDeleteList = async () => {
    try {
      await delList.mutateAsync(listId);
      setConfirm(false);
      router.back();
    } catch {
      setConfirm(false);
    }
  };

  return (
    <SafeAreaView edges={['top']} style={{ flex: 1 }} className="bg-brand-bg">
      <View className="flex-row items-center justify-between px-5 py-3">
        <Pressable onPress={() => router.back()} hitSlop={10} testID="btn-back" accessibilityLabel="Back">
          <MaterialIcons name="arrow-back" size={24} color={brand.ink} />
        </Pressable>
        {listQ.data ? (
          <View className="flex-row items-center gap-5">
            <Pressable
              onPress={() => router.push({ pathname: '/lists/[id]/edit', params: { id: String(listId) } })}
              hitSlop={10}
              testID="btn-edit-list"
              accessibilityLabel="Edit list"
            >
              <MaterialIcons name="edit" size={22} color={brand.muted} />
            </Pressable>
            <Pressable onPress={() => setConfirm(true)} hitSlop={10} testID="btn-delete-list" accessibilityLabel="Delete list">
              <MaterialIcons name="delete-outline" size={22} color={brand.danger} />
            </Pressable>
          </View>
        ) : null}
      </View>

      {listQ.isPending ? (
        <LoadingState />
      ) : listQ.isError ? (
        <ErrorState error={listQ.error} onRetry={() => listQ.refetch()} />
      ) : (
        <FlatList
          data={tasksQ.data ?? []}
          keyExtractor={(t) => String(t.id)}
          renderItem={({ item }) => (
            <SwipeableTaskRow
              task={item}
              onToggle={(completed) => toggle.mutate({ id: item.id, completed })}
              onPress={() => router.push({ pathname: '/tasks/[id]/edit', params: { id: String(item.id) } })}
              onDelete={() => delTask.mutate(item.id)}
            />
          )}
          contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 140, gap: 12 }}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <VStack space="md" className="pb-3">
              <View className="flex-row items-center gap-3">
                <View style={{ backgroundColor: color }} className="h-11 w-11 items-center justify-center rounded-xl">
                  <ListIcon icon={listQ.data.icon} color="#FFFFFF" size={20} />
                </View>
                <Heading size="2xl" className="flex-1 text-brand-ink">
                  {listQ.data.name}
                </Heading>
              </View>
              {listQ.data.description ? (
                <Text className="text-brand-muted">{listQ.data.description}</Text>
              ) : null}
              <Text className="mt-2 text-[11px] font-bold uppercase tracking-[2px] text-brand-muted">
                Tasks
              </Text>
              {tasksQ.isPending ? <LoadingState /> : null}
              {tasksQ.isError ? <ErrorState error={tasksQ.error} onRetry={() => tasksQ.refetch()} /> : null}
            </VStack>
          }
          ListEmptyComponent={
            !tasksQ.isPending && !tasksQ.isError ? (
              <EmptyState
                title="No tasks yet"
                subtitle="Add your first task to this list."
                actionLabel="Add task"
                onAction={() => router.push({ pathname: '/tasks/new', params: { listId: String(listId) } })}
              />
            ) : null
          }
        />
      )}

      {listQ.data ? (
        <AddFab
          onPress={() => router.push({ pathname: '/tasks/new', params: { listId: String(listId) } })}
          label="New task"
        />
      ) : null}

      <ConfirmDialog
        isOpen={confirm}
        title="Delete list?"
        message={`"${listQ.data?.name ?? 'This list'}" will be permanently deleted, along with any tasks not in another list.`}
        loading={delList.isPending}
        onConfirm={onDeleteList}
        onClose={() => setConfirm(false)}
      />
    </SafeAreaView>
  );
}

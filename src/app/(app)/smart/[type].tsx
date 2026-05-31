import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { FlatList, Pressable, RefreshControl, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { EmptyState } from '@/components/feedback/EmptyState';
import { ErrorState } from '@/components/feedback/ErrorState';
import { LoadingState } from '@/components/feedback/LoadingState';
import { SwipeableTaskRow } from '@/components/tasks/SwipeableTaskRow';
import { Heading } from '@/components/ui/heading';
import { brand } from '@/constants/tokens';
import { useAllTasks } from '@/hooks/useAllTasks';
import { useDeleteTask, useToggleTaskGlobal } from '@/hooks/useTaskMutations';
import { filterSmart, SMART_LISTS, type SmartListType } from '@/utils/smartLists';

export default function SmartListScreen() {
  const { type } = useLocalSearchParams<{ type: SmartListType }>();
  const router = useRouter();
  const def = SMART_LISTS[type] ?? SMART_LISTS.all;

  const { tasks, isPending, isError, error, isRefetching, refetch } = useAllTasks();
  const toggle = useToggleTaskGlobal();
  const delTask = useDeleteTask();

  const filtered = filterSmart(tasks, def.type);

  return (
    <SafeAreaView edges={['top']} style={{ flex: 1 }} className="bg-brand-bg">
      <View className="flex-row items-center gap-3 px-5 py-3">
        <Pressable onPress={() => router.back()} hitSlop={10} testID="btn-back" accessibilityLabel="Back">
          <MaterialIcons name="arrow-back" size={24} color={brand.ink} />
        </Pressable>
        <Heading size="xl" className="text-brand-ink">
          {def.title}
        </Heading>
      </View>

      {isPending ? (
        <LoadingState />
      ) : isError ? (
        <ErrorState error={error} onRetry={refetch} />
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={(t) => String(t.id)}
          renderItem={({ item }) => (
            <SwipeableTaskRow
              task={item}
              onToggle={(completed) => toggle.mutate({ id: item.id, completed })}
              onPress={() => router.push({ pathname: '/tasks/[id]/edit', params: { id: String(item.id) } })}
              onDelete={() => delTask.mutate(item.id)}
            />
          )}
          contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 120, gap: 12 }}
          showsVerticalScrollIndicator={false}
          refreshControl={<RefreshControl refreshing={isRefetching} onRefresh={refetch} />}
          ListEmptyComponent={
            <EmptyState title="Nothing here" subtitle={`No ${def.title.toLowerCase()} tasks right now.`} />
          }
        />
      )}
    </SafeAreaView>
  );
}

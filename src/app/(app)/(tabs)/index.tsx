import { useRouter } from 'expo-router';
import { FlatList, RefreshControl, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AddFab } from '@/components/common/AddFab';
import { EmptyState } from '@/components/feedback/EmptyState';
import { ErrorState } from '@/components/feedback/ErrorState';
import { LoadingState } from '@/components/feedback/LoadingState';
import { AppHeader } from '@/components/layout/AppHeader';
import { SmartCardsRow } from '@/components/lists/SmartCardsRow';
import { TaskListCard } from '@/components/lists/TaskListCard';
import { DueTodayItem } from '@/components/tasks/DueTodayItem';
import { Heading } from '@/components/ui/heading';
import { Spinner } from '@/components/ui/spinner';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { useTaskListsWithProgress } from '@/hooks/useTaskLists';
import { useToday } from '@/hooks/useTasks';

export default function DashboardScreen() {
  const router = useRouter();
  const listsQ = useTaskListsWithProgress();
  const todayQ = useToday();

  const lists = listsQ.data?.pages.flatMap((p) => p.items) ?? [];
  const today = todayQ.data ?? [];

  const header = (
    <VStack space="md" className="pt-2">
      <VStack space="xs">
        <Heading className="text-[34px] leading-[42px] text-brand-ink">Your Atelier</Heading>
        <Text className="text-[18px] text-brand-muted">Focus on what matters today.</Text>
      </VStack>

      <SmartCardsRow />

      {today.length > 0 ? (
        <VStack space="sm" className="mt-1">
          <Text className="text-[11px] font-bold uppercase tracking-[2px] text-brand-muted">
            Due Today
          </Text>
          {today.map((task) => (
            <DueTodayItem key={task.id} task={task} />
          ))}
        </VStack>
      ) : null}

      <Text className="mt-2 text-[11px] font-bold uppercase tracking-[2px] text-brand-muted">
        Your Lists
      </Text>
    </VStack>
  );

  return (
    <SafeAreaView edges={['top']} style={{ flex: 1 }} className="bg-brand-bg">
      <AppHeader />

      {listsQ.isPending ? (
        <LoadingState />
      ) : listsQ.isError ? (
        <ErrorState error={listsQ.error} onRetry={() => listsQ.refetch()} />
      ) : lists.length === 0 ? (
        <View className="flex-1 px-6">
          {header}
          <EmptyState
            title="No lists yet"
            subtitle="Create your first task list to get started."
            actionLabel="New list"
            onAction={() => router.push('/lists/new')}
          />
        </View>
      ) : (
        <FlatList
          data={lists}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <TaskListCard
              list={item}
              onPress={() => router.push({ pathname: '/lists/[id]', params: { id: String(item.id) } })}
            />
          )}
          ListHeaderComponent={<View className="pb-3">{header}</View>}
          contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 140, gap: 12 }}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={listsQ.isRefetching && !listsQ.isFetchingNextPage}
              onRefresh={() => {
                void listsQ.refetch();
                void todayQ.refetch();
              }}
            />
          }
          onEndReached={() => {
            if (listsQ.hasNextPage && !listsQ.isFetchingNextPage) void listsQ.fetchNextPage();
          }}
          onEndReachedThreshold={0.4}
          ListFooterComponent={
            listsQ.isFetchingNextPage ? <Spinner className="my-4" /> : null
          }
        />
      )}

      <AddFab onPress={() => router.push('/lists/new')} label="New list" />
    </SafeAreaView>
  );
}

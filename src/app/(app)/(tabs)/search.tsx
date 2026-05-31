import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { EmptyState } from '@/components/feedback/EmptyState';
import { ErrorState } from '@/components/feedback/ErrorState';
import { AppHeader } from '@/components/layout/AppHeader';
import { ListRow } from '@/components/lists/ListRow';
import { TaskRow } from '@/components/tasks/TaskRow';
import { SearchIcon } from '@/components/ui/icon';
import { Input, InputField, InputIcon, InputSlot } from '@/components/ui/input';
import { Spinner } from '@/components/ui/spinner';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { useDebouncedValue } from '@/hooks/useDebouncedValue';
import { useSearch } from '@/hooks/useSearch';

export default function SearchScreen() {
  const router = useRouter();
  const [q, setQ] = useState('');
  const debounced = useDebouncedValue(q, 350);
  const { data, isFetching, isError, error, refetch } = useSearch(debounced);

  const hasQuery = debounced.trim().length > 0;
  const lists = data?.taskLists ?? [];
  const tasks = data?.tasks ?? [];
  const empty = hasQuery && !isFetching && lists.length === 0 && tasks.length === 0;

  return (
    <SafeAreaView edges={['top']} style={{ flex: 1 }} className="bg-brand-bg">
      <AppHeader />
      <View className="px-6 pb-2">
        <Input>
          <InputSlot className="pl-3">
            <InputIcon as={SearchIcon} />
          </InputSlot>
          <InputField
            testID="input-search"
            placeholder="Search lists and tasks"
            value={q}
            onChangeText={setQ}
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="search"
          />
        </Input>
      </View>

      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 120 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {!hasQuery ? (
          <EmptyState
            title="Search"
            subtitle="Find your lists and tasks by name, description, or priority."
            testID="screen-search"
          />
        ) : isError ? (
          <ErrorState error={error} onRetry={() => refetch()} />
        ) : empty ? (
          <EmptyState title="No results" subtitle={`Nothing matched “${debounced}”.`} />
        ) : (
          <VStack space="lg" className="pt-1">
            {isFetching ? <Spinner className="my-2" /> : null}
            {lists.length > 0 ? (
              <VStack space="sm">
                <Text className="text-[11px] font-bold uppercase tracking-[2px] text-brand-muted">
                  Lists
                </Text>
                {lists.map((list) => (
                  <ListRow
                    key={list.id}
                    list={list}
                    onPress={() => router.push({ pathname: '/lists/[id]', params: { id: String(list.id) } })}
                  />
                ))}
              </VStack>
            ) : null}
            {tasks.length > 0 ? (
              <VStack space="sm">
                <Text className="text-[11px] font-bold uppercase tracking-[2px] text-brand-muted">
                  Tasks
                </Text>
                {tasks.map((task) => (
                  <TaskRow
                    key={task.id}
                    task={task}
                    onPress={() => router.push({ pathname: '/tasks/[id]/edit', params: { id: String(task.id) } })}
                  />
                ))}
              </VStack>
            ) : null}
          </VStack>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

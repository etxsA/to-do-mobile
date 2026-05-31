import { useQuery } from '@tanstack/react-query';
import { View } from 'react-native';

import { ProgressBar } from '@/components/common/ProgressBar';
import { Spinner } from '@/components/ui/spinner';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { brand } from '@/constants/tokens';
import { useAllTasks } from '@/hooks/useAllTasks';
import { getAllTaskLists } from '@/services/tasklist.service';
import type { Priority } from '@/types/api';
import { PRIORITY_META } from '@/utils/format';
import { taskListKeys } from '@/utils/queryKeys';

const PRIORITIES_ORDER: Priority[] = ['HIGH', 'MEDIUM', 'LOW'];

function StatTile({ label, value }: { label: string; value: string | number }) {
  return (
    <View className="flex-1 items-center rounded-xl border border-brand-border bg-brand-surface p-3">
      <Text className="text-[24px] font-bold text-brand-ink">{value}</Text>
      <Text className="text-[12px] text-brand-soft">{label}</Text>
    </View>
  );
}

/** Client-side stats: list/task counts, completion %, and a priority breakdown. */
export function ProfileStats() {
  const listsQ = useQuery({ queryKey: [...taskListKeys.all, 'brief'], queryFn: getAllTaskLists });
  const { tasks, isPending } = useAllTasks();

  if (isPending || listsQ.isPending) return <Spinner className="my-4" />;

  const total = tasks.length;
  const completed = tasks.filter((t) => t.completed).length;
  const pct = total ? Math.round((completed / total) * 100) : 0;

  const counts: Record<Priority, number> = { HIGH: 0, MEDIUM: 0, LOW: 0 };
  tasks.forEach((t) => {
    counts[t.priority] += 1;
  });

  return (
    <VStack space="sm" className="w-full">
      <Text className="text-[11px] font-bold uppercase tracking-[2px] text-brand-muted">
        Your stats
      </Text>

      <View className="flex-row gap-2">
        <StatTile label="Lists" value={listsQ.data?.length ?? 0} />
        <StatTile label="Tasks" value={total} />
        <StatTile label="Done" value={`${pct}%`} />
      </View>

      <View className="rounded-xl border border-brand-border bg-brand-surface p-4">
        <Text className="mb-2 text-[13px] text-brand-muted">Completion</Text>
        <ProgressBar progress={pct} color={brand.success} />
        <Text className="mt-2 text-[12px] text-brand-soft">
          {completed} of {total} tasks completed
        </Text>

        <VStack space="xs" className="mt-3">
          {PRIORITIES_ORDER.map((p) => {
            const meta = PRIORITY_META[p];
            const count = counts[p];
            const width = total ? Math.round((count / total) * 100) : 0;
            return (
              <View key={p}>
                <View className="flex-row justify-between">
                  <Text className="text-[12px]" style={{ color: meta.color }}>
                    {meta.label}
                  </Text>
                  <Text className="text-[12px] text-brand-soft">{count}</Text>
                </View>
                <ProgressBar progress={width} color={meta.color} />
              </View>
            );
          })}
        </VStack>
      </View>
    </VStack>
  );
}

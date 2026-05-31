import { Pressable, View } from 'react-native';

import { Spinner } from '@/components/ui/spinner';
import { Text } from '@/components/ui/text';
import { useTaskListsWithProgress } from '@/hooks/useTaskLists';

/** Chip multi-select of the user's lists (which lists a task belongs to). */
export function TaskListMultiSelect({
  value,
  onChange,
}: {
  value: number[];
  onChange: (ids: number[]) => void;
}) {
  const query = useTaskListsWithProgress();
  const lists = query.data?.pages.flatMap((p) => p.items) ?? [];

  if (query.isPending) return <Spinner />;
  if (lists.length === 0) {
    return <Text className="text-brand-soft">Create a list first to add tasks to it.</Text>;
  }

  const toggle = (id: number) =>
    onChange(value.includes(id) ? value.filter((x) => x !== id) : [...value, id]);

  return (
    <View className="flex-row flex-wrap gap-2">
      {lists.map((list) => {
        const selected = value.includes(list.id);
        return (
          <Pressable
            key={list.id}
            onPress={() => toggle(list.id)}
            testID={`listchip-${list.id}`}
            accessibilityRole="button"
            accessibilityState={{ selected }}
            className={`flex-row items-center gap-2 rounded-full border px-3 py-2 ${
              selected ? 'border-brand-primary bg-brand-primarySoft' : 'border-brand-border bg-brand-surface'
            }`}
          >
            <View style={{ backgroundColor: list.color }} className="h-2.5 w-2.5 rounded-full" />
            <Text
              className={`text-[13px] ${selected ? 'font-semibold text-brand-primaryDark' : 'text-brand-muted'}`}
            >
              {list.name}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

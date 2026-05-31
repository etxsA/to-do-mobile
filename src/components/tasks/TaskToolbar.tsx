import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Pressable, View } from 'react-native';

import { Text } from '@/components/ui/text';
import { useThemeColors } from '@/hooks/useThemeColors';
import {
  SORT_LABELS,
  STATUS_LABELS,
  type TaskSort,
  type TaskStatusFilter,
} from '@/utils/taskSort';

const SORTS: TaskSort[] = ['due', 'priority', 'title'];
const STATUSES: TaskStatusFilter[] = ['all', 'pending', 'completed'];

/** Status filter chips + a tap-to-cycle sort button. */
export function TaskToolbar({
  sort,
  status,
  onSortChange,
  onStatusChange,
}: {
  sort: TaskSort;
  status: TaskStatusFilter;
  onSortChange: (s: TaskSort) => void;
  onStatusChange: (s: TaskStatusFilter) => void;
}) {
  const colors = useThemeColors();
  const cycleSort = () => onSortChange(SORTS[(SORTS.indexOf(sort) + 1) % SORTS.length]);

  return (
    <View className="flex-row items-center justify-between">
      <View className="flex-row gap-2">
        {STATUSES.map((s) => {
          const active = status === s;
          return (
            <Pressable
              key={s}
              onPress={() => onStatusChange(s)}
              testID={`filter-${s}`}
              accessibilityRole="button"
              accessibilityState={{ selected: active }}
              className={`rounded-full border px-3 py-1.5 ${
                active ? 'border-brand-primary bg-brand-primarySoft' : 'border-brand-border bg-brand-surface'
              }`}
            >
              <Text
                className={`text-[12px] ${active ? 'font-semibold text-brand-primaryDark' : 'text-brand-muted'}`}
              >
                {STATUS_LABELS[s]}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <Pressable
        onPress={cycleSort}
        testID="btn-sort"
        accessibilityRole="button"
        accessibilityLabel={`Sort by ${SORT_LABELS[sort]}`}
        className="flex-row items-center gap-1 rounded-full border border-brand-border bg-brand-surface px-3 py-1.5"
      >
        <MaterialIcons name="sort" size={16} color={colors.muted} />
        <Text className="text-[12px] text-brand-muted">{SORT_LABELS[sort]}</Text>
      </Pressable>
    </View>
  );
}

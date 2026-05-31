import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from 'expo-router';
import { Pressable, ScrollView } from 'react-native';

import { Text } from '@/components/ui/text';
import { useAllTasks } from '@/hooks/useAllTasks';
import { filterSmart, SMART_LIST_ORDER, SMART_LISTS } from '@/utils/smartLists';

/** Horizontal row of smart-list cards with live counts (Today/Overdue/High/All). */
export function SmartCardsRow() {
  const router = useRouter();
  const { tasks } = useAllTasks();

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ gap: 12, paddingRight: 8 }}
    >
      {SMART_LIST_ORDER.map((type) => {
        const def = SMART_LISTS[type];
        const count = filterSmart(tasks, type).length;
        return (
          <Pressable
            key={type}
            onPress={() => router.push({ pathname: '/smart/[type]', params: { type } })}
            testID={`smart-${type}`}
            accessibilityRole="button"
            accessibilityLabel={`${def.title}, ${count} tasks`}
            className="w-32 rounded-xl border border-brand-border bg-brand-surface p-3"
            style={{ borderLeftWidth: 4, borderLeftColor: def.color }}
          >
            <MaterialIcons
              name={def.icon as keyof typeof MaterialIcons.glyphMap}
              size={20}
              color={def.color}
            />
            <Text className="mt-2 text-[22px] font-bold text-brand-ink">{count}</Text>
            <Text className="text-[12px] text-brand-soft">{def.title}</Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

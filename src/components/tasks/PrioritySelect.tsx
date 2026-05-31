import { Pressable, View } from 'react-native';

import { Text } from '@/components/ui/text';
import { brand } from '@/constants/tokens';
import { PRIORITIES, type Priority } from '@/types/api';
import { PRIORITY_META } from '@/utils/format';

/** Segmented control for task priority (HIGH / MEDIUM / LOW). */
export function PrioritySelect({
  value,
  onChange,
}: {
  value?: Priority;
  onChange: (priority: Priority) => void;
}) {
  return (
    <View className="flex-row gap-2">
      {PRIORITIES.map((priority) => {
        const meta = PRIORITY_META[priority];
        const selected = value === priority;
        return (
          <Pressable
            key={priority}
            onPress={() => onChange(priority)}
            testID={`priority-${priority}`}
            accessibilityRole="button"
            accessibilityState={{ selected }}
            className={`flex-1 items-center rounded-xl border py-2.5 ${
              selected ? 'border-transparent' : 'border-brand-border bg-brand-surface'
            }`}
            style={selected ? { backgroundColor: meta.bg } : undefined}
          >
            <Text
              className="text-[13px] font-bold uppercase"
              style={{ color: selected ? meta.color : brand.soft }}
            >
              {meta.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

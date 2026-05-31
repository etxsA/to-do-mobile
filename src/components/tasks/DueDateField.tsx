import DateTimePicker, {
  type DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import { useState } from 'react';
import { Platform, Pressable, View } from 'react-native';

import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { formatDueDateTime, toLocalIso } from '@/utils/format';

/** Optional due date+time picker. Emits the backend's tz-less ISO, or undefined. */
export function DueDateField({
  value,
  onChange,
}: {
  value?: string;
  onChange: (iso?: string) => void;
}) {
  const [show, setShow] = useState(false);
  const current = value ? new Date(value) : new Date();

  const onPicked = (_event: DateTimePickerEvent, date?: Date) => {
    if (Platform.OS !== 'ios') setShow(false);
    if (date) onChange(toLocalIso(date));
  };

  return (
    <VStack space="xs">
      <View className="flex-row items-center justify-between rounded-xl border border-brand-border bg-brand-surface px-4 py-3">
        <Text className={value ? 'text-brand-ink' : 'text-brand-soft'}>
          {value ? formatDueDateTime(value) : 'No due date'}
        </Text>
        <View className="flex-row gap-4">
          {value ? (
            <Pressable onPress={() => onChange(undefined)} testID="btn-clear-due" hitSlop={8}>
              <Text className="text-[13px] text-brand-danger">Clear</Text>
            </Pressable>
          ) : null}
          <Pressable onPress={() => setShow((s) => !s)} testID="btn-pick-due" hitSlop={8}>
            <Text className="text-[13px] font-semibold text-brand-primary">
              {value ? 'Change' : 'Set date'}
            </Text>
          </Pressable>
        </View>
      </View>

      {show ? (
        <DateTimePicker
          value={current}
          mode={Platform.OS === 'ios' ? 'datetime' : 'date'}
          display={Platform.OS === 'ios' ? 'inline' : 'default'}
          onChange={onPicked}
        />
      ) : null}
    </VStack>
  );
}

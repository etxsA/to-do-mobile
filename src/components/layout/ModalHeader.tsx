import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Pressable, View } from 'react-native';

import { Heading } from '@/components/ui/heading';
import { brand } from '@/constants/tokens';

/** Header row for modal-style screens: title + close button. */
export function ModalHeader({ title, onClose }: { title: string; onClose: () => void }) {
  return (
    <View className="flex-row items-center justify-between pb-3">
      <Heading size="xl" className="text-brand-ink">
        {title}
      </Heading>
      <Pressable
        onPress={onClose}
        accessibilityRole="button"
        accessibilityLabel="Close"
        testID="btn-close"
        hitSlop={10}
      >
        <MaterialIcons name="close" size={24} color={brand.muted} />
      </Pressable>
    </View>
  );
}

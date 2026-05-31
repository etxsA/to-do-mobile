import { Fab, FabIcon } from '@/components/ui/fab';
import { AddIcon } from '@/components/ui/icon';

/** Floating action button (brand blue), lifted clear of the bottom tab bar. */
export function AddFab({
  onPress,
  label,
  testID,
}: {
  onPress: () => void;
  label?: string;
  testID?: string;
}) {
  return (
    <Fab
      size="lg"
      placement="bottom right"
      onPress={onPress}
      testID={testID ?? 'btn-fab-add'}
      accessibilityLabel={label ?? 'Add'}
      className="bottom-28 right-5 bg-primary-500"
    >
      <FabIcon as={AddIcon} />
    </Fab>
  );
}

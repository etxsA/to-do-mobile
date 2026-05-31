import { Button, ButtonSpinner, ButtonText } from '@/components/ui/button';

export interface SubmitButtonProps {
  label: string;
  onPress: () => void;
  isLoading?: boolean;
  isDisabled?: boolean;
  variant?: React.ComponentProps<typeof Button>['variant'];
  action?: React.ComponentProps<typeof Button>['action'];
  testID?: string;
}

/**
 * Primary action button with a built-in loading state. Disables itself while
 * loading so a slow request can't be double-submitted.
 */
export function SubmitButton({
  label,
  onPress,
  isLoading = false,
  isDisabled = false,
  variant = 'solid',
  action = 'primary',
  testID,
}: SubmitButtonProps) {
  return (
    <Button
      testID={testID}
      variant={variant}
      action={action}
      onPress={onPress}
      isDisabled={isDisabled || isLoading}
      className="w-full"
    >
      {isLoading && <ButtonSpinner className="mr-2" />}
      <ButtonText>{label}</ButtonText>
    </Button>
  );
}

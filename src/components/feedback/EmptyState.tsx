import { Button, ButtonText } from '@/components/ui/button';
import { Center } from '@/components/ui/center';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';

export interface EmptyStateProps {
  title: string;
  subtitle?: string;
  actionLabel?: string;
  onAction?: () => void;
  testID?: string;
}

/** Friendly empty placeholder with an optional call-to-action. */
export function EmptyState({ title, subtitle, actionLabel, onAction, testID }: EmptyStateProps) {
  return (
    <Center className="flex-1 px-6 py-12" testID={testID ?? 'state-empty'}>
      <VStack space="md" className="items-center">
        <Heading size="md" className="text-center text-brand-ink">
          {title}
        </Heading>
        {subtitle ? <Text className="text-center text-brand-soft">{subtitle}</Text> : null}
        {actionLabel && onAction ? (
          <Button action="primary" onPress={onAction} testID="btn-empty-action">
            <ButtonText>{actionLabel}</ButtonText>
          </Button>
        ) : null}
      </VStack>
    </Center>
  );
}

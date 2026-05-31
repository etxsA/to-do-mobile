import { Button, ButtonText } from '@/components/ui/button';
import { Center } from '@/components/ui/center';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { toApiError } from '@/utils/errors';

export interface ErrorStateProps {
  error?: unknown;
  onRetry?: () => void;
  testID?: string;
}

/** Standard error view with the normalized message and an optional retry. */
export function ErrorState({ error, onRetry, testID }: ErrorStateProps) {
  const message = error ? toApiError(error).message : 'Something went wrong.';
  return (
    <Center className="flex-1 px-6 py-12" testID={testID ?? 'state-error'}>
      <VStack space="md" className="items-center">
        <Heading size="md" className="text-center text-brand-ink">
          Something went wrong
        </Heading>
        <Text className="text-center text-brand-soft">{message}</Text>
        {onRetry ? (
          <Button variant="outline" action="primary" onPress={onRetry} testID="btn-retry">
            <ButtonText>Try again</ButtonText>
          </Button>
        ) : null}
      </VStack>
    </Center>
  );
}

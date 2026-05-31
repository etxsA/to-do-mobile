import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';

/** Inline, dismissable-by-context error banner for form/submit failures. */
export function ErrorBanner({ message, testID }: { message?: string | null; testID?: string }) {
  if (!message) return null;
  return (
    <Box
      testID={testID}
      className="w-full rounded-lg border border-error-300 bg-error-50 px-4 py-3"
    >
      <Text className="text-sm text-error-700">{message}</Text>
    </Box>
  );
}

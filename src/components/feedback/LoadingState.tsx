import { Center } from '@/components/ui/center';
import { Spinner } from '@/components/ui/spinner';
import { Text } from '@/components/ui/text';

/** Full-area loading indicator used while a screen's query is pending. */
export function LoadingState({ label, testID }: { label?: string; testID?: string }) {
  return (
    <Center className="flex-1 py-12" testID={testID ?? 'state-loading'}>
      <Spinner size="large" />
      {label ? <Text className="mt-3 text-brand-soft">{label}</Text> : null}
    </Center>
  );
}

import {
  AlertDialog,
  AlertDialogBackdrop,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
} from '@/components/ui/alert-dialog';
import { Button, ButtonText } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';

export interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  destructive?: boolean;
  loading?: boolean;
  onConfirm: () => void;
  onClose: () => void;
}

/** Reusable confirm dialog (used for delete confirmations across the app). */
export function ConfirmDialog({
  isOpen,
  title,
  message,
  confirmLabel = 'Delete',
  destructive = true,
  loading,
  onConfirm,
  onClose,
}: ConfirmDialogProps) {
  return (
    <AlertDialog isOpen={isOpen} onClose={onClose}>
      <AlertDialogBackdrop />
      <AlertDialogContent>
        <AlertDialogHeader>
          <Heading size="md" className="text-brand-ink">
            {title}
          </Heading>
        </AlertDialogHeader>
        <AlertDialogBody className="mb-4 mt-2">
          <Text className="text-brand-muted">{message}</Text>
        </AlertDialogBody>
        <AlertDialogFooter className="gap-2">
          <Button variant="outline" action="secondary" onPress={onClose} testID="btn-cancel">
            <ButtonText>Cancel</ButtonText>
          </Button>
          <Button
            action={destructive ? 'negative' : 'primary'}
            onPress={onConfirm}
            isDisabled={loading}
            testID="btn-confirm"
          >
            <ButtonText>{confirmLabel}</ButtonText>
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

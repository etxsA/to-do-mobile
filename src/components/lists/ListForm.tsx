import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';

import { ErrorBanner } from '@/components/common/ErrorBanner';
import { SubmitButton } from '@/components/common/SubmitButton';
import { TextField } from '@/components/forms/TextField';
import { ColorPicker } from '@/components/lists/ColorPicker';
import { IconPicker } from '@/components/lists/IconPicker';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { toApiError } from '@/utils/errors';
import { taskListSchema, type TaskListValues } from '@/utils/validation';

export interface ListFormProps {
  initial?: Partial<TaskListValues>;
  submitLabel: string;
  submitting?: boolean;
  error?: unknown;
  onSubmit: (values: TaskListValues) => void;
}

/** Reusable create/edit form for a task list (name, description, color, icon). */
export function ListForm({ initial, submitLabel, submitting, error, onSubmit }: ListFormProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TaskListValues>({
    resolver: zodResolver(taskListSchema),
    defaultValues: {
      name: '',
      description: '',
      color: '#005BBF',
      iconId: undefined as unknown as number,
      ...initial,
    },
  });

  return (
    <VStack space="lg">
      {error ? <ErrorBanner message={toApiError(error).message} /> : null}

      <Controller
        control={control}
        name="name"
        render={({ field: { value, onChange, onBlur } }) => (
          <TextField
            label="Name"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            placeholder="e.g. Computer Science"
            autoCapitalize="sentences"
            error={errors.name?.message}
            isRequired
            testID="input-list-name"
          />
        )}
      />

      <Controller
        control={control}
        name="description"
        render={({ field: { value, onChange, onBlur } }) => (
          <TextField
            label="Description"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            placeholder="Short description"
            autoCapitalize="sentences"
            error={errors.description?.message}
            isRequired
            testID="input-list-description"
          />
        )}
      />

      <Controller
        control={control}
        name="color"
        render={({ field: { value, onChange } }) => (
          <VStack space="xs">
            <Text className="font-medium text-brand-ink">Color</Text>
            <ColorPicker value={value} onChange={onChange} />
            {errors.color?.message ? (
              <Text className="text-xs text-error-700">{errors.color.message}</Text>
            ) : null}
          </VStack>
        )}
      />

      <Controller
        control={control}
        name="iconId"
        render={({ field: { value, onChange } }) => (
          <VStack space="xs">
            <Text className="font-medium text-brand-ink">Icon</Text>
            <IconPicker value={value} onChange={onChange} />
            {errors.iconId?.message ? (
              <Text className="text-xs text-error-700">{errors.iconId.message}</Text>
            ) : null}
          </VStack>
        )}
      />

      <SubmitButton
        label={submitLabel}
        onPress={handleSubmit(onSubmit)}
        isLoading={submitting}
        testID="btn-submit-list"
      />
    </VStack>
  );
}

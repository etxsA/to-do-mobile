import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';

import { ErrorBanner } from '@/components/common/ErrorBanner';
import { SubmitButton } from '@/components/common/SubmitButton';
import { TextField } from '@/components/forms/TextField';
import { DueDateField } from '@/components/tasks/DueDateField';
import { PrioritySelect } from '@/components/tasks/PrioritySelect';
import { TaskListMultiSelect } from '@/components/tasks/TaskListMultiSelect';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import type { Priority } from '@/types/api';
import { toApiError } from '@/utils/errors';
import { taskSchema, type TaskValues } from '@/utils/validation';

export interface TaskFormProps {
  initial?: Partial<TaskValues>;
  submitLabel: string;
  submitting?: boolean;
  error?: unknown;
  onSubmit: (values: TaskValues) => void;
}

/** Reusable create/edit form for a task. On edit, the screen sends a full replace. */
export function TaskForm({ initial, submitLabel, submitting, error, onSubmit }: TaskFormProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TaskValues>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: '',
      description: '',
      priority: 'MEDIUM',
      dueDate: undefined,
      isCompleted: false,
      taskListIds: [],
      ...initial,
    },
  });

  return (
    <VStack space="lg">
      {error ? <ErrorBanner message={toApiError(error).message} /> : null}

      <Controller
        control={control}
        name="title"
        render={({ field: { value, onChange, onBlur } }) => (
          <TextField
            label="Title"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            placeholder="What needs doing?"
            autoCapitalize="sentences"
            error={errors.title?.message}
            isRequired
            testID="input-task-title"
          />
        )}
      />

      <Controller
        control={control}
        name="description"
        render={({ field: { value, onChange, onBlur } }) => (
          <TextField
            label="Description (optional)"
            value={value ?? ''}
            onChangeText={onChange}
            onBlur={onBlur}
            placeholder="Add detail"
            autoCapitalize="sentences"
            multiline
            error={errors.description?.message}
            testID="input-task-description"
          />
        )}
      />

      <Controller
        control={control}
        name="priority"
        render={({ field: { value, onChange } }) => (
          <VStack space="xs">
            <Text className="font-medium text-brand-ink">Priority</Text>
            <PrioritySelect value={value as Priority} onChange={onChange} />
          </VStack>
        )}
      />

      <Controller
        control={control}
        name="dueDate"
        render={({ field: { value, onChange } }) => (
          <VStack space="xs">
            <Text className="font-medium text-brand-ink">Due date</Text>
            <DueDateField value={value} onChange={onChange} />
          </VStack>
        )}
      />

      <Controller
        control={control}
        name="taskListIds"
        render={({ field: { value, onChange } }) => (
          <VStack space="xs">
            <Text className="font-medium text-brand-ink">Lists</Text>
            <TaskListMultiSelect value={value} onChange={onChange} />
            {errors.taskListIds?.message ? (
              <Text className="text-xs text-error-700">{errors.taskListIds.message}</Text>
            ) : null}
          </VStack>
        )}
      />

      <SubmitButton
        label={submitLabel}
        onPress={handleSubmit(onSubmit)}
        isLoading={submitting}
        testID="btn-submit-task"
      />
    </VStack>
  );
}

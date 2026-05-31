import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'expo-router';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { ErrorBanner } from '@/components/common/ErrorBanner';
import { SubmitButton } from '@/components/common/SubmitButton';
import { TextField } from '@/components/forms/TextField';
import { Screen } from '@/components/layout/Screen';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { useAuthStore } from '@/stores/authStore';
import { registerSchema, type RegisterValues } from '@/utils/validation';

export default function RegisterScreen() {
  const register = useAuthStore((s) => s.register);
  const error = useAuthStore((s) => s.error);
  const clearError = useAuthStore((s) => s.clearError);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { fullName: '', email: '', password: '', description: '', interest: '' },
  });

  useEffect(() => clearError, [clearError]);

  const onSubmit = async (values: RegisterValues) => {
    try {
      await register({
        fullName: values.fullName,
        email: values.email,
        password: values.password,
        description: values.description,
        interest: values.interest || undefined,
      });
    } catch {
      // Surfaced via the store.
    }
  };

  return (
    <Screen scroll testID="screen-register">
      <VStack space="xl" className="w-full py-6">
        <VStack space="xs">
          <Heading size="2xl" className="text-typography-900">
            Create account
          </Heading>
          <Text className="text-typography-500">Start organizing your tasks</Text>
        </VStack>

        <ErrorBanner message={error} testID="register-error" />

        <VStack space="lg" className="w-full">
          <Controller
            control={control}
            name="fullName"
            render={({ field: { value, onChange, onBlur } }) => (
              <TextField
                testID="input-fullName"
                label="Full name"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholder="Ada Lovelace"
                autoCapitalize="words"
                autoComplete="name"
                error={errors.fullName?.message}
                isRequired
              />
            )}
          />

          <Controller
            control={control}
            name="email"
            render={({ field: { value, onChange, onBlur } }) => (
              <TextField
                testID="input-email"
                label="Email"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholder="you@example.com"
                keyboardType="email-address"
                autoComplete="email"
                error={errors.email?.message}
                isRequired
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({ field: { value, onChange, onBlur } }) => (
              <TextField
                testID="input-password"
                label="Password"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholder="At least 6 characters"
                secureTextEntry
                autoComplete="password-new"
                error={errors.password?.message}
                isRequired
              />
            )}
          />

          <Controller
            control={control}
            name="description"
            render={({ field: { value, onChange, onBlur } }) => (
              <TextField
                testID="input-description"
                label="About you"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholder="A short description"
                autoCapitalize="sentences"
                error={errors.description?.message}
                isRequired
              />
            )}
          />

          <Controller
            control={control}
            name="interest"
            render={({ field: { value, onChange, onBlur } }) => (
              <TextField
                testID="input-interest"
                label="Interest (optional)"
                value={value ?? ''}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholder="e.g. Productivity"
                autoCapitalize="sentences"
                error={errors.interest?.message}
              />
            )}
          />

          <SubmitButton
            testID="btn-register"
            label="Create account"
            onPress={handleSubmit(onSubmit)}
            isLoading={isSubmitting}
          />
        </VStack>

        <Text className="text-center text-typography-500">
          Already have an account?{' '}
          <Link href="/login" className="font-semibold text-primary-600">
            Sign in
          </Link>
        </Text>
      </VStack>
    </Screen>
  );
}

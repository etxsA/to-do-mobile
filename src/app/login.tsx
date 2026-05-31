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
import { loginSchema, type LoginValues } from '@/utils/validation';

export default function LoginScreen() {
  const login = useAuthStore((s) => s.login);
  const error = useAuthStore((s) => s.error);
  const clearError = useAuthStore((s) => s.clearError);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  useEffect(() => clearError, [clearError]);

  const onSubmit = async (values: LoginValues) => {
    try {
      await login(values.email, values.password);
      // On success the root layout's auth guard navigates to the app.
    } catch {
      // Error message is surfaced via the store; nothing to do here.
    }
  };

  return (
    <Screen scroll center testID="screen-login">
      <VStack space="xl" className="w-full">
        <VStack space="xs">
          <Heading size="2xl" className="text-typography-900">
            Welcome back
          </Heading>
          <Text className="text-typography-500">Sign in to your tasks</Text>
        </VStack>

        <ErrorBanner message={error} testID="login-error" />

        <VStack space="lg" className="w-full">
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
                placeholder="••••••••"
                secureTextEntry
                autoComplete="password"
                error={errors.password?.message}
                isRequired
              />
            )}
          />

          <SubmitButton
            testID="btn-login"
            label="Sign in"
            onPress={handleSubmit(onSubmit)}
            isLoading={isSubmitting}
          />
        </VStack>

        <Text className="text-center text-typography-500">
          Don&apos;t have an account?{' '}
          <Link href="/register" className="font-semibold text-primary-600">
            Sign up
          </Link>
        </Text>
      </VStack>
    </Screen>
  );
}

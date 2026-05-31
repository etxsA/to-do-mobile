import { useState } from 'react';
import type { KeyboardTypeOptions } from 'react-native';

import {
  FormControl,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
  FormControlLabel,
  FormControlLabelText,
} from '@/components/ui/form-control';
import { AlertCircleIcon, EyeIcon, EyeOffIcon } from '@/components/ui/icon';
import { Input, InputField, InputIcon, InputSlot } from '@/components/ui/input';

export interface TextFieldProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  onBlur?: () => void;
  placeholder?: string;
  error?: string;
  isRequired?: boolean;
  secureTextEntry?: boolean;
  keyboardType?: KeyboardTypeOptions;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  autoComplete?: React.ComponentProps<typeof InputField>['autoComplete'];
  multiline?: boolean;
  testID?: string;
}

/**
 * Reusable labelled text input with inline validation error and an optional
 * password visibility toggle. Presentational only — wire it to react-hook-form
 * (or any state) via `value`/`onChangeText`/`error`.
 */
export function TextField({
  label,
  value,
  onChangeText,
  onBlur,
  placeholder,
  error,
  isRequired,
  secureTextEntry,
  keyboardType,
  autoCapitalize = 'none',
  autoComplete,
  multiline,
  testID,
}: TextFieldProps) {
  const [show, setShow] = useState(false);
  const isPassword = !!secureTextEntry;

  return (
    <FormControl isInvalid={!!error} isRequired={isRequired} className="w-full">
      <FormControlLabel>
        <FormControlLabelText>{label}</FormControlLabelText>
      </FormControlLabel>

      <Input className="w-full">
        <InputField
          testID={testID}
          value={value}
          onChangeText={onChangeText}
          onBlur={onBlur}
          placeholder={placeholder}
          secureTextEntry={isPassword && !show}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          autoComplete={autoComplete}
          multiline={multiline}
        />
        {isPassword && (
          <InputSlot className="pr-3" onPress={() => setShow((s) => !s)}>
            <InputIcon as={show ? EyeIcon : EyeOffIcon} />
          </InputSlot>
        )}
      </Input>

      {error ? (
        <FormControlError>
          <FormControlErrorIcon as={AlertCircleIcon} />
          <FormControlErrorText testID={testID ? `${testID}-error` : undefined}>
            {error}
          </FormControlErrorText>
        </FormControlError>
      ) : null}
    </FormControl>
  );
}

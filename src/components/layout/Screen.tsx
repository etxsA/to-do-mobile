import { KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Box } from '@/components/ui/box';

export interface ScreenProps {
  children: React.ReactNode;
  /** Wrap content in a ScrollView (good for forms). Default false. */
  scroll?: boolean;
  /** Add horizontal/vertical padding. Default true. */
  padded?: boolean;
  /** Center children vertically (e.g. auth screens). Default false. */
  center?: boolean;
  testID?: string;
}

/**
 * Standard screen container: safe-area aware, keyboard-avoiding, themed
 * background. Reused by every screen so layout/padding stays consistent.
 */
export function Screen({ children, scroll, padded = true, center, testID }: ScreenProps) {
  const inner = (
    <Box className={`flex-1 ${padded ? 'px-5 py-4' : ''} ${center ? 'justify-center' : ''}`}>
      {children}
    </Box>
  );

  return (
    <SafeAreaView style={{ flex: 1 }} className="bg-background-0" testID={testID}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        {scroll ? (
          <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            {inner}
          </ScrollView>
        ) : (
          inner
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

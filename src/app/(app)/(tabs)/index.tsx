import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AddFab } from '@/components/common/AddFab';
import { EmptyState } from '@/components/feedback/EmptyState';
import { AppHeader } from '@/components/layout/AppHeader';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';

/**
 * Dashboard / Home. Phase 4 fills this with "Due Today" + task-list cards
 * (progress rings) from the backend. Phase 3 sets up the chrome.
 */
export default function DashboardScreen() {
  return (
    <SafeAreaView edges={['top']} style={{ flex: 1 }} className="bg-brand-bg">
      <AppHeader />
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
        className="px-6"
      >
        <VStack space="xs" className="pb-4 pt-2">
          <Heading className="text-[34px] leading-[42px] text-brand-ink">Your Atelier</Heading>
          <Text className="text-[18px] text-brand-muted">Focus on what matters today.</Text>
        </VStack>
        <EmptyState
          title="Your lists are coming"
          subtitle="Task lists with progress and today's tasks will appear here next."
        />
      </ScrollView>
      <AddFab onPress={() => {}} label="New list" />
    </SafeAreaView>
  );
}

import { SafeAreaView } from 'react-native-safe-area-context';

import { EmptyState } from '@/components/feedback/EmptyState';
import { AppHeader } from '@/components/layout/AppHeader';

/** Search tab. Phase 8 wires the debounced query against GET /search. */
export default function SearchScreen() {
  return (
    <SafeAreaView edges={['top']} style={{ flex: 1 }} className="bg-brand-bg">
      <AppHeader />
      <EmptyState
        title="Search"
        subtitle="Find your lists and tasks here — coming in a later phase."
        testID="screen-search"
      />
    </SafeAreaView>
  );
}

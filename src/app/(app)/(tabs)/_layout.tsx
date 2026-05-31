import { Tabs } from 'expo-router';

import { TabBar } from '@/components/navigation/TabBar';

/**
 * Bottom-tab navigator: Dashboard + Search. Profile is part of this navigator
 * but hidden from the bar (`href: null`) — it's opened from the header avatar.
 */
export default function TabsLayout() {
  return (
    <Tabs tabBar={(props) => <TabBar {...props} />} screenOptions={{ headerShown: false }}>
      {/* The custom TabBar only renders Dashboard + Search, so profile has no
          tab button even without href:null — and keeping it navigable lets the
          header avatar push to it. */}
      <Tabs.Screen name="index" />
      <Tabs.Screen name="search" />
      <Tabs.Screen name="profile" />
    </Tabs>
  );
}

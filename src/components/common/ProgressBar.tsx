import { View } from 'react-native';

import { brand } from '@/constants/tokens';

/** Thin rounded progress bar. `progress` is 0–100; `color` is the fill. */
export function ProgressBar({
  progress,
  color = brand.primary,
}: {
  progress: number;
  color?: string;
}) {
  const pct = Math.max(0, Math.min(100, Math.round(progress)));
  return (
    <View className="h-2 w-full overflow-hidden rounded-full bg-brand-track">
      <View style={{ width: `${pct}%`, backgroundColor: color }} className="h-full rounded-full" />
    </View>
  );
}

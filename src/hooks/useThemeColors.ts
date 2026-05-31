import { useColorScheme } from 'nativewind';

/** Mode-aware chrome colors for inline (non-className) usages like icon tints. */
const LIGHT = {
  ink: '#191C23',
  muted: '#414754',
  soft: '#64748B',
  bg: '#F9F9FF',
  surface: '#FFFFFF',
  border: '#E6E8F2',
};

const DARK = {
  ink: '#F8FAFC',
  muted: '#CBD5E1',
  soft: '#94A3B8',
  bg: '#0B1220',
  surface: '#161E2E',
  border: '#25304A',
};

export function useThemeColors() {
  const { colorScheme } = useColorScheme();
  return colorScheme === 'dark' ? DARK : LIGHT;
}

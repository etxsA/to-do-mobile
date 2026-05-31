import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { SymbolView, type SymbolViewProps } from 'expo-symbols';
import { Platform } from 'react-native';

import { brand } from '@/constants/tokens';
import type { Icon } from '@/types/api';

/**
 * Renders a list's icon natively: SF Symbol (`iosName`) on iOS, Material icon
 * (`androidName`) elsewhere. Falls back to a checklist glyph.
 */
export function ListIcon({
  icon,
  color = brand.primary,
  size = 18,
}: {
  icon?: Icon;
  color?: string;
  size?: number;
}) {
  if (Platform.OS === 'ios' && icon?.iosName) {
    return (
      <SymbolView
        name={icon.iosName as SymbolViewProps['name']}
        size={size}
        tintColor={color}
        resizeMode="scaleAspectFit"
      />
    );
  }
  return (
    <MaterialIcons
      name={(icon?.androidName ?? 'checklist') as keyof typeof MaterialIcons.glyphMap}
      size={size}
      color={color}
    />
  );
}

/**
 * EduTask brand tokens (from the Figma design). Mirror of the `brand` colors in
 * tailwind.config.js, for use in plain JS (navigation theme, icon tint colors,
 * inline styles where className isn't available).
 */
export const brand = {
  bg: '#F9F9FF',
  surface: '#FFFFFF',
  border: '#E6E8F2',
  ink: '#191C23',
  muted: '#414754',
  soft: '#64748B',
  primary: '#005BBF',
  primaryStrong: '#1D4ED8',
  primaryDark: '#1E40AF',
  primarySoft: '#DBEAFE',
  track: '#ECEDF7',
  danger: '#BA1A1A',
  success: '#006D2C',
} as const;

/** Fallback palette for list cards when the backend color is missing. */
export const LIST_FALLBACK_COLORS = [
  '#005BBF',
  '#006D2C',
  '#BA1A1A',
  '#7C3AED',
  '#C2410C',
  '#0F766E',
] as const;

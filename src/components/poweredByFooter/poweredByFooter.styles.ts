import { StyleSheet } from 'react-native';
import {
  colors,
  spacing,
  fontSize,
  fontWeight,
  borderRadius,
} from '../../theme';

export const styles = StyleSheet.create({
  footer: {
    paddingVertical: spacing['2xl'] + spacing.md,
    alignItems: 'center',
    gap: spacing.md,
    opacity: 0.4,
  },
  footerLabel: {
    fontSize: fontSize['2xs'],
    fontWeight: fontWeight.medium,
    color: colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  footerBrand: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  footerBrandText: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
  },
  footerTextSingle: {
    fontSize: fontSize['2xs'],
    fontWeight: fontWeight.bold,
    color: colors.slate400,
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  footerLine: {
    width: 48,
    height: 4,
    backgroundColor: colors.primaryBgLight,
    borderRadius: borderRadius.full,
  },
  footerBoldLabel: {
    fontSize: fontSize['2xs'],
    fontWeight: fontWeight.bold,
    color: colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
});

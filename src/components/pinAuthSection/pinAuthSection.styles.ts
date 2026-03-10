import {StyleSheet} from 'react-native';
import {
  colors,
  spacing,
  fontSize,
  fontWeight,
  borderRadius,
} from '../../../theme';

export const styles = StyleSheet.create({
  authContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing['2xl'],
  },
  lockIconWrapper: {
    backgroundColor: colors.primaryBgLight,
    width: 96,
    height: 96,
    borderRadius: borderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing['4xl'],
  },
  pinRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing.xl,
    marginBottom: spacing['4xl'],
  },
  pinInput: {
    width: 56,
    height: 56,
    textAlign: 'center',
    fontSize: fontSize['3xl'],
    fontWeight: fontWeight.bold,
    borderBottomWidth: 2,
    borderBottomColor: colors.slate300,
    color: colors.textPrimary,
  },
  pinInputFocused: {
    borderBottomColor: colors.primary,
  },
  biometricsBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing['2xl'],
    borderRadius: borderRadius.lg,
  },
  biometricsText: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.bold,
    color: colors.primary,
  },
});

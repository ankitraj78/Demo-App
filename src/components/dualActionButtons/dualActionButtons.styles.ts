import {StyleSheet} from 'react-native';
import {
  colors,
  spacing,
  fontSize,
  fontWeight,
  borderRadius,
  shadows,
} from '../../../theme';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: spacing['4xl'],
    gap: spacing.lg,
  },
  primaryBtn: {
    width: '100%',
    backgroundColor: colors.primary,
    paddingVertical: spacing.xl,
    borderRadius: borderRadius.xl,
    alignItems: 'center',
    ...shadows.lg,
  },
  primaryBtnText: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.bold,
    color: colors.white,
  },
  secondaryBtn: {
    width: '100%',
    backgroundColor: 'transparent',
    paddingVertical: spacing.xl,
    borderRadius: borderRadius.xl,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  secondaryBtnText: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.bold,
    color: colors.textSecondary,
  },
});

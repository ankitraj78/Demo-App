import {StyleSheet} from 'react-native';
import {
  colors,
  spacing,
  fontSize,
  fontWeight,
  borderRadius,
} from '../../../theme';

export const styles = StyleSheet.create({
  container: {
    gap: spacing.lg,
  },
  sectionLabel: {
    fontSize: fontSize['2xs'],
    fontWeight: fontWeight.semibold,
    color: colors.slate400,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    marginBottom: spacing.lg,
  },
  grid: {
    flexDirection: 'row',
    gap: spacing.lg,
  },
  btn: {
    flex: 1,
    paddingVertical: spacing.lg,
    borderRadius: borderRadius.lg,
    borderWidth: 2,
    borderColor: colors.borderLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnActive: {
    borderColor: colors.primary,
    backgroundColor: colors.primaryBgLight,
  },
  btnText: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.medium,
    color: colors.textSecondary,
  },
  btnTextActive: {
    color: colors.primary,
    fontWeight: fontWeight.bold,
  },
});

import {StyleSheet} from 'react-native';
import {
  colors,
  spacing,
  fontSize,
  fontWeight,
  borderRadius,
} from '../../../theme';

export const styles = StyleSheet.create({
  amountSection: {
    gap: spacing.xl,
    paddingTop: spacing.sm,
  },
  amountFieldWrapper: {
    gap: spacing.sm,
  },
  amountLabel: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
    color: colors.textSecondary,
  },
  amountInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.backgroundLight,
    borderWidth: 2,
    borderColor: colors.borderLight,
    borderRadius: borderRadius.xl,
    paddingHorizontal: spacing.xl,
  },
  amountCurrency: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.semibold,
    color: colors.textMuted,
    marginRight: spacing.sm,
  },
  amountInput: {
    flex: 1,
    fontSize: fontSize['2xl'],
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
    paddingVertical: spacing.xl,
  },
  remarksInput: {
    backgroundColor: colors.backgroundLight,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.xl,
    padding: spacing.xl,
    fontSize: fontSize.md,
    color: colors.textPrimary,
    textAlignVertical: 'top',
    minHeight: 80,
  },
});

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
  transactionCard: {
    width: '100%',
    backgroundColor: colors.white,
    borderRadius: borderRadius.xl,
    padding: spacing['2xl'],
    borderWidth: 1,
    borderColor: colors.primaryBorderLight,
    ...shadows.sm,
  },
  transactionAmountSection: {
    alignItems: 'center',
    paddingBottom: spacing['2xl'],
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
    marginBottom: spacing['2xl'],
  },
  transactionAmountLabel: {
    fontSize: fontSize['2xs'],
    color: colors.slate400,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    marginBottom: spacing.sm,
  },
  transactionAmount: {
    fontSize: fontSize['4xl'],
    fontWeight: fontWeight.bold,
    color: colors.primary,
  },
  transactionDetails: {
    gap: spacing.xl,
  },
  transactionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  transactionLabel: {
    fontSize: fontSize.sm,
    color: colors.slate400,
  },
  transactionValue: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.semibold,
    color: colors.textPrimary,
  },
  transactionRefValue: {
    fontSize: fontSize['2xs'],
    fontWeight: fontWeight.semibold,
    color: colors.textPrimary,
    fontFamily: 'monospace',
  },
  statusBadge: {
    backgroundColor: colors.successBg10,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.full,
  },
  statusText: {
    fontSize: fontSize['2xs'],
    fontWeight: fontWeight.bold,
    color: colors.successDark,
    textTransform: 'uppercase',
  },
});

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
  loanCard: {
    backgroundColor: colors.white,
    padding: spacing.xl,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.borderLight,
    ...shadows.sm,
    gap: spacing.lg,
  },
  loanCardWithdrawn: {
    backgroundColor: colors.slate50,
    borderStyle: 'dashed',
    borderColor: colors.slate200,
    shadowOpacity: 0,
    elevation: 0,
  },
  loanCardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  loanCardInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.lg,
  },
  loanCardInfoWithdrawn: {
    opacity: 0.6,
  },
  loanIconBox: {
    padding: spacing.md,
    borderRadius: borderRadius.md,
    backgroundColor: colors.primaryBgLight,
  },
  loanIconBoxWithdrawn: {
    backgroundColor: colors.slate200,
  },
  loanName: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.semibold,
    color: colors.textPrimary,
  },
  loanId: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
    color: colors.textMuted,
    textTransform: 'uppercase',
    marginTop: spacing.xs,
  },

  // Status Badges
  statusBadge: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: spacing.sm + 2,
  },
  statusBadgeActive: {
    backgroundColor: colors.greenBg,
  },
  statusBadgePending: {
    backgroundColor: colors.amber100,
    maxWidth: 100,
  },
  statusBadgeWithdrawn: {
    backgroundColor: colors.roseBg,
  },
  statusText: {
    fontSize: fontSize['2xs'],
    fontWeight: fontWeight.bold,
    textTransform: 'uppercase',
  },
  statusTextActive: {
    color: colors.green700,
  },
  statusTextPending: {
    color: colors.amber700,
    textAlign: 'center',
    lineHeight: 13,
  },
  statusTextWithdrawn: {
    color: colors.rose,
  },

  // Loan Card Bottom
  loanCardBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: spacing.md,
    paddingTop: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.divider,
  },
  loanCardBottomWithdrawn: {
    marginTop: spacing.md,
    paddingTop: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
  },
  balanceLabel: {
    fontSize: fontSize['2xs'],
    fontWeight: fontWeight.bold,
    color: colors.slate400,
    textTransform: 'uppercase',
  },
  balanceAmount: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    color: colors.success,
    marginTop: spacing.xs,
  },
  balanceAmountNeutral: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  detailsBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  detailsBtnText: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.semibold,
    color: colors.primary,
  },
  reviewBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  reviewText: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
    color: colors.amber,
  },
  withdrawnText: {
    fontSize: fontSize.sm,
    color: colors.slate400,
  },
});

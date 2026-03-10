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
  root: {
    flex: 1,
    backgroundColor: colors.white,
  },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
    zIndex: 10,
  },
  backBtn: {
    padding: spacing.md,
    borderRadius: borderRadius.full,
  },
  headerTitle: {
    flex: 1,
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
    marginLeft: spacing.md,
    letterSpacing: -0.3,
  },
  moreBtn: {
    padding: spacing.md,
  },

  // Summary Card
  summaryWrapper: {
    padding: spacing.xl,
  },
  summaryCard: {
    borderRadius: borderRadius.lg,
    backgroundColor: colors.primary,
    overflow: 'hidden',
    ...shadows.sm,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  summaryGradient: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.1,
  },
  summaryContent: {
    padding: spacing['2xl'],
    gap: spacing.sm,
  },
  summaryLabel: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
    color: colors.white80,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
  summaryAmount: {
    fontSize: fontSize['5xl'],
    fontWeight: fontWeight.bold,
    color: colors.white,
    letterSpacing: -0.5,
  },
  summaryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    backgroundColor: colors.white20,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.full,
    alignSelf: 'flex-start',
    marginTop: spacing.md,
  },
  summaryBadgeText: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
    color: colors.white,
  },

  // Section Title
  sectionTitleWrapper: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xl,
    paddingBottom: spacing.md,
  },
  sectionTitle: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
  },

  // Loan Cards List
  loanList: {
    paddingHorizontal: spacing.xl,
    gap: spacing.lg,
  },

  // Loan Card
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

  // Footer
  footer: {
    paddingVertical: spacing['2xl'] + spacing.md,
    alignItems: 'center',
    gap: spacing.md,
    opacity: 0.5,
  },
  footerText: {
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

  // Loading & Error States
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacing.lg,
    padding: spacing.xl,
  },
  errorText: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.medium,
    color: colors.textMuted,
    textAlign: 'center',
  },
  retryBtn: {
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    backgroundColor: colors.primary,
    borderRadius: borderRadius.md,
  },
  retryBtnText: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.semibold,
    color: colors.white,
  },
});

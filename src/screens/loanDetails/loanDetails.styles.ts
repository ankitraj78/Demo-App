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
    backgroundColor: colors.backgroundLight,
  },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.backgroundLight,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.primaryBorderLight,
    zIndex: 10,
  },
  backBtn: {
    padding: spacing.md,
    borderRadius: borderRadius.full,
  },
  headerTitle: {
    marginLeft: spacing.sm,
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
    letterSpacing: -0.3,
  },

  // Hero Card
  heroWrapper: {
    padding: spacing.lg,
  },
  heroCard: {
    backgroundColor: colors.primary,
    borderRadius: borderRadius.xl,
    padding: spacing['2xl'],
    overflow: 'hidden',
    ...shadows.lg,
  },
  heroWatermark: {
    position: 'absolute',
    top: 0,
    right: 0,
    padding: spacing.lg,
    opacity: 0.1,
  },
  heroContent: {
    zIndex: 1,
  },
  heroTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.lg,
  },
  heroAccountLabel: {
    fontSize: fontSize['2xs'],
    fontWeight: fontWeight.medium,
    color: colors.white80,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
  heroAccountNumber: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.semibold,
    color: colors.white,
    marginTop: spacing.xs,
  },
  heroTypeBadge: {
    backgroundColor: colors.white20,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.full,
  },
  heroTypeText: {
    fontSize: fontSize['2xs'],
    fontWeight: fontWeight.bold,
    color: colors.white,
    textTransform: 'uppercase',
  },
  heroBalanceSection: {
    marginTop: spacing.xl,
  },
  heroBalanceLabel: {
    fontSize: fontSize['2xs'],
    fontWeight: fontWeight.medium,
    color: colors.white80,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
  heroBalanceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: spacing.sm,
    marginTop: spacing.xs,
  },
  heroBalanceAmount: {
    fontSize: fontSize['4xl'],
    fontWeight: fontWeight.bold,
    color: colors.white,
  },
  heroBalanceCurrency: {
    fontSize: fontSize.sm,
    color: colors.white80,
  },

  // Next Installment
  installmentWrapper: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
  },
  installmentCard: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.primaryBorderLight,
    ...shadows.sm,
  },
  installmentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.lg,
    marginBottom: spacing.lg,
  },
  installmentIconBox: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.full,
    backgroundColor: colors.primaryBgLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  installmentTitle: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.bold,
    color: colors.slate400,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  installmentGrid: {
    flexDirection: 'row',
    gap: spacing.lg,
  },
  installmentBox: {
    flex: 1,
    backgroundColor: colors.backgroundLight,
    padding: spacing.lg,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.primaryBorderLight,
  },
  installmentBoxLabel: {
    fontSize: fontSize['2xs'],
    fontWeight: fontWeight.bold,
    color: colors.slate400,
    textTransform: 'uppercase',
    marginBottom: spacing.xs,
  },
  installmentBoxAmount: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    color: colors.primary,
  },
  installmentBoxDate: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
  },

  // Actions Section
  actionsWrapper: {
    padding: spacing.lg,
  },
  actionsTitle: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
    marginBottom: spacing.lg,
    paddingHorizontal: spacing.xs,
  },
  actionsList: {
    gap: spacing.lg,
  },

  // Action Item
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.lg,
    backgroundColor: colors.white,
    borderRadius: borderRadius.xl,
    borderWidth: 1,
    borderColor: colors.primaryBorderLight,
    ...shadows.sm,
  },
  actionIconBox: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionTextBox: {
    flex: 1,
    marginLeft: spacing.lg,
  },
  actionTitle: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
  },
  actionSubtitle: {
    fontSize: fontSize['2xs'],
    color: colors.textMuted,
    marginTop: spacing.xs,
  },
});

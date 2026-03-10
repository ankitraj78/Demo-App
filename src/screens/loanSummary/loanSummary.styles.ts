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

  // Summary Hero Card
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
  heroStatusBadge: {
    position: 'absolute',
    top: spacing.xl,
    right: spacing.xl,
    backgroundColor: 'rgba(34,197,94,0.2)',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.full,
    borderWidth: 1,
    borderColor: 'rgba(34,197,94,0.3)',
  },
  heroStatusText: {
    fontSize: fontSize['2xs'],
    fontWeight: fontWeight.bold,
    color: '#bbf7d0',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
  heroAccountLabel: {
    fontSize: fontSize['2xs'],
    fontWeight: fontWeight.medium,
    color: colors.white60,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
  heroAccountNumber: {
    fontSize: fontSize['2xl'],
    fontWeight: fontWeight.bold,
    color: colors.white,
    marginTop: spacing.xs,
    marginBottom: spacing.xl,
    letterSpacing: -0.3,
  },
  heroInfoGrid: {
    flexDirection: 'row',
    gap: spacing.xl,
    paddingTop: spacing.xl,
    borderTopWidth: 1,
    borderTopColor: colors.white20,
  },
  heroInfoItem: {
    flex: 1,
  },
  heroInfoLabel: {
    fontSize: fontSize['2xs'],
    fontWeight: fontWeight.semibold,
    color: colors.white60,
    textTransform: 'uppercase',
  },
  heroInfoValue: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
    color: colors.white,
    marginTop: spacing.sm,
  },

  // Detail Section Cards
  sectionWrapper: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
  },
  sectionCard: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.xl,
    padding: spacing.xl,
    borderWidth: 1,
    borderColor: colors.primaryBorderLight,
    ...shadows.sm,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
  },

  // Detail Rows
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.md,
  },
  detailRowBorder: {
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
    paddingTop: spacing.lg,
  },
  detailLabel: {
    fontSize: fontSize.md,
    color: colors.textMuted,
  },
  detailValue: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.semibold,
    color: colors.textPrimary,
  },
  detailValueHighlight: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    color: colors.primary,
  },
  detailValueDanger: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.semibold,
    color: colors.danger,
  },

  // Installment Grid
  installmentGrid: {
    flexDirection: 'row',
    gap: spacing.xl,
  },
  installmentBox: {
    flex: 1,
    backgroundColor: colors.primaryBgLight,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
  },
  installmentBoxLabel: {
    fontSize: fontSize['2xs'],
    fontWeight: fontWeight.bold,
    color: colors.textMuted,
    textTransform: 'uppercase',
    marginBottom: spacing.sm,
  },
  installmentBoxValue: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
  },

  // Next Payment Date Row
  nextPaymentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.xl,
    paddingHorizontal: spacing.sm,
  },
  nextPaymentLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  nextPaymentText: {
    fontSize: fontSize.md,
    color: colors.textMuted,
  },
  nextPaymentValue: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.semibold,
    color: colors.textPrimary,
  },
});

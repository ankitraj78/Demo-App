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
  content: {
    flex: 1,
  },
  scrollContent: {
    padding: spacing.xl,
    gap: spacing['2xl'],
  },

  // Section Label
  sectionLabel: {
    fontSize: fontSize['2xs'],
    fontWeight: fontWeight.semibold,
    color: colors.slate400,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    marginBottom: spacing.lg,
  },

  // Origin Account Card
  originCard: {
    borderRadius: borderRadius.xl,
    padding: spacing['2xl'],
    overflow: 'hidden',
    ...shadows.lg,
  },
  originCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing['2xl'] + spacing.md,
    zIndex: 1,
  },
  originAccountType: {
    fontSize: fontSize['2xs'],
    fontWeight: fontWeight.medium,
    color: colors.white80,
  },
  originAccountName: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    color: colors.white,
    marginTop: spacing.xs,
  },
  originCardBody: {
    zIndex: 1,
    gap: spacing.xl,
  },
  originFieldLabel: {
    fontSize: fontSize['2xs'],
    color: colors.white60,
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  originAccountNumber: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.semibold,
    color: colors.white,
    letterSpacing: 1,
    marginTop: spacing.xs,
  },
  originBalanceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  originBalance: {
    fontSize: fontSize['3xl'],
    fontWeight: fontWeight.bold,
    color: colors.white,
    marginTop: spacing.xs,
  },
  originStatusBadge: {
    backgroundColor: colors.white20,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.sm,
  },
  originStatusText: {
    fontSize: fontSize['2xs'],
    fontWeight: fontWeight.bold,
    color: colors.white,
    letterSpacing: 1,
  },
  decorCircleLg: {
    position: 'absolute',
    right: -48,
    bottom: -48,
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: colors.cardOverlayLight,
  },
  decorCircleSm: {
    position: 'absolute',
    right: -16,
    bottom: -16,
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: colors.cardOverlay,
  },

  // Select Other Account Button
  selectOtherBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.md,
    paddingVertical: spacing.lg,
    marginTop: spacing.xl,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: colors.primaryBorderLight,
    borderRadius: borderRadius.lg,
  },
  selectOtherText: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.semibold,
    color: colors.primary,
  },

  // Destination Section
  destinationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  addBeneficiaryBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  addBeneficiaryText: {
    fontSize: fontSize.xs,
    fontWeight: fontWeight.bold,
    color: colors.primary,
  },
  destinationFieldLabel: {
    fontSize: fontSize.xs,
    fontWeight: fontWeight.medium,
    color: colors.textMuted,
    marginBottom: spacing.sm,
    marginLeft: spacing.xs,
  },
  destinationInput: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.lg,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.lg + spacing.xs,
  },
  destinationAccountText: {
    flex: 1,
    fontSize: fontSize.md,
    fontWeight: fontWeight.medium,
    color: colors.textPrimary,
    marginLeft: spacing.lg,
  },

  // Transaction Summary
  summaryCard: {
    backgroundColor: colors.primaryBgLight,
    borderRadius: borderRadius.xl,
    borderWidth: 1,
    borderColor: colors.primaryBorderLight,
    padding: spacing.xl,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.sm,
  },
  summaryLabel: {
    fontSize: fontSize.sm,
    color: colors.slate500,
  },
  summaryValue: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
    color: colors.textPrimary,
  },
});

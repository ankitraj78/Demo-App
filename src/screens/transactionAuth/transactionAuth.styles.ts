import { StyleSheet } from 'react-native';
import {
  colors,
  spacing,
  fontSize,
  fontWeight,
  borderRadius,
  shadows,
} from '../../theme';

export const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.backgroundLight,
  },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.md,
  },
  backBtn: {
    padding: spacing.md,
    borderRadius: borderRadius.full,
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
    marginRight: 40,
  },

  // Auth Content
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
  authTitle: {
    fontSize: fontSize['3xl'],
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  authDescription: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: spacing['4xl'],
  },
  authBoldText: {
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
  },

  // PIN Inputs
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

  // Biometrics
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

  // Footer
  footer: {
    paddingVertical: spacing['4xl'],
    alignItems: 'center',
    gap: spacing.md,
    opacity: 0.6,
  },
  footerLabel: {
    fontSize: fontSize['2xs'],
    fontWeight: fontWeight.medium,
    textTransform: 'uppercase',
    letterSpacing: 2,
    color: colors.textSecondary,
  },
  footerLogo: {
    height: 24,
  },

  // Success Screen
  successContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing['2xl'],
  },
  successIconOuter: {
    width: 96,
    height: 96,
    borderRadius: borderRadius.full,
    backgroundColor: colors.successBg20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing['4xl'],
  },
  successIconInner: {
    width: 64,
    height: 64,
    borderRadius: borderRadius.full,
    backgroundColor: colors.successDark,
    alignItems: 'center',
    justifyContent: 'center',
  },
  successTitle: {
    fontSize: fontSize['3xl'],
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  successSubtitle: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    marginBottom: spacing['4xl'],
  },

  // Transaction Card
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

  // Action Buttons
  actionButtons: {
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
    borderColor: colors.primaryBorderLight,
  },
  secondaryBtnText: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.bold,
    color: colors.textSecondary,
  },
});

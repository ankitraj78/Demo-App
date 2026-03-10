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
    borderBottomColor: colors.primaryBorderLight,
    zIndex: 10,
  },
  backBtn: {
    padding: spacing.md,
    borderRadius: borderRadius.full,
  },
  headerTitle: {
    marginLeft: spacing.sm,
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
    letterSpacing: -0.3,
  },

  // Content
  content: {
    flex: 1,
  },
  scrollContent: {
    padding: spacing.xl,
    gap: spacing['2xl'],
  },

  // Section
  sectionLabel: {
    fontSize: fontSize['2xs'],
    fontWeight: fontWeight.semibold,
    color: colors.slate400,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    marginBottom: spacing.lg,
  },

  // Pay To - Dropdown
  fieldLabel: {
    fontSize: fontSize.xs,
    fontWeight: fontWeight.medium,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
    marginLeft: spacing.xs,
  },
  selectContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.backgroundLight,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.xl,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.lg + spacing.xs,
  },
  selectText: {
    flex: 1,
    fontSize: fontSize.md,
    fontWeight: fontWeight.medium,
    color: colors.textPrimary,
  },

  // Pay From Card
  payFromCard: {
    borderRadius: borderRadius.xl,
    padding: spacing.xl + spacing.sm,
    overflow: 'hidden',
    ...shadows.lg,
  },
  payFromContent: {
    zIndex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  payFromLeftSection: {
    gap: spacing.xl,
  },
  payFromTypeLabel: {
    fontSize: fontSize['2xs'],
    fontWeight: fontWeight.medium,
    color: colors.white80,
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  payFromAccountNumber: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.semibold,
    color: colors.white,
    letterSpacing: 1,
    marginTop: spacing.xs,
  },
  payFromBalanceLabel: {
    fontSize: fontSize['2xs'],
    color: colors.white60,
  },
  payFromBalance: {
    fontSize: fontSize['2xl'],
    fontWeight: fontWeight.bold,
    color: colors.white,
    marginTop: spacing.xs,
  },
  payFromIconBox: {
    width: 64,
    height: 40,
    backgroundColor: colors.white20,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Decorative circles
  decorCircle1: {
    position: 'absolute',
    right: -16,
    bottom: -16,
    width: 128,
    height: 128,
    borderRadius: 64,
    backgroundColor: colors.cardOverlay,
  },
  decorCircle2: {
    position: 'absolute',
    left: -16,
    top: -16,
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: colors.cardOverlayLight,
  },

  // Amount Section
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

  // Quick Select
  quickSelectGrid: {
    flexDirection: 'row',
    gap: spacing.lg,
  },
  quickSelectBtn: {
    flex: 1,
    paddingVertical: spacing.lg,
    borderRadius: borderRadius.lg,
    borderWidth: 2,
    borderColor: colors.borderLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quickSelectBtnActive: {
    borderColor: colors.primary,
    backgroundColor: colors.primaryBgLight,
  },
  quickSelectText: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.medium,
    color: colors.textSecondary,
  },
  quickSelectTextActive: {
    color: colors.primary,
    fontWeight: fontWeight.bold,
  },

  // Footer
  footer: {
    padding: spacing.xl + spacing.sm,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
  },
  payButton: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.xl,
    borderRadius: borderRadius.xl,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.md,
    ...shadows.card,
  },
  payButtonText: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    color: colors.white,
  },
  footerNote: {
    textAlign: 'center',
    fontSize: fontSize.xs,
    color: colors.textMuted,
    marginTop: spacing.xl,
  },

  // Loading & Error states
  centerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
  },
  errorText: {
    fontSize: fontSize.sm,
    color: colors.textMuted,
    textAlign: 'center',
  },
});

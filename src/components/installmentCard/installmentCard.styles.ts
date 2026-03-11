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

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
});

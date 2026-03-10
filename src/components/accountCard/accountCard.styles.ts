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
  cardWrapper: {
    padding: spacing.xl,
  },
  card: {
    borderRadius: borderRadius.lg,
    backgroundColor: colors.primary,
    padding: spacing['2xl'],
    overflow: 'hidden',
    ...shadows.card,
  },
  cardCircle1: {
    position: 'absolute',
    top: -spacing['6xl'],
    right: -spacing['6xl'],
    width: 256,
    height: 256,
    borderRadius: 128,
    backgroundColor: colors.cardOverlay,
  },
  cardCircle2: {
    position: 'absolute',
    bottom: -spacing['6xl'],
    left: -spacing['6xl'],
    width: 192,
    height: 192,
    borderRadius: 96,
    backgroundColor: colors.cardOverlayLight,
  },
  cardContent: {
    gap: spacing['2xl'],
  },
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  cardAccountType: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.medium,
    color: colors.white80,
  },
  cardAccountNum: {
    fontSize: fontSize.sm,
    color: colors.white60,
    marginTop: spacing.xs,
  },
  cardBalance: {
    gap: spacing.sm,
  },
  balanceAmount: {
    fontSize: fontSize['5xl'],
    fontWeight: fontWeight.bold,
    color: colors.white,
    letterSpacing: -0.5,
  },
  balanceTrend: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  balanceTrendText: {
    fontSize: fontSize.sm,
    color: colors.successLight,
  },
  cardActions: {
    flexDirection: 'row',
    gap: spacing.lg,
    paddingTop: spacing.md,
  },
  addMoneyBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.md,
    backgroundColor: colors.white,
    borderRadius: borderRadius.md,
    paddingVertical: spacing.lg,
    ...shadows.lg,
  },
  addMoneyText: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.bold,
    color: colors.primary,
  },
  transferBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.md,
    backgroundColor: colors.primaryOverlay,
    borderWidth: 1,
    borderColor: colors.whiteOverlay,
    borderRadius: borderRadius.md,
    paddingVertical: spacing.lg,
  },
  transferText: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.bold,
    color: colors.white,
  },
});

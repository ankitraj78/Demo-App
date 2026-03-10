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
});

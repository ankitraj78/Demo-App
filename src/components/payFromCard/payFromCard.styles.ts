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
  sectionLabel: {
    fontSize: fontSize['2xs'],
    fontWeight: fontWeight.semibold,
    color: colors.slate400,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    marginBottom: spacing.lg,
  },
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
});

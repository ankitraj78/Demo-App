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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.white,
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.lg,
    ...shadows.sm,
    zIndex: 10,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.lg,
  },
  headerLogo: {
    width: spacing['4xl'],
    height: spacing['4xl'],
    borderRadius: borderRadius.md,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerWelcome: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
    color: colors.textMuted,
  },
  headerName: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  notifBtn: {
    width: spacing['4xl'],
    height: spacing['4xl'],
    borderRadius: borderRadius.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notifBadge: {
    position: 'absolute',
    top: spacing.md,
    right: spacing.md,
    width: spacing.md,
    height: spacing.md,
    borderRadius: spacing.sm,
    backgroundColor: colors.danger,
    borderWidth: 2,
    borderColor: colors.white,
  },
  avatar: {
    width: spacing['4xl'],
    height: spacing['4xl'],
    borderRadius: borderRadius.xl,
    borderWidth: 1,
    borderColor: colors.primaryBorderLight,
    backgroundColor: colors.primaryBgLight,
  },
});

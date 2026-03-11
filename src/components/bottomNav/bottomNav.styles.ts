import { StyleSheet } from 'react-native';
import { colors, spacing, fontSize, fontWeight, shadows } from '../../theme';

export const styles = StyleSheet.create({
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.navBackground,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.md,
  },
  navItem: {
    alignItems: 'center',
    gap: spacing.xs,
    flex: 1,
  },
  navLabel: {
    fontSize: fontSize['2xs'],
    fontWeight: fontWeight.bold,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  scanBtnWrapper: {
    flex: 1,
    alignItems: 'center',
    marginTop: -spacing['3xl'],
  },
  scanBtn: {
    width: spacing['5xl'],
    height: spacing['5xl'],
    borderRadius: spacing['3xl'],
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.fab,
  },
});

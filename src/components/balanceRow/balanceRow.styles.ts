import {StyleSheet} from 'react-native';
import {colors, spacing, fontSize, fontWeight, borderRadius} from '../../../theme';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  label: {
    fontSize: fontSize['2xs'],
    color: colors.white60,
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  balance: {
    fontSize: fontSize['3xl'],
    fontWeight: fontWeight.bold,
    color: colors.white,
    marginTop: spacing.xs,
  },
  statusBadge: {
    backgroundColor: colors.white20,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.sm,
  },
  statusText: {
    fontSize: fontSize['2xs'],
    fontWeight: fontWeight.bold,
    color: colors.white,
    letterSpacing: 1,
  },
});

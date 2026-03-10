import {StyleSheet} from 'react-native';
import {colors, spacing, fontSize, fontWeight} from '../../../theme';

export const styles = StyleSheet.create({
  label: {
    fontSize: fontSize['2xs'],
    color: colors.white60,
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  value: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.semibold,
    color: colors.white,
    letterSpacing: 1,
    marginTop: spacing.xs,
  },
});

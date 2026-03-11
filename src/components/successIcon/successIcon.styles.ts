import { StyleSheet } from 'react-native';
import { colors, spacing, borderRadius } from '../../theme';

export const styles = StyleSheet.create({
  outer: {
    width: 96,
    height: 96,
    borderRadius: borderRadius.full,
    backgroundColor: colors.successBg20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing['4xl'],
  },
  inner: {
    width: 64,
    height: 64,
    borderRadius: borderRadius.full,
    backgroundColor: colors.successDark,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

import {StyleSheet} from 'react-native';
import {colors, spacing, fontSize, fontWeight} from '../../../theme';

export const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xl,
    paddingBottom: spacing.md,
  },
  title: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
  },
});

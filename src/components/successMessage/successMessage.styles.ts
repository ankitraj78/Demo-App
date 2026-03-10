import {StyleSheet} from 'react-native';
import {colors, spacing, fontSize, fontWeight} from '../../../theme';

export const styles = StyleSheet.create({
  title: {
    fontSize: fontSize['3xl'],
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  subtitle: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    marginBottom: spacing['4xl'],
  },
});

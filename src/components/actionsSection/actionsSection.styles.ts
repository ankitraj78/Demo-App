import {StyleSheet} from 'react-native';
import {
  spacing,
  fontSize,
  fontWeight,
  colors,
} from '../../../theme';

export const styles = StyleSheet.create({
  actionsWrapper: {
    padding: spacing.lg,
  },
  actionsTitle: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
    marginBottom: spacing.lg,
    paddingHorizontal: spacing.xs,
  },
  actionsList: {
    gap: spacing.lg,
  },
});

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
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.lg,
    backgroundColor: colors.white,
    borderRadius: borderRadius.xl,
    borderWidth: 1,
    borderColor: colors.primaryBorderLight,
    ...shadows.sm,
  },
  actionIconBox: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionTextBox: {
    flex: 1,
    marginLeft: spacing.lg,
  },
  actionTitle: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
  },
  actionSubtitle: {
    fontSize: fontSize['2xs'],
    color: colors.textMuted,
    marginTop: spacing.xs,
  },
});

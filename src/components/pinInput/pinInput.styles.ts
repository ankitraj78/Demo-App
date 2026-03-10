import {StyleSheet} from 'react-native';
import {colors, spacing, fontSize, fontWeight} from '../../../theme';

export const styles = StyleSheet.create({
  pinRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing.xl,
    marginBottom: spacing['4xl'],
  },
  pinInput: {
    width: 56,
    height: 56,
    textAlign: 'center',
    fontSize: fontSize['3xl'],
    fontWeight: fontWeight.bold,
    borderBottomWidth: 2,
    borderBottomColor: colors.slate300,
    color: colors.textPrimary,
  },
  pinInputFocused: {
    borderBottomColor: colors.primary,
  },
});

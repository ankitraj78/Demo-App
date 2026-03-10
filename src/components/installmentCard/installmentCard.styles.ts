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
  wrapper: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.primaryBorderLight,
    ...shadows.sm,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.lg,
    marginBottom: spacing.lg,
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.full,
    backgroundColor: colors.primaryBgLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.bold,
    color: colors.slate400,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  grid: {
    flexDirection: 'row',
    gap: spacing.lg,
  },
  box: {
    flex: 1,
    backgroundColor: colors.backgroundLight,
    padding: spacing.lg,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.primaryBorderLight,
  },
  boxLabel: {
    fontSize: fontSize['2xs'],
    fontWeight: fontWeight.bold,
    color: colors.slate400,
    textTransform: 'uppercase',
    marginBottom: spacing.xs,
  },
  boxPrimaryValue: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    color: colors.primary,
  },
  boxDefaultValue: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
  },
});

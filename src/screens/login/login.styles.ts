import {StyleSheet} from 'react-native';
import {
  colors,
  spacing,
  fontSize,
  fontWeight,
  borderRadius,
} from '../../../theme';

export const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.white,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: spacing['2xl'],
    paddingVertical: spacing['2xl'],
  },

  // Logo / Branding
  brandingContainer: {
    alignItems: 'center',
    marginBottom: spacing['2xl'] + spacing.xl,
  },
  logoCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  appName: {
    fontSize: fontSize['3xl'],
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
    letterSpacing: -0.5,
  },
  appTagline: {
    fontSize: fontSize.md,
    color: colors.textMuted,
    marginTop: spacing.sm,
  },

  // Form
  formContainer: {
    gap: spacing.xl,
  },
  inputContainer: {
    gap: spacing.sm,
  },
  inputLabel: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.semibold,
    color: colors.textSecondary,
    marginLeft: spacing.xs,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: borderRadius.md,
    backgroundColor: colors.backgroundLight,
    paddingHorizontal: spacing.lg,
    height: 52,
  },
  inputWrapperFocused: {
    borderColor: colors.primary,
    backgroundColor: colors.white,
  },
  inputWrapperError: {
    borderColor: colors.error,
  },
  inputIcon: {
    marginRight: spacing.md,
  },
  input: {
    flex: 1,
    fontSize: fontSize.md,
    color: colors.textPrimary,
    paddingVertical: 0,
  },

  // Error
  errorBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.errorBg,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.md,
    gap: spacing.md,
  },
  errorBannerText: {
    flex: 1,
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
    color: colors.error,
  },

  // Button
  loginBtn: {
    backgroundColor: colors.primary,
    height: 52,
    borderRadius: borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: spacing.md,
  },
  loginBtnDisabled: {
    opacity: 0.6,
  },
  loginBtnText: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    color: colors.white,
  },

  // Footer
  footer: {
    alignItems: 'center',
    marginTop: spacing['2xl'] + spacing.xl,
    gap: spacing.sm,
  },
  footerText: {
    fontSize: fontSize.xs,
    color: colors.textMuted,
  },
  footerBrand: {
    fontSize: fontSize.xs,
    fontWeight: fontWeight.bold,
    color: colors.primary,
  },
});

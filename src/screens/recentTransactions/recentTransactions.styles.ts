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
  root: {
    flex: 1,
    backgroundColor: colors.backgroundLight,
  },

  // Header
  header: {
    backgroundColor: colors.backgroundLight,
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.xl,
    borderBottomWidth: 1,
    borderBottomColor: colors.primaryBgLight,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.xl,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.lg,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.full,
    backgroundColor: colors.primaryBgLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
    letterSpacing: -0.3,
  },
  filterBtn: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.full,
    backgroundColor: colors.primaryBgLight,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Search
  searchContainer: {
    position: 'relative',
    marginBottom: spacing.xl,
  },
  searchIcon: {
    position: 'absolute',
    left: spacing.lg,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    zIndex: 1,
  },
  searchInput: {
    backgroundColor: 'rgba(0,71,138,0.05)',
    borderRadius: borderRadius.lg,
    paddingVertical: spacing.lg,
    paddingLeft: spacing['4xl'],
    paddingRight: spacing.xl,
    fontSize: fontSize.md,
    color: colors.textPrimary,
  },

  // Quick Filters
  filtersRow: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  filterChip: {
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.full,
    backgroundColor: colors.primaryBgLight,
  },
  filterChipActive: {
    backgroundColor: colors.primary,
  },
  filterChipText: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
    color: colors.primary,
  },
  filterChipTextActive: {
    color: colors.white,
  },

  // Content
  content: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing['2xl'],
  },

  // Section
  sectionLabel: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.semibold,
    color: colors.slate500,
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    marginBottom: spacing.lg,
    paddingHorizontal: spacing.sm,
  },
  sectionList: {
    gap: spacing.lg,
    marginBottom: spacing['2xl'],
  },

  // Transaction Item
  transactionItem: {
    backgroundColor: colors.white,
    padding: spacing.xl,
    borderRadius: borderRadius.lg,
    ...shadows.sm,
    borderWidth: 1,
    borderColor: 'rgba(0,71,138,0.05)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  transactionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xl,
    flex: 1,
  },
  transactionIconBox: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  transactionInfo: {
    flex: 1,
  },
  transactionName: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
  },
  transactionMeta: {
    fontSize: fontSize.xs,
    color: colors.slate500,
    marginTop: spacing.xs,
  },
  transactionRight: {
    alignItems: 'flex-end',
  },
  transactionAmount: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.bold,
  },
  amountWithdrawal: {
    color: colors.error,
  },
  amountDeposit: {
    color: colors.success,
  },
  transactionStatus: {
    fontSize: fontSize['2xs'],
    color: colors.slate400,
    textTransform: 'uppercase',
    fontWeight: fontWeight.medium,
    marginTop: spacing.xs,
  },
});

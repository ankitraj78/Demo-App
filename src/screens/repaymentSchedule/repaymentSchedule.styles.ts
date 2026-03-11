import { StyleSheet } from 'react-native';
import {
  colors,
  spacing,
  fontSize,
  fontWeight,
  borderRadius,
  shadows,
} from '../../theme';

export const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.backgroundLight,
  },

  // Header right actions
  headerActions: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  headerActionBtn: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.primaryBgLight,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Loan Summary Card
  summaryWrapper: {
    padding: spacing.xl,
  },
  summaryCard: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.xl,
    padding: spacing.xl + spacing.sm,
    borderWidth: 1,
    borderColor: colors.primaryBorderLight,
    overflow: 'hidden',
    ...shadows.sm,
  },
  summaryWatermark: {
    position: 'absolute',
    top: 0,
    right: 0,
    padding: spacing.xl,
    opacity: 0.08,
  },
  summaryContent: {
    zIndex: 1,
  },
  summaryTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.xl,
  },
  accountLabel: {
    fontSize: fontSize['2xs'],
    fontWeight: fontWeight.semibold,
    color: colors.slate500,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
  accountNumber: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
    marginTop: spacing.xs,
  },
  statusBadge: {
    backgroundColor: colors.greenBg,
    paddingHorizontal: spacing.md + spacing.xs,
    paddingVertical: spacing.sm,
    borderRadius: spacing.sm + 2,
  },
  statusText: {
    fontSize: fontSize['2xs'],
    fontWeight: fontWeight.bold,
    color: colors.green700,
    textTransform: 'uppercase',
  },

  // Info grid
  infoGrid: {
    flexDirection: 'row',
    gap: spacing.xl,
    marginBottom: spacing['2xl'],
  },
  infoItem: {
    flex: 1,
  },
  infoLabel: {
    fontSize: fontSize['2xs'],
    color: colors.textMuted,
    marginBottom: spacing.xs,
  },
  infoValue: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.semibold,
    color: colors.textPrimary,
  },
  infoValueHighlight: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.semibold,
    color: colors.primary,
  },

  // Progress
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  progressLabel: {
    fontSize: fontSize['2xs'],
    fontWeight: fontWeight.medium,
    color: colors.textPrimary,
  },
  progressCount: {
    fontSize: fontSize['2xs'],
    fontWeight: fontWeight.bold,
    color: colors.primary,
  },
  progressBarBg: {
    height: 8,
    backgroundColor: colors.borderLight,
    borderRadius: borderRadius.full,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: borderRadius.full,
  },

  // Timeline section
  timelineWrapper: {
    paddingHorizontal: spacing.xl,
  },
  timelineHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  timelineTitle: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
  },
  legendRow: {
    flexDirection: 'row',
    gap: spacing.lg,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  legendText: {
    fontSize: fontSize['2xs'],
    color: colors.textMuted,
  },

  // Table
  tableContainer: {
    borderRadius: borderRadius.xl,
    borderWidth: 1,
    borderColor: colors.primaryBorderLight,
    backgroundColor: colors.white,
    overflow: 'hidden',
    ...shadows.sm,
  },

  // Table header
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: colors.primaryBgLight,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.xl,
  },
  tableHeaderCell: {
    fontSize: fontSize['2xs'],
    fontWeight: fontWeight.bold,
    color: colors.primary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },

  // Table row
  tableRow: {
    flexDirection: 'row',
    paddingVertical: spacing.xl,
    paddingHorizontal: spacing.xl,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
    alignItems: 'center',
  },
  tableRowUpcoming: {
    backgroundColor: colors.primaryBgLight,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
  },
  tableCell: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
  },
  tableCellBold: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
  },

  // Column widths
  colNumber: {
    width: 28,
  },
  colDate: {
    flex: 1,
  },
  colAmount: {
    width: 72,
    alignItems: 'flex-end' as const,
  },
  colTotal: {
    width: 76,
    alignItems: 'flex-end' as const,
  },

  // Cell-specific styles
  cellNumber: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
    color: colors.textMuted,
  },
  cellNumberUpcoming: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.bold,
    color: colors.primary,
  },
  cellDate: {
    fontSize: fontSize.sm,
    color: colors.textPrimary,
  },
  cellDateUpcoming: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
  },
  cellPaidDate: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
    color: colors.success,
  },
  cellPending: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
    color: colors.primary,
    fontStyle: 'italic',
  },
  cellDash: {
    fontSize: fontSize.sm,
    color: colors.slate300,
  },
  cellAmount: {
    fontSize: fontSize.sm,
    color: colors.textMuted,
  },
  cellAmountUpcoming: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
    color: colors.textPrimary,
  },
  cellTotal: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
  },
  cellTotalUpcoming: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.bold,
    color: colors.primary,
  },

  // Table footer
  tableFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.xl,
    paddingHorizontal: spacing.xl,
    backgroundColor: colors.slate50,
  },
  tableFooterLabel: {
    fontSize: fontSize['2xs'],
    fontWeight: fontWeight.bold,
    color: colors.textMuted,
    textTransform: 'uppercase',
  },
  tableFooterValue: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.bold,
    color: colors.primary,
  },

  // Expanded row detail
  expandedRow: {
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.lg,
    backgroundColor: colors.backgroundLight,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  expandedGrid: {
    flexDirection: 'row',
    gap: spacing.xl,
  },
  expandedItem: {
    flex: 1,
  },
  expandedLabel: {
    fontSize: fontSize['2xs'],
    color: colors.textMuted,
    marginBottom: spacing.xs,
  },
  expandedValue: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.semibold,
    color: colors.textPrimary,
  },
});

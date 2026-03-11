import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRoute, RouteProp } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { generatePDF } from 'react-native-html-to-pdf';
import Share from 'react-native-share';
import { colors, spacing, iconSize } from '../../theme';
import { styles } from './repaymentSchedule.styles';
import type { RootStackParamList } from '../../navigation/rootNavigator';
import ScreenHeader from '../../components/screenHeader/screenHeader';
import { useLoanSummary } from '../../hooks/useLoanSummary';
import type { RepaymentPeriod } from '../../services/types';
import { generateRepaymentScheduleHtml } from './repaymentSchedulePdf';

type RepaymentScheduleRouteProp = RouteProp<
  RootStackParamList,
  'RepaymentSchedule'
>;

function formatDateFromArray(dateArr?: number[]): string {
  if (!dateArr || dateArr.length < 3) {
    return 'N/A';
  }
  const [year, month, day] = dateArr;
  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

function formatAmount(amount?: number, symbol?: string): string {
  if (amount == null) {
    return `${symbol ?? '$'}0.00`;
  }
  const sym = symbol ?? '$';
  return `${sym}${amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
}

type Installment = {
  number: number;
  date: string;
  paidDate?: string;
  principal: string;
  interest: string;
  fees: string;
  total: string;
  status: 'paid' | 'upcoming' | 'future';
};

function mapPeriodsToInstallments(
  periods: RepaymentPeriod[],
  currencySymbol: string,
): Installment[] {
  // Filter out period 0 (disbursement period) — only include actual repayment periods
  const repaymentPeriods = periods.filter(
    p => p.period != null && p.period > 0,
  );

  return repaymentPeriods.map(period => {
    let status: Installment['status'] = 'future';
    if (period.complete) {
      status = 'paid';
    } else {
      // First incomplete period is "upcoming", rest are "future"
      const firstIncomplete = repaymentPeriods.find(p => !p.complete);
      if (firstIncomplete && firstIncomplete.period === period.period) {
        status = 'upcoming';
      }
    }

    return {
      number: period.period ?? 0,
      date: formatDateFromArray(period.dueDate),
      paidDate:
        period.obligationsMetOnDate && period.obligationsMetOnDate.length >= 3
          ? formatDateFromArray(period.obligationsMetOnDate)
          : undefined,
      principal: formatAmount(period.principalDue, currencySymbol),
      interest: formatAmount(period.interestDue, currencySymbol),
      fees: formatAmount(
        (period.feeChargesDue ?? 0) + (period.penaltyChargesDue ?? 0),
        currencySymbol,
      ),
      total: formatAmount(period.totalDueForPeriod, currencySymbol),
      status,
    };
  });
}

export default function RepaymentScheduleScreen() {
  const insets = useSafeAreaInsets();
  const route = useRoute<RepaymentScheduleRouteProp>();
  const { loanId, accountNumber } = route.params;

  const { loanSummary, loading, error, refetch } = useLoanSummary(loanId);

  const [expandedRow, setExpandedRow] = useState<number | null>(null);
  const [downloading, setDownloading] = useState(false);

  const currencySymbol = loanSummary?.currency?.displaySymbol ?? '$';
  const schedule = loanSummary?.repaymentSchedule;
  const summary = loanSummary?.summary;
  const statusValue = loanSummary?.status?.value ?? 'Active';

  const installments = schedule?.periods
    ? mapPeriodsToInstallments(schedule.periods, currencySymbol)
    : [];

  const paidCount = installments.filter(i => i.status === 'paid').length;
  const totalCount = installments.length;
  const progressPercent = totalCount > 0 ? (paidCount / totalCount) * 100 : 0;

  const totalOutstanding = formatAmount(
    summary?.totalOutstanding ?? schedule?.totalOutstanding,
    currencySymbol,
  );

  const disbursementDate = formatDateFromArray(
    loanSummary?.timeline?.actualDisbursementDate,
  );
  const principalPaid = formatAmount(summary?.principalPaid, currencySymbol);

  const handleDownload = async () => {
    if (downloading) {
      return;
    }
    setDownloading(true);
    try {
      const html = generateRepaymentScheduleHtml({
        accountNumber,
        status: statusValue,
        disbursementDate,
        principalPaid,
        totalOutstanding,
        paidCount,
        totalCount,
        installments,
      });
      const pdf = await generatePDF({
        html,
        fileName: `Repayment_Schedule_${accountNumber}`,
      });
      if (pdf.filePath) {
        await Share.open({
          url: `file://${pdf.filePath}`,
          type: 'application/pdf',
        });
      }
    } catch (err: any) {
      if (err?.message !== 'User did not share') {
        Alert.alert('Error', 'Failed to generate PDF. Please try again.');
      }
    } finally {
      setDownloading(false);
    }
  };

  const toggleRow = (rowNumber: number) => {
    setExpandedRow(prev => (prev === rowNumber ? null : rowNumber));
  };

  const renderHeaderActions = () => (
    <View style={styles.headerActions}>
      <TouchableOpacity
        style={styles.headerActionBtn}
        activeOpacity={0.7}
        onPress={handleDownload}
        disabled={downloading}
      >
        {downloading ? (
          <ActivityIndicator size="small" color={colors.textPrimary} />
        ) : (
          <MaterialIcons
            name="file-download"
            size={iconSize.lg}
            color={colors.textPrimary}
          />
        )}
      </TouchableOpacity>
      <TouchableOpacity style={styles.headerActionBtn} activeOpacity={0.7}>
        <MaterialIcons
          name="more-vert"
          size={iconSize.lg}
          color={colors.textPrimary}
        />
      </TouchableOpacity>
    </View>
  );

  const renderPaidDateCell = (item: Installment) => {
    if (item.status === 'paid' && item.paidDate) {
      return <Text style={styles.cellPaidDate}>{item.paidDate}</Text>;
    }
    if (item.status === 'upcoming') {
      return <Text style={styles.cellPending}>Pending</Text>;
    }
    return <Text style={styles.cellDash}>-</Text>;
  };

  const renderRow = (item: Installment, index: number) => {
    const isUpcoming = item.status === 'upcoming';
    const isExpanded = expandedRow === item.number;
    const isLast = index === installments.length - 1;

    return (
      <React.Fragment key={item.number}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => toggleRow(item.number)}
          style={[
            styles.tableRow,
            isUpcoming && styles.tableRowUpcoming,
            isLast && { borderBottomWidth: 0 },
          ]}
        >
          {/* # */}
          <View style={styles.colNumber}>
            <Text
              style={isUpcoming ? styles.cellNumberUpcoming : styles.cellNumber}
            >
              {item.number}
            </Text>
          </View>

          {/* Date */}
          <View style={styles.colDate}>
            <Text
              style={isUpcoming ? styles.cellDateUpcoming : styles.cellDate}
            >
              {item.date}
            </Text>
            {renderPaidDateCell(item)}
          </View>

          {/* Principal */}
          <View style={styles.colAmount}>
            <Text
              style={isUpcoming ? styles.cellAmountUpcoming : styles.cellAmount}
            >
              {item.principal}
            </Text>
          </View>

          {/* Total */}
          <View style={styles.colTotal}>
            <Text
              style={isUpcoming ? styles.cellTotalUpcoming : styles.cellTotal}
            >
              {item.total}
            </Text>
          </View>
        </TouchableOpacity>

        {/* Expanded detail */}
        {isExpanded && (
          <View style={styles.expandedRow}>
            <View style={styles.expandedGrid}>
              <View style={styles.expandedItem}>
                <Text style={styles.expandedLabel}>Principal</Text>
                <Text style={styles.expandedValue}>{item.principal}</Text>
              </View>
              <View style={styles.expandedItem}>
                <Text style={styles.expandedLabel}>Interest</Text>
                <Text style={styles.expandedValue}>{item.interest}</Text>
              </View>
              <View style={styles.expandedItem}>
                <Text style={styles.expandedLabel}>Fees</Text>
                <Text style={styles.expandedValue}>{item.fees}</Text>
              </View>
            </View>
          </View>
        )}
      </React.Fragment>
    );
  };

  if (loading) {
    return (
      <View style={styles.root}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor={colors.backgroundLight}
        />
        <ScreenHeader title="Repayment Schedule" />
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <ActivityIndicator size="large" color={colors.primary} />
          <Text
            style={{
              marginTop: spacing.md,
              color: colors.textMuted,
            }}
          >
            Loading repayment schedule...
          </Text>
        </View>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.root}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor={colors.backgroundLight}
        />
        <ScreenHeader title="Repayment Schedule" />
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <MaterialIcons
            name="error-outline"
            size={iconSize['3xl']}
            color={colors.error}
          />
          <Text
            style={{
              marginTop: spacing.md,
              color: colors.error,
              textAlign: 'center',
              paddingHorizontal: spacing.xl,
            }}
          >
            {error}
          </Text>
          <TouchableOpacity
            style={{
              marginTop: spacing.lg,
              paddingHorizontal: spacing.xl,
              paddingVertical: spacing.md,
              backgroundColor: colors.primary,
              borderRadius: 8,
            }}
            onPress={refetch}
          >
            <Text style={{ color: colors.white, fontWeight: '600' }}>
              Retry
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.root}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={colors.backgroundLight}
      />

      <ScreenHeader
        title="Repayment Schedule"
        rightAction={renderHeaderActions()}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: insets.bottom + 100 }}
      >
        {/* Loan Summary Card */}
        <View style={styles.summaryWrapper}>
          <View style={styles.summaryCard}>
            {/* Watermark */}
            <View style={styles.summaryWatermark}>
              <MaterialIcons
                name="account-balance-wallet"
                size={64}
                color={colors.textPrimary}
              />
            </View>

            <View style={styles.summaryContent}>
              {/* Account & Status */}
              <View style={styles.summaryTopRow}>
                <View>
                  <Text style={styles.accountLabel}>Account Number</Text>
                  <Text style={styles.accountNumber}>{accountNumber}</Text>
                </View>
                <View style={styles.statusBadge}>
                  <Text style={styles.statusText}>{statusValue}</Text>
                </View>
              </View>

              {/* Info Grid */}
              <View style={styles.infoGrid}>
                <View style={styles.infoItem}>
                  <Text style={styles.infoLabel}>Disbursement Date</Text>
                  <Text style={styles.infoValue}>{disbursementDate}</Text>
                </View>
                <View style={styles.infoItem}>
                  <Text style={styles.infoLabel}>Principal Paid-off</Text>
                  <Text style={styles.infoValueHighlight}>{principalPaid}</Text>
                </View>
              </View>

              {/* Progress */}
              <View style={styles.progressHeader}>
                <Text style={styles.progressLabel}>Repayment Progress</Text>
                <Text style={styles.progressCount}>
                  {paidCount} of {totalCount} Installments
                </Text>
              </View>
              <View style={styles.progressBarBg}>
                <View
                  style={[
                    styles.progressBarFill,
                    { width: `${progressPercent}%` },
                  ]}
                />
              </View>
            </View>
          </View>
        </View>

        {/* Timeline Section */}
        <View style={styles.timelineWrapper}>
          {/* Section header */}
          <View style={styles.timelineHeader}>
            <Text style={styles.timelineTitle}>Timeline</Text>
            <View style={styles.legendRow}>
              <View style={styles.legendItem}>
                <View
                  style={[
                    styles.legendDot,
                    { backgroundColor: colors.success },
                  ]}
                />
                <Text style={styles.legendText}>Paid</Text>
              </View>
              <View style={styles.legendItem}>
                <View
                  style={[
                    styles.legendDot,
                    { backgroundColor: colors.primary },
                  ]}
                />
                <Text style={styles.legendText}>Upcoming</Text>
              </View>
            </View>
          </View>

          {/* Table */}
          <View style={styles.tableContainer}>
            {/* Table header */}
            <View style={styles.tableHeader}>
              <View style={styles.colNumber}>
                <Text style={styles.tableHeaderCell}>#</Text>
              </View>
              <View style={styles.colDate}>
                <Text style={styles.tableHeaderCell}>Date</Text>
              </View>
              <View style={styles.colAmount}>
                <Text style={styles.tableHeaderCell}>Principal</Text>
              </View>
              <View style={styles.colTotal}>
                <Text style={[styles.tableHeaderCell, { textAlign: 'right' }]}>
                  Total
                </Text>
              </View>
            </View>

            {/* Table rows */}
            {installments.map((item, index) => renderRow(item, index))}

            {/* Table footer */}
            <View style={styles.tableFooter}>
              <Text style={styles.tableFooterLabel}>Total Outstanding</Text>
              <Text style={styles.tableFooterValue}>{totalOutstanding}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

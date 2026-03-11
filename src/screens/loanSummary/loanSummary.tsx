import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRoute, RouteProp } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { colors, spacing, iconSize } from '../../theme';
import { styles } from './loanSummary.styles';
import type { RootStackParamList } from '../../navigation/rootNavigator';
import ScreenHeader from '../../components/screenHeader/screenHeader';
import LoanHeroCard from '../../components/loanHeroCard/loanHeroCard';
import SectionDetailCard from '../../components/sectionDetailCard/sectionDetailCard';
import InstallmentCard from '../../components/installmentCard/installmentCard';
import { useLoanSummary } from '../../hooks/useLoanSummary';

type LoanSummaryRouteProp = RouteProp<RootStackParamList, 'LoanSummary'>;

function formatAmount(amount?: number, symbol?: string): string {
  if (amount == null) {
    return `${symbol ?? '$'}0.00`;
  }
  const sym = symbol ?? '$';
  return `${sym}${amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
}

function formatDateFromArray(dateArr?: number[]): string {
  if (!dateArr || dateArr.length < 3) {
    return 'N/A';
  }
  const [year, month, day] = dateArr;
  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export default function LoanSummaryScreen() {
  const insets = useSafeAreaInsets();
  const route = useRoute<LoanSummaryRouteProp>();
  const { loanId, loanName, loanAccountNumber } = route.params;

  const { loanSummary, loading, error, refetch } = useLoanSummary(loanId);

  const summary = loanSummary?.summary;
  const schedule = loanSummary?.repaymentSchedule;
  const currencySymbol = loanSummary?.currency?.displaySymbol ?? '$';
  const statusValue = loanSummary?.status?.value ?? 'Active';

  // Find next unpaid period for installment info
  const nextPeriod = schedule?.periods?.find(
    p => p.period != null && p.period > 0 && !p.complete,
  );
  const completedPeriods =
    schedule?.periods?.filter(
      p => p.period != null && p.period > 0 && p.complete,
    )?.length ?? 0;
  const totalPeriods = loanSummary?.numberOfRepayments ?? 0;
  const remainingPeriods = totalPeriods - completedPeriods;

  if (loading) {
    return (
      <View style={styles.root}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor={colors.backgroundLight}
        />
        <ScreenHeader title="Loan Summary" />
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles.loadingText}>Loading loan summary...</Text>
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
        <ScreenHeader title="Loan Summary" />
        <View style={styles.centerContainer}>
          <MaterialIcons
            name="error-outline"
            size={iconSize['3xl']}
            color={colors.error}
          />
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={refetch}>
            <Text style={styles.retryText}>Retry</Text>
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
        title="Loan Summary"
        rightAction={
          <TouchableOpacity style={{ padding: spacing.md }} activeOpacity={0.7}>
            <MaterialIcons
              name="more-vert"
              size={iconSize.xl}
              color={colors.textPrimary}
            />
          </TouchableOpacity>
        }
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: insets.bottom + 100 }}
      >
        {/* Summary Hero Card */}
        <LoanHeroCard
          status={statusValue}
          accountNumber={loanAccountNumber}
          loanType={loanSummary?.loanProductName ?? loanName}
          loanScheme={loanSummary?.loanPurposeName ?? 'Standard Scheme'}
        />

        {/* Pay-off Details */}
        <SectionDetailCard
          iconName="payments"
          title="Pay-off Details"
          rows={[
            {
              label: 'Expected Payoff',
              value: formatAmount(
                summary?.totalExpectedRepayment ??
                  summary?.totalRepaymentExpected,
                currencySymbol,
              ),
              variant: 'highlight',
            },
            {
              label: 'Principal',
              value: formatAmount(summary?.principalDisbursed, currencySymbol),
            },
            {
              label: 'Interest',
              value: formatAmount(summary?.interestCharged, currencySymbol),
            },
            {
              label: 'Rate',
              value:
                loanSummary?.interestRatePerPeriod != null
                  ? `${loanSummary.interestRatePerPeriod.toFixed(2)}%`
                  : 'N/A',
            },
          ]}
        />

        {/* Outstanding Details */}
        <SectionDetailCard
          iconName="account-balance-wallet"
          title="Outstanding Details"
          rows={[
            {
              label: 'Total Outstanding',
              value: formatAmount(summary?.totalOutstanding, currencySymbol),
              variant:
                (summary?.totalOutstanding ?? 0) > 0 ? 'danger' : 'default',
            },
            {
              label: 'Principal Outstanding',
              value: formatAmount(
                summary?.principalOutstanding,
                currencySymbol,
              ),
            },
            {
              label: 'Interest Outstanding',
              value: formatAmount(summary?.interestOutstanding, currencySymbol),
            },
          ]}
        />

        {/* Charges */}
        <SectionDetailCard
          iconName="receipt-long"
          title="Charges"
          rows={[
            {
              label: 'Fees',
              value: formatAmount(summary?.feeChargesCharged, currencySymbol),
            },
            {
              label: 'Penalties',
              value: formatAmount(
                summary?.penaltyChargesCharged,
                currencySymbol,
              ),
            },
          ]}
        />

        {/* Waivers */}
        <SectionDetailCard
          iconName="redeem"
          title="Waivers"
          rows={[
            {
              label: 'Interest Waived',
              value: formatAmount(summary?.interestWaived, currencySymbol),
            },
            {
              label: 'Penalties Waived',
              value: formatAmount(
                summary?.penaltyChargesWaived,
                currencySymbol,
              ),
            },
            {
              label: 'Fees Waived',
              value: formatAmount(summary?.feeChargesWaived, currencySymbol),
            },
          ]}
        />

        {/* Paid-off Details */}
        <SectionDetailCard
          iconName="check-circle"
          title="Paid-off Details"
          rows={[
            {
              label: 'Principal Paid',
              value: formatAmount(summary?.principalPaid, currencySymbol),
            },
            {
              label: 'Interest Paid',
              value: formatAmount(summary?.interestPaid, currencySymbol),
            },
            {
              label: 'Fees Paid',
              value: formatAmount(summary?.feeChargesPaid, currencySymbol),
            },
            {
              label: 'Penalties Paid',
              value: formatAmount(summary?.penaltyChargesPaid, currencySymbol),
            },
          ]}
        />

        {/* Installment Details */}
        <InstallmentCard
          iconName="event"
          title="Installment Details"
          items={[
            {
              label: 'Regular Payment',
              value: nextPeriod
                ? formatAmount(nextPeriod.totalDueForPeriod, currencySymbol)
                : 'N/A',
            },
            {
              label: 'Months Left',
              value: String(remainingPeriods),
            },
          ]}
          nextPayment={
            nextPeriod?.dueDate
              ? {
                  iconName: 'event',
                  label: 'Next Payment Date',
                  value: formatDateFromArray(nextPeriod.dueDate),
                }
              : undefined
          }
        />
      </ScrollView>
    </View>
  );
}

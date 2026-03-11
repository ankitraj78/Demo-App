import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { colors, spacing, iconSize } from '../../theme';
import { styles } from './transactionHistory.styles';
import { useLoanDetails } from '../../hooks/useLoanDetails';
import { useSavingsTransactions } from '../../hooks/useSavingsTransactions';
import { useAuth } from '../../hooks/authContext';
import type { LoanTransaction, SavingsTransaction } from '../../services/types';
import type { RootStackParamList } from '../../navigation/rootNavigator';

type HistoryTransaction = {
  id: string;
  title: string;
  subtitle: string;
  amount: string;
  date: string;
  isCredit: boolean;
  icon: string;
  iconBg: string;
  iconColor: string;
};

type TransactionGroup = {
  date: string;
  sortKey: number;
  count: number;
  transactions: HistoryTransaction[];
};

// --- Loan transaction helpers ---

function getLoanTransactionMeta(typeCode?: string) {
  switch (typeCode) {
    case 'loanTransactionType.disbursement':
      return {
        title: 'Disbursement',
        subtitle: 'Loan Disbursement',
        icon: 'account-balance-wallet',
        iconBg: colors.errorBg,
        iconColor: colors.error,
        isCredit: false,
      };
    case 'loanTransactionType.accrual':
      return {
        title: 'Accrual',
        subtitle: 'Interest Accrual',
        icon: 'trending-up',
        iconBg: colors.successBg,
        iconColor: colors.success,
        isCredit: true,
      };
    case 'loanTransactionType.repayment':
    case 'loanTransactionType.repaymentAtDisbursement':
      return {
        title: 'Repayment',
        subtitle: 'Loan Repayment',
        icon: 'payment',
        iconBg: colors.primaryBgLight,
        iconColor: colors.primary,
        isCredit: false,
      };
    case 'loanTransactionType.waiveInterest':
      return {
        title: 'Interest Waiver',
        subtitle: 'Interest Waived',
        icon: 'money-off',
        iconBg: colors.successBg,
        iconColor: colors.success,
        isCredit: true,
      };
    case 'loanTransactionType.writeOff':
      return {
        title: 'Write Off',
        subtitle: 'Loan Write Off',
        icon: 'cancel',
        iconBg: colors.errorBg,
        iconColor: colors.error,
        isCredit: false,
      };
    case 'loanTransactionType.chargePayment':
      return {
        title: 'Charge Payment',
        subtitle: 'Fee/Charge Paid',
        icon: 'receipt-long',
        iconBg: colors.borderLight,
        iconColor: colors.textMuted,
        isCredit: false,
      };
    default:
      return {
        title: 'Transaction',
        subtitle: typeCode?.split('.').pop() ?? 'Loan Transaction',
        icon: 'swap-horiz',
        iconBg: colors.borderLight,
        iconColor: colors.textMuted,
        isCredit: false,
      };
  }
}

// --- Savings transaction helpers ---

function getSavingsTransactionMeta(tx: SavingsTransaction) {
  const typeCode = tx.transactionType?.code;
  const isDeposit = tx.transactionType?.deposit;
  const isWithdrawal = tx.transactionType?.withdrawal;
  const isInterestPosting = tx.transactionType?.interestPosting;
  const isFeeDeduction = tx.transactionType?.feeDeduction;

  if (isDeposit) {
    return {
      title: 'Deposit',
      subtitle: tx.transfer?.transferDescription || 'Savings Deposit',
      icon: 'arrow-downward',
      iconBg: colors.successBg,
      iconColor: colors.success,
      isCredit: true,
    };
  }
  if (isWithdrawal) {
    return {
      title: 'Withdrawal',
      subtitle: tx.transfer?.transferDescription || 'Savings Withdrawal',
      icon: 'arrow-upward',
      iconBg: colors.errorBg,
      iconColor: colors.error,
      isCredit: false,
    };
  }
  if (isInterestPosting) {
    return {
      title: 'Interest Posted',
      subtitle: 'Interest Earned',
      icon: 'trending-up',
      iconBg: colors.successBg,
      iconColor: colors.success,
      isCredit: true,
    };
  }
  if (isFeeDeduction) {
    return {
      title: 'Fee Deduction',
      subtitle: 'Account Fee',
      icon: 'receipt-long',
      iconBg: colors.borderLight,
      iconColor: colors.textMuted,
      isCredit: false,
    };
  }

  return {
    title: tx.transactionType?.value ?? 'Transaction',
    subtitle: typeCode?.split('.').pop() ?? 'Savings Transaction',
    icon: 'swap-horiz',
    iconBg: colors.borderLight,
    iconColor: colors.textMuted,
    isCredit: tx.entryType === 'CREDIT',
  };
}

// --- Common helpers ---

function formatDateFromArray(dateArr?: number[]): string {
  if (!dateArr || dateArr.length < 3) {
    return 'Unknown';
  }
  const [year, month, day] = dateArr;
  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString('en-GB', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

function getDateSortKey(dateArr?: number[]): number {
  if (!dateArr || dateArr.length < 3) {
    return 0;
  }
  return new Date(dateArr[0], dateArr[1] - 1, dateArr[2]).getTime();
}

function formatAmount(
  amount?: number,
  symbol?: string,
  isCredit?: boolean,
): string {
  if (amount == null) {
    return 'N/A';
  }
  const sym = symbol ?? '$';
  const formatted = amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return `${isCredit ? '+' : '-'}${sym}${formatted}`;
}

function mapLoanTransaction(
  tx: LoanTransaction,
  currencySymbol: string,
): HistoryTransaction {
  const meta = getLoanTransactionMeta(tx.type?.code);
  return {
    id: String(tx.id ?? Math.random()),
    title: meta.title,
    subtitle: meta.subtitle,
    amount: formatAmount(tx.amount, currencySymbol, meta.isCredit),
    date: formatDateFromArray(tx.date),
    isCredit: meta.isCredit,
    icon: meta.icon,
    iconBg: meta.iconBg,
    iconColor: meta.iconColor,
  };
}

function mapSavingsTransaction(
  tx: SavingsTransaction,
  currencySymbol: string,
): HistoryTransaction {
  const meta = getSavingsTransactionMeta(tx);
  return {
    id: String(tx.id ?? Math.random()),
    title: meta.title,
    subtitle: meta.subtitle,
    amount: formatAmount(tx.amount, currencySymbol, meta.isCredit),
    date: formatDateFromArray(tx.date),
    isCredit: meta.isCredit,
    icon: meta.icon,
    iconBg: meta.iconBg,
    iconColor: meta.iconColor,
  };
}

function groupByDate(items: HistoryTransaction[]): TransactionGroup[] {
  const groups: Record<
    string,
    { sortKey: number; items: HistoryTransaction[] }
  > = {};

  for (const item of items) {
    const dateLabel = item.date;
    if (!groups[dateLabel]) {
      groups[dateLabel] = { sortKey: 0, items: [] };
    }
    groups[dateLabel].items.push(item);
  }

  return Object.entries(groups)
    .map(([date, { items: txItems }]) => ({
      date,
      sortKey: txItems[0] ? getDateSortKey(parseDateLabel(date)) : 0,
      count: txItems.length,
      transactions: txItems,
    }))
    .sort((a, b) => b.sortKey - a.sortKey);
}

function parseDateLabel(label: string): number[] | undefined {
  const d = new Date(label);
  if (isNaN(d.getTime())) {
    return undefined;
  }
  return [d.getFullYear(), d.getMonth() + 1, d.getDate()];
}

function groupLoanTransactionsByDate(
  transactions: LoanTransaction[],
  currencySymbol: string,
): TransactionGroup[] {
  const mapped = transactions
    .filter(tx => !tx.reversed)
    .map(tx => mapLoanTransaction(tx, currencySymbol));
  return groupByDate(mapped);
}

function groupSavingsTransactionsByDate(
  transactions: SavingsTransaction[],
  currencySymbol: string,
): TransactionGroup[] {
  const mapped = transactions
    .filter(tx => !tx.reversed)
    .map(tx => mapSavingsTransaction(tx, currencySymbol));
  return groupByDate(mapped);
}

function TransactionItem({
  transaction,
  onPress,
}: {
  transaction: HistoryTransaction;
  onPress?: () => void;
}) {
  const amountColor = transaction.isCredit ? colors.success : colors.error;

  return (
    <TouchableOpacity
      style={styles.txItem}
      activeOpacity={0.7}
      onPress={onPress}
    >
      <View
        style={[
          styles.txIconContainer,
          { backgroundColor: transaction.iconBg },
        ]}
      >
        <MaterialIcons
          name={transaction.icon}
          size={iconSize.xl}
          color={transaction.iconColor}
        />
      </View>
      <View style={styles.txInfo}>
        <Text style={styles.txTitle}>{transaction.title}</Text>
        <Text style={styles.txSubtitle}>{transaction.subtitle}</Text>
      </View>
      <View style={styles.txAmountContainer}>
        <Text style={[styles.txAmount, { color: amountColor }]}>
          {transaction.amount}
        </Text>
        <Text style={styles.txTime}>{transaction.date}</Text>
      </View>
    </TouchableOpacity>
  );
}

export default function TransactionHistoryScreen() {
  const insets = useSafeAreaInsets();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute();
  const { clientId } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');

  const loanId = (route.params as { loanId?: number } | undefined)?.loanId;
  const hasLoanId = loanId != null && loanId > 0;

  // Loan transactions (when navigated with a loanId)
  const {
    loanDetails,
    loading: loanLoading,
    error: loanError,
    refetch: loanRefetch,
  } = useLoanDetails(hasLoanId ? loanId : 0);

  // Savings transactions (when opened from bottom nav without loanId)
  const {
    savingsDetails,
    loading: savingsLoading,
    error: savingsError,
    refetch: savingsRefetch,
  } = useSavingsTransactions(hasLoanId ? null : clientId);

  const loading = hasLoanId ? loanLoading : savingsLoading;
  const error = hasLoanId ? loanError : savingsError;
  const refetch = hasLoanId ? loanRefetch : savingsRefetch;

  const currencySymbol = hasLoanId
    ? loanDetails?.currency?.displaySymbol ?? '$'
    : savingsDetails?.currency?.displaySymbol ?? '$';

  const accountTitle = hasLoanId
    ? loanDetails?.loanProductName
    : savingsDetails?.savingsProductName;

  const accountNo = hasLoanId
    ? loanDetails?.accountNo
    : savingsDetails?.accountNo;

  const transactionGroups = useMemo(() => {
    if (hasLoanId) {
      if (!loanDetails?.transactions) {
        return [];
      }
      return groupLoanTransactionsByDate(
        loanDetails.transactions,
        currencySymbol,
      );
    }
    if (!savingsDetails?.transactions) {
      return [];
    }
    return groupSavingsTransactionsByDate(
      savingsDetails.transactions,
      currencySymbol,
    );
  }, [
    hasLoanId,
    loanDetails?.transactions,
    savingsDetails?.transactions,
    currencySymbol,
  ]);

  const filteredGroups = useMemo(() => {
    if (!searchQuery.trim()) {
      return transactionGroups;
    }
    const query = searchQuery.toLowerCase();
    return transactionGroups
      .map(group => ({
        ...group,
        transactions: group.transactions.filter(
          tx =>
            tx.title.toLowerCase().includes(query) ||
            tx.subtitle.toLowerCase().includes(query) ||
            tx.amount.toLowerCase().includes(query),
        ),
      }))
      .filter(group => group.transactions.length > 0)
      .map(group => ({ ...group, count: group.transactions.length }));
  }, [transactionGroups, searchQuery]);

  return (
    <View style={styles.root}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />

      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + spacing.lg }]}>
        <TouchableOpacity
          style={styles.headerBtn}
          activeOpacity={0.7}
          onPress={() => navigation.goBack()}
        >
          <MaterialIcons
            name="arrow-back"
            size={iconSize.xl}
            color={colors.textSecondary}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Transaction History</Text>
        <TouchableOpacity
          style={styles.headerBtn}
          activeOpacity={0.7}
          onPress={() => navigation.navigate('Filters')}
        >
          <MaterialIcons
            name="filter-list"
            size={iconSize.xl}
            color={colors.textSecondary}
          />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <MaterialIcons
            name="search"
            size={iconSize.md}
            color={colors.textMuted}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search transactions..."
            placeholderTextColor={colors.textMuted}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      {/* Content */}
      {loading ? (
        <View style={styles.emptyContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles.loadingText}>Loading transactions...</Text>
        </View>
      ) : error ? (
        <View style={styles.emptyContainer}>
          <MaterialIcons name="error-outline" size={48} color={colors.error} />
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity style={styles.retryBtn} onPress={refetch}>
            <Text style={styles.retryText}>Retry</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            styles.scrollContent,
            { paddingBottom: insets.bottom + 100 },
          ]}
        >
          {/* Account Info (only for loan transactions) */}
          {hasLoanId && accountTitle && (
            <View style={styles.loanInfoCard}>
              <Text style={styles.loanInfoTitle}>{accountTitle}</Text>
              <Text style={styles.loanInfoAccount}>A/C: {accountNo}</Text>
            </View>
          )}

          {filteredGroups.length === 0 ? (
            <View style={styles.emptyContainer}>
              <MaterialIcons
                name="receipt-long"
                size={48}
                color={colors.textMuted}
              />
              <Text style={styles.emptyText}>
                {searchQuery
                  ? 'No matching transactions'
                  : 'No transactions found'}
              </Text>
            </View>
          ) : (
            filteredGroups.map((group, idx) => (
              <View
                key={group.date}
                style={[styles.section, idx > 0 && { opacity: 0.85 }]}
              >
                <View style={styles.sectionHeader}>
                  <Text style={styles.sectionDate}>{group.date}</Text>
                  <View style={styles.sectionBadge}>
                    <Text style={styles.sectionBadgeText}>
                      {group.count}{' '}
                      {group.count === 1 ? 'Transaction' : 'Transactions'}
                    </Text>
                  </View>
                </View>
                <View style={styles.transactionList}>
                  {group.transactions.map(tx => (
                    <TransactionItem
                      key={tx.id}
                      transaction={tx}
                      onPress={() => {
                        if (hasLoanId && loanId) {
                          navigation.navigate('TransactionDetails', {
                            loanId,
                            transactionId: Number(tx.id),
                            loanAccountNo: loanDetails?.accountNo ?? '',
                            loanProductName: loanDetails?.loanProductName ?? '',
                          });
                        }
                      }}
                    />
                  ))}
                </View>
              </View>
            ))
          )}
        </ScrollView>
      )}
    </View>
  );
}

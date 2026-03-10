import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {colors, spacing, iconSize} from '../../../theme';
import {styles} from './transactionHistory.styles';

type HistoryTransaction = {
  id: string;
  title: string;
  subtitle: string;
  amount: string;
  time?: string;
  isCredit?: boolean;
  icon: string;
  iconBg: string;
  iconColor: string;
};

type TransactionGroup = {
  date: string;
  count?: number;
  transactions: HistoryTransaction[];
  dimmed?: boolean;
};

const transactionGroups: TransactionGroup[] = [
  {
    date: 'Today, 9 Mar 2026',
    count: 4,
    transactions: [
      {
        id: '1',
        title: 'Disbursement',
        subtitle: 'Loan Disbursement',
        amount: '-$1,000.00',
        time: '10:24 AM',
        isCredit: false,
        icon: 'account-balance-wallet',
        iconBg: colors.errorBg,
        iconColor: colors.error,
      },
      {
        id: '2',
        title: 'Accrual',
        subtitle: 'Interest Earnings',
        amount: '+$392.13',
        time: '09:15 AM',
        isCredit: true,
        icon: 'trending-up',
        iconBg: colors.successBg,
        iconColor: colors.success,
      },
      {
        id: '3',
        title: 'Repayment',
        subtitle: 'Loan installment',
        amount: '-$174.01',
        time: '08:30 AM',
        isCredit: false,
        icon: 'payment',
        iconBg: colors.borderLight,
        iconColor: colors.primary,
      },
      {
        id: '4',
        title: 'Repayment',
        subtitle: 'Partial Payment',
        amount: '-$500.00',
        time: '07:05 AM',
        isCredit: false,
        icon: 'payment',
        iconBg: colors.borderLight,
        iconColor: colors.primary,
      },
    ],
  },
  {
    date: 'Yesterday, 8 Mar 2026',
    dimmed: true,
    transactions: [
      {
        id: '5',
        title: 'Merchant Payment',
        subtitle: 'Groceries Store',
        amount: '-$45.20',
        icon: 'shopping-cart',
        iconBg: colors.borderLight,
        iconColor: colors.textMuted,
      },
    ],
  },
];

function TransactionItem({transaction}: {transaction: HistoryTransaction}) {
  const amountColor =
    transaction.isCredit === true
      ? colors.success
      : transaction.isCredit === false
        ? colors.error
        : colors.textPrimary;

  return (
    <View style={styles.txItem}>
      <View
        style={[styles.txIconContainer, {backgroundColor: transaction.iconBg}]}>
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
        <Text style={[styles.txAmount, {color: amountColor}]}>
          {transaction.amount}
        </Text>
        {transaction.time ? (
          <Text style={styles.txTime}>{transaction.time}</Text>
        ) : null}
      </View>
    </View>
  );
}

export default function TransactionHistoryScreen() {
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <View style={styles.root}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />

      {/* Header */}
      <View style={[styles.header, {paddingTop: insets.top + spacing.lg}]}>
        <TouchableOpacity style={styles.headerBtn} activeOpacity={0.7}>
          <MaterialIcons
            name="arrow-back"
            size={iconSize.xl}
            color={colors.textSecondary}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Transaction History</Text>
        <TouchableOpacity style={styles.headerBtn} activeOpacity={0.7}>
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

      {/* Transaction List */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scrollContent,
          {paddingBottom: insets.bottom + 100},
        ]}>
        {transactionGroups.map(group => (
          <View
            key={group.date}
            style={[styles.section, group.dimmed && {opacity: 0.6}]}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionDate}>{group.date}</Text>
              {group.count != null && (
                <View style={styles.sectionBadge}>
                  <Text style={styles.sectionBadgeText}>
                    {group.count} Transactions
                  </Text>
                </View>
              )}
            </View>
            <View style={styles.transactionList}>
              {group.transactions.map(tx => (
                <TransactionItem key={tx.id} transaction={tx} />
              ))}
            </View>
          </View>
        ))}

        {/* Powered by Mifos Footer */}
        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>Powered by Mifos</Text>
        </View>
      </ScrollView>
    </View>
  );
}

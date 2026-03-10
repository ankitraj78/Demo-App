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
import {styles} from './recentTransactions.styles';

type Transaction = {
  id: string;
  icon: string;
  name: string;
  type: 'withdrawal' | 'deposit';
  typeLabel: string;
  time: string;
  amount: string;
  status: string;
  iconBg: string;
  iconColor: string;
};

type TransactionGroup = {
  title: string;
  data: Transaction[];
};

const FILTERS = ['All', 'Withdrawals', 'Deposits', 'Refunds'];

const transactionGroups: TransactionGroup[] = [
  {
    title: 'Today',
    data: [
      {
        id: '1',
        icon: 'shopping-cart',
        name: 'Supermarket',
        type: 'withdrawal',
        typeLabel: 'Withdrawal',
        time: '10:24 AM',
        amount: '-$42.50',
        status: 'Completed',
        iconBg: colors.errorBg,
        iconColor: colors.error,
      },
      {
        id: '2',
        icon: 'payments',
        name: 'Salary Deposit',
        type: 'deposit',
        typeLabel: 'Deposit',
        time: '08:00 AM',
        amount: '+$3,200.00',
        status: 'Completed',
        iconBg: colors.successBg,
        iconColor: colors.success,
      },
    ],
  },
  {
    title: 'Yesterday',
    data: [
      {
        id: '3',
        icon: 'subscriptions',
        name: 'Netflix',
        type: 'withdrawal',
        typeLabel: 'Withdrawal',
        time: '11:15 PM',
        amount: '-$15.99',
        status: 'Completed',
        iconBg: colors.primaryBgLight,
        iconColor: colors.primary,
      },
      {
        id: '4',
        icon: 'restaurant',
        name: 'Pizza Palace',
        type: 'withdrawal',
        typeLabel: 'Withdrawal',
        time: '07:45 PM',
        amount: '-$28.00',
        status: 'Completed',
        iconBg: colors.orangeBg,
        iconColor: colors.orange,
      },
      {
        id: '5',
        icon: 'person',
        name: 'From John Doe',
        type: 'deposit',
        typeLabel: 'Deposit',
        time: '02:20 PM',
        amount: '+$50.00',
        status: 'Completed',
        iconBg: colors.successBg,
        iconColor: colors.success,
      },
    ],
  },
];

export default function RecentTransactionsScreen() {
  const insets = useSafeAreaInsets();
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredGroups = transactionGroups
    .map(group => ({
      ...group,
      data: group.data.filter(tx => {
        const matchesFilter =
          activeFilter === 'All' ||
          (activeFilter === 'Withdrawals' && tx.type === 'withdrawal') ||
          (activeFilter === 'Deposits' && tx.type === 'deposit');
        const matchesSearch =
          !searchQuery ||
          tx.name.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesFilter && matchesSearch;
      }),
    }))
    .filter(group => group.data.length > 0);

  return (
    <View style={styles.root}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={colors.backgroundLight}
      />

      {/* Header */}
      <View style={[styles.header, {paddingTop: insets.top + spacing.xl}]}>
        <View style={styles.headerRow}>
          <View style={styles.headerLeft}>
            <TouchableOpacity style={styles.backBtn} activeOpacity={0.7}>
              <MaterialIcons
                name="arrow-back"
                size={iconSize.xl}
                color={colors.primary}
              />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Recent Transactions</Text>
          </View>
          <TouchableOpacity style={styles.filterBtn} activeOpacity={0.7}>
            <MaterialIcons
              name="filter-list"
              size={iconSize.xl}
              color={colors.primary}
            />
          </TouchableOpacity>
        </View>

        {/* Search */}
        <View style={styles.searchContainer}>
          <View style={styles.searchIcon}>
            <MaterialIcons
              name="search"
              size={iconSize.lg}
              color={colors.slate400}
            />
          </View>
          <TextInput
            style={styles.searchInput}
            placeholder="Search transactions"
            placeholderTextColor={colors.slate400}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Quick Filters */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filtersRow}>
          {FILTERS.map(filter => (
            <TouchableOpacity
              key={filter}
              style={[
                styles.filterChip,
                activeFilter === filter && styles.filterChipActive,
              ]}
              onPress={() => setActiveFilter(filter)}
              activeOpacity={0.7}>
              <Text
                style={[
                  styles.filterChipText,
                  activeFilter === filter && styles.filterChipTextActive,
                ]}>
                {filter}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Transaction List */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.content,
          {paddingBottom: insets.bottom + spacing['6xl']},
        ]}>
        {filteredGroups.map(group => (
          <View key={group.title}>
            <Text style={styles.sectionLabel}>{group.title}</Text>
            <View style={styles.sectionList}>
              {group.data.map(tx => (
                <TouchableOpacity
                  key={tx.id}
                  style={styles.transactionItem}
                  activeOpacity={0.7}>
                  <View style={styles.transactionLeft}>
                    <View
                      style={[
                        styles.transactionIconBox,
                        {backgroundColor: tx.iconBg},
                      ]}>
                      <MaterialIcons
                        name={tx.icon}
                        size={iconSize.xl}
                        color={tx.iconColor}
                      />
                    </View>
                    <View style={styles.transactionInfo}>
                      <Text style={styles.transactionName}>{tx.name}</Text>
                      <Text style={styles.transactionMeta}>
                        {tx.typeLabel} {'\u2022'} {tx.time}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.transactionRight}>
                    <Text
                      style={[
                        styles.transactionAmount,
                        tx.type === 'withdrawal'
                          ? styles.amountWithdrawal
                          : styles.amountDeposit,
                      ]}>
                      {tx.amount}
                    </Text>
                    <Text style={styles.transactionStatus}>{tx.status}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

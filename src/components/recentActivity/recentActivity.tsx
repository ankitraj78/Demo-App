import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {colors, iconSize} from '../../../theme';
import {styles} from './recentActivity.styles';

type Transaction = {
  icon: string;
  title: string;
  subtitle: string;
  amount: string;
  isCredit: boolean;
  iconBg: string;
  iconColor: string;
};

const transactions: Transaction[] = [
  {
    icon: 'shopping-bag',
    title: 'Netflix Subscription',
    subtitle: 'Today, 10:45 AM',
    amount: '-$15.99',
    isCredit: false,
    iconBg: colors.errorBg,
    iconColor: colors.error,
  },
  {
    icon: 'account-balance-wallet',
    title: 'Deposit from External',
    subtitle: 'Yesterday, 4:20 PM',
    amount: '+$1,200.00',
    isCredit: true,
    iconBg: colors.successBg,
    iconColor: colors.success,
  },
];

function TransactionItem({transaction}: {transaction: Transaction}) {
  return (
    <View style={styles.txRow}>
      <View style={[styles.txIcon, {backgroundColor: transaction.iconBg}]}>
        <MaterialIcons
          name={transaction.icon}
          size={iconSize.lg}
          color={transaction.iconColor}
        />
      </View>
      <View style={styles.txInfo}>
        <Text style={styles.txTitle}>{transaction.title}</Text>
        <Text style={styles.txSubtitle}>{transaction.subtitle}</Text>
      </View>
      <Text
        style={[
          styles.txAmount,
          {color: transaction.isCredit ? colors.success : colors.error},
        ]}>
        {transaction.amount}
      </Text>
    </View>
  );
}

export default function RecentActivity() {
  return (
    <View style={styles.activitySection}>
      <View style={styles.activityHeader}>
        <Text style={styles.activityTitle}>Recent Activity</Text>
        <TouchableOpacity>
          <Text style={styles.seeAllText}>See All</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.txCard}>
        {transactions.map((tx, i) => (
          <React.Fragment key={tx.title}>
            <TransactionItem transaction={tx} />
            {i < transactions.length - 1 && <View style={styles.txDivider} />}
          </React.Fragment>
        ))}
      </View>
    </View>
  );
}

import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import type { RootStackParamList } from '../../navigation/rootNavigator';
import { colors, spacing, iconSize } from '../../../theme';
import ScreenHeader from '../../components/screenHeader/screenHeader';
import SummaryCard from '../../components/summaryCard/summaryCard';
import { styles } from './loanAccounts.styles';

type LoanStatus = 'active' | 'pending' | 'withdrawn';

type Loan = {
  icon: string;
  name: string;
  id: string;
  status: LoanStatus;
  statusLabel: string;
  amountLabel: string;
  amount?: string;
  note?: string;
};

const loans: Loan[] = [
  {
    icon: 'home',
    name: 'Home Loan',
    id: '000000012',
    status: 'active',
    statusLabel: 'Active',
    amountLabel: 'Remaining Balance',
    amount: '$32,500.00',
  },
  {
    icon: 'directions-car',
    name: 'Auto Loan',
    id: '000000015',
    status: 'pending',
    statusLabel: 'Submitted & Pending',
    amountLabel: 'Requested Amount',
    amount: '$12,500.00',
  },
  {
    icon: 'school',
    name: 'Education Loan',
    id: '000000009',
    status: 'withdrawn',
    statusLabel: 'Withdrawn',
    amountLabel: '',
    note: 'Application withdrawn by applicant on Oct 24, 2023.',
  },
];

function StatusBadge({ status, label }: { status: LoanStatus; label: string }) {
  const badgeStyle = [
    styles.statusBadge,
    status === 'active' && styles.statusBadgeActive,
    status === 'pending' && styles.statusBadgePending,
    status === 'withdrawn' && styles.statusBadgeWithdrawn,
  ];
  const textStyle = [
    styles.statusText,
    status === 'active' && styles.statusTextActive,
    status === 'pending' && styles.statusTextPending,
    status === 'withdrawn' && styles.statusTextWithdrawn,
  ];

  return (
    <View style={badgeStyle}>
      <Text style={textStyle}>{label}</Text>
    </View>
  );
}

function LoanCard({ loan, onPress }: { loan: Loan; onPress?: () => void }) {
  const isWithdrawn = loan.status === 'withdrawn';
  const isPending = loan.status === 'pending';

  return (
    <TouchableOpacity
      style={[styles.loanCard, isWithdrawn && styles.loanCardWithdrawn]}
      onPress={onPress}
      disabled={isWithdrawn}
      activeOpacity={0.7}
    >
      <View style={styles.loanCardTop}>
        <View
          style={[
            styles.loanCardInfo,
            isWithdrawn && styles.loanCardInfoWithdrawn,
          ]}
        >
          <View
            style={[
              styles.loanIconBox,
              isWithdrawn && styles.loanIconBoxWithdrawn,
            ]}
          >
            <MaterialIcons
              name={loan.icon}
              size={iconSize.xl}
              color={isWithdrawn ? colors.slate500 : colors.primary}
            />
          </View>
          <View>
            <Text style={styles.loanName}>{loan.name}</Text>
            <Text style={styles.loanId}>ID: {loan.id}</Text>
          </View>
        </View>
        <StatusBadge status={loan.status} label={loan.statusLabel} />
      </View>

      {isWithdrawn ? (
        <View style={styles.loanCardBottomWithdrawn}>
          <Text style={styles.withdrawnText}>{loan.note}</Text>
        </View>
      ) : (
        <View style={styles.loanCardBottom}>
          <View>
            <Text style={styles.balanceLabel}>{loan.amountLabel}</Text>
            <Text
              style={
                isPending ? styles.balanceAmountNeutral : styles.balanceAmount
              }
            >
              {loan.amount}
            </Text>
          </View>
          {isPending ? (
            <View style={styles.reviewBadge}>
              <MaterialIcons
                name="schedule"
                size={iconSize.sm}
                color={colors.amber}
              />
              <Text style={styles.reviewText}>In Review</Text>
            </View>
          ) : (
            <TouchableOpacity style={styles.detailsBtn}>
              <Text style={styles.detailsBtnText}>Details</Text>
              <MaterialIcons
                name="chevron-right"
                size={iconSize.md}
                color={colors.primary}
              />
            </TouchableOpacity>
          )}
        </View>
      )}
    </TouchableOpacity>
  );
}

export default function LoanAccountsScreen() {
  const insets = useSafeAreaInsets();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleLoanPress = (loan: Loan) => {
    navigation.navigate('LoanDetails', {
      name: loan.name,
      accountNumber: loan.id,
      balance: loan.amount ?? '$0.00',
    });
  };

  return (
    <View style={styles.root}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />

      <ScreenHeader
        title="Loan Accounts"
        backgroundColor={colors.white}
        rightAction={
          <TouchableOpacity style={styles.moreBtn}>
            <MaterialIcons
              name="more-vert"
              size={iconSize.xl}
              color={colors.textMuted}
            />
          </TouchableOpacity>
        }
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: insets.bottom + spacing.xl }}
      >
        {/* Summary Card */}
        <SummaryCard
          label="Total Borrowings"
          amount="$45,000.00"
          badgeIconName="account-balance-wallet"
          badgeText="3 Active Accounts"
        />

        {/* Section Title */}
        <View style={styles.sectionTitleWrapper}>
          <Text style={styles.sectionTitle}>Your Loans</Text>
        </View>

        {/* Loan Cards */}
        <View style={styles.loanList}>
          {loans.map(loan => (
            <LoanCard
              key={loan.id}
              loan={loan}
              onPress={() => handleLoanPress(loan)}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

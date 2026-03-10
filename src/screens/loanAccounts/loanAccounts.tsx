import React from 'react';
import {
  View,
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
import SectionTitle from '../../components/sectionTitle/sectionTitle';
import LoanCard from '../../components/loanCard/loanCard';
import type { Loan } from '../../components/loanCard/loanCard';
import { styles } from './loanAccounts.styles';

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
        <SectionTitle title="Your Loans" />

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

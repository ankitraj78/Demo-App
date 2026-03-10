import React from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
  Text,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import type {RootStackParamList} from '../../navigation/rootNavigator';
import {colors, spacing, iconSize} from '../../../theme';
import ScreenHeader from '../../components/screenHeader/screenHeader';
import SummaryCard from '../../components/summaryCard/summaryCard';
import SectionTitle from '../../components/sectionTitle/sectionTitle';
import LoanCard from '../../components/loanCard/loanCard';
import type {Loan} from '../../components/loanCard/loanCard';
import {useLoanAccounts} from '../../api/useLoanAccounts';
import {useAuth} from '../../api/authContext';
import type {LoanAccount} from '../../api/types';
import {styles} from './loanAccounts.styles';

function getLoanIcon(productName?: string): string {
  const name = (productName ?? '').toLowerCase();
  if (name.includes('home') || name.includes('housing')) {
    return 'home';
  }
  if (name.includes('auto') || name.includes('car') || name.includes('vehicle')) {
    return 'directions-car';
  }
  if (name.includes('education') || name.includes('student')) {
    return 'school';
  }
  if (name.includes('personal')) {
    return 'person';
  }
  if (name.includes('business')) {
    return 'business';
  }
  return 'account-balance';
}

function mapLoanStatus(
  status?: LoanAccount['status'],
): {status: Loan['status']; statusLabel: string} {
  if (status?.active) {
    return {status: 'active', statusLabel: 'Active'};
  }
  if (status?.pendingApproval || status?.waitingForDisbursal) {
    return {status: 'pending', statusLabel: 'Submitted & Pending'};
  }
  if (
    status?.closed ||
    status?.closedObligationsMet ||
    status?.closedWrittenOff ||
    status?.closedRescheduled
  ) {
    return {status: 'withdrawn', statusLabel: 'Closed'};
  }
  if (status?.overpaid) {
    return {status: 'active', statusLabel: 'Overpaid'};
  }
  return {status: 'pending', statusLabel: status?.value ?? 'Unknown'};
}

function formatCurrency(
  amount: number,
  symbol?: string,
  decimalPlaces?: number,
): string {
  const dp = decimalPlaces ?? 2;
  const sym = symbol ?? '$';
  return `${sym}${amount.toFixed(dp).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
}

function mapToLoan(account: LoanAccount): Loan {
  const {status, statusLabel} = mapLoanStatus(account.status);
  const symbol = account.currency?.displaySymbol;
  const dp = account.currency?.decimalPlaces;
  const isWithdrawn = status === 'withdrawn';

  return {
    icon: getLoanIcon(account.productName),
    name: account.productName ?? 'Loan',
    id: account.accountNo ?? String(account.id),
    loanId: account.id,
    status,
    statusLabel,
    amountLabel: isWithdrawn ? '' : 'Remaining Balance',
    amount: isWithdrawn
      ? undefined
      : formatCurrency(account.loanBalance ?? 0, symbol, dp),
    note: isWithdrawn
      ? `Loan closed. Status: ${account.status?.value ?? 'Closed'}.`
      : undefined,
  };
}

function computeTotalBorrowings(accounts: LoanAccount[]): string {
  const total = accounts.reduce((sum, a) => sum + (a.loanBalance ?? 0), 0);
  const symbol = accounts[0]?.currency?.displaySymbol ?? '$';
  const dp = accounts[0]?.currency?.decimalPlaces ?? 2;
  return formatCurrency(total, symbol, dp);
}

export default function LoanAccountsScreen() {
  const insets = useSafeAreaInsets();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const {clientId} = useAuth();
  const {loanAccounts, loading, error, refetch} = useLoanAccounts(clientId ?? 0);

  const loans = loanAccounts.map(mapToLoan);
  const activeCount = loanAccounts.filter(a => a.status?.active).length;

  const handleLoanPress = (loan: Loan) => {
    navigation.navigate('LoanDetails', {
      loanId: loan.loanId,
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

      {loading ? (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      ) : error ? (
        <View style={styles.centerContainer}>
          <MaterialIcons
            name="error-outline"
            size={48}
            color={colors.textMuted}
          />
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity style={styles.retryBtn} onPress={refetch}>
            <Text style={styles.retryBtnText}>Retry</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: insets.bottom + spacing.xl}}>
          <SummaryCard
            label="Total Borrowings"
            amount={computeTotalBorrowings(loanAccounts)}
            badgeIconName="account-balance-wallet"
            badgeText={`${activeCount} Active Account${activeCount !== 1 ? 's' : ''}`}
          />

          <SectionTitle title="Your Loans" />

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
      )}
    </View>
  );
}

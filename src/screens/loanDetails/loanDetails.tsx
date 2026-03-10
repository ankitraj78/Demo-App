import React from 'react';
import {View, ScrollView, StatusBar, ActivityIndicator, Text} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useNavigation, useRoute, RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {colors, spacing} from '../../../theme';
import {styles} from './loanDetails.styles';
import type {RootStackParamList} from '../../navigation/rootNavigator';
import ScreenHeader from '../../components/screenHeader/screenHeader';
import type {ActionItem} from '../../components/actionCard/actionCard';
import ActionsSection from '../../components/actionsSection/actionsSection';
import HeroCard from '../../components/heroCard/heroCard';
import InstallmentCard from '../../components/installmentCard/installmentCard';
import {useLoanDetails} from '../../api/useLoanDetails';

type LoanDetailsRouteProp = RouteProp<RootStackParamList, 'LoanDetails'>;

function formatDateFromArray(dateArr?: number[]): string {
  if (!dateArr || dateArr.length < 3) {return 'N/A';}
  const [year, month, day] = dateArr;
  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

function formatAmount(amount?: number, symbol?: string): string {
  if (amount == null) {return 'N/A';}
  const sym = symbol ?? '$';
  return `${sym}${amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
}

const actions: ActionItem[] = [
  {
    icon: 'payments',
    title: 'Make Payment',
    subtitle: 'Pay your installment instantly',
    iconColor: colors.emerald600,
    iconBg: colors.emerald500Bg,
  },
  {
    icon: 'description',
    title: 'Loan Summary',
    subtitle: 'View detailed loan information',
    iconColor: colors.primary,
    iconBg: colors.primaryBgLight,
  },
  {
    icon: 'calendar-month',
    title: 'Repayment Schedule',
    subtitle: 'Check all upcoming payments',
    iconColor: colors.primary,
    iconBg: colors.primaryBgLight,
  },
  {
    icon: 'history',
    title: 'Transactions',
    subtitle: 'View your payment history',
    iconColor: colors.primary,
    iconBg: colors.primaryBgLight,
  },
  {
    icon: 'receipt-long',
    title: 'Charges',
    subtitle: 'List of fees and service charges',
    iconColor: colors.primary,
    iconBg: colors.primaryBgLight,
  },
  {
    icon: 'qr-code-2',
    title: 'QR Code',
    subtitle: 'Generate QR for quick reference',
    iconColor: colors.primary,
    iconBg: colors.primaryBgLight,
  },
];

export default function LoanDetailsScreen() {
  const insets = useSafeAreaInsets();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<LoanDetailsRouteProp>();
  const {loanId, name, accountNumber, balance} = route.params;

  const {loanDetails, loading, error} = useLoanDetails(loanId);

  const firstTransaction = loanDetails?.transactions?.[0];
  const currencySymbol = loanDetails?.currency?.displaySymbol ?? '$';

  const installmentAmount = firstTransaction
    ? formatAmount(firstTransaction.amount, currencySymbol)
    : null;
  const installmentDueDate = firstTransaction
    ? formatDateFromArray(firstTransaction.submittedOnDate)
    : null;

  return (
    <View style={styles.root}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.backgroundLight} />

      <ScreenHeader title="Loan Account Details" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: insets.bottom + spacing.xl}}>

        {/* Hero Card */}
        <HeroCard
          accountNumber={accountNumber}
          name={name}
          balanceLabel="Outstanding Balance"
          balance={balance}
          currency="USD"
        />

        {/* Next Installment */}
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="small" color={colors.primary} />
            <Text style={styles.loadingText}>Loading installment...</Text>
          </View>
        ) : error ? (
          <View style={styles.loadingContainer}>
            <Text style={styles.errorText}>Could not load installment data</Text>
          </View>
        ) : installmentAmount && installmentDueDate ? (
          <InstallmentCard
            iconName="event-repeat"
            title="Next Installment"
            items={[
              {label: 'Installment Amount', value: installmentAmount},
              {label: 'Due Date', value: installmentDueDate},
            ]}
          />
        ) : null}

        {/* Actions */}
        <ActionsSection
          title="Actions & Information"
          actions={actions}
          onActionPress={item => {
            if (item.title === 'Make Payment') {
              navigation.navigate('MakePayment', {
                loanName: name,
                loanAccountNumber: accountNumber,
              });
            } else if (item.title === 'Loan Summary') {
              navigation.navigate('LoanSummary', {
                loanName: name,
                loanAccountNumber: accountNumber,
              });
            } else if (item.title === 'Transactions') {
              navigation.navigate('TransactionHistory');
            } else if (item.title === 'Repayment Schedule') {
              navigation.navigate('RepaymentSchedule', {
                accountNumber,
                name,
              });
            } else if (item.title === 'QR Code') {
              navigation.navigate('QrCode');
            }
          }}
        />
      </ScrollView>
    </View>
  );
}

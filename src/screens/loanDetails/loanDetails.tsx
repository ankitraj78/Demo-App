import React from 'react';
import {View, ScrollView, StatusBar} from 'react-native';
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

type LoanDetailsRouteProp = RouteProp<RootStackParamList, 'LoanDetails'>;

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
  const {name, accountNumber, balance} = route.params;

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
        <InstallmentCard
          iconName="event-repeat"
          title="Next Installment"
          items={[
            {label: 'Amount Due', value: '$1,000.00', highlight: true},
            {label: 'Due Date', value: '9 Mar 2026'},
          ]}
        />

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

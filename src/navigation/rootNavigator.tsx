import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TabNavigator from './tabNavigator';
import LoanAccountsScreen from '../screens/loanAccounts/loanAccounts';
import LoanDetailsScreen from '../screens/loanDetails/loanDetails';
import ConfirmTransferScreen from '../screens/confirmTransfer/confirmTransfer';
import MakePaymentScreen from '../screens/makePayment/makePayment';
import TransactionAuthScreen from '../screens/transactionAuth/transactionAuth';
import RepaymentScheduleScreen from '../screens/repaymentSchedule/repaymentSchedule';
import QrCodeScreen from '../screens/qrCode/qrCode';
import LoanSummaryScreen from '../screens/loanSummary/loanSummary';
import FiltersScreen from '../screens/filters/filters';
import ConfirmBeneficiaryScreen from '../screens/confirmBeneficiary/confirmBeneficiary';
import MakeTransferScreen from '../screens/makeTransfer/makeTransfer';
import AddBeneficiaryScreen from '../screens/addBeneficiary/addBeneficiary';
import TransactionHistoryScreen from '../screens/transactionHistory/transactionHistory';

export type RootStackParamList = {
  MainTabs: undefined;
  LoanAccounts: undefined;
  LoanDetails: {
    name: string;
    accountNumber: string;
    balance: string;
  };
  ConfirmTransfer: undefined;
  MakePayment: {
    loanName: string;
    loanAccountNumber: string;
  };
  TransactionAuth: {
    amount: string;
    recipientName: string;
  };
  RepaymentSchedule: {
    accountNumber: string;
    name: string;
  };
  QrCode: undefined;
  LoanSummary: {
    loanName: string;
    loanAccountNumber: string;
  };
  Filters: undefined;
  TransactionHistory: undefined;
  MakeTransfer: undefined;
  AddBeneficiary: undefined;
  ConfirmBeneficiary: {
    name: string;
    office: string;
    accountType: string;
    accountNumber: string;
    dailyLimit: string;
  };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="MainTabs" component={TabNavigator} />
      <Stack.Screen name="LoanAccounts" component={LoanAccountsScreen} />
      <Stack.Screen name="LoanDetails" component={LoanDetailsScreen} />
      <Stack.Screen name="ConfirmTransfer" component={ConfirmTransferScreen} />
      <Stack.Screen name="MakePayment" component={MakePaymentScreen} />
      <Stack.Screen name="TransactionAuth" component={TransactionAuthScreen} />
      <Stack.Screen name="RepaymentSchedule" component={RepaymentScheduleScreen} />
      <Stack.Screen name="QrCode" component={QrCodeScreen} />
      <Stack.Screen name="Filters" component={FiltersScreen} />
      <Stack.Screen name="LoanSummary" component={LoanSummaryScreen} />
      <Stack.Screen name="TransactionHistory" component={TransactionHistoryScreen} />
      <Stack.Screen name="MakeTransfer" component={MakeTransferScreen} />
      <Stack.Screen name="AddBeneficiary" component={AddBeneficiaryScreen} />
      <Stack.Screen name="ConfirmBeneficiary" component={ConfirmBeneficiaryScreen} />
    </Stack.Navigator>
  );
}

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '../hooks/authContext';
import LoginScreen from '../screens/login/login';
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
import TransactionDetailsScreen from '../screens/transactionDetails/transactionDetails';

export type RootStackParamList = {
  Login: undefined;
  MainTabs: undefined;
  LoanAccounts: undefined;
  LoanDetails: {
    loanId: number;
    name: string;
    accountNumber: string;
    balance: string;
  };
  ConfirmTransfer: {
    fromAccountName: string;
    fromAccountNo: string;
    fromOfficeId: number;
    fromClientId: number;
    fromAccountType: number;
    toAccountName: string;
    toAccountNo: string;
    toOfficeId: number;
    toClientId: number;
    toAccountType: number;
    amount: string;
    remarks: string;
  };
  MakePayment: {
    loanName: string;
    loanAccountNumber: string;
  };
  TransactionAuth: {
    amount: string;
    recipientName: string;
  };
  RepaymentSchedule: {
    loanId: number;
    accountNumber: string;
    name: string;
  };
  QrCode: undefined;
  LoanSummary: {
    loanId: number;
    loanName: string;
    loanAccountNumber: string;
  };
  Filters: undefined;
  TransactionHistory: {
    loanId: number;
  } | undefined;
  TransactionDetails: {
    loanId: number;
    transactionId: number;
    loanAccountNo: string;
    loanProductName: string;
  };
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
  const { isAuthenticated } = useAuth();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isAuthenticated ? (
        <>
          <Stack.Screen name="MainTabs" component={TabNavigator} />
          <Stack.Screen name="LoanAccounts" component={LoanAccountsScreen} />
          <Stack.Screen name="LoanDetails" component={LoanDetailsScreen} />
          <Stack.Screen
            name="ConfirmTransfer"
            component={ConfirmTransferScreen}
          />
          <Stack.Screen name="MakePayment" component={MakePaymentScreen} />
          <Stack.Screen
            name="TransactionAuth"
            component={TransactionAuthScreen}
          />
          <Stack.Screen
            name="RepaymentSchedule"
            component={RepaymentScheduleScreen}
          />
          <Stack.Screen name="QrCode" component={QrCodeScreen} />
          <Stack.Screen name="Filters" component={FiltersScreen} />
          <Stack.Screen name="LoanSummary" component={LoanSummaryScreen} />
          <Stack.Screen
            name="TransactionHistory"
            component={TransactionHistoryScreen}
          />
          <Stack.Screen
            name="TransactionDetails"
            component={TransactionDetailsScreen}
          />
          <Stack.Screen name="MakeTransfer" component={MakeTransferScreen} />
          <Stack.Screen
            name="AddBeneficiary"
            component={AddBeneficiaryScreen}
          />
          <Stack.Screen
            name="ConfirmBeneficiary"
            component={ConfirmBeneficiaryScreen}
          />
        </>
      ) : (
        <Stack.Screen name="Login" component={LoginScreen} />
      )}
    </Stack.Navigator>
  );
}

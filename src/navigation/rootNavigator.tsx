import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TabNavigator from './tabNavigator';
import LoanAccountsScreen from '../screens/loanAccounts/loanAccounts';
import LoanDetailsScreen from '../screens/loanDetails/loanDetails';
import ConfirmTransferScreen from '../screens/confirmTransfer/confirmTransfer';
import MakePaymentScreen from '../screens/makePayment/makePayment';
import TransactionAuthScreen from '../screens/transactionAuth/transactionAuth';

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
    </Stack.Navigator>
  );
}

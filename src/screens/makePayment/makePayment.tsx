import React, { useState, useMemo } from 'react';
import {
  View,
  ScrollView,
  StatusBar,
  ActivityIndicator,
  Text,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors, spacing } from '../../theme';
import { styles } from './makePayment.styles';
import type { RootStackParamList } from '../../navigation/rootNavigator';
import ScreenHeader from '../../components/screenHeader/screenHeader';
import DropdownSelect from '../../components/dropdownSelect/dropdownSelect';
import type { DropdownOption } from '../../components/dropdownSelect/dropdownSelect';
import PayFromCard from '../../components/payFromCard/payFromCard';
import AmountInput from '../../components/amountInput/amountInput';
import StickyFooter from '../../components/stickyFooter/stickyFooter';
import QuickSelectGrid from '../../components/quickSelectGrid/quickSelectGrid';
import { useTransferTemplate } from '../../hooks/useTransferTemplate';

type MakePaymentRouteProp = RouteProp<RootStackParamList, 'MakePayment'>;

const quickAmounts = ['100', '500', '1,000'];

export default function MakePaymentScreen() {
  const insets = useSafeAreaInsets();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<MakePaymentRouteProp>();
  const { loanName, loanAccountNumber } = route.params;

  const { fromAccounts, toAccounts, loading, error } = useTransferTemplate();

  // "Pay To" = loan accounts from toAccountOptions
  const loanOptions: DropdownOption[] = useMemo(
    () =>
      toAccounts.map(acc => ({
        label: acc.clientName ?? acc.accountType?.value ?? 'Loan',
        value: acc.accountNo ?? '',
      })),
    [toAccounts],
  );

  // Pre-select the loan account that was passed from LoanDetails
  const [selectedLoan, setSelectedLoan] = useState(loanAccountNumber);
  const [showDropdown, setShowDropdown] = useState(false);
  const [amount, setAmount] = useState('');
  const [remarks, setRemarks] = useState('');
  const [selectedQuick, setSelectedQuick] = useState<string | null>(null);

  // "Pay From" = savings accounts from fromAccountOptions
  const savingsAccounts = useMemo(
    () =>
      fromAccounts.filter(acc => acc.accountType?.value === 'Savings Account'),
    [fromAccounts],
  );
  const fromAccount = savingsAccounts[0] ?? fromAccounts[0] ?? null;

  const selectedToAccount = toAccounts.find(
    acc => acc.accountNo === selectedLoan,
  );

  // If the loanAccountNumber from route doesn't match any option, auto-select the first
  React.useEffect(() => {
    if (
      loanOptions.length > 0 &&
      !loanOptions.find(o => o.value === selectedLoan)
    ) {
      setSelectedLoan(loanOptions[0].value);
    }
  }, [loanOptions, selectedLoan]);

  const selectedLoanLabel =
    loanOptions.find(l => l.value === selectedLoan)?.label ??
    loanName ??
    'Loan Account';

  const handleQuickSelect = (value: string) => {
    const raw = value.replace(/,/g, '');
    if (selectedQuick === value) {
      setSelectedQuick(null);
      setAmount('');
    } else {
      setSelectedQuick(value);
      setAmount(raw);
    }
  };

  const handleAmountChange = (text: string) => {
    setAmount(text);
    setSelectedQuick(null);
  };

  const selectLoan = (value: string) => {
    setSelectedLoan(value);
    setShowDropdown(false);
  };

  const handleMakePayment = () => {
    if (!fromAccount || !selectedToAccount || !amount) {
      return;
    }

    navigation.navigate('ConfirmTransfer', {
      fromAccountName: fromAccount.clientName ?? 'Savings Account',
      fromAccountNo: fromAccount.accountNo ?? '',
      fromOfficeId: fromAccount.officeId ?? 0,
      fromClientId: fromAccount.clientId ?? 0,
      fromAccountType: fromAccount.accountType?.id ?? 2,
      toAccountName: selectedToAccount.clientName ?? selectedLoanLabel,
      toAccountNo: selectedToAccount.accountNo ?? selectedLoan,
      toOfficeId: selectedToAccount.officeId ?? 0,
      toClientId: selectedToAccount.clientId ?? 0,
      toAccountType: selectedToAccount.accountType?.id ?? 1,
      amount,
      remarks,
    });
  };

  if (loading) {
    return (
      <View style={styles.root}>
        <ScreenHeader title="Make Payment" backgroundColor={colors.white} />
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.root}>
        <ScreenHeader title="Make Payment" backgroundColor={colors.white} />
        <View style={styles.centerContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.root}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />

      <ScreenHeader title="Make Payment" backgroundColor={colors.white} />

      <ScrollView
        style={styles.content}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: insets.bottom + spacing.md },
        ]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Pay To Section - Loan accounts from API */}
        <DropdownSelect
          sectionLabel="Pay To"
          fieldLabel="Loan Account"
          options={loanOptions}
          selectedValue={selectedLoan}
          displayText={`${selectedLoanLabel} (${selectedLoan})`}
          isOpen={showDropdown}
          onToggle={() => setShowDropdown(!showDropdown)}
          onSelect={selectLoan}
        />

        {/* Pay From Section - Savings account from API */}
        {fromAccount && (
          <PayFromCard
            label="Pay From"
            accountType={fromAccount.accountType?.value ?? 'Savings Account'}
            accountNumber={`**** **** **** ${(
              fromAccount.accountNo ?? ''
            ).slice(-4)}`}
            balanceLabel="Current Balance"
            balance={fromAccount.clientName ?? ''}
          />
        )}

        {/* Amount Section */}
        <AmountInput
          amount={amount}
          onAmountChange={handleAmountChange}
          remarks={remarks}
          onRemarksChange={setRemarks}
        />

        {/* Quick Select */}
        <QuickSelectGrid
          label="Quick Select"
          values={quickAmounts}
          selectedValue={selectedQuick}
          onSelect={handleQuickSelect}
        />
      </ScrollView>

      {/* Footer */}
      <StickyFooter
        buttonLabel="Make Payment"
        iconName="arrow-forward"
        note="Payments made after 8 PM will be processed next business day."
        onPress={handleMakePayment}
        paddingBottom={insets.bottom + spacing.xl}
      />
    </View>
  );
}

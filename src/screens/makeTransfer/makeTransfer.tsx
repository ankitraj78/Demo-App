import React, { useState, useMemo } from 'react';
import {
  View,
  ScrollView,
  StatusBar,
  ActivityIndicator,
  Text,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors, spacing } from '../../theme';
import { styles } from './makeTransfer.styles';
import type { RootStackParamList } from '../../navigation/rootNavigator';
import ScreenHeader from '../../components/screenHeader/screenHeader';
import AmountInput from '../../components/amountInput/amountInput';
import StickyFooter from '../../components/stickyFooter/stickyFooter';
import DropdownSelect from '../../components/dropdownSelect/dropdownSelect';
import type { DropdownOption } from '../../components/dropdownSelect/dropdownSelect';
import OriginAccountCard from '../../components/originAccountCard/originAccountCard';
import SectionHeader from '../../components/sectionHeader/sectionHeader';
import TransactionSummary from '../../components/transactionSummary/transactionSummary';
import { useTransferTemplate } from '../../hooks/useTransferTemplate';

export default function MakeTransferScreen() {
  const insets = useSafeAreaInsets();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const { fromAccounts, toAccounts, loading, error, refetch } =
    useTransferTemplate();

  const [selectedFromIndex, setSelectedFromIndex] = useState(0);
  const [showFromDropdown, setShowFromDropdown] = useState(false);
  const [selectedToValue, setSelectedToValue] = useState('');
  const [showToDropdown, setShowToDropdown] = useState(false);
  const [amount, setAmount] = useState('');
  const [remarks, setRemarks] = useState('');

  const fromAccount = fromAccounts[selectedFromIndex] ?? null;

  const toOptions: DropdownOption[] = useMemo(
    () =>
      toAccounts.map(acc => ({
        label: acc.clientName ?? 'Unknown',
        value: acc.accountNo ?? '',
      })),
    [toAccounts],
  );

  const fromOptions: DropdownOption[] = useMemo(
    () =>
      fromAccounts.map(acc => ({
        label: acc.accountType?.value ?? 'Account',
        value: acc.accountNo ?? '',
      })),
    [fromAccounts],
  );

  // Auto-select first "to" account when template loads
  React.useEffect(() => {
    if (toOptions.length > 0 && !selectedToValue) {
      setSelectedToValue(toOptions[0].value);
    }
  }, [toOptions, selectedToValue]);

  const selectedToAccount = toAccounts.find(
    acc => acc.accountNo === selectedToValue,
  );

  const selectedToLabel =
    toOptions.find(o => o.value === selectedToValue)?.label ?? '';

  const selectTo = (value: string) => {
    setSelectedToValue(value);
    setShowToDropdown(false);
  };

  const selectFrom = (value: string) => {
    const idx = fromAccounts.findIndex(a => a.accountNo === value);
    if (idx >= 0) {
      setSelectedFromIndex(idx);
    }
    setShowFromDropdown(false);
  };

  const handleTransfer = () => {
    if (!fromAccount || !selectedToAccount || !amount) {
      return;
    }

    navigation.navigate('ConfirmTransfer', {
      fromAccountName: fromAccount.clientName ?? 'N/A',
      fromAccountNo: fromAccount.accountNo ?? '',
      fromOfficeId: fromAccount.officeId ?? 0,
      fromClientId: fromAccount.clientId ?? 0,
      fromAccountType: fromAccount.accountType?.id ?? 0,
      toAccountName: selectedToAccount.clientName ?? 'N/A',
      toAccountNo: selectedToAccount.accountNo ?? '',
      toOfficeId: selectedToAccount.officeId ?? 0,
      toClientId: selectedToAccount.clientId ?? 0,
      toAccountType: selectedToAccount.accountType?.id ?? 0,
      amount,
      remarks,
    });
  };

  if (loading) {
    return (
      <View style={styles.root}>
        <ScreenHeader
          title="Make Transfer"
          backgroundColor={colors.backgroundLight}
        />
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.root}>
        <ScreenHeader
          title="Make Transfer"
          backgroundColor={colors.backgroundLight}
        />
        <View style={styles.centerContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.root}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={colors.backgroundLight}
      />

      <ScreenHeader
        title="Make Transfer"
        backgroundColor={colors.backgroundLight}
      />

      <ScrollView
        style={styles.content}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: insets.bottom + spacing.md },
        ]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Origin Account Section */}
        {fromAccount ? (
          <OriginAccountCard
            label="Pay from"
            accountType={fromAccount.accountType?.value ?? 'Savings Account'}
            accountName={fromAccount.clientName ?? 'N/A'}
            accountNumber={fromAccount.accountNo ?? ''}
            balance=""
            status="ACTIVE"
            onSelectOther={
              fromAccounts.length > 1
                ? () => setShowFromDropdown(!showFromDropdown)
                : undefined
            }
          />
        ) : null}

        {showFromDropdown && fromOptions.length > 1 && (
          <DropdownSelect
            fieldLabel="Select Account"
            options={fromOptions}
            selectedValue={fromAccount?.accountNo ?? ''}
            displayText={`${fromAccount?.accountType?.value ?? ''} (${
              fromAccount?.accountNo ?? ''
            })`}
            isOpen={true}
            onToggle={() => setShowFromDropdown(false)}
            onSelect={selectFrom}
          />
        )}

        {/* Destination Account Section */}
        <View>
          <SectionHeader
            title="Pay To"
            actionLabel="Add Beneficiary!"
            actionIcon="person-add"
          />

          <DropdownSelect
            fieldLabel="Account Number"
            options={toOptions}
            selectedValue={selectedToValue}
            displayText={
              selectedToLabel
                ? `${selectedToLabel} (${selectedToValue})`
                : 'Select beneficiary'
            }
            isOpen={showToDropdown}
            onToggle={() => setShowToDropdown(!showToDropdown)}
            onSelect={selectTo}
          />
        </View>

        {/* Transfer Details Section */}
        <AmountInput
          amount={amount}
          onAmountChange={setAmount}
          remarks={remarks}
          onRemarksChange={setRemarks}
          remarksPlaceholder="Add a note (optional)"
          remarksLabel="Remarks"
        />

        {/* Transaction Summary */}
        <TransactionSummary
          rows={[
            { label: 'Transaction Fee', value: 'Free' },
            { label: 'Estimated Arrival', value: 'Instant' },
          ]}
        />
      </ScrollView>

      {/* Footer */}
      <StickyFooter
        buttonLabel="Make Transfer"
        iconName="chevron-right"
        onPress={handleTransfer}
        paddingBottom={insets.bottom + spacing.xl}
      />
    </View>
  );
}

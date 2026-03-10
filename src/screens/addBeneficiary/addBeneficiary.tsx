import React, {useState} from 'react';
import {View, ScrollView, StatusBar} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {colors, spacing} from '../../../theme';
import {styles} from './addBeneficiary.styles';
import ScreenHeader from '../../components/screenHeader/screenHeader';
import DropdownSelect from '../../components/dropdownSelect/dropdownSelect';
import type {DropdownOption} from '../../components/dropdownSelect/dropdownSelect';
import StickyFooter from '../../components/stickyFooter/stickyFooter';
import QrBanner from '../../components/qrBanner/qrBanner';
import FormTextField from '../../components/formTextField/formTextField';
import FormAmountField from '../../components/formAmountField/formAmountField';

const accountTypeOptions: DropdownOption[] = [
  {label: 'Savings Account', value: 'savings'},
  {label: 'Current Account', value: 'current'},
  {label: 'Business Account', value: 'business'},
  {label: 'Fixed Deposit', value: 'fixed'},
];

export default function AddBeneficiaryScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  const [beneficiaryName, setBeneficiaryName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [accountType, setAccountType] = useState('');
  const [showAccountTypeDropdown, setShowAccountTypeDropdown] = useState(false);
  const [branchName, setBranchName] = useState('');
  const [transferLimit, setTransferLimit] = useState('');

  const selectedAccountTypeLabel =
    accountTypeOptions.find(o => o.value === accountType)?.label ??
    'Select account type';

  const handleSelectAccountType = (value: string) => {
    setAccountType(value);
    setShowAccountTypeDropdown(false);
  };

  return (
    <View style={styles.root}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />

      <ScreenHeader title="Add Beneficiary" backgroundColor={colors.white} />

      <ScrollView
        style={styles.content}
        contentContainerStyle={[
          styles.scrollContent,
          {paddingBottom: insets.bottom + spacing.md},
        ]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled">
        {/* QR Quick Setup Banner */}
        <QrBanner />

        {/* Form Fields */}
        <View style={styles.formSection}>
          <FormTextField
            label="Beneficiary Name"
            placeholder="e.g. Johnathan Smith"
            value={beneficiaryName}
            onChangeText={setBeneficiaryName}
          />

          <FormTextField
            label="Account Number"
            placeholder="Enter 10-12 digit number"
            value={accountNumber}
            onChangeText={setAccountNumber}
            keyboardType="number-pad"
          />

          <DropdownSelect
            fieldLabel="Account Type"
            options={accountTypeOptions}
            selectedValue={accountType}
            displayText={selectedAccountTypeLabel}
            isOpen={showAccountTypeDropdown}
            onToggle={() =>
              setShowAccountTypeDropdown(!showAccountTypeDropdown)
            }
            onSelect={handleSelectAccountType}
          />

          <FormTextField
            label="Office / Branch Name"
            placeholder="Enter branch location"
            value={branchName}
            onChangeText={setBranchName}
          />

          <FormAmountField
            label="Transfer Limit (Daily)"
            value={transferLimit}
            onChangeText={setTransferLimit}
            helperText="Maximum allowed limit is $50,000.00"
          />
        </View>
      </ScrollView>

      {/* Footer */}
      <StickyFooter
        buttonLabel="Submit Beneficiary"
        iconName="arrow-forward"
        note="By adding, you agree to our electronic transfer terms."
        onPress={() => navigation.goBack()}
        paddingBottom={insets.bottom + spacing.xl}
      />
    </View>
  );
}

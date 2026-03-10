import React, {useState} from 'react';
import {
  View,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {colors, spacing, iconSize} from '../../../theme';
import {styles} from './addBeneficiary.styles';
import ScreenHeader from '../../components/screenHeader/screenHeader';
import DropdownSelect from '../../components/dropdownSelect/dropdownSelect';
import type {DropdownOption} from '../../components/dropdownSelect/dropdownSelect';
import StickyFooter from '../../components/stickyFooter/stickyFooter';

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
        <View style={styles.qrBanner}>
          <View style={styles.qrBannerLeft}>
            <View style={styles.qrIconBox}>
              <MaterialIcons
                name="qr-code-scanner"
                size={iconSize.xl}
                color={colors.white}
              />
            </View>
            <View>
              <Text style={styles.qrTitle}>Quick Setup</Text>
              <Text style={styles.qrSubtitle}>
                Scan code to auto-fill details
              </Text>
            </View>
          </View>
          <TouchableOpacity style={styles.qrButton} activeOpacity={0.85}>
            <Text style={styles.qrButtonText}>Upload QR</Text>
          </TouchableOpacity>
        </View>

        {/* Form Fields */}
        <View style={styles.formSection}>
          {/* Beneficiary Name */}
          <View style={styles.fieldWrapper}>
            <Text style={styles.fieldLabel}>Beneficiary Name</Text>
            <TextInput
              style={styles.textInput}
              placeholder="e.g. Johnathan Smith"
              placeholderTextColor={colors.textMuted}
              value={beneficiaryName}
              onChangeText={setBeneficiaryName}
            />
          </View>

          {/* Account Number */}
          <View style={styles.fieldWrapper}>
            <Text style={styles.fieldLabel}>Account Number</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Enter 10-12 digit number"
              placeholderTextColor={colors.textMuted}
              keyboardType="number-pad"
              value={accountNumber}
              onChangeText={setAccountNumber}
            />
          </View>

          {/* Account Type */}
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

          {/* Office / Branch Name */}
          <View style={styles.fieldWrapper}>
            <Text style={styles.fieldLabel}>Office / Branch Name</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Enter branch location"
              placeholderTextColor={colors.textMuted}
              value={branchName}
              onChangeText={setBranchName}
            />
          </View>

          {/* Transfer Limit */}
          <View style={styles.fieldWrapper}>
            <Text style={styles.fieldLabel}>Transfer Limit (Daily)</Text>
            <View style={styles.amountInputContainer}>
              <Text style={styles.currencySymbol}>$</Text>
              <TextInput
                style={styles.amountInput}
                placeholder="0.00"
                placeholderTextColor={colors.textMuted}
                keyboardType="decimal-pad"
                value={transferLimit}
                onChangeText={setTransferLimit}
              />
            </View>
            <Text style={styles.helperText}>
              Maximum allowed limit is $50,000.00
            </Text>
          </View>
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

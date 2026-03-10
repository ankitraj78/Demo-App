import React, {useState} from 'react';
import {View, ScrollView, StatusBar} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {colors, spacing} from '../../../theme';
import {styles} from './makeTransfer.styles';
import type {RootStackParamList} from '../../navigation/rootNavigator';
import ScreenHeader from '../../components/screenHeader/screenHeader';
import AmountInput from '../../components/amountInput/amountInput';
import StickyFooter from '../../components/stickyFooter/stickyFooter';
import DropdownSelect from '../../components/dropdownSelect/dropdownSelect';
import type {DropdownOption} from '../../components/dropdownSelect/dropdownSelect';
import OriginAccountCard from '../../components/originAccountCard/originAccountCard';
import SectionHeader from '../../components/sectionHeader/sectionHeader';
import TransactionSummary from '../../components/transactionSummary/transactionSummary';

const beneficiaryOptions: DropdownOption[] = [
  {label: 'Savings Account', value: '0000000007'},
  {label: 'Current Account', value: '0000000012'},
  {label: 'Joint Account', value: '0000000015'},
];

export default function MakeTransferScreen() {
  const insets = useSafeAreaInsets();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [selectedBeneficiary, setSelectedBeneficiary] = useState(
    beneficiaryOptions[0].value,
  );
  const [showBeneficiaryDropdown, setShowBeneficiaryDropdown] = useState(false);
  const [amount, setAmount] = useState('');
  const [remarks, setRemarks] = useState('');

  const selectedBeneficiaryLabel =
    beneficiaryOptions.find(b => b.value === selectedBeneficiary)?.label ??
    'Savings Account';

  const selectBeneficiary = (value: string) => {
    setSelectedBeneficiary(value);
    setShowBeneficiaryDropdown(false);
  };

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
          {paddingBottom: insets.bottom + spacing.md},
        ]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled">
        {/* Origin Account Section */}
        <OriginAccountCard
          label="Origin Account"
          accountType="Savings Account"
          accountName="ankit kumar abc"
          accountNumber="0000000009"
          balance="$ 499.98"
          status="ACTIVE"
          onSelectOther={() => {}}
        />

        {/* Destination Account Section */}
        <View>
          <SectionHeader
            title="Destination Account"
            actionLabel="Add Beneficiary!"
            actionIcon="person-add"
          />

          <DropdownSelect
            fieldLabel="Account Number"
            options={beneficiaryOptions}
            selectedValue={selectedBeneficiary}
            displayText={`${selectedBeneficiaryLabel} (${selectedBeneficiary})`}
            isOpen={showBeneficiaryDropdown}
            onToggle={() =>
              setShowBeneficiaryDropdown(!showBeneficiaryDropdown)
            }
            onSelect={selectBeneficiary}
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
            {label: 'Transaction Fee', value: 'Free'},
            {label: 'Estimated Arrival', value: 'Instant'},
          ]}
        />
      </ScrollView>

      {/* Footer */}
      <StickyFooter
        buttonLabel="Transfer Amount"
        iconName="chevron-right"
        onPress={() => navigation.navigate('TransactionAuth', {
          amount: amount || '0',
          recipientName: 'ankit kumar abc',
        })}
        paddingBottom={insets.bottom + spacing.xl}
      />
    </View>
  );
}

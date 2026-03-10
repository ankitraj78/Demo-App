import React, {useState} from 'react';
import {View, Text, ScrollView, StatusBar, TouchableOpacity} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {colors, spacing, iconSize} from '../../../theme';
import {styles} from './makeTransfer.styles';
import type {RootStackParamList} from '../../navigation/rootNavigator';
import ScreenHeader from '../../components/screenHeader/screenHeader';
import AmountInput from '../../components/amountInput/amountInput';
import StickyFooter from '../../components/stickyFooter/stickyFooter';
import DropdownSelect from '../../components/dropdownSelect/dropdownSelect';
import type {DropdownOption} from '../../components/dropdownSelect/dropdownSelect';

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
        <View>
          <Text style={styles.sectionLabel}>Origin Account</Text>
          <View
            style={[styles.originCard, {backgroundColor: colors.primary}]}>
            <View style={styles.originCardHeader}>
              <View>
                <Text style={styles.originAccountType}>Savings Account</Text>
                <Text style={styles.originAccountName}>ankit kumar abc</Text>
              </View>
              <MaterialIcons
                name="contactless"
                size={iconSize['2xl']}
                color={colors.white60}
              />
            </View>

            <View style={styles.originCardBody}>
              <View>
                <Text style={styles.originFieldLabel}>Account Number</Text>
                <Text style={styles.originAccountNumber}>0000000009</Text>
              </View>

              <View style={styles.originBalanceRow}>
                <View>
                  <Text style={styles.originFieldLabel}>Available Balance</Text>
                  <Text style={styles.originBalance}>$ 499.98</Text>
                </View>
                <View style={styles.originStatusBadge}>
                  <Text style={styles.originStatusText}>ACTIVE</Text>
                </View>
              </View>
            </View>

            <View style={styles.decorCircleLg} />
            <View style={styles.decorCircleSm} />
          </View>

          <TouchableOpacity style={styles.selectOtherBtn} activeOpacity={0.7}>
            <MaterialIcons
              name="swap-horiz"
              size={iconSize.md}
              color={colors.primary}
            />
            <Text style={styles.selectOtherText}>
              Select Other Payment Account
            </Text>
          </TouchableOpacity>
        </View>

        {/* Destination Account Section */}
        <View>
          <View style={styles.destinationHeader}>
            <Text style={styles.sectionLabel}>Destination Account</Text>
            <TouchableOpacity
              style={styles.addBeneficiaryBtn}
              activeOpacity={0.7}>
              <MaterialIcons
                name="person-add"
                size={iconSize.sm}
                color={colors.primary}
              />
              <Text style={styles.addBeneficiaryText}>Add Beneficiary!</Text>
            </TouchableOpacity>
          </View>

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
        <View style={styles.summaryCard}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Transaction Fee</Text>
            <Text style={styles.summaryValue}>Free</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Estimated Arrival</Text>
            <Text style={styles.summaryValue}>Instant</Text>
          </View>
        </View>
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

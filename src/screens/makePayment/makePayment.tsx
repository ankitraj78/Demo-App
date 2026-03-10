import React, {useState} from 'react';
import {
  View,
  ScrollView,
  StatusBar,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useNavigation, useRoute, RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {colors, spacing} from '../../../theme';
import {styles} from './makePayment.styles';
import type {RootStackParamList} from '../../navigation/rootNavigator';
import ScreenHeader from '../../components/screenHeader/screenHeader';
import DropdownSelect from '../../components/dropdownSelect/dropdownSelect';
import type {DropdownOption} from '../../components/dropdownSelect/dropdownSelect';
import PayFromCard from '../../components/payFromCard/payFromCard';
import AmountInput from '../../components/amountInput/amountInput';
import StickyFooter from '../../components/stickyFooter/stickyFooter';
import QuickSelectGrid from '../../components/quickSelectGrid/quickSelectGrid';

type MakePaymentRouteProp = RouteProp<RootStackParamList, 'MakePayment'>;

const loanOptions: DropdownOption[] = [
  {label: 'Personal Loan', value: '000000001'},
  {label: 'Home Loan', value: '000000002'},
  {label: 'Car Loan', value: '000000003'},
];

const quickAmounts = ['100', '500', '1,000'];

export default function MakePaymentScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<MakePaymentRouteProp>();
  const {loanName, loanAccountNumber} = route.params;

  const [selectedLoan, setSelectedLoan] = useState(
    loanAccountNumber || loanOptions[0].value,
  );
  const [showDropdown, setShowDropdown] = useState(false);
  const [amount, setAmount] = useState('');
  const [remarks, setRemarks] = useState('');
  const [selectedQuick, setSelectedQuick] = useState<string | null>(null);

  const selectedLoanLabel =
    loanOptions.find(l => l.value === selectedLoan)?.label ??
    loanName ??
    'Personal Loan';

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

  return (
    <View style={styles.root}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />

      <ScreenHeader title="Make Payment" backgroundColor={colors.white} />

      <ScrollView
        style={styles.content}
        contentContainerStyle={[
          styles.scrollContent,
          {paddingBottom: insets.bottom + spacing.md},
        ]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled">
        {/* Pay To Section */}
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

        {/* Pay From Section */}
        <PayFromCard
          label="Pay From"
          accountType="Savings Account"
          accountNumber="**** **** **** 1234"
          balanceLabel="Current Balance"
          balance="$12,450.00"
        />

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
        onPress={() => navigation.navigate('ConfirmTransfer')}
        paddingBottom={insets.bottom + spacing.xl}
      />
    </View>
  );
}

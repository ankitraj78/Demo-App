import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StatusBar,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useNavigation, useRoute, RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {colors, spacing, iconSize} from '../../../theme';
import {styles} from './makePayment.styles';
import type {RootStackParamList} from '../../navigation/rootNavigator';
import ScreenHeader from '../../components/screenHeader/screenHeader';

type MakePaymentRouteProp = RouteProp<RootStackParamList, 'MakePayment'>;

type LoanOption = {
  label: string;
  value: string;
};

const loanOptions: LoanOption[] = [
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
        <View>
          <Text style={styles.sectionLabel}>Pay To</Text>
          <Text style={styles.fieldLabel}>Loan Account</Text>
          <TouchableOpacity
            style={styles.selectContainer}
            onPress={() => setShowDropdown(!showDropdown)}>
            <Text style={styles.selectText}>
              {selectedLoanLabel} ({selectedLoan})
            </Text>
            <MaterialIcons
              name="expand-more"
              size={iconSize.xl}
              color={colors.textMuted}
            />
          </TouchableOpacity>

          {/* Dropdown */}
          {showDropdown && (
            <View
              style={{
                marginTop: spacing.sm,
                backgroundColor: colors.white,
                borderRadius: 16,
                borderWidth: 1,
                borderColor: colors.border,
                overflow: 'hidden',
              }}>
              {loanOptions.map(option => (
                <TouchableOpacity
                  key={option.value}
                  style={{
                    paddingHorizontal: spacing.xl,
                    paddingVertical: spacing.lg + spacing.xs,
                    backgroundColor:
                      selectedLoan === option.value
                        ? colors.primaryBgLight
                        : colors.white,
                    borderBottomWidth: 1,
                    borderBottomColor: colors.borderLight,
                  }}
                  onPress={() => selectLoan(option.value)}>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: selectedLoan === option.value ? '600' : '400',
                      color:
                        selectedLoan === option.value
                          ? colors.primary
                          : colors.textPrimary,
                    }}>
                    {option.label} ({option.value})
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        {/* Pay From Section */}
        <View>
          <Text style={styles.sectionLabel}>Pay From</Text>
          <View style={[styles.payFromCard, {backgroundColor: colors.primary}]}>
            <View style={styles.payFromContent}>
              <View style={styles.payFromLeftSection}>
                <View>
                  <Text style={styles.payFromTypeLabel}>Savings Account</Text>
                  <Text style={styles.payFromAccountNumber}>
                    **** **** **** 1234
                  </Text>
                </View>
                <View>
                  <Text style={styles.payFromBalanceLabel}>
                    Current Balance
                  </Text>
                  <Text style={styles.payFromBalance}>$12,450.00</Text>
                </View>
              </View>
              <View style={styles.payFromIconBox}>
                <MaterialIcons
                  name="credit-card"
                  size={iconSize.xl}
                  color={colors.white80}
                />
              </View>
            </View>
            <View style={styles.decorCircle1} />
            <View style={styles.decorCircle2} />
          </View>
        </View>

        {/* Amount Section */}
        <View style={styles.amountSection}>
          <View style={styles.amountFieldWrapper}>
            <Text style={styles.amountLabel}>Amount</Text>
            <View style={styles.amountInputContainer}>
              <Text style={styles.amountCurrency}>$</Text>
              <TextInput
                style={styles.amountInput}
                placeholder="0.00"
                placeholderTextColor={colors.textMuted}
                keyboardType="numeric"
                value={amount}
                onChangeText={handleAmountChange}
              />
            </View>
          </View>

          <View style={styles.amountFieldWrapper}>
            <Text style={styles.amountLabel}>Remarks (Optional)</Text>
            <TextInput
              style={styles.remarksInput}
              placeholder="What is this for?"
              placeholderTextColor={colors.textMuted}
              multiline
              numberOfLines={2}
              value={remarks}
              onChangeText={setRemarks}
            />
          </View>
        </View>

        {/* Quick Select */}
        <View>
          <Text style={styles.sectionLabel}>Quick Select</Text>
          <View style={styles.quickSelectGrid}>
            {quickAmounts.map(val => {
              const isActive = selectedQuick === val;
              return (
                <TouchableOpacity
                  key={val}
                  style={[
                    styles.quickSelectBtn,
                    isActive && styles.quickSelectBtnActive,
                  ]}
                  onPress={() => handleQuickSelect(val)}>
                  <Text
                    style={[
                      styles.quickSelectText,
                      isActive && styles.quickSelectTextActive,
                    ]}>
                    ${val}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </ScrollView>

      {/* Footer */}
      <View style={[styles.footer, {paddingBottom: insets.bottom + spacing.xl}]}>
        <TouchableOpacity
          style={styles.payButton}
          activeOpacity={0.85}
          onPress={() => navigation.navigate('ConfirmTransfer')}>
          <Text style={styles.payButtonText}>Make Payment</Text>
          <MaterialIcons
            name="arrow-forward"
            size={iconSize.lg}
            color={colors.white}
          />
        </TouchableOpacity>
        <Text style={styles.footerNote}>
          Payments made after 8 PM will be processed next business day.
        </Text>
      </View>
    </View>
  );
}

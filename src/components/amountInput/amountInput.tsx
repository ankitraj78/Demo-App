import React from 'react';
import {View, Text, TextInput} from 'react-native';
import {colors} from '../../../theme';
import {styles} from './amountInput.styles';

type AmountInputProps = {
  amount: string;
  onAmountChange: (text: string) => void;
  remarks?: string;
  onRemarksChange?: (text: string) => void;
  currencySymbol?: string;
  amountPlaceholder?: string;
  remarksPlaceholder?: string;
  remarksLabel?: string;
};

export default function AmountInput({
  amount,
  onAmountChange,
  remarks,
  onRemarksChange,
  currencySymbol = '$',
  amountPlaceholder = '0.00',
  remarksPlaceholder = 'What is this for?',
  remarksLabel = 'Remarks (Optional)',
}: AmountInputProps) {
  return (
    <View style={styles.amountSection}>
      <View style={styles.amountFieldWrapper}>
        <Text style={styles.amountLabel}>Amount</Text>
        <View style={styles.amountInputContainer}>
          <Text style={styles.amountCurrency}>{currencySymbol}</Text>
          <TextInput
            style={styles.amountInput}
            placeholder={amountPlaceholder}
            placeholderTextColor={colors.textMuted}
            keyboardType="numeric"
            value={amount}
            onChangeText={onAmountChange}
          />
        </View>
      </View>

      {onRemarksChange && (
        <View style={styles.amountFieldWrapper}>
          <Text style={styles.amountLabel}>{remarksLabel}</Text>
          <TextInput
            style={styles.remarksInput}
            placeholder={remarksPlaceholder}
            placeholderTextColor={colors.textMuted}
            multiline
            numberOfLines={2}
            value={remarks}
            onChangeText={onRemarksChange}
          />
        </View>
      )}
    </View>
  );
}

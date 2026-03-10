import React from 'react';
import {View, Text, TextInput} from 'react-native';
import {colors} from '../../../theme';
import {styles} from './formAmountField.styles';

type FormAmountFieldProps = {
  label: string;
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  currencySymbol?: string;
  helperText?: string;
};

export default function FormAmountField({
  label,
  placeholder = '0.00',
  value,
  onChangeText,
  currencySymbol = '$',
  helperText,
}: FormAmountFieldProps) {
  return (
    <View style={styles.fieldWrapper}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <View style={styles.amountInputContainer}>
        <Text style={styles.currencySymbol}>{currencySymbol}</Text>
        <TextInput
          style={styles.amountInput}
          placeholder={placeholder}
          placeholderTextColor={colors.textMuted}
          keyboardType="decimal-pad"
          value={value}
          onChangeText={onChangeText}
        />
      </View>
      {helperText && <Text style={styles.helperText}>{helperText}</Text>}
    </View>
  );
}

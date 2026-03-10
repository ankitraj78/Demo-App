import React from 'react';
import {View, Text, TextInput, KeyboardTypeOptions} from 'react-native';
import {colors} from '../../../theme';
import {styles} from './formTextField.styles';

type FormTextFieldProps = {
  label: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  keyboardType?: KeyboardTypeOptions;
};

export default function FormTextField({
  label,
  placeholder,
  value,
  onChangeText,
  keyboardType,
}: FormTextFieldProps) {
  return (
    <View style={styles.fieldWrapper}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <TextInput
        style={styles.textInput}
        placeholder={placeholder}
        placeholderTextColor={colors.textMuted}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
      />
    </View>
  );
}

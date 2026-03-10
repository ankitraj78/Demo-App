import React from 'react';
import {View, Text, StyleProp, TextStyle} from 'react-native';
import {styles} from './labeledField.styles';

type LabeledFieldProps = {
  label: string;
  value: string;
  labelStyle?: StyleProp<TextStyle>;
  valueStyle?: StyleProp<TextStyle>;
};

export default function LabeledField({
  label,
  value,
  labelStyle,
  valueStyle,
}: LabeledFieldProps) {
  return (
    <View>
      <Text style={[styles.label, labelStyle]}>{label}</Text>
      <Text style={[styles.value, valueStyle]}>{value}</Text>
    </View>
  );
}

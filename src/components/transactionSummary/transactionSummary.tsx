import React from 'react';
import {View, Text} from 'react-native';
import {styles} from './transactionSummary.styles';

type SummaryRow = {
  label: string;
  value: string;
};

type TransactionSummaryProps = {
  rows: SummaryRow[];
};

export default function TransactionSummary({rows}: TransactionSummaryProps) {
  return (
    <View style={styles.summaryCard}>
      {rows.map(row => (
        <View key={row.label} style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>{row.label}</Text>
          <Text style={styles.summaryValue}>{row.value}</Text>
        </View>
      ))}
    </View>
  );
}

import React from 'react';
import {View, Text} from 'react-native';
import {styles} from './balanceRow.styles';

type BalanceRowProps = {
  label: string;
  balance: string;
  status: string;
};

export default function BalanceRow({label, balance, status}: BalanceRowProps) {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.balance}>{balance}</Text>
      </View>
      <View style={styles.statusBadge}>
        <Text style={styles.statusText}>{status}</Text>
      </View>
    </View>
  );
}

import React from 'react';
import {View, Text} from 'react-native';
import {styles} from './transactionCard.styles';

export type TransactionDetail = {
  label: string;
  value: string;
  isRef?: boolean;
  isBadge?: boolean;
};

type TransactionCardProps = {
  amountLabel: string;
  amount: string;
  details: TransactionDetail[];
};

export default function TransactionCard({
  amountLabel,
  amount,
  details,
}: TransactionCardProps) {
  return (
    <View style={styles.transactionCard}>
      <View style={styles.transactionAmountSection}>
        <Text style={styles.transactionAmountLabel}>{amountLabel}</Text>
        <Text style={styles.transactionAmount}>{amount}</Text>
      </View>

      <View style={styles.transactionDetails}>
        {details.map(detail => (
          <View key={detail.label} style={styles.transactionRow}>
            <Text style={styles.transactionLabel}>{detail.label}</Text>
            {detail.isBadge ? (
              <View style={styles.statusBadge}>
                <Text style={styles.statusText}>{detail.value}</Text>
              </View>
            ) : (
              <Text
                style={
                  detail.isRef
                    ? styles.transactionRefValue
                    : styles.transactionValue
                }>
                {detail.value}
              </Text>
            )}
          </View>
        ))}
      </View>
    </View>
  );
}

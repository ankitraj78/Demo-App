import React from 'react';
import {View, Text} from 'react-native';
import {styles} from './loanHeroCard.styles';

type LoanHeroCardProps = {
  status?: string;
  accountNumber: string;
  loanType: string;
  loanScheme: string;
};

export default function LoanHeroCard({
  status = 'Active',
  accountNumber,
  loanType,
  loanScheme,
}: LoanHeroCardProps) {
  return (
    <View style={styles.heroWrapper}>
      <View style={styles.heroCard}>
        <View style={styles.heroStatusBadge}>
          <Text style={styles.heroStatusText}>{status}</Text>
        </View>
        <Text style={styles.heroAccountLabel}>Account Number</Text>
        <Text style={styles.heroAccountNumber}>{accountNumber}</Text>
        <View style={styles.heroInfoGrid}>
          <View style={styles.heroInfoItem}>
            <Text style={styles.heroInfoLabel}>Loan Type</Text>
            <Text style={styles.heroInfoValue}>{loanType}</Text>
          </View>
          <View style={styles.heroInfoItem}>
            <Text style={styles.heroInfoLabel}>Loan Scheme</Text>
            <Text style={styles.heroInfoValue}>{loanScheme}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

import React from 'react';
import { View, Text } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../../theme';
import { styles } from './heroCard.styles';

type HeroCardProps = {
  accountNumber: string;
  name: string;
  balanceLabel: string;
  balance: string;
  currency: string;
};

export default function HeroCard({
  accountNumber,
  name,
  balanceLabel,
  balance,
  currency,
}: HeroCardProps) {
  return (
    <View style={styles.heroWrapper}>
      <View style={styles.heroCard}>
        <View style={styles.heroWatermark}>
          <MaterialIcons
            name="account-balance-wallet"
            size={64}
            color={colors.white}
          />
        </View>
        <View style={styles.heroContent}>
          <View style={styles.heroTopRow}>
            <View>
              <Text style={styles.heroAccountLabel}>Account Number</Text>
              <Text style={styles.heroAccountNumber}>{accountNumber}</Text>
            </View>
            <View style={styles.heroTypeBadge}>
              <Text style={styles.heroTypeText}>{name}</Text>
            </View>
          </View>
          <View style={styles.heroBalanceSection}>
            <Text style={styles.heroBalanceLabel}>{balanceLabel}</Text>
            <View style={styles.heroBalanceRow}>
              <Text style={styles.heroBalanceAmount}>{balance}</Text>
              <Text style={styles.heroBalanceCurrency}>{currency}</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

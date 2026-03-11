import React from 'react';
import { View, Text } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { colors, iconSize } from '../../theme';
import { styles } from './payFromCard.styles';

type PayFromCardProps = {
  label: string;
  accountType: string;
  accountNumber: string;
  balanceLabel: string;
  balance: string;
  iconName?: string;
  backgroundColor?: string;
};

export default function PayFromCard({
  label,
  accountType,
  accountNumber,
  balanceLabel,
  balance,
  iconName = 'credit-card',
  backgroundColor = colors.primary,
}: PayFromCardProps) {
  return (
    <View>
      <Text style={styles.sectionLabel}>{label}</Text>
      <View style={[styles.payFromCard, { backgroundColor }]}>
        <View style={styles.payFromContent}>
          <View style={styles.payFromLeftSection}>
            <View>
              <Text style={styles.payFromTypeLabel}>{accountType}</Text>
              <Text style={styles.payFromAccountNumber}>{accountNumber}</Text>
            </View>
            <View>
              <Text style={styles.payFromBalanceLabel}>{balanceLabel}</Text>
              <Text style={styles.payFromBalance}>{balance}</Text>
            </View>
          </View>
          <View style={styles.payFromIconBox}>
            <MaterialIcons
              name={iconName}
              size={iconSize.xl}
              color={colors.white80}
            />
          </View>
        </View>
        <View style={styles.decorCircle1} />
        <View style={styles.decorCircle2} />
      </View>
    </View>
  );
}

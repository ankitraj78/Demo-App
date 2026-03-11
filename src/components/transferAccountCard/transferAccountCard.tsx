import React from 'react';
import { View, Text } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { colors, iconSize } from '../../theme';
import { styles } from './transferAccountCard.styles';

interface TransferAccountCardProps {
  label: string;
  iconName: string;
  name: string;
  accountDetail: string;
}

export default function TransferAccountCard({
  label,
  iconName,
  name,
  accountDetail,
}: TransferAccountCardProps) {
  return (
    <View>
      <Text style={styles.sectionLabel}>{label}</Text>
      <View style={styles.accountCard}>
        <View style={styles.accountIconBox}>
          <MaterialIcons
            name={iconName}
            size={iconSize.xl}
            color={colors.primary}
          />
        </View>
        <View style={styles.accountInfo}>
          <Text style={styles.accountName}>{name}</Text>
          <Text style={styles.accountNumber}>{accountDetail}</Text>
        </View>
      </View>
    </View>
  );
}

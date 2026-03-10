import React from 'react';
import {View, Text} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {colors, iconSize} from '../../../theme';
import {styles} from './summaryCard.styles';

interface SummaryCardProps {
  label: string;
  amount: string;
  badgeIconName: string;
  badgeText: string;
}

export default function SummaryCard({
  label,
  amount,
  badgeIconName,
  badgeText,
}: SummaryCardProps) {
  return (
    <View style={styles.summaryWrapper}>
      <View style={styles.summaryCard}>
        <View style={styles.summaryContent}>
          <Text style={styles.summaryLabel}>{label}</Text>
          <Text style={styles.summaryAmount}>{amount}</Text>
          <View style={styles.summaryBadge}>
            <MaterialIcons
              name={badgeIconName}
              size={iconSize.sm}
              color={colors.white}
            />
            <Text style={styles.summaryBadgeText}>{badgeText}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

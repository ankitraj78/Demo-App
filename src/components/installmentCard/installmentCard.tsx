import React from 'react';
import {View, Text} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {colors, iconSize} from '../../../theme';
import {styles} from './installmentCard.styles';

type GridItem = {
  label: string;
  value: string;
};

type NextPayment = {
  iconName: string;
  label: string;
  value: string;
};

type InstallmentCardProps = {
  iconName: string;
  title: string;
  items: GridItem[];
  nextPayment?: NextPayment;
};

export default function InstallmentCard({
  iconName,
  title,
  items,
  nextPayment,
}: InstallmentCardProps) {
  return (
    <View style={styles.sectionWrapper}>
      <View style={styles.sectionCard}>
        <View style={styles.sectionHeader}>
          <MaterialIcons
            name={iconName}
            size={iconSize.xl}
            color={colors.primary}
          />
          <Text style={styles.sectionTitle}>{title}</Text>
        </View>
        <View style={styles.installmentGrid}>
          {items.map(item => (
            <View key={item.label} style={styles.installmentBox}>
              <Text style={styles.installmentBoxLabel}>{item.label}</Text>
              <Text style={styles.installmentBoxValue}>{item.value}</Text>
            </View>
          ))}
        </View>
        {nextPayment && (
          <View style={styles.nextPaymentRow}>
            <View style={styles.nextPaymentLabel}>
              <MaterialIcons
                name={nextPayment.iconName}
                size={iconSize.sm}
                color={colors.textMuted}
              />
              <Text style={styles.nextPaymentText}>{nextPayment.label}</Text>
            </View>
            <Text style={styles.nextPaymentValue}>{nextPayment.value}</Text>
          </View>
        )}
      </View>
    </View>
  );
}

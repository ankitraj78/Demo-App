import React from 'react';
import {View, Text} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {colors, iconSize} from '../../../theme';
import {styles} from './installmentCard.styles';

type InfoItem = {
  label: string;
  value: string;
  highlight?: boolean;
};

type InstallmentCardProps = {
  iconName: string;
  title: string;
  items: InfoItem[];
};

export default function InstallmentCard({
  iconName,
  title,
  items,
}: InstallmentCardProps) {
  return (
    <View style={styles.wrapper}>
      <View style={styles.card}>
        <View style={styles.header}>
          <View style={styles.iconBox}>
            <MaterialIcons
              name={iconName}
              size={iconSize.xl}
              color={colors.primary}
            />
          </View>
          <Text style={styles.title}>{title}</Text>
        </View>
        <View style={styles.grid}>
          {items.map(item => (
            <View key={item.label} style={styles.box}>
              <Text style={styles.boxLabel}>{item.label}</Text>
              <Text
                style={
                  item.highlight ? styles.boxPrimaryValue : styles.boxDefaultValue
                }>
                {item.value}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

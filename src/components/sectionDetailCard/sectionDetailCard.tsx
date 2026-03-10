import React from 'react';
import {View, Text} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {colors, iconSize} from '../../../theme';
import {styles} from './sectionDetailCard.styles';

type DetailRow = {
  label: string;
  value: string;
  variant?: 'default' | 'highlight' | 'danger';
};

type SectionDetailCardProps = {
  iconName: string;
  title: string;
  rows: DetailRow[];
};

export default function SectionDetailCard({
  iconName,
  title,
  rows,
}: SectionDetailCardProps) {
  const getValueStyle = (variant?: string) => {
    switch (variant) {
      case 'highlight':
        return styles.detailValueHighlight;
      case 'danger':
        return styles.detailValueDanger;
      default:
        return styles.detailValue;
    }
  };

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
        {rows.map((row, index) => (
          <View
            key={row.label}
            style={[
              styles.detailRow,
              index > 0 && styles.detailRowBorder,
            ]}>
            <Text style={styles.detailLabel}>{row.label}</Text>
            <Text style={getValueStyle(row.variant)}>{row.value}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

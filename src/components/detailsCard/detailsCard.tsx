import React from 'react';
import {View, Text} from 'react-native';
import {styles} from './detailsCard.styles';

type DetailRow = {
  label: string;
  value: string;
  highlight?: boolean;
  vertical?: boolean;
};

type DetailsCardProps = {
  title: string;
  rows: DetailRow[];
};

export default function DetailsCard({title, rows}: DetailsCardProps) {
  return (
    <View>
      <Text style={styles.sectionLabel}>{title}</Text>
      <View style={styles.card}>
        {rows.map((row, index) => {
          const isLast = index === rows.length - 1;
          return (
            <View
              key={row.label}
              style={[
                styles.row,
                isLast && styles.rowLast,
                row.vertical && styles.rowVertical,
              ]}>
              <Text style={styles.label}>{row.label}</Text>
              <Text style={row.highlight ? styles.valueHighlight : styles.value}>
                {row.value}
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}

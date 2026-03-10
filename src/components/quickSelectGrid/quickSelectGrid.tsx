import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {styles} from './quickSelectGrid.styles';

type QuickSelectGridProps = {
  label: string;
  values: string[];
  selectedValue: string | null;
  onSelect: (value: string) => void;
  prefix?: string;
};

export default function QuickSelectGrid({
  label,
  values,
  selectedValue,
  onSelect,
  prefix = '$',
}: QuickSelectGridProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionLabel}>{label}</Text>
      <View style={styles.grid}>
        {values.map(val => {
          const isActive = selectedValue === val;
          return (
            <TouchableOpacity
              key={val}
              style={[styles.btn, isActive && styles.btnActive]}
              onPress={() => onSelect(val)}>
              <Text style={[styles.btnText, isActive && styles.btnTextActive]}>
                {prefix}{val}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

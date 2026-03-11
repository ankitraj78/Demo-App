import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { colors, iconSize } from '../../theme';
import { styles } from './dropdownSelect.styles';

export type DropdownOption = {
  label: string;
  value: string;
};

interface DropdownSelectProps {
  sectionLabel?: string;
  fieldLabel?: string;
  options: DropdownOption[];
  selectedValue: string;
  displayText: string;
  isOpen: boolean;
  onToggle: () => void;
  onSelect: (value: string) => void;
}

export default function DropdownSelect({
  sectionLabel,
  fieldLabel,
  options,
  selectedValue,
  displayText,
  isOpen,
  onToggle,
  onSelect,
}: DropdownSelectProps) {
  return (
    <View>
      {sectionLabel && <Text style={styles.sectionLabel}>{sectionLabel}</Text>}
      {fieldLabel && <Text style={styles.fieldLabel}>{fieldLabel}</Text>}
      <TouchableOpacity style={styles.selectContainer} onPress={onToggle}>
        <Text style={styles.selectText}>{displayText}</Text>
        <MaterialIcons
          name="expand-more"
          size={iconSize.xl}
          color={colors.textMuted}
        />
      </TouchableOpacity>

      {isOpen && (
        <View style={styles.dropdownContainer}>
          {options.map(option => {
            const isActive = selectedValue === option.value;
            return (
              <TouchableOpacity
                key={option.value}
                style={[
                  styles.dropdownOption,
                  isActive && styles.dropdownOptionActive,
                ]}
                onPress={() => onSelect(option.value)}
              >
                <Text
                  style={[
                    styles.dropdownOptionText,
                    isActive && styles.dropdownOptionTextActive,
                  ]}
                >
                  {option.label} ({option.value})
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      )}
    </View>
  );
}

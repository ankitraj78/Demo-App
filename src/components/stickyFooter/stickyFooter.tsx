import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { colors, iconSize } from '../../theme';
import { styles } from './stickyFooter.styles';

interface StickyFooterProps {
  buttonLabel: string;
  iconName?: string;
  note?: string;
  onPress: () => void;
  paddingBottom?: number;
}

export default function StickyFooter({
  buttonLabel,
  iconName,
  note,
  onPress,
  paddingBottom,
}: StickyFooterProps) {
  return (
    <View style={[styles.footer, paddingBottom != null && { paddingBottom }]}>
      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.85}
        onPress={onPress}
      >
        <Text style={styles.buttonText}>{buttonLabel}</Text>
        {iconName && (
          <MaterialIcons
            name={iconName}
            size={iconSize.lg}
            color={colors.white}
          />
        )}
      </TouchableOpacity>
      {note && <Text style={styles.note}>{note}</Text>}
    </View>
  );
}

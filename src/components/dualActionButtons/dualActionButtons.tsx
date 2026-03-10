import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {styles} from './dualActionButtons.styles';

interface DualActionButtonsProps {
  primaryLabel: string;
  secondaryLabel: string;
  onPrimaryPress: () => void;
  onSecondaryPress?: () => void;
}

export default function DualActionButtons({
  primaryLabel,
  secondaryLabel,
  onPrimaryPress,
  onSecondaryPress,
}: DualActionButtonsProps) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.primaryBtn} onPress={onPrimaryPress}>
        <Text style={styles.primaryBtnText}>{primaryLabel}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.secondaryBtn} onPress={onSecondaryPress}>
        <Text style={styles.secondaryBtnText}>{secondaryLabel}</Text>
      </TouchableOpacity>
    </View>
  );
}

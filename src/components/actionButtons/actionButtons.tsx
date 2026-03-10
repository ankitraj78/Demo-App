import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {colors, iconSize} from '../../../theme';
import {styles} from './actionButtons.styles';

interface ActionButtonsProps {
  confirmLabel: string;
  confirmIconName?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ActionButtons({
  confirmLabel,
  confirmIconName,
  cancelLabel = 'Cancel',
  onConfirm,
  onCancel,
}: ActionButtonsProps) {
  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity
        style={styles.confirmButton}
        activeOpacity={0.8}
        onPress={onConfirm}>
        <Text style={styles.confirmButtonText}>{confirmLabel}</Text>
        {confirmIconName && (
          <MaterialIcons
            name={confirmIconName}
            size={iconSize.lg}
            color={colors.white}
          />
        )}
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.cancelButton}
        activeOpacity={0.7}
        onPress={onCancel}>
        <Text style={styles.cancelButtonText}>{cancelLabel}</Text>
      </TouchableOpacity>
    </View>
  );
}

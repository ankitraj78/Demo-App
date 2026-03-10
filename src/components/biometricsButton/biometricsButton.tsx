import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {colors, iconSize} from '../../../theme';
import {styles} from './biometricsButton.styles';

type BiometricsButtonProps = {
  onPress?: () => void;
};

export default function BiometricsButton({onPress}: BiometricsButtonProps) {
  return (
    <TouchableOpacity style={styles.btn} onPress={onPress}>
      <MaterialIcons
        name="fingerprint"
        size={iconSize.xl}
        color={colors.primary}
      />
      <Text style={styles.label}>Use Biometrics</Text>
    </TouchableOpacity>
  );
}

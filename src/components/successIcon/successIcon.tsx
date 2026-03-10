import React from 'react';
import {View} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {colors} from '../../../theme';
import {styles} from './successIcon.styles';

interface SuccessIconProps {
  iconName?: string;
  iconSize?: number;
}

export default function SuccessIcon({
  iconName = 'check',
  iconSize = 36,
}: SuccessIconProps) {
  return (
    <View style={styles.outer}>
      <View style={styles.inner}>
        <MaterialIcons name={iconName} size={iconSize} color={colors.white} />
      </View>
    </View>
  );
}

import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {colors, iconSize} from '../../../theme';
import {styles} from './sectionHeader.styles';

type SectionHeaderProps = {
  title: string;
  actionLabel?: string;
  actionIcon?: string;
  onActionPress?: () => void;
};

export default function SectionHeader({
  title,
  actionLabel,
  actionIcon,
  onActionPress,
}: SectionHeaderProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {actionLabel && (
        <TouchableOpacity
          style={styles.actionBtn}
          activeOpacity={0.7}
          onPress={onActionPress}>
          {actionIcon && (
            <MaterialIcons
              name={actionIcon}
              size={iconSize.sm}
              color={colors.primary}
            />
          )}
          <Text style={styles.actionText}>{actionLabel}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

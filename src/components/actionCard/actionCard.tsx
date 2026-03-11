import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { colors, iconSize } from '../../theme';
import { styles } from './actionCard.styles';

export type ActionItem = {
  icon: string;
  title: string;
  subtitle: string;
  iconColor: string;
  iconBg: string;
};

type ActionCardProps = {
  item: ActionItem;
  onPress?: () => void;
};

export default function ActionCard({ item, onPress }: ActionCardProps) {
  return (
    <TouchableOpacity style={styles.actionItem} onPress={onPress}>
      <View style={[styles.actionIconBox, { backgroundColor: item.iconBg }]}>
        <MaterialIcons
          name={item.icon}
          size={iconSize.xl}
          color={item.iconColor}
        />
      </View>
      <View style={styles.actionTextBox}>
        <Text style={styles.actionTitle}>{item.title}</Text>
        <Text style={styles.actionSubtitle}>{item.subtitle}</Text>
      </View>
      <MaterialIcons
        name="chevron-right"
        size={iconSize.xl}
        color={colors.slate200}
      />
    </TouchableOpacity>
  );
}

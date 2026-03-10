import React from 'react';
import {View, Text} from 'react-native';
import ActionCard from '../actionCard/actionCard';
import type {ActionItem} from '../actionCard/actionCard';
import {styles} from './actionsSection.styles';

interface ActionsSectionProps {
  title: string;
  actions: ActionItem[];
  onActionPress?: (item: ActionItem) => void;
}

export default function ActionsSection({
  title,
  actions,
  onActionPress,
}: ActionsSectionProps) {
  return (
    <View style={styles.actionsWrapper}>
      <Text style={styles.actionsTitle}>{title}</Text>
      <View style={styles.actionsList}>
        {actions.map(item => (
          <ActionCard
            key={item.title}
            item={item}
            onPress={onActionPress ? () => onActionPress(item) : undefined}
          />
        ))}
      </View>
    </View>
  );
}

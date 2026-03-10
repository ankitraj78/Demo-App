import React from 'react';
import {View, Text, ViewStyle} from 'react-native';
import {styles} from './sectionTitle.styles';

type SectionTitleProps = {
  title: string;
  style?: ViewStyle;
};

export default function SectionTitle({title, style}: SectionTitleProps) {
  return (
    <View style={[styles.wrapper, style]}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

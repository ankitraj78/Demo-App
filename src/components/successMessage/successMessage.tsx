import React from 'react';
import {Text} from 'react-native';
import {styles} from './successMessage.styles';

type SuccessMessageProps = {
  title: string;
  subtitle: string;
};

export default function SuccessMessage({title, subtitle}: SuccessMessageProps) {
  return (
    <>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </>
  );
}

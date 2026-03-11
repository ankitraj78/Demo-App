import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { colors, spacing, iconSize } from '../../theme';
import { styles } from './screenHeader.styles';

type ScreenHeaderProps = {
  title: string;
  backgroundColor?: string;
  backIconColor?: string;
  rightAction?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
};

export default function ScreenHeader({
  title,
  backgroundColor = colors.backgroundLight,
  backIconColor = colors.primary,
  rightAction,
  style,
}: ScreenHeaderProps) {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  return (
    <View
      style={[
        styles.header,
        { backgroundColor, paddingTop: insets.top + spacing.md },
        style,
      ]}
    >
      <TouchableOpacity
        style={styles.backBtn}
        onPress={() => navigation.goBack()}
        activeOpacity={0.7}
      >
        <MaterialIcons
          name="arrow-back"
          size={iconSize.xl}
          color={backIconColor}
        />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>{title}</Text>
      {rightAction}
    </View>
  );
}

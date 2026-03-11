import React from 'react';
import { View, Text, StyleProp, ViewStyle } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { colors, iconSize } from '../../theme';
import { styles } from './poweredByFooter.styles';

type Variant = 'branded' | 'simple' | 'minimal';

type PoweredByFooterProps = {
  variant?: Variant;
  style?: StyleProp<ViewStyle>;
};

export default function PoweredByFooter({
  variant = 'branded',
  style,
}: PoweredByFooterProps) {
  if (variant === 'simple') {
    return (
      <View style={[styles.footer, { opacity: 0.5 }, style]}>
        <Text style={styles.footerTextSingle}>Powered by Mifos</Text>
        <View style={styles.footerLine} />
      </View>
    );
  }

  if (variant === 'minimal') {
    return (
      <View style={[styles.footer, { opacity: 0.6 }, style]}>
        <Text style={styles.footerLabel}>Powered by</Text>
        <Text style={styles.footerBoldLabel}>MIFOS</Text>
      </View>
    );
  }

  return (
    <View style={[styles.footer, style]}>
      <Text style={styles.footerLabel}>Powered by</Text>
      <View style={styles.footerBrand}>
        <MaterialIcons
          name="security"
          size={iconSize.sm}
          color={colors.textPrimary}
        />
        <Text style={styles.footerBrandText}>Mifos</Text>
      </View>
    </View>
  );
}

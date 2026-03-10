import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {colors, iconSize} from '../../../theme';
import {styles} from './qrBanner.styles';

type QrBannerProps = {
  title?: string;
  subtitle?: string;
  buttonLabel?: string;
  onPress?: () => void;
};

export default function QrBanner({
  title = 'Quick Setup',
  subtitle = 'Scan code to auto-fill details',
  buttonLabel = 'Upload QR',
  onPress,
}: QrBannerProps) {
  return (
    <View style={styles.qrBanner}>
      <View style={styles.qrBannerLeft}>
        <View style={styles.qrIconBox}>
          <MaterialIcons
            name="qr-code-scanner"
            size={iconSize.xl}
            color={colors.white}
          />
        </View>
        <View>
          <Text style={styles.qrTitle}>{title}</Text>
          <Text style={styles.qrSubtitle}>{subtitle}</Text>
        </View>
      </View>
      <TouchableOpacity
        style={styles.qrButton}
        activeOpacity={0.85}
        onPress={onPress}>
        <Text style={styles.qrButtonText}>{buttonLabel}</Text>
      </TouchableOpacity>
    </View>
  );
}

import React from 'react';
import {View, Text, StatusBar, Image, TouchableOpacity} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ScreenHeader from '../../components/screenHeader/screenHeader';
import PoweredByFooter from '../../components/poweredByFooter/poweredByFooter';
import {colors, iconSize} from '../../../theme';
import {styles} from './qrCode.styles';

export default function QrCodeScreen() {
  const shareButton = (
    <TouchableOpacity activeOpacity={0.7} style={{padding: 8}}>
      <MaterialIcons name="share" size={iconSize.xl} color={colors.primary} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.root}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />

      <ScreenHeader
        title="QR Code"
        backgroundColor={colors.white}
        rightAction={shareButton}
      />

      <View style={styles.content}>
        {/* Instructions */}
        <View style={styles.instructionSection}>
          <Text style={styles.title}>Scan your QR Code</Text>
          <Text style={styles.subtitle}>
            Import the account details into your app by scanning this QR code.
          </Text>
        </View>

        {/* QR Code Frame */}
        <View style={styles.frameContainer}>
          <View style={styles.frameBorder} />
          <View style={styles.cornerTopLeft} />
          <View style={styles.cornerTopRight} />
          <View style={styles.cornerBottomLeft} />
          <View style={styles.cornerBottomRight} />

          <View style={styles.qrImageWrapper}>
            <View style={styles.qrImageContainer}>
              <Image
                source={{
                  uri: 'https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=mifos-mobile-account',
                }}
                style={styles.qrImage}
                resizeMode="contain"
              />
            </View>
          </View>

          <View style={styles.scanLine} />
        </View>

        {/* Metadata Badge */}
        <View style={styles.metadataSection}>
          <View style={styles.metadataBadge}>
            <MaterialIcons
              name="calendar-today"
              size={14}
              color={colors.primary}
            />
            <Text style={styles.metadataText}>Generated on: October 24, 2023</Text>
          </View>
        </View>
      </View>

      {/* Footer */}
      <PoweredByFooter variant="branded" style={styles.footer} />
    </View>
  );
}

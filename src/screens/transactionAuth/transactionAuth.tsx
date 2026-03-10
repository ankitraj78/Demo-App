import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
  ScrollView,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useNavigation, useRoute, RouteProp} from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {colors, spacing, iconSize} from '../../../theme';
import {styles} from './transactionAuth.styles';
import type {RootStackParamList} from '../../navigation/rootNavigator';
import ScreenHeader from '../../components/screenHeader/screenHeader';
import PoweredByFooter from '../../components/poweredByFooter/poweredByFooter';

type TransactionAuthRouteProp = RouteProp<
  RootStackParamList,
  'TransactionAuth'
>;

export default function TransactionAuthScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const route = useRoute<TransactionAuthRouteProp>();
  const {amount, recipientName} = route.params;

  const [pin, setPin] = useState(['', '', '', '']);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const [isSuccess, setIsSuccess] = useState(false);

  const inputRefs = useRef<(TextInput | null)[]>([]);

  const handlePinChange = (text: string, index: number) => {
    const newPin = [...pin];
    newPin[index] = text;
    setPin(newPin);

    if (text && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }

    if (index === 3 && text) {
      const fullPin = newPin.join('');
      if (fullPin.length === 4) {
        setTimeout(() => setIsSuccess(true), 500);
      }
    }
  };

  const handleKeyPress = (key: string, index: number) => {
    if (key === 'Backspace' && !pin[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleBackToHome = () => {
    navigation.reset({
      index: 0,
      routes: [{name: 'MainTabs' as never}],
    });
  };

  if (isSuccess) {
    return (
      <View style={styles.root}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor={colors.backgroundLight}
        />
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            paddingTop: insets.top,
            paddingBottom: insets.bottom,
          }}
          showsVerticalScrollIndicator={false}>
          <View style={styles.successContent}>
            {/* Success Icon */}
            <View style={styles.successIconOuter}>
              <View style={styles.successIconInner}>
                <MaterialIcons name="check" size={36} color={colors.white} />
              </View>
            </View>

            <Text style={styles.successTitle}>Transfer Successful!</Text>
            <Text style={styles.successSubtitle}>
              Your money has been sent.
            </Text>

            {/* Transaction Card */}
            <View style={styles.transactionCard}>
              <View style={styles.transactionAmountSection}>
                <Text style={styles.transactionAmountLabel}>
                  Amount Transferred
                </Text>
                <Text style={styles.transactionAmount}>{amount}</Text>
              </View>

              <View style={styles.transactionDetails}>
                <View style={styles.transactionRow}>
                  <Text style={styles.transactionLabel}>Recipient</Text>
                  <Text style={styles.transactionValue}>{recipientName}</Text>
                </View>
                <View style={styles.transactionRow}>
                  <Text style={styles.transactionLabel}>Ref Number</Text>
                  <Text style={styles.transactionRefValue}>
                    #TRX-8829-4410
                  </Text>
                </View>
                <View style={styles.transactionRow}>
                  <Text style={styles.transactionLabel}>Date & Time</Text>
                  <Text style={styles.transactionValue}>
                    Oct 24, 2023 • 14:32
                  </Text>
                </View>
                <View style={styles.transactionRow}>
                  <Text style={styles.transactionLabel}>Status</Text>
                  <View style={styles.statusBadge}>
                    <Text style={styles.statusText}>Completed</Text>
                  </View>
                </View>
              </View>
            </View>

            {/* Action Buttons */}
            <View style={styles.actionButtons}>
              <TouchableOpacity
                style={styles.primaryBtn}
                onPress={handleBackToHome}>
                <Text style={styles.primaryBtnText}>Back to Home</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.secondaryBtn}>
                <Text style={styles.secondaryBtnText}>Share Receipt</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerLabel}>Powered by</Text>
            <Text
              style={[
                styles.footerLabel,
                {fontWeight: '700', letterSpacing: 1},
              ]}>
              MIFOS
            </Text>
          </View>
        </ScrollView>
      </View>
    );
  }

  return (
    <View style={styles.root}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={colors.backgroundLight}
      />

      <ScreenHeader title="Authenticate Transaction" backIconColor={colors.textPrimary} />

      {/* Auth Content */}
      <View style={styles.authContent}>
        <View style={styles.lockIconWrapper}>
          <MaterialIcons name="lock" size={48} color={colors.primary} />
        </View>

        <Text style={styles.authTitle}>Enter Transaction PIN</Text>
        <Text style={styles.authDescription}>
          Please enter your 4-digit PIN to authorize the transfer of{' '}
          <Text style={styles.authBoldText}>{amount}</Text> to{' '}
          <Text style={styles.authBoldText}>{recipientName}</Text>.
        </Text>

        {/* PIN Inputs */}
        <View style={styles.pinRow}>
          {pin.map((digit, index) => (
            <TextInput
              key={index}
              ref={ref => {
                inputRefs.current[index] = ref;
              }}
              style={[
                styles.pinInput,
                focusedIndex === index && styles.pinInputFocused,
              ]}
              value={digit}
              onChangeText={text => handlePinChange(text, index)}
              onKeyPress={({nativeEvent}) =>
                handleKeyPress(nativeEvent.key, index)
              }
              onFocus={() => setFocusedIndex(index)}
              onBlur={() => setFocusedIndex(-1)}
              keyboardType="number-pad"
              maxLength={1}
              secureTextEntry
            />
          ))}
        </View>

        {/* Biometrics Button */}
        <TouchableOpacity style={styles.biometricsBtn}>
          <MaterialIcons
            name="fingerprint"
            size={iconSize.xl}
            color={colors.primary}
          />
          <Text style={styles.biometricsText}>Use Biometrics</Text>
        </TouchableOpacity>
      </View>

      <PoweredByFooter variant="minimal" style={{paddingBottom: insets.bottom + spacing.xl}} />
    </View>
  );
}

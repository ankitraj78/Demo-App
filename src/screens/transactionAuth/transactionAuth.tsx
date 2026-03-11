import React, { useState } from 'react';
import { View, StatusBar, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { colors, spacing } from '../../theme';
import { styles } from './transactionAuth.styles';
import type { RootStackParamList } from '../../navigation/rootNavigator';
import ScreenHeader from '../../components/screenHeader/screenHeader';
import PoweredByFooter from '../../components/poweredByFooter/poweredByFooter';
import SuccessIcon from '../../components/successIcon/successIcon';
import SuccessMessage from '../../components/successMessage/successMessage';
import DualActionButtons from '../../components/dualActionButtons/dualActionButtons';
import TransactionCard from '../../components/transactionCard/transactionCard';
import PinAuthSection from '../../components/pinAuthSection/pinAuthSection';

type TransactionAuthRouteProp = RouteProp<
  RootStackParamList,
  'TransactionAuth'
>;

export default function TransactionAuthScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const route = useRoute<TransactionAuthRouteProp>();
  const { amount, recipientName } = route.params;

  const [isSuccess, setIsSuccess] = useState(false);

  const handlePinComplete = (_pin: string) => {
    setTimeout(() => setIsSuccess(true), 500);
  };

  const handleBackToHome = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'MainTabs' as never }],
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
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.successContent}>
            {/* Success Icon */}
            <SuccessIcon />

            <SuccessMessage
              title="Transfer Successful!"
              subtitle="Your money has been sent."
            />

            {/* Transaction Card */}
            <TransactionCard
              amountLabel="Amount Transferred"
              amount={amount}
              details={[
                { label: 'Recipient', value: recipientName },
                { label: 'Ref Number', value: '#TRX-8829-4410', isRef: true },
                { label: 'Date & Time', value: 'Oct 24, 2023 • 14:32' },
                { label: 'Status', value: 'Completed', isBadge: true },
              ]}
            />

            {/* Action Buttons */}
            <DualActionButtons
              primaryLabel="Back to Home"
              secondaryLabel="Share Receipt"
              onPrimaryPress={handleBackToHome}
            />
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

      <ScreenHeader
        title="Authenticate Transaction"
        backIconColor={colors.textPrimary}
      />

      {/* Auth Content */}
      <PinAuthSection onPinComplete={handlePinComplete} />

      <PoweredByFooter
        variant="minimal"
        style={{ paddingBottom: insets.bottom + spacing.xl }}
      />
    </View>
  );
}

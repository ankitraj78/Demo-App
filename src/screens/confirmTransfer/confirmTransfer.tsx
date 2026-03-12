import React, { useState } from 'react';
import {
  View,
  ScrollView,
  StatusBar,
  ActivityIndicator,
  Alert,
  Text,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors, spacing } from '../../theme';
import { styles } from './confirmTransfer.styles';
import TransferAccountCard from '../../components/transferAccountCard/transferAccountCard';
import ActionButtons from '../../components/actionButtons/actionButtons';
import type { RootStackParamList } from '../../navigation/rootNavigator';
import ScreenHeader from '../../components/screenHeader/screenHeader';
import DetailsCard from '../../components/detailsCard/detailsCard';

import { makeThirdPartyTransfer, makeSelfTransfer } from '../../services/transferService';

type ConfirmTransferRouteProp = RouteProp<
  RootStackParamList,
  'ConfirmTransfer'
>;

function formatTransferDate(): string {
  const now = new Date();
  const day = String(now.getDate()).padStart(2, '0');
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  return `${day} ${months[now.getMonth()]} ${now.getFullYear()}`;
}

export default function ConfirmTransferScreen() {
  const insets = useSafeAreaInsets();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<ConfirmTransferRouteProp>();

  if (!route.params) {
    return (
      <View style={styles.root}>
        <ScreenHeader title="Confirm Transfer" backgroundColor={colors.white} />
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <Text style={{ color: colors.textSecondary }}>
            Transfer details not available.
          </Text>
        </View>
      </View>
    );
  }

  const {
    fromAccountName,
    fromAccountNo,
    fromOfficeId,
    fromClientId,
    fromAccountType,
    toAccountName,
    toAccountNo,
    toOfficeId,
    toClientId,
    toAccountType,
    amount,
    remarks,
    isSelfTransfer,
  } = route.params;

  const [submitting, setSubmitting] = useState(false);

  const transferDate = formatTransferDate();

  const handleConfirm = async () => {
    setSubmitting(true);
    const payload = {
      fromOfficeId,
      fromClientId,
      fromAccountType,
      fromAccountId: fromAccountNo,
      toOfficeId,
      toClientId,
      toAccountType,
      toAccountId: toAccountNo,
      transferAmount: parseFloat(amount) || 0,
      transferDescription: remarks || '',
      transferDate,
      dateFormat: 'dd MMMM yyyy',
      locale: 'en',
    };
    console.log('[ConfirmTransfer] Payload:', JSON.stringify(payload, null, 2));
    console.log('[ConfirmTransfer] isSelfTransfer:', isSelfTransfer);
    try {
      const result = isSelfTransfer
        ? await makeSelfTransfer(payload)
        : await makeThirdPartyTransfer(payload);
      console.log('[ConfirmTransfer] Response:', JSON.stringify(result, null, 2));
      navigation.navigate('TransactionAuth', {
        amount: `$${parseFloat(amount).toFixed(2)}`,
        recipientName: toAccountName,
      });
    } catch (err) {
      console.log('[ConfirmTransfer] Error:', err);
      Alert.alert(
        'Transfer Failed',
        err instanceof Error ? err.message : 'Something went wrong',
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <View style={styles.root}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={colors.white}
      />

      <ScreenHeader title="Confirm Transfer" backgroundColor={colors.white} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          padding: spacing.xl,
          paddingBottom: insets.bottom + spacing['2xl'],
          gap: spacing['2xl'],
        }}
      >
        {/* Pay From Section */}
        <TransferAccountCard
          label="Pay From"
          iconName="account-balance-wallet"
          name={fromAccountName}
          accountDetail={`Account: ${fromAccountNo}`}
        />

        {/* Pay To Section */}
        <TransferAccountCard
          label="Pay To"
          iconName="person"
          name={toAccountName}
          accountDetail={`Account: ${toAccountNo}`}
        />

        {/* Transfer Details Section */}
        <DetailsCard
          title="Transfer Details"
          rows={[
            {
              label: 'Amount',
              value: `$${parseFloat(amount).toFixed(2)}`,
              highlight: true,
            },
            { label: 'Date', value: transferDate },
            ...(remarks
              ? [{ label: 'Remark', value: remarks, vertical: true }]
              : []),
          ]}
        />

        {/* Action Buttons */}
        {submitting ? (
          <ActivityIndicator size="large" color={colors.primary} />
        ) : (
          <ActionButtons
            confirmLabel="Confirm Transfer"
            confirmIconName="send"
            onConfirm={handleConfirm}
            onCancel={() => navigation.goBack()}
          />
        )}


      </ScrollView>
    </View>
  );
}

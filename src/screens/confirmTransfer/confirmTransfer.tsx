import React from 'react';
import {View, ScrollView, StatusBar} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {colors, spacing} from '../../../theme';
import {styles} from './confirmTransfer.styles';
import TransferAccountCard from '../../components/transferAccountCard/transferAccountCard';
import ActionButtons from '../../components/actionButtons/actionButtons';
import type {RootStackParamList} from '../../navigation/rootNavigator';
import ScreenHeader from '../../components/screenHeader/screenHeader';
import DetailsCard from '../../components/detailsCard/detailsCard';
import PoweredByFooter from '../../components/poweredByFooter/poweredByFooter';

export default function ConfirmTransferScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View style={styles.root}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.backgroundLight} />

      <ScreenHeader title="Confirm Transfer" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          padding: spacing.xl,
          paddingBottom: insets.bottom + spacing['2xl'],
          gap: spacing['2xl'],
        }}>
        {/* Pay From Section */}
        <TransferAccountCard
          label="Pay From"
          iconName="account-balance-wallet"
          name="John Doe"
          accountDetail="Savings Account: 1234567890"
        />

        {/* Pay To Section */}
        <TransferAccountCard
          label="Pay To"
          iconName="person"
          name="Jane Smith"
          accountDetail="Current Account: 0987654321"
        />

        {/* Transfer Details Section */}
        <DetailsCard
          title="Transfer Details"
          rows={[
            {label: 'Amount', value: '$1,250.00', highlight: true},
            {label: 'Date', value: 'Oct 24, 2023'},
            {label: 'Remark', value: 'Monthly rent payment - Oct', vertical: true},
          ]}
        />

        {/* Action Buttons */}
        <ActionButtons
          confirmLabel="Confirm Transfer"
          confirmIconName="send"
          onConfirm={() => navigation.navigate('TransactionAuth', {
            amount: '$1,250.00',
            recipientName: 'Jane Smith',
          })}
          onCancel={() => navigation.goBack()}
        />

        <PoweredByFooter />
      </ScrollView>
    </View>
  );
}

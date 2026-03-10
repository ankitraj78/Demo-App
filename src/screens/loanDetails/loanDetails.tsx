import React from 'react';
import {View, Text, ScrollView, TouchableOpacity, StatusBar} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useNavigation, useRoute, RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {colors, spacing, iconSize} from '../../../theme';
import {styles} from './loanDetails.styles';
import type {RootStackParamList} from '../../navigation/rootNavigator';
import ScreenHeader from '../../components/screenHeader/screenHeader';

type LoanDetailsRouteProp = RouteProp<RootStackParamList, 'LoanDetails'>;

type ActionItem = {
  icon: string;
  title: string;
  subtitle: string;
  iconColor: string;
  iconBg: string;
};

const actions: ActionItem[] = [
  {
    icon: 'payments',
    title: 'Make Payment',
    subtitle: 'Pay your installment instantly',
    iconColor: colors.emerald600,
    iconBg: colors.emerald500Bg,
  },
  {
    icon: 'description',
    title: 'Loan Summary',
    subtitle: 'View detailed loan information',
    iconColor: colors.primary,
    iconBg: colors.primaryBgLight,
  },
  {
    icon: 'calendar-month',
    title: 'Repayment Schedule',
    subtitle: 'Check all upcoming payments',
    iconColor: colors.primary,
    iconBg: colors.primaryBgLight,
  },
  {
    icon: 'history',
    title: 'Transactions',
    subtitle: 'View your payment history',
    iconColor: colors.primary,
    iconBg: colors.primaryBgLight,
  },
  {
    icon: 'receipt-long',
    title: 'Charges',
    subtitle: 'List of fees and service charges',
    iconColor: colors.primary,
    iconBg: colors.primaryBgLight,
  },
  {
    icon: 'qr-code-2',
    title: 'QR Code',
    subtitle: 'Generate QR for quick reference',
    iconColor: colors.primary,
    iconBg: colors.primaryBgLight,
  },
];

function ActionCard({item, onPress}: {item: ActionItem; onPress?: () => void}) {
  return (
    <TouchableOpacity style={styles.actionItem} onPress={onPress}>
      <View style={[styles.actionIconBox, {backgroundColor: item.iconBg}]}>
        <MaterialIcons name={item.icon} size={iconSize.xl} color={item.iconColor} />
      </View>
      <View style={styles.actionTextBox}>
        <Text style={styles.actionTitle}>{item.title}</Text>
        <Text style={styles.actionSubtitle}>{item.subtitle}</Text>
      </View>
      <MaterialIcons name="chevron-right" size={iconSize.xl} color={colors.slate200} />
    </TouchableOpacity>
  );
}

export default function LoanDetailsScreen() {
  const insets = useSafeAreaInsets();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<LoanDetailsRouteProp>();
  const {name, accountNumber, balance} = route.params;

  return (
    <View style={styles.root}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.backgroundLight} />

      <ScreenHeader title="Loan Account Details" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: insets.bottom + spacing.xl}}>

        {/* Hero Card */}
        <View style={styles.heroWrapper}>
          <View style={styles.heroCard}>
            <View style={styles.heroWatermark}>
              <MaterialIcons name="account-balance-wallet" size={64} color={colors.white} />
            </View>
            <View style={styles.heroContent}>
              <View style={styles.heroTopRow}>
                <View>
                  <Text style={styles.heroAccountLabel}>Account Number</Text>
                  <Text style={styles.heroAccountNumber}>{accountNumber}</Text>
                </View>
                <View style={styles.heroTypeBadge}>
                  <Text style={styles.heroTypeText}>{name}</Text>
                </View>
              </View>
              <View style={styles.heroBalanceSection}>
                <Text style={styles.heroBalanceLabel}>Outstanding Balance</Text>
                <View style={styles.heroBalanceRow}>
                  <Text style={styles.heroBalanceAmount}>{balance}</Text>
                  <Text style={styles.heroBalanceCurrency}>USD</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Next Installment */}
        <View style={styles.installmentWrapper}>
          <View style={styles.installmentCard}>
            <View style={styles.installmentHeader}>
              <View style={styles.installmentIconBox}>
                <MaterialIcons name="event-repeat" size={iconSize.xl} color={colors.primary} />
              </View>
              <Text style={styles.installmentTitle}>Next Installment</Text>
            </View>
            <View style={styles.installmentGrid}>
              <View style={styles.installmentBox}>
                <Text style={styles.installmentBoxLabel}>Amount Due</Text>
                <Text style={styles.installmentBoxAmount}>$1,000.00</Text>
              </View>
              <View style={styles.installmentBox}>
                <Text style={styles.installmentBoxLabel}>Due Date</Text>
                <Text style={styles.installmentBoxDate}>9 Mar 2026</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Actions */}
        <View style={styles.actionsWrapper}>
          <Text style={styles.actionsTitle}>Actions & Information</Text>
          <View style={styles.actionsList}>
            {actions.map(item => (
              <ActionCard
                key={item.title}
                item={item}
                onPress={
                  item.title === 'Make Payment'
                    ? () =>
                        navigation.navigate('MakePayment', {
                          loanName: name,
                          loanAccountNumber: accountNumber,
                        })
                    : undefined
                }
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useNavigation, useRoute, RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {colors, spacing, iconSize} from '../../theme';
import {styles} from './transactionDetails.styles';
import {useTransactionDetails} from '../../hooks/useTransactionDetails';
import type {RootStackParamList} from '../../navigation/rootNavigator';

type TransactionDetailsRouteProp = RouteProp<
  RootStackParamList,
  'TransactionDetails'
>;

function formatDateFromArray(dateArr?: number[]): string {
  if (!dateArr || dateArr.length < 3) {
    return 'N/A';
  }
  const [year, month, day] = dateArr;
  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

function formatAmount(amount?: number, symbol?: string): string {
  if (amount == null) {
    return 'N/A';
  }
  const sym = symbol ?? '$';
  return `${sym}${amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
}

function getStatusInfo(reversed?: boolean) {
  if (reversed) {
    return {label: 'Reversed', color: colors.error};
  }
  return {label: 'Completed', color: colors.success};
}

function getTransactionTypeLabel(typeCode?: string): string {
  switch (typeCode) {
    case 'loanTransactionType.disbursement':
      return 'Disbursement';
    case 'loanTransactionType.accrual':
      return 'Interest Accrual';
    case 'loanTransactionType.repayment':
    case 'loanTransactionType.repaymentAtDisbursement':
      return 'Repayment';
    case 'loanTransactionType.waiveInterest':
      return 'Interest Waiver';
    case 'loanTransactionType.writeOff':
      return 'Write Off';
    case 'loanTransactionType.chargePayment':
      return 'Charge Payment';
    default:
      return typeCode?.split('.').pop() ?? 'Transaction';
  }
}

export default function TransactionDetailsScreen() {
  const insets = useSafeAreaInsets();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<TransactionDetailsRouteProp>();
  const {loanId, transactionId, loanAccountNo, loanProductName} = route.params;

  const {details, loading, error, refetch} = useTransactionDetails(
    loanId,
    transactionId,
  );

  const currencySymbol = details?.currency?.displaySymbol ?? '$';
  const status = getStatusInfo(details?.manuallyReversed);
  const typeLabel = getTransactionTypeLabel(details?.type?.code);

  const totalPaid = details?.amount ?? 0;
  const outstandingBalance = details?.outstandingLoanBalance;

  // Calculate repayment progress for balance card
  const principalPortion = details?.principalPortion ?? 0;
  const interestPortion = details?.interestPortion ?? 0;
  const feesPortion = details?.feeChargesPortion ?? 0;
  const penaltyPortion = details?.penaltyChargesPortion ?? 0;

  const hasBreakdown =
    principalPortion > 0 ||
    interestPortion > 0 ||
    feesPortion > 0 ||
    penaltyPortion > 0;

  if (loading) {
    return (
      <View style={styles.root}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor={colors.backgroundLight}
        />
        <View
          style={[styles.header, {paddingTop: insets.top + spacing.lg}]}>
          <TouchableOpacity
            style={styles.headerBackBtn}
            onPress={() => navigation.goBack()}>
            <MaterialIcons
              name="arrow-back"
              size={iconSize.xl}
              color={colors.textPrimary}
            />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Transaction Details</Text>
        </View>
        <View style={styles.centeredContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles.loadingText}>Loading details...</Text>
        </View>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.root}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor={colors.backgroundLight}
        />
        <View
          style={[styles.header, {paddingTop: insets.top + spacing.lg}]}>
          <TouchableOpacity
            style={styles.headerBackBtn}
            onPress={() => navigation.goBack()}>
            <MaterialIcons
              name="arrow-back"
              size={iconSize.xl}
              color={colors.textPrimary}
            />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Transaction Details</Text>
        </View>
        <View style={styles.centeredContainer}>
          <MaterialIcons name="error-outline" size={48} color={colors.error} />
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity style={styles.retryBtn} onPress={refetch}>
            <Text style={styles.retryText}>Retry</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.root}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={colors.backgroundLight}
      />

      {/* Header */}
      <View style={[styles.header, {paddingTop: insets.top + spacing.lg}]}>
        <TouchableOpacity
          style={styles.headerBackBtn}
          onPress={() => navigation.goBack()}>
          <MaterialIcons
            name="arrow-back"
            size={iconSize.xl}
            color={colors.textPrimary}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Transaction Details</Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scrollContent,
          {paddingBottom: insets.bottom + spacing.xl},
        ]}>
        {/* Success Header */}
        <View style={styles.successHeader}>
          <View
            style={[
              styles.successIconCircle,
              details?.manuallyReversed && {backgroundColor: colors.errorBg},
            ]}>
            <MaterialIcons
              name={details?.manuallyReversed ? 'cancel' : 'check-circle'}
              size={36}
              color={
                details?.manuallyReversed ? colors.error : colors.success
              }
            />
          </View>
          <Text style={styles.successTitle}>
            {details?.manuallyReversed
              ? 'Transaction Reversed'
              : 'Transaction Successful'}
          </Text>
          <Text style={styles.successSubtitle}>
            {loanProductName ?? 'Loan Transaction'}
          </Text>
        </View>

        {/* Amount */}
        <View style={styles.amountSection}>
          <Text style={styles.amountText}>
            {formatAmount(details?.amount, currencySymbol)}
          </Text>
          <View style={styles.typeBadge}>
            <Text style={styles.typeBadgeText}>{typeLabel}</Text>
          </View>
        </View>

        {/* Transfer Details Card */}
        <View style={styles.detailsCard}>
          <Text style={styles.detailsCardTitle}>Transaction Details</Text>

          <View style={[styles.detailRow, styles.detailRowBorder]}>
            <Text style={styles.detailLabel}>Transaction ID</Text>
            <Text style={styles.detailValue}>#{details?.id}</Text>
          </View>

          <View style={[styles.detailRow, styles.detailRowBorder]}>
            <Text style={styles.detailLabel}>Date</Text>
            <Text style={styles.detailValue}>
              {formatDateFromArray(details?.date)}
            </Text>
          </View>

          <View style={[styles.detailRow, styles.detailRowBorder]}>
            <Text style={styles.detailLabel}>Status</Text>
            <View style={styles.detailValueRow}>
              <View
                style={[styles.statusDot, {backgroundColor: status.color}]}
              />
              <Text style={styles.detailValue}>{status.label}</Text>
            </View>
          </View>

          <View style={[styles.detailRow, styles.detailRowBorder]}>
            <Text style={styles.detailLabel}>Type</Text>
            <Text style={styles.detailValue}>
              {details?.type?.value ?? typeLabel}
            </Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Loan Account</Text>
            <Text style={styles.detailValue}>{loanAccountNo}</Text>
          </View>
        </View>

        {/* Payment Breakdown Card */}
        {hasBreakdown && (
          <View style={styles.breakdownCard}>
            <Text style={styles.detailsCardTitle}>Payment Breakdown</Text>

            <View style={[styles.detailRow, styles.detailRowBorder]}>
              <Text style={styles.detailLabel}>Principal</Text>
              <Text style={styles.detailValue}>
                {formatAmount(principalPortion, currencySymbol)}
              </Text>
            </View>

            <View style={[styles.detailRow, styles.detailRowBorder]}>
              <Text style={styles.detailLabel}>Interest</Text>
              <Text style={styles.detailValue}>
                {formatAmount(interestPortion, currencySymbol)}
              </Text>
            </View>

            {feesPortion > 0 && (
              <View style={[styles.detailRow, styles.detailRowBorder]}>
                <Text style={styles.detailLabel}>Fees</Text>
                <Text style={styles.detailValue}>
                  {formatAmount(feesPortion, currencySymbol)}
                </Text>
              </View>
            )}

            {penaltyPortion > 0 && (
              <View style={[styles.detailRow, styles.detailRowBorder]}>
                <Text style={styles.detailLabel}>Penalties</Text>
                <Text style={styles.detailValue}>
                  {formatAmount(penaltyPortion, currencySymbol)}
                </Text>
              </View>
            )}

            <View style={styles.detailRow}>
              <Text style={[styles.detailLabel, {fontWeight: '600'}]}>
                Total
              </Text>
              <Text style={[styles.detailValue, {fontWeight: '700'}]}>
                {formatAmount(totalPaid, currencySymbol)}
              </Text>
            </View>
          </View>
        )}

        {/* Balance Remaining Card */}
        {outstandingBalance != null && (
          <View style={styles.balanceCard}>
            <View style={styles.balanceCardHeader}>
              <Text style={styles.balanceCardLabel}>Balance Remaining</Text>
              <MaterialIcons
                name="account-balance-wallet"
                size={iconSize.lg}
                color={colors.primary}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
              }}>
              <View>
                <Text style={styles.balanceCardSublabel}>{loanProductName}</Text>
                <Text style={styles.balanceCardAmount}>
                  {formatAmount(outstandingBalance, currencySymbol)}
                </Text>
              </View>
              {outstandingBalance > 0 && totalPaid > 0 && (
                <View style={styles.balanceCardRight}>
                  <Text style={styles.progressLabel}>Paid this txn</Text>
                  <View style={styles.progressBar}>
                    <View
                      style={[
                        styles.progressFill,
                        {
                          width: `${Math.min(
                            (totalPaid / (outstandingBalance + totalPaid)) * 100,
                            100,
                          )}%`,
                        },
                      ]}
                    />
                  </View>
                </View>
              )}
            </View>
          </View>
        )}

        {/* Action Buttons */}
        <View style={styles.actionButtonsContainer}>
          <TouchableOpacity
            style={styles.doneBtn}
            onPress={() => navigation.goBack()}>
            <Text style={styles.doneBtnText}>Done</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => navigation.goBack()}>
            <Text style={styles.backBtnText}>Back to History</Text>
          </TouchableOpacity>

          {/* Quick Actions */}
          <View style={styles.quickActions}>
            <TouchableOpacity style={styles.quickAction}>
              <View style={styles.quickActionCircle}>
                <MaterialIcons
                  name="share"
                  size={iconSize.lg}
                  color={colors.textSecondary}
                />
              </View>
              <Text style={styles.quickActionLabel}>Share</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.quickAction}>
              <View style={styles.quickActionCircle}>
                <MaterialIcons
                  name="download"
                  size={iconSize.lg}
                  color={colors.textSecondary}
                />
              </View>
              <Text style={styles.quickActionLabel}>PDF</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.quickAction}>
              <View style={styles.quickActionCircle}>
                <MaterialIcons
                  name="help"
                  size={iconSize.lg}
                  color={colors.textSecondary}
                />
              </View>
              <Text style={styles.quickActionLabel}>Support</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>Powered by Mifos</Text>
        </View>
      </ScrollView>
    </View>
  );
}

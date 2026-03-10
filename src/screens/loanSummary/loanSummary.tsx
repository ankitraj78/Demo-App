import React from 'react';
import {View, Text, ScrollView, StatusBar, TouchableOpacity} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useNavigation, useRoute, RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {colors, spacing, iconSize} from '../../../theme';
import {styles} from './loanSummary.styles';
import type {RootStackParamList} from '../../navigation/rootNavigator';
import ScreenHeader from '../../components/screenHeader/screenHeader';
import StickyFooter from '../../components/stickyFooter/stickyFooter';
import PoweredByFooter from '../../components/poweredByFooter/poweredByFooter';

type LoanSummaryRouteProp = RouteProp<RootStackParamList, 'LoanSummary'>;

export default function LoanSummaryScreen() {
  const insets = useSafeAreaInsets();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<LoanSummaryRouteProp>();
  const {loanName, loanAccountNumber} = route.params;

  return (
    <View style={styles.root}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={colors.backgroundLight}
      />

      <ScreenHeader
        title="Loan Summary"
        rightAction={
          <TouchableOpacity
            style={{padding: spacing.md}}
            activeOpacity={0.7}>
            <MaterialIcons
              name="more-vert"
              size={iconSize.xl}
              color={colors.textPrimary}
            />
          </TouchableOpacity>
        }
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: insets.bottom + 100}}>
        {/* Summary Hero Card */}
        <View style={styles.heroWrapper}>
          <View style={styles.heroCard}>
            <View style={styles.heroStatusBadge}>
              <Text style={styles.heroStatusText}>Active</Text>
            </View>
            <Text style={styles.heroAccountLabel}>Account Number</Text>
            <Text style={styles.heroAccountNumber}>{loanAccountNumber}</Text>
            <View style={styles.heroInfoGrid}>
              <View style={styles.heroInfoItem}>
                <Text style={styles.heroInfoLabel}>Loan Type</Text>
                <Text style={styles.heroInfoValue}>{loanName}</Text>
              </View>
              <View style={styles.heroInfoItem}>
                <Text style={styles.heroInfoLabel}>Loan Scheme</Text>
                <Text style={styles.heroInfoValue}>Standard Scheme</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Pay-off Details */}
        <View style={styles.sectionWrapper}>
          <View style={styles.sectionCard}>
            <View style={styles.sectionHeader}>
              <MaterialIcons
                name="payments"
                size={iconSize.xl}
                color={colors.primary}
              />
              <Text style={styles.sectionTitle}>Pay-off Details</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Expected Payoff</Text>
              <Text style={styles.detailValueHighlight}>$5,240.00</Text>
            </View>
            <View style={[styles.detailRow, styles.detailRowBorder]}>
              <Text style={styles.detailLabel}>Principal</Text>
              <Text style={styles.detailValue}>$5,000.00</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Interest</Text>
              <Text style={styles.detailValue}>$240.00</Text>
            </View>
          </View>
        </View>

        {/* Outstanding Details */}
        <View style={styles.sectionWrapper}>
          <View style={styles.sectionCard}>
            <View style={styles.sectionHeader}>
              <MaterialIcons
                name="account-balance-wallet"
                size={iconSize.xl}
                color={colors.primary}
              />
              <Text style={styles.sectionTitle}>Outstanding Details</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Total Outstanding</Text>
              <Text style={styles.detailValue}>$4,850.00</Text>
            </View>
            <View style={[styles.detailRow, styles.detailRowBorder]}>
              <Text style={styles.detailLabel}>Arrears Amount</Text>
              <Text style={styles.detailValueDanger}>$0.00</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Fees & Charges</Text>
              <Text style={styles.detailValue}>$15.00</Text>
            </View>
          </View>
        </View>

        {/* Installment Details */}
        <View style={styles.sectionWrapper}>
          <View style={styles.sectionCard}>
            <View style={styles.sectionHeader}>
              <MaterialIcons
                name="event"
                size={iconSize.xl}
                color={colors.primary}
              />
              <Text style={styles.sectionTitle}>Installment Details</Text>
            </View>
            <View style={styles.installmentGrid}>
              <View style={styles.installmentBox}>
                <Text style={styles.installmentBoxLabel}>Regular Payment</Text>
                <Text style={styles.installmentBoxValue}>$450.00</Text>
              </View>
              <View style={styles.installmentBox}>
                <Text style={styles.installmentBoxLabel}>Months Left</Text>
                <Text style={styles.installmentBoxValue}>11</Text>
              </View>
            </View>
            <View style={styles.nextPaymentRow}>
              <View style={styles.nextPaymentLabel}>
                <MaterialIcons
                  name="event"
                  size={iconSize.sm}
                  color={colors.textMuted}
                />
                <Text style={styles.nextPaymentText}>Next Payment Date</Text>
              </View>
              <Text style={styles.nextPaymentValue}>Oct 15, 2023</Text>
            </View>
          </View>
        </View>

        {/* Powered by Mifos */}
        <PoweredByFooter variant="minimal" />
      </ScrollView>

      {/* Sticky Footer */}
      <StickyFooter
        buttonLabel="Make Payment"
        iconName="account-balance-wallet"
        paddingBottom={insets.bottom}
        onPress={() =>
          navigation.navigate('MakePayment', {
            loanName,
            loanAccountNumber,
          })
        }
      />
    </View>
  );
}

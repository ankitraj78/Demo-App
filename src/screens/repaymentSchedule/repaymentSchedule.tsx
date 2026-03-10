import React, {useState} from 'react';
import {View, Text, ScrollView, StatusBar, TouchableOpacity} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useNavigation, useRoute, RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {colors, spacing, iconSize} from '../../../theme';
import {styles} from './repaymentSchedule.styles';
import type {RootStackParamList} from '../../navigation/rootNavigator';
import ScreenHeader from '../../components/screenHeader/screenHeader';
import StickyFooter from '../../components/stickyFooter/stickyFooter';

type RepaymentScheduleRouteProp = RouteProp<
  RootStackParamList,
  'RepaymentSchedule'
>;

type Installment = {
  number: number;
  date: string;
  paidDate?: string;
  principal: string;
  interest: string;
  fees: string;
  total: string;
  status: 'paid' | 'upcoming' | 'future';
};

const installments: Installment[] = [
  {
    number: 1,
    date: '9 Apr 2026',
    paidDate: '9 Apr 2026',
    principal: '$133.86',
    interest: '$15.00',
    fees: '$0.00',
    total: '$148.86',
    status: 'paid',
  },
  {
    number: 2,
    date: '9 May 2026',
    paidDate: '8 May 2026',
    principal: '$133.86',
    interest: '$15.00',
    fees: '$0.00',
    total: '$148.86',
    status: 'paid',
  },
  {
    number: 3,
    date: '9 Jun 2026',
    paidDate: '9 Jun 2026',
    principal: '$133.87',
    interest: '$15.00',
    fees: '$0.00',
    total: '$148.87',
    status: 'paid',
  },
  {
    number: 4,
    date: '9 Jul 2026',
    principal: '$133.86',
    interest: '$15.00',
    fees: '$0.00',
    total: '$148.86',
    status: 'upcoming',
  },
  {
    number: 5,
    date: '9 Aug 2026',
    principal: '$133.86',
    interest: '$15.00',
    fees: '$0.00',
    total: '$148.86',
    status: 'future',
  },
  {
    number: 6,
    date: '9 Sep 2026',
    principal: '$133.86',
    interest: '$15.00',
    fees: '$0.00',
    total: '$148.86',
    status: 'future',
  },
  {
    number: 7,
    date: '9 Oct 2026',
    principal: '$133.86',
    interest: '$15.00',
    fees: '$0.00',
    total: '$148.86',
    status: 'future',
  },
  {
    number: 8,
    date: '9 Nov 2026',
    principal: '$133.87',
    interest: '$15.00',
    fees: '$0.00',
    total: '$148.87',
    status: 'future',
  },
];

const paidCount = installments.filter(i => i.status === 'paid').length;
const totalCount = installments.length;
const progressPercent = (paidCount / totalCount) * 100;

const nextInstallment = installments.find(i => i.status === 'upcoming');
const totalOutstanding = '$744.30';

export default function RepaymentScheduleScreen() {
  const insets = useSafeAreaInsets();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<RepaymentScheduleRouteProp>();
  const {accountNumber, name} = route.params;

  const [expandedRow, setExpandedRow] = useState<number | null>(null);

  const handleMakePayment = () => {
    navigation.navigate('MakePayment', {
      loanName: name,
      loanAccountNumber: accountNumber,
    });
  };

  const toggleRow = (rowNumber: number) => {
    setExpandedRow(prev => (prev === rowNumber ? null : rowNumber));
  };

  const renderHeaderActions = () => (
    <View style={styles.headerActions}>
      <TouchableOpacity style={styles.headerActionBtn} activeOpacity={0.7}>
        <MaterialIcons
          name="file-download"
          size={iconSize.lg}
          color={colors.textPrimary}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.headerActionBtn} activeOpacity={0.7}>
        <MaterialIcons
          name="more-vert"
          size={iconSize.lg}
          color={colors.textPrimary}
        />
      </TouchableOpacity>
    </View>
  );

  const renderPaidDateCell = (item: Installment) => {
    if (item.status === 'paid' && item.paidDate) {
      return <Text style={styles.cellPaidDate}>{item.paidDate}</Text>;
    }
    if (item.status === 'upcoming') {
      return <Text style={styles.cellPending}>Pending</Text>;
    }
    return <Text style={styles.cellDash}>-</Text>;
  };

  const renderRow = (item: Installment, index: number) => {
    const isUpcoming = item.status === 'upcoming';
    const isExpanded = expandedRow === item.number;
    const isLast = index === installments.length - 1;

    return (
      <React.Fragment key={item.number}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => toggleRow(item.number)}
          style={[
            styles.tableRow,
            isUpcoming && styles.tableRowUpcoming,
            isLast && {borderBottomWidth: 0},
          ]}>
          {/* # */}
          <View style={styles.colNumber}>
            <Text
              style={
                isUpcoming ? styles.cellNumberUpcoming : styles.cellNumber
              }>
              {item.number}
            </Text>
          </View>

          {/* Date */}
          <View style={styles.colDate}>
            <Text
              style={isUpcoming ? styles.cellDateUpcoming : styles.cellDate}>
              {item.date}
            </Text>
            {renderPaidDateCell(item)}
          </View>

          {/* Principal */}
          <View style={styles.colAmount}>
            <Text
              style={
                isUpcoming ? styles.cellAmountUpcoming : styles.cellAmount
              }>
              {item.principal}
            </Text>
          </View>

          {/* Total */}
          <View style={styles.colTotal}>
            <Text
              style={isUpcoming ? styles.cellTotalUpcoming : styles.cellTotal}>
              {item.total}
            </Text>
          </View>
        </TouchableOpacity>

        {/* Expanded detail */}
        {isExpanded && (
          <View style={styles.expandedRow}>
            <View style={styles.expandedGrid}>
              <View style={styles.expandedItem}>
                <Text style={styles.expandedLabel}>Principal</Text>
                <Text style={styles.expandedValue}>{item.principal}</Text>
              </View>
              <View style={styles.expandedItem}>
                <Text style={styles.expandedLabel}>Interest</Text>
                <Text style={styles.expandedValue}>{item.interest}</Text>
              </View>
              <View style={styles.expandedItem}>
                <Text style={styles.expandedLabel}>Fees</Text>
                <Text style={styles.expandedValue}>{item.fees}</Text>
              </View>
            </View>
          </View>
        )}
      </React.Fragment>
    );
  };

  return (
    <View style={styles.root}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={colors.backgroundLight}
      />

      <ScreenHeader
        title="Repayment Schedule"
        rightAction={renderHeaderActions()}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: insets.bottom + 100}}>
        {/* Loan Summary Card */}
        <View style={styles.summaryWrapper}>
          <View style={styles.summaryCard}>
            {/* Watermark */}
            <View style={styles.summaryWatermark}>
              <MaterialIcons
                name="account-balance-wallet"
                size={64}
                color={colors.textPrimary}
              />
            </View>

            <View style={styles.summaryContent}>
              {/* Account & Status */}
              <View style={styles.summaryTopRow}>
                <View>
                  <Text style={styles.accountLabel}>Account Number</Text>
                  <Text style={styles.accountNumber}>{accountNumber}</Text>
                </View>
                <View style={styles.statusBadge}>
                  <Text style={styles.statusText}>Active</Text>
                </View>
              </View>

              {/* Info Grid */}
              <View style={styles.infoGrid}>
                <View style={styles.infoItem}>
                  <Text style={styles.infoLabel}>Disbursement Date</Text>
                  <Text style={styles.infoValue}>9 Mar 2026</Text>
                </View>
                <View style={styles.infoItem}>
                  <Text style={styles.infoLabel}>Principal Paid-off</Text>
                  <Text style={styles.infoValueHighlight}>$401.59</Text>
                </View>
              </View>

              {/* Progress */}
              <View style={styles.progressHeader}>
                <Text style={styles.progressLabel}>Repayment Progress</Text>
                <Text style={styles.progressCount}>
                  {paidCount} of {totalCount} Installments
                </Text>
              </View>
              <View style={styles.progressBarBg}>
                <View
                  style={[
                    styles.progressBarFill,
                    {width: `${progressPercent}%`},
                  ]}
                />
              </View>
            </View>
          </View>
        </View>

        {/* Timeline Section */}
        <View style={styles.timelineWrapper}>
          {/* Section header */}
          <View style={styles.timelineHeader}>
            <Text style={styles.timelineTitle}>Timeline</Text>
            <View style={styles.legendRow}>
              <View style={styles.legendItem}>
                <View
                  style={[
                    styles.legendDot,
                    {backgroundColor: colors.success},
                  ]}
                />
                <Text style={styles.legendText}>Paid</Text>
              </View>
              <View style={styles.legendItem}>
                <View
                  style={[
                    styles.legendDot,
                    {backgroundColor: colors.primary},
                  ]}
                />
                <Text style={styles.legendText}>Upcoming</Text>
              </View>
            </View>
          </View>

          {/* Table */}
          <View style={styles.tableContainer}>
            {/* Table header */}
            <View style={styles.tableHeader}>
              <View style={styles.colNumber}>
                <Text style={styles.tableHeaderCell}>#</Text>
              </View>
              <View style={styles.colDate}>
                <Text style={styles.tableHeaderCell}>Date</Text>
              </View>
              <View style={styles.colAmount}>
                <Text style={styles.tableHeaderCell}>Principal</Text>
              </View>
              <View style={styles.colTotal}>
                <Text style={[styles.tableHeaderCell, {textAlign: 'right'}]}>
                  Total
                </Text>
              </View>
            </View>

            {/* Table rows */}
            {installments.map((item, index) => renderRow(item, index))}

            {/* Table footer */}
            <View style={styles.tableFooter}>
              <Text style={styles.tableFooterLabel}>Total Outstanding</Text>
              <Text style={styles.tableFooterValue}>{totalOutstanding}</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Sticky Footer */}
      <StickyFooter
        buttonLabel={`Make Next Payment (${nextInstallment?.total ?? ''})`}
        iconName="payments"
        onPress={handleMakePayment}
        paddingBottom={insets.bottom + spacing.xl}
      />
    </View>
  );
}

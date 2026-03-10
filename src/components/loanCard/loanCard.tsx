import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {colors, iconSize} from '../../../theme';
import {styles} from './loanCard.styles';

export type LoanStatus = 'active' | 'pending' | 'withdrawn';

export type Loan = {
  icon: string;
  name: string;
  id: string;
  status: LoanStatus;
  statusLabel: string;
  amountLabel: string;
  amount?: string;
  note?: string;
};

function StatusBadge({status, label}: {status: LoanStatus; label: string}) {
  const badgeStyle = [
    styles.statusBadge,
    status === 'active' && styles.statusBadgeActive,
    status === 'pending' && styles.statusBadgePending,
    status === 'withdrawn' && styles.statusBadgeWithdrawn,
  ];
  const textStyle = [
    styles.statusText,
    status === 'active' && styles.statusTextActive,
    status === 'pending' && styles.statusTextPending,
    status === 'withdrawn' && styles.statusTextWithdrawn,
  ];

  return (
    <View style={badgeStyle}>
      <Text style={textStyle}>{label}</Text>
    </View>
  );
}

type LoanCardProps = {
  loan: Loan;
  onPress?: () => void;
};

export default function LoanCard({loan, onPress}: LoanCardProps) {
  const isWithdrawn = loan.status === 'withdrawn';
  const isPending = loan.status === 'pending';

  return (
    <TouchableOpacity
      style={[styles.loanCard, isWithdrawn && styles.loanCardWithdrawn]}
      onPress={onPress}
      disabled={isWithdrawn}
      activeOpacity={0.7}>
      <View style={styles.loanCardTop}>
        <View
          style={[
            styles.loanCardInfo,
            isWithdrawn && styles.loanCardInfoWithdrawn,
          ]}>
          <View
            style={[
              styles.loanIconBox,
              isWithdrawn && styles.loanIconBoxWithdrawn,
            ]}>
            <MaterialIcons
              name={loan.icon}
              size={iconSize.xl}
              color={isWithdrawn ? colors.slate500 : colors.primary}
            />
          </View>
          <View>
            <Text style={styles.loanName}>{loan.name}</Text>
            <Text style={styles.loanId}>ID: {loan.id}</Text>
          </View>
        </View>
        <StatusBadge status={loan.status} label={loan.statusLabel} />
      </View>

      {isWithdrawn ? (
        <View style={styles.loanCardBottomWithdrawn}>
          <Text style={styles.withdrawnText}>{loan.note}</Text>
        </View>
      ) : (
        <View style={styles.loanCardBottom}>
          <View>
            <Text style={styles.balanceLabel}>{loan.amountLabel}</Text>
            <Text
              style={
                isPending ? styles.balanceAmountNeutral : styles.balanceAmount
              }>
              {loan.amount}
            </Text>
          </View>
          {isPending ? (
            <View style={styles.reviewBadge}>
              <MaterialIcons
                name="schedule"
                size={iconSize.sm}
                color={colors.amber}
              />
              <Text style={styles.reviewText}>In Review</Text>
            </View>
          ) : (
            <TouchableOpacity style={styles.detailsBtn}>
              <Text style={styles.detailsBtnText}>Details</Text>
              <MaterialIcons
                name="chevron-right"
                size={iconSize.md}
                color={colors.primary}
              />
            </TouchableOpacity>
          )}
        </View>
      )}
    </TouchableOpacity>
  );
}

import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {colors, iconSize} from '../../../theme';
import {styles} from './originAccountCard.styles';
import BalanceRow from '../balanceRow/balanceRow';
import LabeledField from '../labeledField/labeledField';

type OriginAccountCardProps = {
  label: string;
  accountType: string;
  accountName: string;
  accountNumber: string;
  balance: string;
  status: string;
  backgroundColor?: string;
  onSelectOther?: () => void;
};

export default function OriginAccountCard({
  label,
  accountType,
  accountName,
  accountNumber,
  balance,
  status,
  backgroundColor = colors.primary,
  onSelectOther,
}: OriginAccountCardProps) {
  return (
    <View>
      <Text style={styles.sectionLabel}>{label}</Text>
      <View style={[styles.originCard, {backgroundColor}]}>
        <View style={styles.originCardHeader}>
          <View>
            <Text style={styles.originAccountType}>{accountType}</Text>
            <Text style={styles.originAccountName}>{accountName}</Text>
          </View>
          <MaterialIcons
            name="contactless"
            size={iconSize['2xl']}
            color={colors.white60}
          />
        </View>

        <View style={styles.originCardBody}>
          <LabeledField label="Account Number" value={accountNumber} />

          <BalanceRow
            label="Available Balance"
            balance={balance}
            status={status}
          />
        </View>

        <View style={styles.decorCircleLg} />
        <View style={styles.decorCircleSm} />
      </View>

      {onSelectOther && (
        <TouchableOpacity
          style={styles.selectOtherBtn}
          activeOpacity={0.7}
          onPress={onSelectOther}>
          <MaterialIcons
            name="swap-horiz"
            size={iconSize.md}
            color={colors.primary}
          />
          <Text style={styles.selectOtherText}>
            Select Other Payment Account
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

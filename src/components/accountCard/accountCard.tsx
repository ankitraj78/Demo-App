import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {colors, iconSize} from '../../../theme';
import {styles} from './accountCard.styles';

export default function AccountCard() {
  return (
    <View style={styles.cardWrapper}>
      <View style={styles.card}>
        <View style={styles.cardCircle1} />
        <View style={styles.cardCircle2} />
        <View style={styles.cardContent}>
          <View style={styles.cardTop}>
            <View>
              <Text style={styles.cardAccountType}>
                Primary Savings Account
              </Text>
              <Text style={styles.cardAccountNum}>Acc: •••• 5678</Text>
            </View>
            <MaterialIcons
              name="contactless"
              size={iconSize.xl}
              color={colors.whiteHalf}
            />
          </View>
          <View style={styles.cardBalance}>
            <Text style={styles.balanceAmount}>$24,500.00</Text>
            <View style={styles.balanceTrend}>
              <MaterialIcons name="trending-up" size={iconSize.sm} color={colors.successLight} />
              <Text style={styles.balanceTrendText}>
                +2.4% from last month
              </Text>
            </View>
          </View>
          <View style={styles.cardActions}>
            <TouchableOpacity style={styles.addMoneyBtn}>
              <MaterialIcons name="add-circle" size={iconSize.md} color={colors.primary} />
              <Text style={styles.addMoneyText}>Add Money</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.transferBtn}>
              <MaterialIcons name="send" size={iconSize.md} color={colors.white} />
              <Text style={styles.transferText}>Transfer</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

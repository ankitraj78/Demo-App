import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {colors, spacing, iconSize} from '../../../theme';
import {styles} from './quickServices.styles';
import type {RootStackParamList} from '../../navigation/rootNavigator';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

type QuickActionItem = {
  icon: string;
  label: string;
  color: string;
  bgColor: string;
  screen?: keyof RootStackParamList;
};

const accountItems: QuickActionItem[] = [
  {icon: 'account-balance-wallet', label: 'Savings', color: colors.blue, bgColor: colors.blueBg},
  {icon: 'payments', label: 'Loans', color: colors.purple, bgColor: colors.purpleBg, screen: 'LoanAccounts'},
  {icon: 'pie-chart', label: 'Shares', color: colors.orange, bgColor: colors.orangeBg},
  {icon: 'lock', label: 'Fixed', color: colors.emerald, bgColor: colors.emeraldBg},
];

const actionItems: QuickActionItem[] = [
  {icon: 'receipt-long', label: 'Bills', color: colors.pink, bgColor: colors.pinkBg},
  {icon: 'smartphone', label: 'Top-up', color: colors.cyan, bgColor: colors.cyanBg},
  {icon: 'qr-code-scanner', label: 'Scan', color: colors.indigo, bgColor: colors.indigoBg},
  {icon: 'help-center', label: 'Support', color: colors.amber, bgColor: colors.amberBg},
];

function QuickActionGrid({items, onItemPress}: {items: QuickActionItem[]; onItemPress: (item: QuickActionItem) => void}) {
  return (
    <View style={styles.quickGrid}>
      {items.map(item => (
        <TouchableOpacity key={item.label} style={styles.quickItem} onPress={() => onItemPress(item)}>
          <View style={[styles.quickIconBox, {backgroundColor: item.bgColor}]}>
            <MaterialIcons name={item.icon} size={iconSize['2xl']} color={item.color} />
          </View>
          <Text style={styles.quickLabel}>{item.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

export default function QuickServices() {
  const navigation = useNavigation<NavigationProp>();

  const handleItemPress = (item: QuickActionItem) => {
    if (item.screen) {
      navigation.navigate(item.screen as 'LoanAccounts');
    }
  };

  return (
    <View style={styles.servicesSection}>
      <Text style={styles.sectionTitle}>Quick Services</Text>

      <Text style={styles.subSectionTitle}>ACCOUNTS</Text>
      <QuickActionGrid items={accountItems} onItemPress={handleItemPress} />

      <Text style={[styles.subSectionTitle, {marginTop: spacing['2xl']}]}>
        ACTIONS
      </Text>
      <QuickActionGrid items={actionItems} onItemPress={handleItemPress} />
    </View>
  );
}

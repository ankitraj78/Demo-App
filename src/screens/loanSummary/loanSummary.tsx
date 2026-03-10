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
import LoanHeroCard from '../../components/loanHeroCard/loanHeroCard';
import SectionDetailCard from '../../components/sectionDetailCard/sectionDetailCard';
import InstallmentCard from '../../components/installmentCard/installmentCard';

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
        <LoanHeroCard
          accountNumber={loanAccountNumber}
          loanType={loanName}
          loanScheme="Standard Scheme"
        />

        {/* Pay-off Details */}
        <SectionDetailCard
          iconName="payments"
          title="Pay-off Details"
          rows={[
            {label: 'Expected Payoff', value: '$5,240.00', variant: 'highlight'},
            {label: 'Principal', value: '$5,000.00'},
            {label: 'Interest', value: '$240.00'},
          ]}
        />

        {/* Outstanding Details */}
        <SectionDetailCard
          iconName="account-balance-wallet"
          title="Outstanding Details"
          rows={[
            {label: 'Total Outstanding', value: '$4,850.00'},
            {label: 'Arrears Amount', value: '$0.00', variant: 'danger'},
            {label: 'Fees & Charges', value: '$15.00'},
          ]}
        />

        {/* Installment Details */}
        <InstallmentCard
          iconName="event"
          title="Installment Details"
          items={[
            {label: 'Regular Payment', value: '$450.00'},
            {label: 'Months Left', value: '11'},
          ]}
          nextPayment={{
            iconName: 'event',
            label: 'Next Payment Date',
            value: 'Oct 15, 2023',
          }}
        />

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

import React from 'react';
import { View, ScrollView, StatusBar } from 'react-native';
import { colors } from '../../theme';
import { styles } from './homeScreen.styles';
import Header from '../../components/header/header';
import AccountCard from '../../components/accountCard/accountCard';
import QuickServices from '../../components/quickServices/quickServices';
import RecentActivity from '../../components/recentActivity/recentActivity';

export default function HomeScreen() {
  return (
    <View style={styles.root}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />

      <Header />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        <AccountCard />
        <QuickServices />
        <RecentActivity />
      </ScrollView>
    </View>
  );
}

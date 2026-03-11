import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
  colors,
  spacing,
  fontSize,
  fontWeight,
  iconSize,
  shadows,
} from '../theme';
import HomeScreen from '../screens/homeScreen/homeScreen';
import TransactionHistoryScreen from '../screens/transactionHistory/transactionHistory';

export type TabParamList = {
  Home: undefined;
  History: undefined;
  Scan: undefined;
  Cards: undefined;
  More: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

function PlaceholderScreen() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.white,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Text style={{ color: colors.textMuted, fontSize: fontSize.lg }}>
        Coming Soon
      </Text>
    </View>
  );
}

function CustomTabBar({ state, navigation }: any) {
  const insets = useSafeAreaInsets();

  const tabs = [
    { icon: 'home', label: 'Home' },
    { icon: 'list-alt', label: 'History' },
    { icon: 'qr-code-scanner', label: '' },
    { icon: 'credit-card', label: 'Cards' },
    { icon: 'more-horiz', label: 'More' },
  ];

  return (
    <View
      style={[
        tabStyles.bottomNav,
        { paddingBottom: insets.bottom + spacing.md },
      ]}
    >
      {tabs.map((tab, index) => {
        const isActive = state.index === index;

        if (index === 2) {
          return (
            <TouchableOpacity
              key="scan"
              style={tabStyles.scanBtnWrapper}
              onPress={() => navigation.navigate('Scan')}
            >
              <View style={tabStyles.scanBtn}>
                <MaterialIcons
                  name="qr-code-scanner"
                  size={iconSize['3xl']}
                  color={colors.white}
                />
              </View>
            </TouchableOpacity>
          );
        }

        return (
          <TouchableOpacity
            key={tab.label}
            style={tabStyles.navItem}
            onPress={() => navigation.navigate(state.routeNames[index])}
          >
            <MaterialIcons
              name={tab.icon}
              size={iconSize.xl}
              color={isActive ? colors.primary : colors.textMuted}
            />
            <Text
              style={[
                tabStyles.navLabel,
                { color: isActive ? colors.primary : colors.textMuted },
              ]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default function TabNavigator() {
  return (
    <Tab.Navigator
      tabBar={props => <CustomTabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="History" component={TransactionHistoryScreen} />
      <Tab.Screen name="Scan" component={PlaceholderScreen} />
      <Tab.Screen name="Cards" component={PlaceholderScreen} />
      <Tab.Screen name="More" component={PlaceholderScreen} />
    </Tab.Navigator>
  );
}

const tabStyles = StyleSheet.create({
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.navBackground,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.md,
  },
  navItem: {
    alignItems: 'center',
    gap: spacing.xs,
    flex: 1,
  },
  navLabel: {
    fontSize: fontSize['2xs'],
    fontWeight: fontWeight.bold,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  scanBtnWrapper: {
    flex: 1,
    alignItems: 'center',
    marginTop: -spacing['3xl'],
  },
  scanBtn: {
    width: spacing['5xl'],
    height: spacing['5xl'],
    borderRadius: spacing['3xl'],
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.fab,
  },
});

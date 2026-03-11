import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { colors, spacing, iconSize } from '../../theme';
import { styles } from './bottomNav.styles';

type NavItem = {
  icon: string;
  label: string;
  active: boolean;
};

const navItems: NavItem[] = [
  { icon: 'home', label: 'Home', active: true },
  { icon: 'list-alt', label: 'History', active: false },
  { icon: 'qr-code-scanner', label: '', active: false },
  { icon: 'credit-card', label: 'Cards', active: false },
  { icon: 'more-horiz', label: 'More', active: false },
];

export default function BottomNav() {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[styles.bottomNav, { paddingBottom: insets.bottom + spacing.md }]}
    >
      {navItems.map((item, index) => {
        if (index === 2) {
          return (
            <TouchableOpacity key="scan" style={styles.scanBtnWrapper}>
              <View style={styles.scanBtn}>
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
          <TouchableOpacity key={item.label} style={styles.navItem}>
            <MaterialIcons
              name={item.icon}
              size={iconSize.xl}
              color={item.active ? colors.primary : colors.textMuted}
            />
            <Text
              style={[
                styles.navLabel,
                { color: item.active ? colors.primary : colors.textMuted },
              ]}
            >
              {item.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {colors, spacing, iconSize} from '../../../theme';
import {styles} from './header.styles';

export default function Header() {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.header, {paddingTop: insets.top + spacing.md}]}>
      <View style={styles.headerLeft}>
        <View style={styles.headerLogo}>
          <MaterialIcons name="account-balance" size={iconSize.lg} color={colors.white} />
        </View>
        <View>
          <Text style={styles.headerWelcome}>Welcome back</Text>
          <Text style={styles.headerName}>Hello, John!</Text>
        </View>
      </View>
      <View style={styles.headerRight}>
        <TouchableOpacity style={styles.notifBtn}>
          <MaterialIcons name="notifications" size={iconSize.xl} color={colors.textSecondary} />
          <View style={styles.notifBadge} />
        </TouchableOpacity>
        <Image
          source={{
            uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA7iu8Vs9h0jyIxc4e-EhgbtLf0n1CUGG2y2kfTETdTCsFC6DmrvV0pA_TzwO46OiRI0wAxXzHuixz_P0Dz09X0WS26pjWvLdxUoVotym8UuGJ-js53E_7Qd9_epJzJh8sJ21lWqOK40i29liO9N5RQwXrB9DZ29HSiDzGolsHd6vYnXN0u2D29D4w52irYuD-VAxcdOIhje7Dgg1OPRzOWll8ktc5bIQoS9oCU2C8qJZINhHT8DM5tieOmVsWP1DWYxA_Knla1hezo',
          }}
          style={styles.avatar}
        />
      </View>
    </View>
  );
}

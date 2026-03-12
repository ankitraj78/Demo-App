import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { colors, spacing, iconSize } from '../../theme';
import { styles } from './confirmBeneficiary.styles';
import type { RootStackParamList } from '../../navigation/rootNavigator';
import ScreenHeader from '../../components/screenHeader/screenHeader';
import PoweredByFooter from '../../components/poweredByFooter/poweredByFooter';
import { createBeneficiary } from '../../services/beneficiaryService';

type ConfirmBeneficiaryRouteProp = RouteProp<
  RootStackParamList,
  'ConfirmBeneficiary'
>;

export default function ConfirmBeneficiaryScreen() {
  const insets = useSafeAreaInsets();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<ConfirmBeneficiaryRouteProp>();
  const { name, office, accountType, accountTypeId, accountNumber, dailyLimit } =
    route.params;
  const [submitting, setSubmitting] = useState(false);

  const maskedAccount = `**** **** ${accountNumber.slice(-4)}`;

  const details = [
    { label: 'Name', value: name },
    { label: 'Office/Branch', value: office },
    { label: 'Account Type', value: accountType },
    { label: 'Account Number', value: maskedAccount, mono: true },
    { label: 'Daily Transfer Limit', value: dailyLimit, highlight: true },
  ];

  return (
    <View style={styles.root}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={colors.backgroundLight}
      />

      <ScreenHeader title="Validate Details" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: insets.bottom + spacing['2xl'],
        }}
      >
        {/* Title Section */}
        <View style={styles.titleSection}>
          <Text style={styles.title}>Review Beneficiary Details</Text>
          <Text style={styles.subtitle}>
            Please verify the information below before proceeding with the
            registration.
          </Text>
        </View>

        {/* Beneficiary Summary Hero Card */}
        <View style={styles.heroWrapper}>
          <View style={styles.heroCard}>
            <View style={styles.heroBanner}>
              <MaterialIcons
                name="account-balance"
                size={48}
                color="rgba(255,255,255,0.15)"
              />
            </View>
            <View style={styles.heroContent}>
              <View style={styles.heroTitleRow}>
                <View style={styles.heroIconBox}>
                  <MaterialIcons
                    name="how-to-reg"
                    size={iconSize.md}
                    color={colors.primary}
                  />
                </View>
                <Text style={styles.heroTitle}>Beneficiary Summary</Text>
              </View>
              <Text style={styles.heroSubtitle}>
                Information gathered from bank records
              </Text>
            </View>
          </View>
        </View>

        {/* Details Card */}
        <View style={styles.detailsWrapper}>
          <View style={styles.detailsCard}>
            {details.map((item, index) => {
              const isLast = index === details.length - 1;
              return (
                <View
                  key={item.label}
                  style={[styles.detailRow, isLast && styles.detailRowLast]}
                >
                  <Text style={styles.detailLabel}>{item.label}</Text>
                  <Text
                    style={
                      item.highlight
                        ? styles.detailValueHighlight
                        : item.mono
                        ? styles.detailValueMono
                        : styles.detailValue
                    }
                  >
                    {item.value}
                  </Text>
                </View>
              );
            })}
          </View>
        </View>

        {/* Info Banner */}
        <View style={styles.infoWrapper}>
          <View style={styles.infoBanner}>
            <MaterialIcons
              name="info-outline"
              size={iconSize.lg}
              color={colors.primary}
            />
            <Text style={styles.infoText}>
              By confirming, you agree that the details provided above are
              correct. Transfers to this beneficiary will be subject to security
              verification.
            </Text>
          </View>
        </View>

        {/* Footer Buttons */}
        <View style={styles.footer}>
          <TouchableOpacity
            style={[styles.confirmButton, submitting && {opacity: 0.7}]}
            activeOpacity={0.85}
            disabled={submitting}
            onPress={async () => {
              setSubmitting(true);
              try {
                const limitNum =
                  parseFloat(dailyLimit.replace(/[^0-9.]/g, '')) || 0;
                await createBeneficiary({
                  locale: 'en',
                  name,
                  accountNumber,
                  accountType: accountTypeId,
                  transferLimit: limitNum,
                  officeName: office,
                });
                Alert.alert('Success', 'Beneficiary added successfully.', [
                  {text: 'OK', onPress: () => navigation.popToTop()},
                ]);
              } catch (err) {
                Alert.alert(
                  'Failed',
                  err instanceof Error ? err.message : 'Something went wrong',
                );
              } finally {
                setSubmitting(false);
              }
            }}
          >
            {submitting ? (
              <ActivityIndicator color={colors.white} />
            ) : (
              <Text style={styles.confirmButtonText}>
                Confirm & Add Beneficiary
              </Text>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.cancelButton}
            activeOpacity={0.7}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.cancelButtonText}>Cancel and Go Back</Text>
          </TouchableOpacity>
        </View>

        <PoweredByFooter variant="minimal" />
      </ScrollView>
    </View>
  );
}

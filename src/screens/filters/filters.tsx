import React, {useState} from 'react';
import {View, Text, ScrollView, TouchableOpacity, StatusBar} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {colors, spacing, iconSize} from '../../../theme';
import {styles} from './filters.styles';

type TransactionType = 'All' | 'Debits' | 'Credits';

const transactionTypes: TransactionType[] = ['All', 'Debits', 'Credits'];

const categories = [
  'Shopping',
  'Entertainment',
  'Dining',
  'Transport',
  'Utilities',
];

export default function FiltersScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  const [selectedType, setSelectedType] = useState<TransactionType>('All');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([
    'Shopping',
  ]);
  const [fromDate] = useState('Jan 01, 2024');
  const [toDate] = useState('Mar 31, 2024');

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category],
    );
  };

  const handleClearAll = () => {
    setSelectedType('All');
    setSelectedCategories([]);
  };

  const handleApply = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.root}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />

      {/* Header */}
      <View style={[styles.header, {paddingTop: insets.top + spacing.xl}]}>
        <TouchableOpacity
          style={styles.closeBtn}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}>
          <MaterialIcons name="close" size={iconSize.xl} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Filters</Text>
        <TouchableOpacity
          style={styles.clearBtn}
          onPress={handleClearAll}
          activeOpacity={0.7}>
          <Text style={styles.clearBtnText}>Clear All</Text>
        </TouchableOpacity>
      </View>

      {/* Scrollable Content */}
      <ScrollView
        style={{flex: 1}}
        contentContainerStyle={[
          styles.scrollContent,
          {paddingBottom: insets.bottom + spacing.md},
        ]}
        showsVerticalScrollIndicator={false}>
        {/* Filter By Account */}
        <View>
          <Text style={styles.sectionTitle}>Filter By Account</Text>
          <TouchableOpacity style={styles.accountCard} activeOpacity={0.7}>
            <View style={styles.accountInfo}>
              <Text style={styles.accountName}>Main Savings Account</Text>
              <Text style={styles.accountBalance}>Balance: $12,450.00</Text>
            </View>
            <View style={styles.changeBtn}>
              <Text style={styles.changeBtnText}>Change</Text>
              <MaterialIcons
                name="unfold-more"
                size={18}
                color={colors.primary}
              />
            </View>
          </TouchableOpacity>

          {/* Account Visualization */}
          <View style={styles.accountVisual}>
            <View style={styles.accountVisualInner}>
              <MaterialIcons
                name="account-balance-wallet"
                size={30}
                color={colors.slate400}
              />
              <Text style={styles.accountVisualText}>
                Selected Account Details
              </Text>
            </View>
          </View>
        </View>

        {/* Transaction Type */}
        <View>
          <Text style={styles.sectionTitle}>Transaction Type</Text>
          <View style={styles.segmentedControl}>
            {transactionTypes.map(type => {
              const isActive = selectedType === type;
              return (
                <TouchableOpacity
                  key={type}
                  style={[
                    styles.segmentBtn,
                    isActive && styles.segmentBtnActive,
                  ]}
                  onPress={() => setSelectedType(type)}
                  activeOpacity={0.7}>
                  <Text
                    style={[
                      styles.segmentBtnText,
                      isActive && styles.segmentBtnTextActive,
                    ]}>
                    {type}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Time Period */}
        <View>
          <Text style={styles.sectionTitle}>Time Period</Text>
          <View style={styles.dateGrid}>
            <TouchableOpacity style={styles.dateField} activeOpacity={0.7}>
              <View style={styles.dateFieldInner}>
                <Text style={styles.dateFieldLabel}>From</Text>
                <Text style={styles.dateFieldValue}>{fromDate}</Text>
              </View>
              <MaterialIcons
                name="calendar-today"
                size={18}
                color={colors.slate400}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.dateField} activeOpacity={0.7}>
              <View style={styles.dateFieldInner}>
                <Text style={styles.dateFieldLabel}>To</Text>
                <Text style={styles.dateFieldValue}>{toDate}</Text>
              </View>
              <MaterialIcons
                name="calendar-today"
                size={18}
                color={colors.slate400}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Categories */}
        <View>
          <Text style={styles.sectionTitle}>Categories</Text>
          <View style={styles.categoryGrid}>
            {categories.map(category => {
              const isActive = selectedCategories.includes(category);
              return (
                <TouchableOpacity
                  key={category}
                  style={[
                    styles.categoryChip,
                    isActive && styles.categoryChipActive,
                  ]}
                  onPress={() => toggleCategory(category)}
                  activeOpacity={0.7}>
                  <Text
                    style={[
                      styles.categoryChipText,
                      isActive && styles.categoryChipTextActive,
                    ]}>
                    {category}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </ScrollView>

      {/* Footer */}
      <View style={[styles.footer, {paddingBottom: insets.bottom + spacing.xl}]}>
        <TouchableOpacity
          style={styles.applyButton}
          onPress={handleApply}
          activeOpacity={0.85}>
          <Text style={styles.applyButtonText}>Apply Filters</Text>
          <MaterialIcons name="done-all" size={20} color={colors.white} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

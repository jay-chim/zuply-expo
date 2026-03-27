import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, Radius, Shadow } from '@/constants/Colors';
import { MOCK_SUPPLEMENTS, DURATION_OPTIONS, AI_FEE_PER_DAY, PACKAGING_FEE_PER_DAY } from '@/constants/MockData';
import { PrimaryButton } from '@/components/PrimaryButton';
import { TierBadge } from '@/components/TierBadge';

export default function CartScreen() {
  const router = useRouter();
  const [selectedDuration, setSelectedDuration] = useState(1);

  const durationOpt = DURATION_OPTIONS.find(d => d.months === selectedDuration)!;
  const daysInPeriod = selectedDuration * 30;

  const suppCostPerDay = MOCK_SUPPLEMENTS.reduce((sum, s) => sum + s.pricePerPill * s.pillsPerDay, 0);
  const aiCostPerDay = AI_FEE_PER_DAY;
  const packCostPerDay = PACKAGING_FEE_PER_DAY;
  const rawTotalPerDay = suppCostPerDay + aiCostPerDay + packCostPerDay;

  const rawTotal = rawTotalPerDay * daysInPeriod;
  const discountAmt = rawTotal * durationOpt.discount;
  const finalTotal = rawTotal - discountAmt;

  const handlePayment = () => {
    Alert.alert(
      '確認付款',
      `您將支付 HK$${finalTotal.toFixed(0)} 訂購 ${selectedDuration} 個月的個人化補充劑配方。`,
      [
        { text: '取消', style: 'cancel' },
        {
          text: '確認付款',
          style: 'default',
          onPress: () => router.push('/order-status'),
        },
      ]
    );
  };

  return (
    <View style={styles.screen}>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

        {/* Duration Selector */}
        <View style={styles.section}>
          <View style={styles.sectionHeaderRow}>
            <View style={styles.sectionAccent} />
            <Text style={styles.sectionTitle}>選擇訂購時長</Text>
          </View>
          <Text style={styles.sectionSubtitle}>訂購越長，折扣越多</Text>

          <View style={styles.durationRow}>
            {DURATION_OPTIONS.map(opt => {
              const isSelected = selectedDuration === opt.months;
              return (
                <TouchableOpacity
                  key={opt.months}
                  style={[styles.durationCard, isSelected && styles.durationCardActive]}
                  onPress={() => setSelectedDuration(opt.months)}
                  activeOpacity={0.8}
                >
                  {opt.discount > 0 && (
                    <View style={styles.durationBadge}>
                      <Text style={styles.durationBadgeText}>{opt.discountLabel}</Text>
                    </View>
                  )}
                  <Text style={[styles.durationMonths, isSelected && styles.durationMonthsActive]}>
                    {opt.months}
                  </Text>
                  <Text style={[styles.durationLabel, isSelected && styles.durationLabelActive]}>個月</Text>
                  <Text style={[styles.durationDays, isSelected && styles.durationDaysActive]}>
                    {opt.months * 30} 天
                  </Text>
                  {opt.discount > 0 ? (
                    <Text style={[styles.durationDiscount, isSelected && styles.durationDiscountActive]}>
                      省 {(opt.discount * 100).toFixed(0)}%
                    </Text>
                  ) : (
                    <Text style={[styles.durationDiscount]}>原價</Text>
                  )}
                  {isSelected && (
                    <View style={styles.durationCheck}>
                      <Ionicons name="checkmark-circle" size={16} color={Colors.primary} />
                    </View>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Order Items */}
        <View style={styles.section}>
          <View style={styles.sectionHeaderRow}>
            <View style={styles.sectionAccent} />
            <Text style={styles.sectionTitle}>訂單明細</Text>
          </View>

          {MOCK_SUPPLEMENTS.map(supp => (
            <View key={supp.id} style={styles.lineItem}>
              <View style={styles.lineItemLeft}>
                <View style={styles.lineItemDot}>
                  <Ionicons name="medical" size={12} color={Colors.primary} />
                </View>
                <View>
                  <View style={styles.lineItemNameRow}>
                    <Text style={styles.lineItemName}>{supp.nameZh}</Text>
                    <TierBadge tier={supp.tier} size="sm" />
                  </View>
                  <Text style={styles.lineItemDetail}>
                    HK${supp.pricePerPill.toFixed(1)}/粒 × {supp.pillsPerDay}粒 × {daysInPeriod}天
                  </Text>
                </View>
              </View>
              <Text style={styles.lineItemPrice}>
                HK${(supp.pricePerPill * supp.pillsPerDay * daysInPeriod).toFixed(0)}
              </Text>
            </View>
          ))}

          <View style={styles.feeLine}>
            <View style={styles.lineItemLeft}>
              <View style={[styles.lineItemDot, { backgroundColor: '#EFF6FF' }]}>
                <Ionicons name="hardware-chip-outline" size={12} color={Colors.info} />
              </View>
              <View>
                <Text style={styles.lineItemName}>AI配方費</Text>
                <Text style={styles.lineItemDetail}>HK${aiCostPerDay}/日 × {daysInPeriod}天</Text>
              </View>
            </View>
            <Text style={styles.lineItemPrice}>HK${aiCostPerDay * daysInPeriod}</Text>
          </View>

          <View style={styles.feeLine}>
            <View style={styles.lineItemLeft}>
              <View style={[styles.lineItemDot, { backgroundColor: '#FEF9EE' }]}>
                <Ionicons name="cube-outline" size={12} color={Colors.warning} />
              </View>
              <View>
                <Text style={styles.lineItemName}>包裝費</Text>
                <Text style={styles.lineItemDetail}>HK${packCostPerDay}/日 × {daysInPeriod}天</Text>
              </View>
            </View>
            <Text style={styles.lineItemPrice}>HK${packCostPerDay * daysInPeriod}</Text>
          </View>
        </View>

        {/* Summary */}
        <View style={styles.summarySection}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>小計</Text>
            <Text style={styles.summaryValue}>HK${rawTotal.toFixed(0)}</Text>
          </View>

          {durationOpt.discount > 0 && (
            <View style={styles.summaryRow}>
              <View style={styles.discountLabelRow}>
                <Ionicons name="pricetag" size={13} color={Colors.success} />
                <Text style={[styles.summaryLabel, { color: Colors.success }]}>
                  {durationOpt.discountLabel}折扣優惠
                </Text>
              </View>
              <Text style={[styles.summaryValue, { color: Colors.success }]}>
                -HK${discountAmt.toFixed(0)}
              </Text>
            </View>
          )}

          <View style={styles.summaryDivider} />

          <View style={styles.summaryRow}>
            <Text style={styles.totalLabel}>應付金額</Text>
            <View style={styles.totalRight}>
              {durationOpt.discount > 0 && (
                <Text style={styles.originalPrice}>HK${rawTotal.toFixed(0)}</Text>
              )}
              <Text style={styles.totalValue}>HK${finalTotal.toFixed(0)}</Text>
            </View>
          </View>

          <View style={styles.perDayNote}>
            <Text style={styles.perDayNoteText}>
              相當於 HK${(finalTotal / daysInPeriod).toFixed(1)}/日
            </Text>
          </View>
        </View>

        {/* Trust Badges */}
        <View style={styles.trustSection}>
          {[
            { icon: 'shield-checkmark-outline', text: '藥劑師審核保障' },
            { icon: 'refresh-outline', text: '14天退款保障' },
            { icon: 'card-outline', text: '安全支付' },
          ].map(item => (
            <View key={item.text} style={styles.trustItem}>
              <Ionicons name={item.icon as any} size={16} color={Colors.gray400} />
              <Text style={styles.trustText}>{item.text}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Payment Bar */}
      <View style={styles.payBar}>
        <View>
          <Text style={styles.payBarLabel}>應付金額</Text>
          <Text style={styles.payBarTotal}>HK${finalTotal.toFixed(0)}</Text>
        </View>
        <PrimaryButton
          title="確認付款"
          onPress={handlePayment}
          size="md"
          style={styles.payBtn}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.gray50,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    padding: Spacing.lg,
    paddingBottom: 100,
    gap: Spacing.md,
  },
  section: {
    backgroundColor: Colors.white,
    borderRadius: Radius.lg,
    padding: Spacing.xl,
    ...Shadow.sm,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  sectionAccent: {
    width: 4,
    height: 20,
    backgroundColor: Colors.primary,
    borderRadius: 2,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: Colors.black,
    letterSpacing: -0.3,
  },
  sectionSubtitle: {
    fontSize: 12,
    color: Colors.gray400,
    marginBottom: Spacing.lg,
  },
  durationRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  durationCard: {
    flex: 1,
    borderWidth: 1.5,
    borderColor: Colors.border,
    borderRadius: Radius.md,
    padding: Spacing.md,
    alignItems: 'center',
    position: 'relative',
    backgroundColor: Colors.white,
    minHeight: 100,
    justifyContent: 'center',
  },
  durationCardActive: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primaryBg,
  },
  durationBadge: {
    position: 'absolute',
    top: -10,
    backgroundColor: Colors.primary,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: Radius.full,
  },
  durationBadgeText: {
    fontSize: 11,
    fontWeight: '800',
    color: Colors.white,
  },
  durationMonths: {
    fontSize: 28,
    fontWeight: '900',
    color: Colors.gray700,
    letterSpacing: -1,
  },
  durationMonthsActive: {
    color: Colors.primary,
  },
  durationLabel: {
    fontSize: 12,
    color: Colors.gray400,
    marginTop: -2,
  },
  durationLabelActive: {
    color: Colors.primaryDark,
  },
  durationDays: {
    fontSize: 11,
    color: Colors.gray300,
    marginTop: 4,
  },
  durationDaysActive: {
    color: Colors.primary,
  },
  durationDiscount: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.gray300,
    marginTop: 3,
  },
  durationDiscountActive: {
    color: Colors.success,
  },
  durationCheck: {
    position: 'absolute',
    top: 6,
    right: 6,
  },
  lineItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
  },
  feeLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
  },
  lineItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  lineItemDot: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Colors.primaryBg,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  lineItemNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flexWrap: 'wrap',
  },
  lineItemName: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.gray800,
  },
  lineItemDetail: {
    fontSize: 11,
    color: Colors.gray400,
    marginTop: 1,
  },
  lineItemPrice: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.gray700,
    flexShrink: 0,
    marginLeft: 8,
  },
  summarySection: {
    backgroundColor: Colors.white,
    borderRadius: Radius.lg,
    padding: Spacing.xl,
    ...Shadow.sm,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 6,
  },
  summaryLabel: {
    fontSize: 14,
    color: Colors.gray600,
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.gray700,
  },
  discountLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  summaryDivider: {
    height: 1,
    backgroundColor: Colors.border,
    marginVertical: 8,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.black,
  },
  totalRight: {
    alignItems: 'flex-end',
  },
  originalPrice: {
    fontSize: 12,
    color: Colors.gray300,
    textDecorationLine: 'line-through',
  },
  totalValue: {
    fontSize: 24,
    fontWeight: '900',
    color: Colors.primary,
    letterSpacing: -0.5,
  },
  perDayNote: {
    backgroundColor: Colors.primaryBg,
    borderRadius: Radius.sm,
    padding: Spacing.sm,
    alignItems: 'center',
    marginTop: Spacing.sm,
  },
  perDayNoteText: {
    fontSize: 12,
    color: Colors.primary,
    fontWeight: '600',
  },
  trustSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: Colors.white,
    borderRadius: Radius.lg,
    padding: Spacing.lg,
    ...Shadow.sm,
  },
  trustItem: {
    alignItems: 'center',
    gap: 4,
  },
  trustText: {
    fontSize: 10,
    color: Colors.gray400,
    textAlign: 'center',
    fontWeight: '500',
  },
  payBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.white,
    padding: Spacing.xl,
    paddingBottom: Platform.OS === 'ios' ? 34 : Spacing.xl,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.lg,
  },
  payBarLabel: {
    fontSize: 12,
    color: Colors.gray400,
  },
  payBarTotal: {
    fontSize: 22,
    fontWeight: '900',
    color: Colors.black,
    letterSpacing: -0.5,
  },
  payBtn: {
    flex: 1,
  },
});

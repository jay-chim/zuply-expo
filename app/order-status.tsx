import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, Radius, Shadow } from '@/constants/Colors';
import { ORDER_STATUS_STEPS } from '@/constants/MockData';

const CURRENT_STATUS = 'reviewing'; // mock: second step

type StepKey = 'paid' | 'reviewing' | 'approved' | 'shipped';

const STATUS_INDEX: Record<StepKey, number> = {
  paid: 0,
  reviewing: 1,
  approved: 2,
  shipped: 3,
};

type StepIconName = 'checkmark-circle' | 'search' | 'shield-checkmark' | 'cube';
const ICON_MAP: Record<string, StepIconName> = {
  'check-circle': 'checkmark-circle',
  'search': 'search',
  'shield-check': 'shield-checkmark',
  'package': 'cube',
};

function StatusStep({
  label,
  icon,
  index,
  currentIndex,
  isLast,
}: {
  label: string;
  icon: string;
  index: number;
  currentIndex: number;
  isLast: boolean;
}) {
  const isDone = index < currentIndex;
  const isActive = index === currentIndex;
  const isPending = index > currentIndex;

  const ionIcon = ICON_MAP[icon] || 'ellipse';

  return (
    <View style={styles.stepRow}>
      {/* Left: indicator + line */}
      <View style={styles.stepIndicatorCol}>
        <View style={[
          styles.stepCircle,
          isDone && styles.stepCircleDone,
          isActive && styles.stepCircleActive,
          isPending && styles.stepCirclePending,
        ]}>
          {isDone ? (
            <Ionicons name="checkmark" size={14} color={Colors.white} />
          ) : isActive ? (
            <Ionicons name={ionIcon} size={14} color={Colors.white} />
          ) : (
            <View style={styles.stepDotInner} />
          )}
        </View>
        {!isLast && (
          <View style={[styles.stepLine, isDone && styles.stepLineDone]} />
        )}
      </View>

      {/* Right: content */}
      <View style={[styles.stepContent, !isLast && styles.stepContentWithMargin]}>
        <View style={styles.stepLabelRow}>
          <Text style={[
            styles.stepLabel,
            isDone && styles.stepLabelDone,
            isActive && styles.stepLabelActive,
            isPending && styles.stepLabelPending,
          ]}>
            {label}
          </Text>
          {isDone && (
            <View style={styles.completedBadge}>
              <Text style={styles.completedBadgeText}>已完成</Text>
            </View>
          )}
          {isActive && (
            <View style={styles.activeBadge}>
              <View style={styles.activePulse} />
              <Text style={styles.activeBadgeText}>處理中</Text>
            </View>
          )}
        </View>
        {isDone && (
          <Text style={styles.stepTime}>
            {index === 0 ? '2024-04-01  09:32' : '2024-04-01  10:15'}
          </Text>
        )}
        {isActive && (
          <Text style={[styles.stepTime, { color: Colors.primary }]}>
            預計完成時間：24小時內
          </Text>
        )}
        {isPending && (
          <Text style={styles.stepTime}>等待中...</Text>
        )}
      </View>
    </View>
  );
}

export default function OrderStatusScreen() {
  const currentIndex = STATUS_INDEX[CURRENT_STATUS as StepKey];

  return (
    <View style={styles.screen}>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

        {/* Order ID Card */}
        <View style={styles.orderCard}>
          <View style={styles.orderCardTop}>
            <View>
              <Text style={styles.orderIdLabel}>訂單編號</Text>
              <Text style={styles.orderId}># ZP-2024-0401</Text>
            </View>
            <View style={styles.statusPill}>
              <View style={styles.statusDot} />
              <Text style={styles.statusPillText}>藥劑師審核中</Text>
            </View>
          </View>
          <View style={styles.orderMeta}>
            <View style={styles.orderMetaItem}>
              <Text style={styles.orderMetaLabel}>下單日期</Text>
              <Text style={styles.orderMetaValue}>2024-04-01</Text>
            </View>
            <View style={styles.orderMetaItem}>
              <Text style={styles.orderMetaLabel}>配方項目</Text>
              <Text style={styles.orderMetaValue}>6 種補充劑</Text>
            </View>
            <View style={styles.orderMetaItem}>
              <Text style={styles.orderMetaLabel}>訂購時長</Text>
              <Text style={styles.orderMetaValue}>1 個月</Text>
            </View>
            <View style={styles.orderMetaItem}>
              <Text style={styles.orderMetaLabel}>總金額</Text>
              <Text style={[styles.orderMetaValue, { color: Colors.primary }]}>HK$1,560</Text>
            </View>
          </View>
        </View>

        {/* Progress Stepper */}
        <View style={styles.stepperCard}>
          <View style={styles.sectionHeaderRow}>
            <View style={styles.sectionAccent} />
            <Text style={styles.sectionTitle}>訂單進度</Text>
          </View>

          <View style={styles.stepper}>
            {ORDER_STATUS_STEPS.map((step, index) => (
              <StatusStep
                key={step.key}
                label={step.label}
                icon={step.icon}
                index={index}
                currentIndex={currentIndex}
                isLast={index === ORDER_STATUS_STEPS.length - 1}
              />
            ))}
          </View>
        </View>

        {/* Pharmacist Note */}
        <View style={styles.pharmacistCard}>
          <View style={styles.pharmacistHeader}>
            <View style={styles.pharmacistAvatar}>
              <Ionicons name="person" size={22} color={Colors.primary} />
            </View>
            <View>
              <Text style={styles.pharmacistName}>藥劑師 · 陳醫師</Text>
              <Text style={styles.pharmacistRole}>持牌藥劑師 (HK #P12345)</Text>
            </View>
          </View>
          <View style={styles.pharmacistNote}>
            <Text style={styles.pharmacistNoteText}>
              正在審核您的配方。我們會仔細查閱您提供的醫療資訊，確保配方的安全性與有效性。
            </Text>
          </View>
        </View>

        {/* Shipping Info */}
        <View style={styles.shippingCard}>
          <View style={styles.sectionHeaderRow}>
            <View style={styles.sectionAccent} />
            <Text style={styles.sectionTitle}>配送資訊</Text>
          </View>
          <View style={styles.shippingItems}>
            {[
              { label: '送達地址', value: '香港九龍旺角彌敦道 123 號 12A' },
              { label: '聯絡電話', value: '+852 9XXX XXXX' },
              { label: '預計送達', value: '審核後 3-5 個工作天' },
              { label: '物流服務', value: '順豐速運 (香港)' },
            ].map(item => (
              <View key={item.label} style={styles.shippingRow}>
                <Text style={styles.shippingLabel}>{item.label}</Text>
                <Text style={styles.shippingValue}>{item.value}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Support */}
        <View style={styles.supportCard}>
          <Ionicons name="chatbubble-ellipses-outline" size={18} color={Colors.primary} />
          <View style={{ flex: 1 }}>
            <Text style={styles.supportTitle}>需要協助？</Text>
            <Text style={styles.supportDesc}>我們的客服團隊隨時為您服務，周一至周日 9:00 - 21:00</Text>
          </View>
          <Ionicons name="chevron-forward" size={16} color={Colors.gray400} />
        </View>
      </ScrollView>
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
    paddingBottom: 40,
    gap: Spacing.md,
  },
  orderCard: {
    backgroundColor: Colors.primary,
    borderRadius: Radius.lg,
    padding: Spacing.xl,
  },
  orderCardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing.xl,
  },
  orderIdLabel: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.7)',
    marginBottom: 2,
  },
  orderId: {
    fontSize: 20,
    fontWeight: '900',
    color: Colors.white,
    letterSpacing: -0.3,
  },
  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: Radius.full,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.warning,
  },
  statusPillText: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.white,
  },
  orderMeta: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 0,
  },
  orderMetaItem: {
    width: '50%',
    marginBottom: 12,
  },
  orderMetaLabel: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.6)',
    marginBottom: 2,
  },
  orderMetaValue: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.white,
  },
  stepperCard: {
    backgroundColor: Colors.white,
    borderRadius: Radius.lg,
    padding: Spacing.xl,
    ...Shadow.sm,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: Spacing.xl,
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
  },
  stepper: {
    paddingLeft: 0,
  },
  stepRow: {
    flexDirection: 'row',
    gap: Spacing.lg,
  },
  stepIndicatorCol: {
    alignItems: 'center',
    width: 32,
  },
  stepCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepCircleDone: {
    backgroundColor: Colors.success,
  },
  stepCircleActive: {
    backgroundColor: Colors.primary,
  },
  stepCirclePending: {
    backgroundColor: Colors.gray100,
    borderWidth: 1.5,
    borderColor: Colors.border,
  },
  stepDotInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.gray300,
  },
  stepLine: {
    flex: 1,
    width: 2,
    backgroundColor: Colors.gray200,
    minHeight: 32,
    marginTop: 4,
    marginBottom: 4,
    borderRadius: 1,
  },
  stepLineDone: {
    backgroundColor: Colors.success,
  },
  stepContent: {
    flex: 1,
    paddingTop: 6,
  },
  stepContentWithMargin: {
    paddingBottom: 20,
  },
  stepLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flexWrap: 'wrap',
  },
  stepLabel: {
    fontSize: 14,
    fontWeight: '700',
  },
  stepLabelDone: {
    color: Colors.gray600,
  },
  stepLabelActive: {
    color: Colors.primary,
  },
  stepLabelPending: {
    color: Colors.gray300,
  },
  completedBadge: {
    backgroundColor: '#D1FAE5',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: Radius.full,
  },
  completedBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.success,
  },
  activeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: Colors.primaryBg,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: Radius.full,
  },
  activePulse: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.primary,
  },
  activeBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.primary,
  },
  stepTime: {
    fontSize: 11,
    color: Colors.gray400,
    marginTop: 3,
  },
  pharmacistCard: {
    backgroundColor: Colors.white,
    borderRadius: Radius.lg,
    padding: Spacing.xl,
    ...Shadow.sm,
  },
  pharmacistHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    marginBottom: Spacing.lg,
  },
  pharmacistAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.primaryBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pharmacistName: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.black,
  },
  pharmacistRole: {
    fontSize: 11,
    color: Colors.gray400,
    marginTop: 2,
  },
  pharmacistNote: {
    backgroundColor: Colors.gray50,
    borderRadius: Radius.md,
    padding: Spacing.lg,
    borderLeftWidth: 3,
    borderLeftColor: Colors.primary,
  },
  pharmacistNoteText: {
    fontSize: 13,
    color: Colors.gray600,
    lineHeight: 20,
  },
  shippingCard: {
    backgroundColor: Colors.white,
    borderRadius: Radius.lg,
    padding: Spacing.xl,
    ...Shadow.sm,
  },
  shippingItems: {
    gap: 0,
  },
  shippingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
  },
  shippingLabel: {
    fontSize: 13,
    color: Colors.gray400,
    fontWeight: '500',
  },
  shippingValue: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.gray700,
    flex: 1,
    textAlign: 'right',
  },
  supportCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    backgroundColor: Colors.white,
    borderRadius: Radius.lg,
    padding: Spacing.xl,
    ...Shadow.sm,
  },
  supportTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.black,
  },
  supportDesc: {
    fontSize: 12,
    color: Colors.gray400,
    marginTop: 2,
  },
});

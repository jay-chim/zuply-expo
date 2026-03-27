import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, Radius, Shadow } from '@/constants/Colors';
import { MOCK_SUPPLEMENTS, Supplement } from '@/constants/MockData';
import { TierBadge } from '@/components/TierBadge';
import { PrimaryButton } from '@/components/PrimaryButton';

const AI_FEE = 3;
const PACKAGING_FEE = 1;

function SupplementCard({ supplement, isExpanded, onToggle }: {
  supplement: Supplement;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const totalPills = supplement.pillsPerDay;

  return (
    <TouchableOpacity
      style={styles.suppCard}
      activeOpacity={0.85}
      onPress={onToggle}
    >
      <View style={styles.suppCardRow}>
        {/* Icon */}
        <View style={styles.suppIcon}>
          <Ionicons name="medical" size={20} color={Colors.primary} />
        </View>

        {/* Info */}
        <View style={styles.suppInfo}>
          <View style={styles.suppNameRow}>
            <Text style={styles.suppNameZh}>{supplement.nameZh}</Text>
            <TierBadge tier={supplement.tier} />
          </View>
          <Text style={styles.suppNameEn}>{supplement.nameEn}</Text>
          <Text style={styles.suppDesc}>{supplement.description}</Text>
        </View>

        {/* Price + Toggle */}
        <View style={styles.suppRight}>
          <Text style={styles.suppPrice}>HK${supplement.pricePerPill.toFixed(1)}</Text>
          <Text style={styles.suppPriceUnit}>粒/日</Text>
          <Ionicons
            name={isExpanded ? 'chevron-up' : 'chevron-down'}
            size={16}
            color={Colors.gray400}
            style={{ marginTop: 6 }}
          />
        </View>
      </View>

      {/* Expanded Details */}
      {isExpanded && (
        <View style={styles.suppExpandedContent}>
          <View style={styles.suppMeta}>
            <View style={styles.suppMetaItem}>
              <Text style={styles.suppMetaLabel}>包裝方式</Text>
              <Text style={styles.suppMetaValue}>{supplement.packType}</Text>
            </View>
            <View style={styles.suppMetaItem}>
              <Text style={styles.suppMetaLabel}>每日數量</Text>
              <Text style={styles.suppMetaValue}>{totalPills} 粒</Text>
            </View>
            <View style={styles.suppMetaItem}>
              <Text style={styles.suppMetaLabel}>日費用</Text>
              <Text style={styles.suppMetaValue}>HK${(supplement.pricePerPill * totalPills).toFixed(1)}</Text>
            </View>
          </View>
          <View style={styles.benefitsRow}>
            {supplement.benefits.map(b => (
              <View key={b} style={styles.benefitChip}>
                <Ionicons name="checkmark-circle" size={11} color={Colors.primary} />
                <Text style={styles.benefitText}>{b}</Text>
              </View>
            ))}
          </View>
        </View>
      )}
    </TouchableOpacity>
  );
}

export default function FormulaScreen() {
  const router = useRouter();
  const [expanded, setExpanded] = useState<string | null>(null);

  const totalPills = MOCK_SUPPLEMENTS.reduce((sum, s) => sum + s.pillsPerDay, 0);
  const suppCostPerDay = MOCK_SUPPLEMENTS.reduce((sum, s) => sum + s.pricePerPill * s.pillsPerDay, 0);
  const totalPerDay = suppCostPerDay + AI_FEE + PACKAGING_FEE;

  const packLabel = totalPills <= 6 ? '每日一包' : '早晚分包 (AM/PM)';

  return (
    <View style={styles.screen}>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

        {/* Summary Banner */}
        <View style={styles.summaryBanner}>
          <View style={styles.summaryBannerTop}>
            <View>
              <Text style={styles.summaryLabel}>您的專屬配方</Text>
              <Text style={styles.summaryFormula}>{totalPills} 粒 / 日</Text>
            </View>
            <View style={styles.summaryRight}>
              <View style={styles.packBadge}>
                <Ionicons name="cube-outline" size={14} color={Colors.primary} />
                <Text style={styles.packBadgeText}>{packLabel}</Text>
              </View>
            </View>
          </View>

          {/* Cost Breakdown */}
          <View style={styles.costGrid}>
            <View style={styles.costItem}>
              <Text style={styles.costValue}>HK${suppCostPerDay.toFixed(1)}</Text>
              <Text style={styles.costLabel}>補充劑/日</Text>
            </View>
            <View style={styles.costDivider} />
            <View style={styles.costItem}>
              <Text style={styles.costValue}>HK${AI_FEE}</Text>
              <Text style={styles.costLabel}>AI分析費</Text>
            </View>
            <View style={styles.costDivider} />
            <View style={styles.costItem}>
              <Text style={styles.costValue}>HK${PACKAGING_FEE}</Text>
              <Text style={styles.costLabel}>包裝費</Text>
            </View>
            <View style={styles.costDivider} />
            <View style={styles.costItem}>
              <Text style={[styles.costValue, { color: Colors.white }]}>HK${totalPerDay.toFixed(1)}</Text>
              <Text style={[styles.costLabel, { color: 'rgba(255,255,255,0.8)' }]}>合計/日</Text>
            </View>
          </View>

          <View style={styles.reviewBadge}>
            <Ionicons name="shield-checkmark" size={14} color={Colors.primaryBg} />
            <Text style={styles.reviewBadgeText}>藥劑師審核中 · 通常24小時內完成</Text>
          </View>
        </View>

        {/* Supplement List */}
        <View style={styles.listSection}>
          <View style={styles.listHeader}>
            <View style={styles.sectionAccent} />
            <Text style={styles.listTitle}>配方明細</Text>
            <View style={styles.countBadge}>
              <Text style={styles.countBadgeText}>{MOCK_SUPPLEMENTS.length} 種</Text>
            </View>
          </View>
          <Text style={styles.listSubtitle}>點擊各項目查看詳細說明</Text>

          {MOCK_SUPPLEMENTS.map(supp => (
            <SupplementCard
              key={supp.id}
              supplement={supp}
              isExpanded={expanded === supp.id}
              onToggle={() => setExpanded(prev => prev === supp.id ? null : supp.id)}
            />
          ))}
        </View>

        {/* Pack Info */}
        <View style={styles.packInfoCard}>
          <Ionicons name="information-circle-outline" size={18} color={Colors.primary} />
          <View style={{ flex: 1 }}>
            <Text style={styles.packInfoTitle}>包裝說明</Text>
            <Text style={styles.packInfoDesc}>
              您的配方共 {totalPills} 粒，{totalPills <= 6 ? '符合每日單包裝（≤6粒）標準。' : '超過6粒，將採用早晚分包設計，確保最佳吸收效果。'}
            </Text>
          </View>
        </View>

        {/* Japan Quality */}
        <View style={styles.qualityCard}>
          <Text style={styles.qualityTitle}>🇯🇵 日本品質保證</Text>
          <View style={styles.qualityItems}>
            {['GMP認證工廠生產', '原料來自日本及歐美', '每批次第三方檢測', '無防腐劑無人工色素'].map(item => (
              <View key={item} style={styles.qualityItem}>
                <Ionicons name="checkmark-circle" size={14} color={Colors.success} />
                <Text style={styles.qualityItemText}>{item}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Bottom Bar */}
      <View style={styles.bottomBar}>
        <View style={styles.bottomBarPrice}>
          <Text style={styles.bottomBarPriceLabel}>合計</Text>
          <Text style={styles.bottomBarPriceValue}>HK${totalPerDay.toFixed(1)}<Text style={styles.bottomBarPriceUnit}>/日</Text></Text>
        </View>
        <PrimaryButton
          title="加入購物車"
          onPress={() => router.push('/cart')}
          size="md"
          style={styles.bottomBarBtn}
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
    paddingBottom: 100,
  },
  summaryBanner: {
    backgroundColor: Colors.primary,
    padding: Spacing.xl,
  },
  summaryBannerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing.xl,
  },
  summaryLabel: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.75)',
    marginBottom: 4,
    fontWeight: '500',
  },
  summaryFormula: {
    fontSize: 32,
    fontWeight: '900',
    color: Colors.white,
    letterSpacing: -1,
  },
  summaryRight: {
    alignItems: 'flex-end',
  },
  packBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: Radius.full,
  },
  packBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.white,
  },
  costGrid: {
    flexDirection: 'row',
    backgroundColor: 'rgba(0,0,0,0.15)',
    borderRadius: Radius.md,
    padding: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  costItem: {
    flex: 1,
    alignItems: 'center',
  },
  costValue: {
    fontSize: 15,
    fontWeight: '800',
    color: 'rgba(255,255,255,0.9)',
    letterSpacing: -0.3,
  },
  costLabel: {
    fontSize: 10,
    color: 'rgba(255,255,255,0.6)',
    marginTop: 2,
  },
  costDivider: {
    width: 1,
    backgroundColor: 'rgba(255,255,255,0.2)',
    marginVertical: 2,
  },
  reviewBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  reviewBadgeText: {
    fontSize: 12,
    color: Colors.primaryBg,
    fontWeight: '500',
  },
  listSection: {
    backgroundColor: Colors.white,
    margin: Spacing.lg,
    borderRadius: Radius.lg,
    padding: Spacing.xl,
    ...Shadow.sm,
  },
  listHeader: {
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
  listTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: Colors.black,
    flex: 1,
  },
  countBadge: {
    backgroundColor: Colors.primaryBg,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: Radius.full,
  },
  countBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.primary,
  },
  listSubtitle: {
    fontSize: 12,
    color: Colors.gray400,
    marginBottom: Spacing.lg,
  },
  suppCard: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Radius.md,
    marginBottom: Spacing.md,
    overflow: 'hidden',
  },
  suppCardRow: {
    flexDirection: 'row',
    padding: Spacing.lg,
    gap: Spacing.md,
  },
  suppIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primaryBg,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  suppInfo: {
    flex: 1,
    gap: 3,
  },
  suppNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flexWrap: 'wrap',
  },
  suppNameZh: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.black,
  },
  suppNameEn: {
    fontSize: 11,
    color: Colors.gray400,
    fontWeight: '400',
  },
  suppDesc: {
    fontSize: 12,
    color: Colors.gray500,
    lineHeight: 16,
    marginTop: 2,
  },
  suppRight: {
    alignItems: 'flex-end',
    flexShrink: 0,
  },
  suppPrice: {
    fontSize: 16,
    fontWeight: '800',
    color: Colors.primary,
  },
  suppPriceUnit: {
    fontSize: 10,
    color: Colors.gray400,
    marginTop: 2,
  },
  suppExpandedContent: {
    borderTopWidth: 1,
    borderTopColor: Colors.divider,
    padding: Spacing.lg,
    backgroundColor: Colors.gray50,
  },
  suppMeta: {
    flexDirection: 'row',
    gap: 0,
    marginBottom: Spacing.md,
  },
  suppMetaItem: {
    flex: 1,
    alignItems: 'center',
  },
  suppMetaLabel: {
    fontSize: 10,
    color: Colors.gray400,
    marginBottom: 2,
  },
  suppMetaValue: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.gray700,
  },
  benefitsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  benefitChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: Colors.primaryBg,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: Radius.full,
  },
  benefitText: {
    fontSize: 11,
    color: Colors.primaryDark,
    fontWeight: '600',
  },
  packInfoCard: {
    flexDirection: 'row',
    gap: 12,
    backgroundColor: Colors.white,
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.md,
    padding: Spacing.lg,
    borderRadius: Radius.md,
    borderLeftWidth: 3,
    borderLeftColor: Colors.primary,
    ...Shadow.sm,
  },
  packInfoTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.black,
    marginBottom: 4,
  },
  packInfoDesc: {
    fontSize: 12,
    color: Colors.gray500,
    lineHeight: 18,
  },
  qualityCard: {
    backgroundColor: Colors.white,
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.md,
    padding: Spacing.xl,
    borderRadius: Radius.md,
    ...Shadow.sm,
  },
  qualityTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: Colors.black,
    marginBottom: 12,
  },
  qualityItems: {
    gap: 8,
  },
  qualityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  qualityItemText: {
    fontSize: 13,
    color: Colors.gray600,
    fontWeight: '500',
  },
  bottomBar: {
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
    gap: Spacing.lg,
  },
  bottomBarPrice: {
    flex: 0,
  },
  bottomBarPriceLabel: {
    fontSize: 11,
    color: Colors.gray400,
  },
  bottomBarPriceValue: {
    fontSize: 20,
    fontWeight: '900',
    color: Colors.black,
  },
  bottomBarPriceUnit: {
    fontSize: 12,
    fontWeight: '400',
    color: Colors.gray400,
  },
  bottomBarBtn: {
    flex: 1,
  },
});

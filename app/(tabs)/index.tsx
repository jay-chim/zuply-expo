import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, Radius, Shadow } from '@/constants/Colors';
import { HOW_IT_WORKS_STEPS } from '@/constants/MockData';
import { ZuplyLogo } from '@/components/ZuplyLogo';
import { PrimaryButton } from '@/components/PrimaryButton';

const FEATURES = [
  { icon: 'shield-checkmark', label: '100% 日本GMP工廠' },
  { icon: 'flask', label: '藥劑師親自審核' },
  { icon: 'sparkles', label: 'AI個人化配方' },
  { icon: 'leaf', label: '無添加防腐劑' },
];

type StepIconName = 'clipboard' | 'hardware-chip' | 'person' | 'cube';

const STEP_ICON_MAP: Record<string, StepIconName> = {
  'clipboard-list': 'clipboard',
  'cpu': 'hardware-chip',
  'user-check': 'person',
  'package': 'cube',
};

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.screen}>
      <StatusBar barStyle="light-content" />

      {/* Header */}
      <View style={styles.header}>
        <ZuplyLogo size="md" light />
        <TouchableOpacity style={styles.headerAction}>
          <Ionicons name="notifications-outline" size={22} color={Colors.white} />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Section */}
        <View style={styles.hero}>
          {/* Japan Badge */}
          <View style={styles.japanBadge}>
            <Text style={styles.japanFlag}>🇯🇵</Text>
            <Text style={styles.japanBadgeText}>100% 日本製造</Text>
          </View>

          <Text style={styles.heroTitle}>{'專為您設計的\n個人化補充劑'}</Text>
          <Text style={styles.heroSubtitle}>
            透過AI分析 × 藥劑師審核，打造屬於您的每日營養配方
          </Text>

          <PrimaryButton
            title="填寫健康問卷"
            onPress={() => router.push('/(tabs)/questionnaire')}
            size="lg"
            style={styles.ctaButton}
          />

          <TouchableOpacity style={styles.learnMore}>
            <Text style={styles.learnMoreText}>了解更多</Text>
            <Ionicons name="chevron-down" size={14} color="rgba(255,255,255,0.8)" />
          </TouchableOpacity>
        </View>

        {/* Feature Chips */}
        <View style={styles.features}>
          {FEATURES.map((f) => (
            <View key={f.label} style={styles.featureChip}>
              <Ionicons name={f.icon as any} size={14} color={Colors.primary} />
              <Text style={styles.featureChipText}>{f.label}</Text>
            </View>
          ))}
        </View>

        {/* Trust Bar */}
        <View style={styles.trustBar}>
          <View style={styles.trustItem}>
            <Text style={styles.trustNumber}>5,000+</Text>
            <Text style={styles.trustLabel}>用戶信賴</Text>
          </View>
          <View style={styles.trustDivider} />
          <View style={styles.trustItem}>
            <Text style={styles.trustNumber}>98%</Text>
            <Text style={styles.trustLabel}>用戶滿意度</Text>
          </View>
          <View style={styles.trustDivider} />
          <View style={styles.trustItem}>
            <Text style={styles.trustNumber}>30+</Text>
            <Text style={styles.trustLabel}>補充劑種類</Text>
          </View>
        </View>

        {/* How It Works */}
        <View style={styles.section}>
          <View style={styles.sectionTitleRow}>
            <View style={styles.sectionAccent} />
            <Text style={styles.sectionTitle}>如何運作</Text>
          </View>
          <Text style={styles.sectionSubtitle}>四個簡單步驟，開始您的健康之旅</Text>

          <View style={styles.stepsGrid}>
            {HOW_IT_WORKS_STEPS.map((step, index) => (
              <View key={step.step} style={styles.stepCard}>
                <View style={styles.stepIconCircle}>
                  <Ionicons
                    name={STEP_ICON_MAP[step.icon] || 'star'}
                    size={22}
                    color={Colors.primary}
                  />
                </View>
                <View style={styles.stepNumber}>
                  <Text style={styles.stepNumberText}>{step.step}</Text>
                </View>
                <Text style={styles.stepTitle}>{step.title}</Text>
                <Text style={styles.stepDesc}>{step.desc}</Text>
                {index < HOW_IT_WORKS_STEPS.length - 1 && (
                  <View style={styles.stepConnector}>
                    <Ionicons name="arrow-forward" size={14} color={Colors.gray300} />
                  </View>
                )}
              </View>
            ))}
          </View>
        </View>

        {/* CTA Banner */}
        <View style={styles.ctaBanner}>
          <Text style={styles.ctaBannerTitle}>立即開始您的健康之旅</Text>
          <Text style={styles.ctaBannerSub}>首次問卷分析完全免費</Text>
          <PrimaryButton
            title="立即填寫問卷"
            onPress={() => router.push('/(tabs)/questionnaire')}
            size="md"
            style={styles.ctaBannerBtn}
          />
        </View>

        {/* Footer Note */}
        <View style={styles.footerNote}>
          <Ionicons name="shield-checkmark-outline" size={14} color={Colors.gray400} />
          <Text style={styles.footerNoteText}>
            Zuply Health Limited 臻沛 · 香港持牌藥行
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  header: {
    paddingTop: Platform.OS === 'ios' ? 56 : 40,
    paddingHorizontal: Spacing.xl,
    paddingBottom: Spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.primary,
  },
  headerAction: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scroll: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  hero: {
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.xl,
    paddingBottom: 48,
    alignItems: 'flex-start',
  },
  japanBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: Radius.full,
    marginBottom: 16,
    gap: 6,
  },
  japanFlag: {
    fontSize: 14,
  },
  japanBadgeText: {
    color: Colors.white,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: '900',
    color: Colors.white,
    letterSpacing: -0.5,
    lineHeight: 40,
    marginBottom: 12,
  },
  heroSubtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.85)',
    lineHeight: 22,
    marginBottom: 24,
    maxWidth: 280,
  },
  ctaButton: {
    alignSelf: 'stretch',
    backgroundColor: Colors.white,
    borderColor: Colors.white,
    marginBottom: 16,
  },
  learnMore: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  learnMoreText: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 13,
    fontWeight: '500',
  },
  features: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: Spacing.xl,
    gap: 8,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  featureChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: Colors.primaryBg,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: Radius.full,
  },
  featureChipText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.primaryDark,
  },
  trustBar: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    marginBottom: 8,
    paddingVertical: Spacing.xl,
    paddingHorizontal: Spacing.lg,
  },
  trustItem: {
    flex: 1,
    alignItems: 'center',
  },
  trustNumber: {
    fontSize: 24,
    fontWeight: '900',
    color: Colors.primary,
    letterSpacing: -0.5,
  },
  trustLabel: {
    fontSize: 11,
    color: Colors.gray500,
    marginTop: 2,
    fontWeight: '500',
  },
  trustDivider: {
    width: 1,
    backgroundColor: Colors.border,
    marginVertical: 4,
  },
  section: {
    backgroundColor: Colors.white,
    margin: Spacing.lg,
    padding: Spacing.xl,
    borderRadius: Radius.lg,
    ...Shadow.md,
  },
  sectionTitleRow: {
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
    fontSize: 20,
    fontWeight: '800',
    color: Colors.black,
    letterSpacing: -0.3,
  },
  sectionSubtitle: {
    fontSize: 13,
    color: Colors.gray500,
    marginBottom: 24,
    lineHeight: 18,
  },
  stepsGrid: {
    gap: 0,
  },
  stepCard: {
    position: 'relative',
    paddingVertical: Spacing.lg,
    paddingLeft: 56,
    paddingRight: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
  },
  stepIconCircle: {
    position: 'absolute',
    left: 0,
    top: Spacing.lg,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primaryBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepNumber: {
    position: 'absolute',
    right: 0,
    top: Spacing.lg,
  },
  stepNumberText: {
    fontSize: 28,
    fontWeight: '900',
    color: Colors.gray100,
    letterSpacing: -1,
  },
  stepTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.black,
    marginBottom: 4,
  },
  stepDesc: {
    fontSize: 13,
    color: Colors.gray500,
    lineHeight: 18,
  },
  stepConnector: {
    position: 'absolute',
    bottom: -12,
    left: 13,
    width: 14,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  ctaBanner: {
    margin: Spacing.lg,
    padding: Spacing.xxl,
    borderRadius: Radius.lg,
    backgroundColor: Colors.primaryDark,
    alignItems: 'center',
  },
  ctaBannerTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: Colors.white,
    textAlign: 'center',
    marginBottom: 6,
  },
  ctaBannerSub: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.75)',
    marginBottom: 18,
  },
  ctaBannerBtn: {
    backgroundColor: Colors.white,
    borderColor: Colors.white,
    alignSelf: 'stretch',
  },
  footerNote: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.lg,
  },
  footerNoteText: {
    fontSize: 11,
    color: Colors.gray400,
  },
});

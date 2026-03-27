import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Switch,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, Radius, Shadow } from '@/constants/Colors';
import { MOCK_ORDERS } from '@/constants/MockData';

const MOCK_USER = {
  name: '陳大文',
  email: 'chan@example.com',
  phone: '+852 9XXX XXXX',
  memberSince: '2024-01-15',
  tier: 'Gold',
  totalOrders: 3,
  totalSpent: 3699,
};

interface SettingItemProps {
  icon: string;
  label: string;
  value?: string;
  toggle?: boolean;
  toggleValue?: boolean;
  onToggle?: (v: boolean) => void;
  onPress?: () => void;
  destructive?: boolean;
  showArrow?: boolean;
}

function SettingItem({ icon, label, value, toggle, toggleValue, onToggle, onPress, destructive = false, showArrow = true }: SettingItemProps) {
  return (
    <TouchableOpacity
      style={styles.settingItem}
      onPress={onPress}
      disabled={!onPress && !toggle}
      activeOpacity={0.7}
    >
      <View style={[styles.settingIcon, destructive && styles.settingIconDestructive]}>
        <Ionicons name={icon as any} size={17} color={destructive ? Colors.error : Colors.primary} />
      </View>
      <Text style={[styles.settingLabel, destructive && styles.settingLabelDestructive]}>{label}</Text>
      <View style={styles.settingRight}>
        {value && <Text style={styles.settingValue}>{value}</Text>}
        {toggle ? (
          <Switch
            value={toggleValue}
            onValueChange={onToggle}
            trackColor={{ true: Colors.primary, false: Colors.gray200 }}
            thumbColor={Colors.white}
            ios_backgroundColor={Colors.gray200}
          />
        ) : showArrow ? (
          <Ionicons name="chevron-forward" size={16} color={Colors.gray300} />
        ) : null}
      </View>
    </TouchableOpacity>
  );
}

export default function ProfileScreen() {
  const router = useRouter();
  const [notif, setNotif] = useState(true);
  const [biometric, setBiometric] = useState(false);

  const recentOrder = MOCK_ORDERS[MOCK_ORDERS.length - 1];

  return (
    <View style={styles.screen}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>個人中心</Text>
        <TouchableOpacity style={styles.editBtn}>
          <Ionicons name="create-outline" size={18} color={Colors.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

        {/* User Card */}
        <View style={styles.userCard}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Text style={styles.avatarInitial}>{MOCK_USER.name.charAt(0)}</Text>
            </View>
            <View style={styles.memberBadge}>
              <Ionicons name="star" size={10} color={Colors.secondary} />
              <Text style={styles.memberBadgeText}>{MOCK_USER.tier}</Text>
            </View>
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{MOCK_USER.name}</Text>
            <Text style={styles.userEmail}>{MOCK_USER.email}</Text>
            <Text style={styles.userPhone}>{MOCK_USER.phone}</Text>
          </View>
        </View>

        {/* Stats */}
        <View style={styles.statsCard}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{MOCK_USER.totalOrders}</Text>
            <Text style={styles.statLabel}>歷史訂單</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>HK${MOCK_USER.totalSpent.toLocaleString()}</Text>
            <Text style={styles.statLabel}>總消費</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{new Date(MOCK_USER.memberSince).getFullYear()}</Text>
            <Text style={styles.statLabel}>加入年份</Text>
          </View>
        </View>

        {/* My Formula */}
        <TouchableOpacity style={styles.formulaCard} onPress={() => router.push('/formula')} activeOpacity={0.85}>
          <View style={styles.formulaCardLeft}>
            <View style={styles.formulaIcon}>
              <Ionicons name="flask" size={22} color={Colors.primary} />
            </View>
            <View>
              <Text style={styles.formulaTitle}>我的配方</Text>
              <Text style={styles.formulaSub}>6 種補充劑 · 每日 6 粒</Text>
            </View>
          </View>
          <View style={styles.formulaRight}>
            <Text style={styles.formulaPrice}>HK$9.4/日</Text>
            <Ionicons name="chevron-forward" size={16} color={Colors.gray300} />
          </View>
        </TouchableOpacity>

        {/* Recent Orders */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionTitle}>最近訂單</Text>
            <TouchableOpacity onPress={() => router.push('/(tabs)/orders')}>
              <Text style={styles.sectionLink}>全部查看</Text>
            </TouchableOpacity>
          </View>

          {MOCK_ORDERS.slice(0, 2).map(order => (
            <TouchableOpacity
              key={order.id}
              style={styles.orderRow}
              onPress={() => router.push('/order-status')}
              activeOpacity={0.7}
            >
              <View style={styles.orderRowLeft}>
                <Ionicons name="cube" size={16} color={Colors.gray400} />
                <View>
                  <Text style={styles.orderRowId}>{order.id}</Text>
                  <Text style={styles.orderRowDate}>{order.date}</Text>
                </View>
              </View>
              <View style={styles.orderRowRight}>
                <Text style={styles.orderRowPrice}>HK${order.total.toLocaleString()}</Text>
                <Ionicons name="chevron-forward" size={14} color={Colors.gray300} />
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Settings */}
        <View style={styles.sectionCard}>
          <Text style={styles.settingsGroupLabel}>通知設定</Text>
          <SettingItem
            icon="notifications-outline"
            label="推送通知"
            toggle
            toggleValue={notif}
            onToggle={setNotif}
            showArrow={false}
          />
          <SettingItem
            icon="mail-outline"
            label="電子郵件提醒"
            value="已開啟"
            onPress={() => {}}
          />
        </View>

        <View style={styles.sectionCard}>
          <Text style={styles.settingsGroupLabel}>帳戶安全</Text>
          <SettingItem
            icon="finger-print-outline"
            label="生物識別登入"
            toggle
            toggleValue={biometric}
            onToggle={setBiometric}
            showArrow={false}
          />
          <SettingItem
            icon="lock-closed-outline"
            label="更改密碼"
            onPress={() => {}}
          />
          <SettingItem
            icon="shield-outline"
            label="隱私設定"
            onPress={() => {}}
          />
        </View>

        <View style={styles.sectionCard}>
          <Text style={styles.settingsGroupLabel}>服務與支援</Text>
          <SettingItem
            icon="help-circle-outline"
            label="常見問題"
            onPress={() => {}}
          />
          <SettingItem
            icon="chatbubble-outline"
            label="聯絡客服"
            value="9:00-21:00"
            onPress={() => {}}
          />
          <SettingItem
            icon="document-text-outline"
            label="服務條款"
            onPress={() => {}}
          />
          <SettingItem
            icon="star-outline"
            label="為我們評分"
            onPress={() => {}}
          />
        </View>

        <View style={styles.sectionCard}>
          <SettingItem
            icon="log-out-outline"
            label="登出"
            destructive
            showArrow={false}
            onPress={() => {}}
          />
        </View>

        {/* Version */}
        <View style={styles.versionBlock}>
          <Text style={styles.versionText}>Zuply Health Limited 臻沛</Text>
          <Text style={styles.versionText}>版本 1.0.0 · 香港</Text>
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
  header: {
    paddingTop: Platform.OS === 'ios' ? 56 : 40,
    paddingHorizontal: Spacing.xl,
    paddingBottom: Spacing.lg,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: Colors.black,
    letterSpacing: -0.5,
  },
  editBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.primaryBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    padding: Spacing.lg,
    paddingBottom: 40,
    gap: Spacing.md,
  },
  userCard: {
    backgroundColor: Colors.white,
    borderRadius: Radius.lg,
    padding: Spacing.xl,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.lg,
    ...Shadow.sm,
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarInitial: {
    fontSize: 26,
    fontWeight: '900',
    color: Colors.white,
  },
  memberBadge: {
    position: 'absolute',
    bottom: -4,
    right: -4,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    backgroundColor: Colors.secondaryLight,
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: Radius.full,
    borderWidth: 1.5,
    borderColor: Colors.white,
  },
  memberBadgeText: {
    fontSize: 9,
    fontWeight: '800',
    color: Colors.secondary,
  },
  userInfo: {
    flex: 1,
    gap: 2,
  },
  userName: {
    fontSize: 20,
    fontWeight: '900',
    color: Colors.black,
    letterSpacing: -0.3,
  },
  userEmail: {
    fontSize: 13,
    color: Colors.gray500,
  },
  userPhone: {
    fontSize: 13,
    color: Colors.gray400,
  },
  statsCard: {
    backgroundColor: Colors.white,
    borderRadius: Radius.lg,
    padding: Spacing.xl,
    flexDirection: 'row',
    ...Shadow.sm,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: '900',
    color: Colors.primary,
    letterSpacing: -0.5,
  },
  statLabel: {
    fontSize: 11,
    color: Colors.gray400,
    marginTop: 2,
    fontWeight: '500',
  },
  statDivider: {
    width: 1,
    backgroundColor: Colors.border,
    marginVertical: 4,
  },
  formulaCard: {
    backgroundColor: Colors.primaryBg,
    borderRadius: Radius.lg,
    padding: Spacing.xl,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1.5,
    borderColor: Colors.primaryLight,
  },
  formulaCardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  formulaIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadow.sm,
  },
  formulaTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: Colors.primaryDark,
  },
  formulaSub: {
    fontSize: 12,
    color: Colors.primary,
    marginTop: 2,
    fontWeight: '500',
  },
  formulaRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  formulaPrice: {
    fontSize: 14,
    fontWeight: '800',
    color: Colors.primaryDark,
  },
  sectionCard: {
    backgroundColor: Colors.white,
    borderRadius: Radius.lg,
    padding: Spacing.lg,
    paddingHorizontal: Spacing.xl,
    ...Shadow.sm,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.md,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: Colors.black,
  },
  sectionLink: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.primary,
  },
  orderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
  },
  orderRowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  orderRowId: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.black,
  },
  orderRowDate: {
    fontSize: 11,
    color: Colors.gray400,
    marginTop: 1,
  },
  orderRowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  orderRowPrice: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.gray700,
  },
  settingsGroupLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.gray400,
    letterSpacing: 0.5,
    marginBottom: Spacing.sm,
    textTransform: 'uppercase',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 13,
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
  },
  settingIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: Colors.primaryBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingIconDestructive: {
    backgroundColor: '#FEE2E2',
  },
  settingLabel: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: Colors.black,
  },
  settingLabelDestructive: {
    color: Colors.error,
  },
  settingRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  settingValue: {
    fontSize: 13,
    color: Colors.gray400,
  },
  versionBlock: {
    alignItems: 'center',
    paddingVertical: Spacing.lg,
    gap: 4,
  },
  versionText: {
    fontSize: 12,
    color: Colors.gray300,
  },
});

import React from 'react';
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
import { MOCK_ORDERS, Order } from '@/constants/MockData';

const STATUS_CONFIG: Record<Order['status'], { label: string; color: string; bg: string; icon: any }> = {
  paid: { label: '已付款', color: Colors.info, bg: '#EFF6FF', icon: 'checkmark-circle' },
  reviewing: { label: '審核中', color: Colors.warning, bg: '#FEF9EE', icon: 'time' },
  approved: { label: '審核通過', color: Colors.success, bg: '#ECFDF5', icon: 'shield-checkmark' },
  shipped: { label: '已發貨', color: Colors.gray500, bg: Colors.gray100, icon: 'cube' },
};

function OrderCard({ order }: { order: Order }) {
  const router = useRouter();
  const statusConf = STATUS_CONFIG[order.status];

  return (
    <TouchableOpacity
      style={styles.orderCard}
      activeOpacity={0.85}
      onPress={() => router.push('/order-status')}
    >
      <View style={styles.orderCardTop}>
        <View>
          <Text style={styles.orderId}>{order.id}</Text>
          <Text style={styles.orderDate}>{order.date}</Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: statusConf.bg }]}>
          <Ionicons name={statusConf.icon} size={12} color={statusConf.color} />
          <Text style={[styles.statusText, { color: statusConf.color }]}>{statusConf.label}</Text>
        </View>
      </View>

      <View style={styles.orderCardBottom}>
        <View style={styles.orderDetails}>
          <View style={styles.orderDetail}>
            <Ionicons name="medical-outline" size={13} color={Colors.gray400} />
            <Text style={styles.orderDetailText}>{order.items} 種補充劑</Text>
          </View>
          <View style={styles.orderDetailDot} />
          <View style={styles.orderDetail}>
            <Ionicons name="cube-outline" size={13} color={Colors.gray400} />
            <Text style={styles.orderDetailText}>每日一包</Text>
          </View>
        </View>
        <View style={styles.orderPriceRow}>
          <Text style={styles.orderPrice}>HK${order.total.toLocaleString()}</Text>
          <Ionicons name="chevron-forward" size={16} color={Colors.gray300} />
        </View>
      </View>

      {/* Progress Mini Bar */}
      {(order.status === 'reviewing' || order.status === 'approved') && (
        <View style={styles.progressMini}>
          <View style={[styles.progressMiniBar, { width: order.status === 'reviewing' ? '35%' : '65%' }]} />
        </View>
      )}
    </TouchableOpacity>
  );
}

export default function OrdersScreen() {
  const router = useRouter();

  return (
    <View style={styles.screen}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>我的訂單</Text>
        <TouchableOpacity style={styles.filterBtn}>
          <Ionicons name="filter-outline" size={18} color={Colors.gray600} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

        {/* Active Order Banner */}
        <TouchableOpacity style={styles.activeBanner} activeOpacity={0.9} onPress={() => router.push('/order-status')}>
          <View style={styles.activeBannerLeft}>
            <View style={styles.activePulse}>
              <View style={styles.activePulseInner} />
            </View>
            <View>
              <Text style={styles.activeBannerTitle}>ZP-2024-0401 處理中</Text>
              <Text style={styles.activeBannerSub}>藥劑師審核中 · 預計24小時內完成</Text>
            </View>
          </View>
          <Ionicons name="chevron-forward" size={18} color={Colors.white} />
        </TouchableOpacity>

        {/* Orders List */}
        <View style={styles.listSection}>
          <Text style={styles.listTitle}>歷史訂單</Text>
          {MOCK_ORDERS.map(order => (
            <OrderCard key={order.id} order={order} />
          ))}
        </View>

        {/* Empty state placeholder */}
        {MOCK_ORDERS.length === 0 && (
          <View style={styles.emptyState}>
            <Ionicons name="cube-outline" size={56} color={Colors.gray200} />
            <Text style={styles.emptyTitle}>暫無訂單</Text>
            <Text style={styles.emptyDesc}>填寫健康問卷，開始您的第一份配方</Text>
          </View>
        )}
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
  filterBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.gray100,
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
  activeBanner: {
    backgroundColor: Colors.primary,
    borderRadius: Radius.lg,
    padding: Spacing.xl,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  activeBannerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  activePulse: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  activePulseInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.white,
  },
  activeBannerTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.white,
  },
  activeBannerSub: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.75)',
    marginTop: 2,
  },
  listSection: {
    gap: Spacing.sm,
  },
  listTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.gray500,
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  orderCard: {
    backgroundColor: Colors.white,
    borderRadius: Radius.md,
    padding: Spacing.lg,
    ...Shadow.sm,
    overflow: 'hidden',
  },
  orderCardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing.md,
  },
  orderId: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.black,
    letterSpacing: -0.2,
  },
  orderDate: {
    fontSize: 12,
    color: Colors.gray400,
    marginTop: 2,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: Radius.full,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '700',
  },
  orderCardBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  orderDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  orderDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  orderDetailText: {
    fontSize: 12,
    color: Colors.gray400,
  },
  orderDetailDot: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: Colors.gray300,
  },
  orderPriceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  orderPrice: {
    fontSize: 16,
    fontWeight: '800',
    color: Colors.black,
    letterSpacing: -0.3,
  },
  progressMini: {
    height: 3,
    backgroundColor: Colors.gray100,
    borderRadius: 1.5,
    marginTop: 12,
    overflow: 'hidden',
  },
  progressMiniBar: {
    height: '100%',
    backgroundColor: Colors.primary,
    borderRadius: 1.5,
  },
  emptyState: {
    alignItems: 'center',
    padding: 60,
    gap: 12,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.gray300,
  },
  emptyDesc: {
    fontSize: 13,
    color: Colors.gray300,
    textAlign: 'center',
  },
});

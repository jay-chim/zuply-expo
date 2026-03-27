import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '@/constants/Colors';
import { SupplementTier } from '@/constants/MockData';

interface TierBadgeProps {
  tier: SupplementTier;
  size?: 'sm' | 'md';
}

const TIER_CONFIG = {
  Basic: { bg: Colors.basicBg, text: Colors.basicText, label: 'Basic' },
  Advanced: { bg: Colors.advancedBg, text: Colors.advancedText, label: 'Advanced' },
  Premium: { bg: Colors.premiumBg, text: Colors.premiumText, label: 'Premium' },
  Flagship: { bg: Colors.flagshipBg, text: Colors.flagshipText, label: 'Flagship' },
};

export function TierBadge({ tier, size = 'sm' }: TierBadgeProps) {
  const config = TIER_CONFIG[tier];
  const isSmall = size === 'sm';

  return (
    <View style={[styles.badge, { backgroundColor: config.bg, paddingHorizontal: isSmall ? 6 : 10, paddingVertical: isSmall ? 2 : 4 }]}>
      <Text style={[styles.text, { color: config.text, fontSize: isSmall ? 10 : 12 }]}>
        {config.label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  text: {
    fontWeight: '700',
    letterSpacing: 0.3,
  },
});

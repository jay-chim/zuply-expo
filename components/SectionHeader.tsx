import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Spacing } from '@/constants/Colors';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  center?: boolean;
}

export function SectionHeader({ title, subtitle, center = false }: SectionHeaderProps) {
  return (
    <View style={[styles.container, center && styles.centered]}>
      <Text style={[styles.title, center && styles.centerText]}>{title}</Text>
      {subtitle && (
        <Text style={[styles.subtitle, center && styles.centerText]}>{subtitle}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.lg,
  },
  centered: {
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    color: Colors.black,
    letterSpacing: -0.3,
  },
  subtitle: {
    fontSize: 13,
    color: Colors.gray500,
    marginTop: 4,
    lineHeight: 18,
  },
  centerText: {
    textAlign: 'center',
  },
});

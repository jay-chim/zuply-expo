import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '@/constants/Colors';

interface ZuplyLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
  light?: boolean;
}

export function ZuplyLogo({ size = 'md', showTagline = false, light = false }: ZuplyLogoProps) {
  const sizes = {
    sm: { logo: 22, tagline: 10, mark: 28 },
    md: { logo: 28, tagline: 12, mark: 36 },
    lg: { logo: 36, tagline: 14, mark: 46 },
  };

  const s = sizes[size];
  const color = light ? Colors.white : Colors.primary;
  const subColor = light ? 'rgba(255,255,255,0.75)' : Colors.gray500;

  return (
    <View style={styles.container}>
      <View style={[styles.mark, { width: s.mark, height: s.mark, backgroundColor: color, borderRadius: s.mark * 0.25 }]}>
        <Text style={[styles.markText, { fontSize: s.logo * 0.6, color: Colors.white }]}>臻</Text>
      </View>
      <View style={styles.textBlock}>
        <Text style={[styles.name, { fontSize: s.logo, color }]}>Zuply</Text>
        {showTagline && (
          <Text style={[styles.tagline, { fontSize: s.tagline, color: subColor }]}>個人化健康補充劑</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  mark: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  markText: {
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  textBlock: {
    justifyContent: 'center',
  },
  name: {
    fontWeight: '800',
    letterSpacing: -0.5,
    lineHeight: undefined,
  },
  tagline: {
    marginTop: 1,
    fontWeight: '400',
  },
});

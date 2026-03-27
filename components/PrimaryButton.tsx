import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, ViewStyle } from 'react-native';
import { Colors, Radius, Spacing } from '@/constants/Colors';

interface PrimaryButtonProps {
  title: string;
  onPress?: () => void;
  loading?: boolean;
  disabled?: boolean;
  variant?: 'primary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  style?: ViewStyle;
}

export function PrimaryButton({
  title,
  onPress,
  loading = false,
  disabled = false,
  variant = 'primary',
  size = 'md',
  style,
}: PrimaryButtonProps) {
  const sizeStyles = {
    sm: { paddingVertical: Spacing.sm, paddingHorizontal: Spacing.lg, fontSize: 13 },
    md: { paddingVertical: Spacing.md, paddingHorizontal: Spacing.xxl, fontSize: 15 },
    lg: { paddingVertical: Spacing.lg, paddingHorizontal: Spacing.xxxl, fontSize: 16 },
  };

  const variantStyles = {
    primary: { bg: Colors.primary, text: Colors.white, border: Colors.primary },
    outline: { bg: 'transparent', text: Colors.primary, border: Colors.primary },
    ghost: { bg: Colors.primaryBg, text: Colors.primary, border: 'transparent' },
  };

  const s = sizeStyles[size];
  const v = variantStyles[variant];

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
      style={[
        styles.button,
        {
          backgroundColor: v.bg,
          borderColor: v.border,
          paddingVertical: s.paddingVertical,
          paddingHorizontal: s.paddingHorizontal,
          opacity: disabled ? 0.5 : 1,
        },
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={v.text} size="small" />
      ) : (
        <Text style={[styles.text, { color: v.text, fontSize: s.fontSize }]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: Radius.md,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  text: {
    fontWeight: '700',
    letterSpacing: 0.3,
  },
});

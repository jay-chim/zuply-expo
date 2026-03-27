import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  return (
    <>
      <StatusBar style="dark" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="formula"
          options={{
            headerShown: true,
            headerTitle: '我的配方',
            headerTintColor: '#0D9488',
            headerStyle: { backgroundColor: '#FAFCFC' },
            headerShadowVisible: false,
          }}
        />
        <Stack.Screen
          name="cart"
          options={{
            headerShown: true,
            headerTitle: '購物車',
            headerTintColor: '#0D9488',
            headerStyle: { backgroundColor: '#FAFCFC' },
            headerShadowVisible: false,
          }}
        />
        <Stack.Screen
          name="order-status"
          options={{
            headerShown: true,
            headerTitle: '訂單追蹤',
            headerTintColor: '#0D9488',
            headerStyle: { backgroundColor: '#FAFCFC' },
            headerShadowVisible: false,
          }}
        />
      </Stack>
    </>
  );
}

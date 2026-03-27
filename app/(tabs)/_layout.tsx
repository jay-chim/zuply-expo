import { Tabs } from 'expo-router';
import { View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';

type IoniconsName = React.ComponentProps<typeof Ionicons>['name'];

function TabBarIcon({
  name,
  color,
  focused,
}: {
  name: IoniconsName;
  color: string;
  focused: boolean;
}) {
  return (
    <View style={[styles.iconWrapper, focused && styles.iconWrapperActive]}>
      <Ionicons name={name} size={22} color={color} />
    </View>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.gray400,
        tabBarStyle: {
          backgroundColor: Colors.white,
          borderTopColor: Colors.border,
          borderTopWidth: 1,
          height: 80,
          paddingBottom: 16,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
          marginTop: 2,
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: '首頁',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="questionnaire"
        options={{
          title: '問卷',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'clipboard' : 'clipboard-outline'} color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="orders"
        options={{
          title: '訂單',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'cube' : 'cube-outline'} color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: '個人中心',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'person' : 'person-outline'} color={color} focused={focused} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  iconWrapper: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  iconWrapperActive: {
    backgroundColor: Colors.primaryBg,
  },
});

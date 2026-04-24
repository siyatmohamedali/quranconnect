import BottomDock from '@/components/BottomDock';
import { useAuth } from '@clerk/clerk-expo';
import { MaterialIcons } from '@expo/vector-icons';
import { Tabs, usePathname, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const COLORS = {
  surface: '#0f1413',       // Deep Emerald Base
  onSurface: '#dfe3e1',     // Soft White Text
  primary: '#5bdcb0',       // Mint Emerald
  border: '#24302e',        // Sidebar Border
  active: '#1a2120',        // Active Item Background
};

export default function TabLayout() {
  const router = useRouter();
  const pathname = usePathname();
  const insets = useSafeAreaInsets();
  const { signOut } = useAuth();
  
  // Foldable State
  const [isCollapsed, setIsCollapsed] = useState(false);

  const getActiveTab = () => {
    if (pathname.includes('/profile')) return 'profile';
    if (pathname.includes('/chat')) return 'chat';
    if (pathname.includes('/matches')) return 'matches';
    return 'home';
  };

  const isWeb = Platform.OS === 'web';
  const activeTab = getActiveTab();

  const menuItems = [
    { id: 'home', icon: 'dashboard' as const, label: 'Dashboard', path: '/(tabs)' },
    { id: 'matches', icon: 'people' as const, label: 'Community', path: '/(tabs)/matches' },
    { id: 'chat', icon: 'chat' as const, label: 'Messages', path: '/(tabs)/chat' },
    { id: 'profile', icon: 'person' as const, label: 'Profile', path: '/(tabs)/profile' },
  ];

  // SIDEBAR COMPONENT FOR WEB
  const Sidebar = () => (
    <View style={[styles.sidebar, isCollapsed && styles.sidebarCollapsed]}>
      <View>
        {/* Toggle Button */}
        <Pressable 
          onPress={() => setIsCollapsed(!isCollapsed)}
          style={[styles.toggleBtn, isCollapsed && { alignSelf: 'center' }]}
        >
          <MaterialIcons 
            name={isCollapsed ? "menu" : "menu-open"} 
            size={24} 
            color={COLORS.primary} 
          />
        </Pressable>

        <View style={[styles.logoContainer, isCollapsed && { alignItems: 'center' }]}>
          <Text style={styles.logoText}>{isCollapsed ? "Q" : "QuranMatch"}</Text>
          {!isCollapsed && <Text style={styles.logoSubtext}>DIGITAL SANCTUARY</Text>}
        </View>

        <View style={styles.menuContainer}>
          {menuItems.map((item) => (
            <Pressable
              key={item.id}
              onPress={() => router.push(item.path as any)}
              style={[
                styles.menuItem,
                activeTab === item.id && styles.menuItemActive,
                isCollapsed && { justifyContent: 'center' }
              ]}
            >
              <MaterialIcons 
                name={item.icon as any} 
                size={22} 
                color={activeTab === item.id ? COLORS.primary : COLORS.onSurface} 
              />
              {!isCollapsed && (
                <Text style={[
                  styles.menuLabel, 
                  activeTab === item.id && styles.menuLabelActive
                ]}>
                  {item.label}
                </Text>
              )}
            </Pressable>
          ))}
        </View>
      </View>

      <Pressable 
        onPress={() => signOut()} 
        style={[styles.signOutWeb, isCollapsed && { justifyContent: 'center' }]}
      >
        <MaterialIcons name="logout" size={20} color={COLORS.onSurface} />
        {!isCollapsed && <Text style={styles.menuLabel}>Sign Out</Text>}
      </Pressable>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={isWeb ? styles.webLayout : { flex: 1 }}>
        {isWeb && <Sidebar />}
        
        <View style={styles.contentArea}>
          <Tabs 
            screenOptions={{
              headerShown: false,
              tabBarStyle: { display: 'none' },
            }}
          >
            <Tabs.Screen name="index" />
            <Tabs.Screen name="chat" />
            <Tabs.Screen name="matches" />
            <Tabs.Screen name="profile" />
          </Tabs>
        </View>
      </View>
      
      {!isWeb && (
        <View style={[styles.mobileDockContainer, { paddingBottom: insets.bottom || 20 }]}>
          <BottomDock 
            items={menuItems.map(i => ({ ...i, onPress: () => router.push(i.path as any) }))} 
            activeTab={activeTab} 
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.surface,
  },
  webLayout: {
    flex: 1,
    flexDirection: 'row',
  },
  sidebar: {
    width: 260,
    backgroundColor: COLORS.surface,
    borderRightWidth: 1,
    borderRightColor: COLORS.border,
    padding: 24,
    justifyContent: 'space-between',
    // @ts-ignore - Smooth width transition for web
    transition: 'width 0.3s ease',
  },
  sidebarCollapsed: {
    width: 80,
    paddingHorizontal: 12,
  },
  toggleBtn: {
    alignSelf: 'flex-end',
    marginBottom: 20,
    padding: 4,
  },
  contentArea: {
    flex: 1,
  },
  logoContainer: {
    marginBottom: 40,
  },
  logoText: {
    color: COLORS.primary,
    fontSize: 22,
    fontWeight: 'bold',
  },
  logoSubtext: {
    color: COLORS.onSurface,
    fontSize: 10,
    letterSpacing: 1,
    opacity: 0.6,
  },
  menuContainer: {
    flex: 1,
    gap: 8,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    gap: 12,
  },
  menuItemActive: {
    backgroundColor: COLORS.active,
  },
  menuLabel: {
    color: COLORS.onSurface,
    fontSize: 15,
    fontWeight: '500',
  },
  menuLabelActive: {
    color: COLORS.primary,
  },
  signOutWeb: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 12,
    opacity: 0.8,
  },
  mobileDockContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  }
});
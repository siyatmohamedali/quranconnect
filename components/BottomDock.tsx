import { MaterialIcons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import React from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// THE LUMINOUS SCHOLAR COLOR TOKENS
const COLORS = {
  surface: '#0f1413',               // Deep Emerald Base
  onSurface: '#dfe3e1',             // Soft White Text
  onSurfaceVariant: '#bfc9c4',      // Muted Scholar Text
  primary: '#5bdcb0',               // Mint Emerald
  primaryContainer: '#004b38',      // Dark Forest
  surfaceContainerLow: 'rgba(24, 29, 27, 0.85)', // Dock Background
};

type DockItem = {
  id: string;
  icon: keyof typeof MaterialIcons.glyphMap;
  label: string;
  onPress: () => void;
};

type BottomDockProps = {
  items: DockItem[];
  activeTab: string;
};

export default function BottomDock({ items, activeTab }: BottomDockProps) {
  return (
    <View style={styles.outerWrapper}>
      {/* Reduced intensity blur to stay lightweight */}
      <BlurView intensity={60} tint="dark" style={styles.dockContainer}>
        {items.map((item) => {
          const isActive = activeTab === item.id;
          const isCenter = item.id === 'match_now' || item.label === 'Match';

          // Special Small Floating Center Button
          if (isCenter) {
            return (
              <TouchableOpacity
                key={item.id}
                onPress={item.onPress}
                activeOpacity={0.9}
                style={styles.centerButton}
              >
                <MaterialIcons name="mic" size={24} color={COLORS.primaryContainer} />
              </TouchableOpacity>
            );
          }

          return (
            <TouchableOpacity
              key={item.id}
              style={styles.dockItem}
              onPress={item.onPress}
              activeOpacity={0.7}
            >
              <MaterialIcons
                name={item.icon}
                size={20} // Reduced size
                color={isActive ? COLORS.primary : COLORS.onSurfaceVariant}
              />
              <Text style={[styles.label, isActive && styles.labelActive]}>
                {item.label.toUpperCase()}
              </Text>
              {isActive && <View style={styles.activeDot} />}
            </TouchableOpacity>
          );
        })}
      </BlurView>
    </View>
  );
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  outerWrapper: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 4, // Minimal padding to prevent hiding content
  },
  dockContainer: {
    flexDirection: 'row',
    backgroundColor: COLORS.surfaceContainerLow,
    width: width * 0.9, // Slightly narrower
    height: 60, // Significantly reduced from your previous height
    borderRadius: 30,
    paddingHorizontal: 12,
    justifyContent: 'space-around',
    alignItems: 'center',
    overflow: 'hidden',
    // Minimal shadow to keep it "Luminous" rather than "Heavy"
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  dockItem: {
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 50,
  },
  centerButton: {
    backgroundColor: COLORS.primary,
    width: 48, // Reduced size
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -28, // Lifts it just enough to be a focal point
    borderWidth: 3,
    borderColor: COLORS.surface,
  },
  label: {
    fontSize: 8, // Very small, elegant typography
    color: COLORS.onSurfaceVariant,
    fontWeight: '800',
    marginTop: 2,
    letterSpacing: 1,
  },
  labelActive: {
    color: COLORS.primary,
  },
  activeDot: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: COLORS.primary,
    marginTop: 2,
  }
});
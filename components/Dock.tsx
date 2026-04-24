import { colors } from '@/constants/theme';
import { MotiView } from 'moti';
import React, { useState } from 'react';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';

export type DockItemData = {
  icon: React.ReactNode;
  label: string;
  onPress: () => void;
};

type DockProps = {
  items: DockItemData[];
  panelHeight?: number;
  baseItemSize?: number;
  magnification?: number;
};

type DockItemProps = {
  item: DockItemData;
  baseItemSize: number;
  magnification: number;
  isActive?: boolean;
};

function DockItem({ item, baseItemSize, magnification, isActive }: DockItemProps) {
  const [isHovered, setIsHovered] = useState(false);
  const size = isHovered ? magnification : baseItemSize;

  return (
    <View style={styles.itemContainer}>
      {isHovered && (
        <MotiView
          from={{ opacity: 0, translateY: 0 }}
          animate={{ opacity: 1, translateY: -10 }}
          exit={{ opacity: 0, translateY: 0 }}
          transition={{ type: 'timing', duration: 200 }}
          style={styles.labelContainer}
        >
          <Text style={styles.labelText}>{item.label}</Text>
        </MotiView>
      )}
      
      <Pressable
        onPress={item.onPress}
        onPressIn={() => setIsHovered(true)}
        onPressOut={() => setIsHovered(false)}
        style={({ pressed }) => [
          styles.itemButton,
          {
            width: size,
            height: size,
          },
          isActive && styles.itemActive,
          pressed && styles.itemPressed,
        ]}
      >
        {item.icon}
      </Pressable>
    </View>
  );
}

export default function Dock({
  items,
  panelHeight = 68,
  baseItemSize = 50,
  magnification = 70,
}: DockProps) {
  return (
    <View style={[styles.container, { height: panelHeight }]}>
      <View style={styles.dock}>
        {items.map((item, index) => (
          <DockItem
            key={index}
            item={item}
            baseItemSize={baseItemSize}
            magnification={magnification}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 8,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      web: {
        pointerEvents: 'box-none',
      },
    }),
  },
  dock: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 16,
    backgroundColor: colors.surface,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: colors.border,
    paddingHorizontal: 16,
    paddingBottom: 8,
    paddingTop: 8,
  },
  itemContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemButton: {
    borderRadius: 16,
    backgroundColor: colors.surface,
    borderWidth: 2,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemActive: {
    backgroundColor: colors.primary,
    borderColor: colors.black,
  },
  itemPressed: {
    opacity: 0.7,
  },
  labelContainer: {
    position: 'absolute',
    top: -32,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    zIndex: 10,
  },
  labelText: {
    color: colors.text,
    fontSize: 12,
    fontWeight: '600',
  },
});

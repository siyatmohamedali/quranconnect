import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { ActivityIndicator, Modal, Pressable, StyleSheet, Text, View } from 'react-native';

const COLORS = {
  surface: '#0f1413',
  onSurface: '#dfe3e1',
  primary: '#5bdcb0',
  primaryContainer: '#004b38',
  secondary: '#e9c349',
  surfaceContainer: '#1c211f',
};

interface MatchingModalProps {
  visible: boolean;
  onCancel: () => void;
}

export default function MatchingModal({ visible, onCancel }: MatchingModalProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onCancel}
    >
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <View style={styles.iconContainer}>
            <MaterialCommunityIcons name="account-search" size={60} color={COLORS.primary} />
          </View>
          
          <Text style={styles.title}>Finding Your Match</Text>
          <Text style={styles.subtitle}>Searching for a recitation partner...</Text>
          
          <ActivityIndicator size="large" color={COLORS.primary} style={styles.spinner} />
          
          <Pressable style={styles.cancelButton} onPress={onCancel}>
            <Text style={styles.cancelText}>Cancel</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: COLORS.surfaceContainer,
    borderRadius: 32,
    padding: 40,
    alignItems: 'center',
    width: 400,
    maxWidth: '90%',
  },
  iconContainer: {
    marginBottom: 24,
  },
  title: {
    color: COLORS.onSurface,
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 8,
  },
  subtitle: {
    color: COLORS.primary,
    fontSize: 14,
    marginBottom: 32,
  },
  spinner: {
    marginBottom: 32,
  },
  cancelButton: {
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  cancelText: {
    color: COLORS.primary,
    fontWeight: '700',
    fontSize: 14,
  },
});

import { useAuth, useUser } from '@clerk/clerk-expo';
import { MaterialIcons } from '@expo/vector-icons';
import { useMutation, useQuery } from "convex/react";
import { useRouter } from 'expo-router';
import React from 'react';
import { Alert, Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { api } from "../../convex/_generated/api";

const THEME = {
  background: '#0f1413', 
  surface: '#1a2120',    
  primary: '#5bdcb0',    // Matching your Web Dashboard Mint
  text: '#FFFFFF',
  textMuted: '#88999e',
  border: '#24302e',
};

export default function ProfileScreen() {
  const { signOut } = useAuth();
  const { user: clerkUser } = useUser();
  const router = useRouter();

  const convexUser = useQuery(api.users.currentUser);
  const updateGender = useMutation(api.users.updateGender);

  const isWeb = Platform.OS === 'web';

  const selectGender = async (gender: "male" | "female") => {
    try {
      await updateGender({ gender });
      if (!isWeb) Alert.alert("Success", "Identity updated");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.outerContainer}>
      <ScrollView 
        style={styles.container} 
        contentContainerStyle={[styles.scrollContent, isWeb && styles.webScrollContent]}
      >
        {/* PROFILE HEADER */}
        <View style={styles.header}>
          <View style={styles.avatarContainer}>
            <MaterialIcons name="person" size={isWeb ? 80 : 60} color={THEME.text} />
          </View>
          <Text style={styles.name}>{clerkUser?.firstName || 'Scholar'}</Text>
          <Text style={styles.email}>{clerkUser?.emailAddresses[0]?.emailAddress}</Text>
        </View>

        {/* IDENTITY SECTION */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Identity Verification</Text>
          <View style={styles.genderContainer}>
            <Pressable 
              onPress={() => selectGender("male")}
              style={[styles.genderButton, convexUser?.gender === "male" && styles.genderButtonActive]}
            >
              <MaterialIcons name="face" size={24} color={convexUser?.gender === "male" ? THEME.background : THEME.text} />
              <Text style={[styles.genderText, convexUser?.gender === "male" && styles.genderTextActive]}>BROTHER</Text>
            </Pressable>

            <Pressable 
              onPress={() => selectGender("female")}
              style={[styles.genderButton, convexUser?.gender === "female" && styles.genderButtonActive]}
            >
              <MaterialIcons name="face-retouching-natural" size={24} color={convexUser?.gender === "female" ? THEME.background : THEME.text} />
              <Text style={[styles.genderText, convexUser?.gender === "female" && styles.genderTextActive]}>SISTER</Text>
            </Pressable>
          </View>
        </View>

        {/* SETTINGS LIST */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account Settings</Text>
          <View style={styles.card}>
            <MenuOption icon="settings" label="System Preferences" />
            <MenuOption icon="security" label="Privacy & Safety" />
            <MenuOption icon="help-outline" label="Sanctuary Support" />
          </View>
        </View>

        {/* SIGN OUT (Only shown on mobile, since Web has it in Sidebar/Header) */}
        {!isWeb && (
          <View style={styles.section}>
            <Pressable style={styles.signOutButton} onPress={() => signOut()}>
              <Text style={styles.signOutText}>Sign Out</Text>
            </Pressable>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

function MenuOption({ icon, label }: { icon: any, label: string }) {
  return (
    <Pressable style={styles.menuItem}>
      <MaterialIcons name={icon} size={22} color={THEME.textMuted} />
      <Text style={styles.menuText}>{label}</Text>
      <MaterialIcons name="chevron-right" size={20} color={THEME.border} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: THEME.background,
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  webScrollContent: {
    maxWidth: 800,
    alignSelf: 'center',
    width: '100%',
    paddingTop: 40,
  },
  header: {
    alignItems: 'center',
    paddingVertical: 40,
    marginBottom: 20,
  },
  avatarContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: THEME.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  name: {
    fontSize: 28,
    fontWeight: '800',
    color: THEME.text,
    letterSpacing: -0.5,
  },
  email: {
    fontSize: 14,
    color: THEME.textMuted,
    marginTop: 4,
  },
  section: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: THEME.primary,
    textTransform: 'uppercase',
    marginBottom: 16,
    letterSpacing: 1.5,
  },
  genderContainer: {
    flexDirection: 'row',
    gap: 16,
  },
  genderButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: THEME.surface,
    paddingVertical: 18,
    borderRadius: 16,
    gap: 10,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  genderButtonActive: {
    backgroundColor: THEME.primary,
    borderColor: THEME.primary,
  },
  genderText: {
    color: THEME.text,
    fontWeight: '700',
    fontSize: 14,
  },
  genderTextActive: {
    color: THEME.background,
  },
  card: {
    backgroundColor: THEME.surface,
    borderRadius: 20,
    padding: 8,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 12,
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    color: THEME.text,
  },
  signOutButton: {
    padding: 18,
    borderRadius: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ff4444',
  },
  signOutText: {
    color: '#ff4444',
    fontWeight: '700',
  }
});
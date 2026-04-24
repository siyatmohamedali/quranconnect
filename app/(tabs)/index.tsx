import { useUser } from '@clerk/clerk-expo';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// --- CONVEX IMPORTS ---
import { useMutation, useQuery } from "convex/react";
import MatchingModal from "../../components/MatchingModal";
import { api } from "../../convex/_generated/api";

const { width } = Dimensions.get('window');

const COLORS = {
  surface: '#0f1413',
  onSurface: '#dfe3e1',
  onSurfaceVariant: '#bfc9c4',
  primary: '#5bdcb0',
  primaryContainer: '#004b38',
  secondary: '#e9c349',
  surfaceContainerLow: '#181d1b',
  surfaceContainerHigh: '#262b2a',
  outlineVariant: 'rgba(137, 147, 143, 0.1)', 
};

export default function HomeScreen() {
  const { user } = useUser();
  const insets = useSafeAreaInsets();
  const router = useRouter(); 
  
  const [showMatching, setShowMatching] = useState(false);
  
  const currentUserDoc = useQuery(api.users.currentUser);

  const enterQueue = useMutation(api.matching.enterQueue);
  const leaveQueue = useMutation(api.matching.leaveQueue);

  // Only check for matches if we have a valid userId (skip otherwise)
  const activeMatch = useQuery(
    api.matching.checkMatch, 
    currentUserDoc?._id ? { userId: currentUserDoc._id } : "skip"
  );

  // NAVIGATION TRIGGER: Using the Href Object to solve Type errors
  useEffect(() => {
    if (activeMatch && showMatching) {
      setShowMatching(false);
      
      // Navigate using object syntax for Typed Routes compatibility
      router.push({
        pathname: "/call/[room]",
        params: { room: activeMatch.channelName }
      });
    }
  }, [activeMatch, showMatching]);

  const handleStartMatching = async () => {
    if (!currentUserDoc?._id) {
        Alert.alert("Profile Incomplete", "Ensure your profile is set up before matching.");
        return;
    }
    
    try {
      setShowMatching(true);
      await enterQueue({ 
        userId: currentUserDoc._id, 
        gender: currentUserDoc.gender as "male" | "female"
      });
    } catch (error) {
      setShowMatching(false);
      Alert.alert("Error", "Could not join the queue.");
    }
  };

  const handleCancelMatching = async () => {
    if (!currentUserDoc?._id) return;
    setShowMatching(false);
    await leaveQueue({ userId: currentUserDoc._id });
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.welcomeLabel}>WELCOME BACK,</Text>
          <Text style={styles.userName}>{user?.firstName || 'Scholar'}</Text>
        </View>

        <View style={styles.heroCard}>
          <MaterialCommunityIcons name="book-open-variant" size={width * 0.5} color="rgba(91, 220, 176, 0.03)" style={styles.bgIcon} />
          <View style={styles.heroContent}>
            <Text style={styles.heroTagline}>Your soul's resonance is waiting.</Text>
            <Text style={styles.heroDescription}>Join a live recitation match and find the rhythm that speaks to your heart.</Text>
            <TouchableOpacity activeOpacity={0.8} style={styles.findButton} onPress={handleStartMatching}>
              <MaterialCommunityIcons name="microphone" size={22} color={COLORS.primaryContainer} />
              <Text style={styles.findButtonText}>START MATCHING</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.quickStats}>
            <Text style={styles.sectionTitle}>SPIRITUAL PROGRESS</Text>
            <View style={styles.statsRow}>
                <View style={styles.miniCard}>
                    <View style={styles.miniIconRow}>
                      <MaterialCommunityIcons name="fire" size={16} color={COLORS.secondary} />
                      <Text style={styles.miniLabel}>STREAK</Text>
                    </View>
                    <Text style={styles.miniValue}>7 Days</Text>
                </View>
                <View style={styles.miniCard}>
                   <View style={styles.miniIconRow}>
                      <MaterialCommunityIcons name="medal" size={16} color={COLORS.primary} />
                      <Text style={styles.miniLabel}>LEVEL</Text>
                    </View>
                    <Text style={styles.miniValue}>Scholar</Text>
                </View>
            </View>
        </View>

        <View style={styles.recentSection}>
            <Text style={styles.sectionTitle}>RECENT SESSIONS</Text>
            <View style={styles.activityItem}>
              <View style={styles.avatarPlaceholder} />
              <View style={{ flex: 1 }}>
                <Text style={styles.activityName}>Amina Al-Farsi</Text>
                <Text style={styles.activityDetail}>Surah Maryam • 14m ago</Text>
              </View>
              <Text style={styles.matchText}>98%</Text>
            </View>
        </View>
      </ScrollView>

      <MatchingModal visible={showMatching} onCancel={handleCancelMatching} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.surface },
  scrollContent: { padding: 24, paddingBottom: 140 },
  header: { marginBottom: 40, marginTop: 20 },
  welcomeLabel: { fontSize: 12, color: COLORS.primary, fontWeight: '800', letterSpacing: 3 },
  userName: { fontSize: 36, color: COLORS.onSurface, fontWeight: '800', marginTop: 4, letterSpacing: -1 },
  heroCard: { backgroundColor: COLORS.primaryContainer, borderRadius: 32, padding: 28, minHeight: 340, overflow: 'hidden', justifyContent: 'flex-end' },
  bgIcon: { position: 'absolute', top: -40, right: -40 },
  heroContent: { zIndex: 2 },
  heroTagline: { color: COLORS.onSurface, fontSize: 28, fontWeight: '800', lineHeight: 34, marginBottom: 12 },
  heroDescription: { color: COLORS.onSurfaceVariant, fontSize: 15, lineHeight: 22, marginBottom: 28, opacity: 0.9 },
  findButton: { backgroundColor: COLORS.primary, flexDirection: 'row', height: 64, borderRadius: 99, justifyContent: 'center', alignItems: 'center', gap: 12 },
  findButtonText: { color: COLORS.primaryContainer, fontSize: 16, fontWeight: '800', letterSpacing: 1 },
  quickStats: { marginTop: 40 },
  sectionTitle: { color: COLORS.onSurfaceVariant, fontSize: 11, fontWeight: '800', marginBottom: 20, letterSpacing: 2 },
  statsRow: { flexDirection: 'row', gap: 16 },
  miniCard: { flex: 1, backgroundColor: COLORS.surfaceContainerLow, padding: 20, borderRadius: 24 },
  miniIconRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 8 },
  miniLabel: { color: COLORS.onSurfaceVariant, fontSize: 10, fontWeight: '700' },
  miniValue: { color: COLORS.onSurface, fontSize: 20, fontWeight: '800' },
  recentSection: { marginTop: 40 },
  activityItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.surfaceContainerLow, padding: 16, borderRadius: 24, gap: 16 },
  avatarPlaceholder: { width: 48, height: 48, borderRadius: 24, backgroundColor: COLORS.surfaceContainerHigh },
  activityName: { color: COLORS.onSurface, fontWeight: '700', fontSize: 15 },
  activityDetail: { color: COLORS.onSurfaceVariant, fontSize: 12 },
  matchText: { color: COLORS.secondary, fontWeight: '800', fontSize: 14 }
});
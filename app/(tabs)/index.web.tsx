import { useUser } from '@clerk/clerk-expo';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useMutation, useQuery } from "convex/react";
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

// --- COMPONENTS & API ---
import MatchingModal from "../../components/MatchingModal";
import { api } from "../../convex/_generated/api";

const COLORS = {
  surface: '#0f1413',
  onSurface: '#dfe3e1',
  onSurfaceVariant: '#bfc9c4',
  primary: '#5bdcb0',
  primaryContainer: '#004b38',
  secondary: '#e9c349',
  surfaceContainerLow: '#181d1b',
  surfaceContainer: '#1c211f',
  surfaceContainerHigh: '#262b2a',
  surfaceContainerHighest: '#313634',
};

export default function WebDashboard() {
  const { user } = useUser();
  const router = useRouter();
  
  // --- CONVEX HOOKS ---
  const currentUser = useQuery(api.users.currentUser);
  const enterQueue = useMutation(api.matching.enterQueue);
  const leaveQueue = useMutation(api.matching.leaveQueue);

  // --- UI STATE ---
  const [showMatching, setShowMatching] = useState(false);

  // --- MATCH WATCHER ---
  const activeMatch = useQuery(api.matching.checkMatch, { 
    userId: currentUser?._id ?? ('' as any) 
  });

  // NAVIGATION TRIGGER: Using Href Object for Typed Route compatibility
  useEffect(() => {
    if (activeMatch && showMatching) {
      setShowMatching(false);
      
      router.push({
        pathname: "/call/[room]",
        params: { room: activeMatch.channelName }
      });
    }
  }, [activeMatch, showMatching]);

  const handleStartMatching = async () => {
    if (!currentUser?._id) return;
    
    if (!currentUser.gender) {
      alert("Please visit your Profile and select your gender to ensure a respectful matching experience.");
      return;
    }

    try {
      setShowMatching(true);
      await enterQueue({ 
        userId: currentUser._id, 
        gender: currentUser.gender as "male" | "female" 
      });
    } catch (error) {
      console.error("Failed to start matching:", error);
      setShowMatching(false);
    }
  };

  const handleCancelMatching = async () => {
    if (!currentUser?._id) return;
    setShowMatching(false);
    await leaveQueue({ userId: currentUser._id });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerBreadcrumb}>
          <Text style={styles.breadcrumbActive}>Main Dashboard</Text>
        </View>

        <View style={styles.headerActions}>
          <View style={styles.searchBar}>
            <MaterialCommunityIcons name="magnify" size={18} color={COLORS.onSurfaceVariant} />
            <TextInput 
              placeholder="Search reciters..." 
              placeholderTextColor={COLORS.onSurfaceVariant}
              style={styles.searchInput}
            />
          </View>
          <MaterialCommunityIcons name="bell-outline" size={24} color={COLORS.onSurfaceVariant} />
          
          <View style={styles.userAvatar}>
            <Text style={styles.userInitial}>
              {user?.firstName?.[0] || user?.emailAddresses[0]?.emailAddress[0] || 'U'}
            </Text>
          </View>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.heroBanner}>
          <View style={styles.heroText}>
            <Text style={styles.heroTag}>WELCOME BACK</Text>
            <Text style={styles.heroTitle}>Your soul's resonance is waiting.</Text>
            <Text style={styles.heroSub}>Continue your journey of spiritual connection. Find the rhythm that speaks to your heart.</Text>
            
            <Pressable 
              style={({ pressed }) => [styles.heroBtn, pressed && { opacity: 0.8 }]} 
              onPress={handleStartMatching}
            >
              <MaterialCommunityIcons name="microphone" size={20} color={COLORS.primaryContainer} />
              <Text style={styles.heroBtnText}>Start Recitation Match</Text>
            </Pressable>
          </View>
          <View style={styles.heroImageFrame} />
        </View>

        <View style={styles.grid}>
          <View style={styles.leftCol}>
            <View style={styles.progressCard}>
              <Text style={styles.cardTitle}>Daily Progress</Text>
              <View style={styles.medallionContainer}>
                <View style={styles.medallionCircle}>
                  <Text style={styles.medallionPercent}>75%</Text>
                  <Text style={styles.medallionLabel}>GOAL</Text>
                </View>
              </View>
              <View style={styles.streakBadge}>
                <MaterialCommunityIcons name="fire" size={18} color={COLORS.secondary} />
                <Text style={styles.streakText}>5 Day Streak</Text>
              </View>
            </View>

            <View style={styles.challengesCard}>
              <Text style={styles.cardTitle}>Upcoming Challenges</Text>
              <ChallengeItem type="Hifz Mastery" title="Surah Al-Mulk Marathon" time="TOMORROW" />
              <ChallengeItem type="Tajweed Focus" title="Qalqalah Precision" time="IN 3 DAYS" />
            </View>
          </View>

          <View style={styles.rightCol}>
            <View style={styles.sessionsCard}>
              <View style={styles.cardHeaderRow}>
                <Text style={styles.cardTitle}>Recent Sessions</Text>
                <Pressable><Text style={styles.viewHistoryText}>View History →</Text></Pressable>
              </View>
              <SessionItem name="Amina Al-Farsi" detail="Surah Maryam • 14m ago" match="98%" />
              <SessionItem name="Zaid Ibrahim" detail="Surah Al-Kahf • 2h ago" match="92%" />
            </View>

            <View style={styles.communityCard}>
              <Text style={styles.cardTitle}>Community Recommendations</Text>
              <View style={styles.recRow}>
                <RecCard name="Yusuf Mansoor" tag="Nahawand" />
                <RecCard name="Sara Al-Hakim" tag="Warsh" />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      <MatchingModal 
        visible={showMatching} 
        onCancel={handleCancelMatching} 
      />
    </View>
  );
}

const ChallengeItem = ({ type, title, time }: any) => (
  <View style={styles.challengeItem}>
    <View style={styles.challengeHeader}>
      <Text style={styles.challengeType}>{type}</Text>
      <Text style={styles.challengeTime}>{time}</Text>
    </View>
    <Text style={styles.challengeTitle}>{title}</Text>
  </View>
);

const SessionItem = ({ name, detail, match }: any) => (
  <View style={styles.sessionItem}>
    <View style={styles.sessionLeft}>
      <View style={styles.avatarMini} />
      <View>
        <Text style={styles.sessionName}>{name}</Text>
        <Text style={styles.sessionDetail}>{detail}</Text>
      </View>
    </View>
    <View style={styles.waveformPlaceholder} />
    <Text style={styles.matchText}>Match: {match}</Text>
  </View>
);

const RecCard = ({ name, tag }: any) => (
  <View style={styles.recCard}>
    <View style={styles.recAvatar} />
    <Text style={styles.recName}>{name}</Text>
    <View style={styles.recTag}><Text style={styles.recTagText}>{tag}</Text></View>
    <Pressable style={styles.recBtn}><Text style={styles.recBtnText}>Match</Text></Pressable>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.surface },
  header: { 
    height: 80, 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    paddingHorizontal: 40,
    backgroundColor: COLORS.surface,
  },
  headerBreadcrumb: { flexDirection: 'row', gap: 24 },
  breadcrumbActive: { color: COLORS.primary, fontWeight: '700', fontSize: 18 },
  headerActions: { flexDirection: 'row', alignItems: 'center', gap: 24 },
  searchBar: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: COLORS.surfaceContainerLow, 
    paddingHorizontal: 16, 
    height: 40, 
    borderRadius: 99,
    width: 240,
  },
  searchInput: { flex: 1, marginLeft: 8, color: COLORS.onSurface, fontSize: 13, outlineStyle: 'none' as any },
  scrollContainer: { padding: 40 },
  heroBanner: { 
    backgroundColor: COLORS.primaryContainer, 
    borderRadius: 32, 
    padding: 48, 
    flexDirection: 'row', 
    marginBottom: 40,
    overflow: 'hidden'
  },
  heroText: { flex: 1, justifyContent: 'center' },
  heroTag: { color: COLORS.secondary, fontWeight: '800', letterSpacing: 2, fontSize: 10, marginBottom: 12 },
  heroTitle: { color: COLORS.onSurface, fontSize: 42, fontWeight: '800', marginBottom: 16 },
  heroSub: { color: COLORS.onSurfaceVariant, fontSize: 18, lineHeight: 28, marginBottom: 32, maxWidth: 500 },
  heroBtn: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: COLORS.primary, 
    alignSelf: 'flex-start', 
    paddingHorizontal: 28, 
    paddingVertical: 14, 
    borderRadius: 99, 
    gap: 10 
  },
  heroBtnText: { color: COLORS.primaryContainer, fontWeight: '800', fontSize: 16 },
  heroImageFrame: { width: 300, height: 300, backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: 24, transform: [{ rotate: '5deg' }] },
  grid: { flexDirection: 'row', gap: 32 },
  leftCol: { flex: 1, gap: 32 },
  rightCol: { flex: 2, gap: 32 },
  cardTitle: { color: COLORS.onSurface, fontSize: 18, fontWeight: '700', marginBottom: 24 },
  progressCard: { backgroundColor: COLORS.surfaceContainerLow, padding: 32, borderRadius: 32, alignItems: 'center' },
  medallionContainer: { marginVertical: 20 },
  medallionCircle: { 
    width: 160, 
    height: 160, 
    borderRadius: 80, 
    borderWidth: 8, 
    borderColor: COLORS.primary, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  medallionPercent: { color: COLORS.onSurface, fontSize: 32, fontWeight: '900' },
  medallionLabel: { color: COLORS.onSurfaceVariant, fontSize: 10, letterSpacing: 2 },
  streakBadge: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: COLORS.surfaceContainerHighest, 
    padding: 12, 
    borderRadius: 16, 
    width: '100%', 
    justifyContent: 'center',
    gap: 8
  },
  streakText: { color: COLORS.onSurface, fontWeight: '700' },
  challengesCard: { backgroundColor: COLORS.surfaceContainerLow, padding: 32, borderRadius: 32 },
  challengeItem: { backgroundColor: COLORS.surfaceContainer, padding: 20, borderRadius: 20, marginBottom: 12 },
  challengeHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  challengeType: { color: COLORS.secondary, fontSize: 10, fontWeight: '800' },
  challengeTime: { color: COLORS.onSurfaceVariant, fontSize: 10 },
  challengeTitle: { color: COLORS.onSurface, fontWeight: '700' },
  sessionsCard: { backgroundColor: COLORS.surfaceContainerLow, padding: 32, borderRadius: 32 },
  cardHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  viewHistoryText: { color: COLORS.primary, fontSize: 14, fontWeight: '700' },
  sessionItem: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingVertical: 16, 
    borderBottomWidth: 1, 
    borderBottomColor: 'rgba(255,255,255,0.05)' 
  },
  sessionLeft: { flexDirection: 'row', gap: 16, alignItems: 'center', flex: 1 },
  avatarMini: { width: 44, height: 44, borderRadius: 22, backgroundColor: COLORS.surfaceContainerHighest },
  sessionName: { color: COLORS.onSurface, fontWeight: '700' },
  sessionDetail: { color: COLORS.onSurfaceVariant, fontSize: 12 },
  waveformPlaceholder: { width: 100, height: 20, backgroundColor: COLORS.primary, opacity: 0.2, borderRadius: 10, marginHorizontal: 20 },
  matchText: { color: COLORS.secondary, fontWeight: '800', fontSize: 12 },
  communityCard: { backgroundColor: COLORS.surfaceContainerLow, padding: 32, borderRadius: 32 },
  recRow: { flexDirection: 'row', gap: 20 },
  recCard: { flex: 1, backgroundColor: COLORS.surfaceContainer, padding: 24, borderRadius: 24, alignItems: 'center' },
  recAvatar: { width: 60, height: 60, borderRadius: 12, backgroundColor: COLORS.surfaceContainerHighest, marginBottom: 16 },
  recName: { color: COLORS.onSurface, fontWeight: '700', marginBottom: 8 },
  recTag: { backgroundColor: COLORS.surfaceContainerHighest, paddingHorizontal: 12, paddingVertical: 4, borderRadius: 99, marginBottom: 16 },
  recTagText: { color: COLORS.onSurfaceVariant, fontSize: 10, fontWeight: '700' },
  recBtn: { backgroundColor: 'rgba(91, 220, 176, 0.1)', paddingVertical: 10, width: '100%', borderRadius: 12, alignItems: 'center' },
  recBtnText: { color: COLORS.primary, fontWeight: '800', fontSize: 12 },
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  userInitial: {
    color: COLORS.primaryContainer,
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});
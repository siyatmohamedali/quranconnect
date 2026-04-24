import { useUser } from '@clerk/clerk-expo';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// --- LIVEKIT & CONVEX ---
import {
  LiveKitRoom,
  RoomAudioRenderer,
  VideoConference
} from '@livekit/components-react';
import { useAction } from "convex/react";
import { api } from "../../convex/_generated/api";

const COLORS = {
  surface: '#0f1413',
  primary: '#5bdcb0',
  onSurface: '#dfe3e1',
  error: '#ff5252'
};

// Replace with your LiveKit Cloud WebSocket URL (starts with wss://)
const LIVEKIT_URL = "wss://quranconnect2-rnj34nvh.livekit.cloud";

export default function CallScreen() {
  const { room } = useLocalSearchParams();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { user } = useUser();
  
  const generateToken = useAction(api.livekit.generateToken);
  const [token, setToken] = useState<string | null>(null);
  const [status, setStatus] = useState('Connecting to Sanctuary...');

  // 1. Fetch the Token from Convex on Mount
  useEffect(() => {
    async function getToken() {
      try {
        const t = await generateToken({
          roomName: room as string,
          firstName: user?.firstName || "Scholar",
        });
        setToken(t);
      } catch (e) {
        console.error("Token generation failed", e);
        setStatus("Connection Failed");
      }
    }
    getToken();
  }, [room]);

  const handleEndCall = () => {
    router.replace('/(tabs)');
  };

  // 2. Loading State while waiting for Token
  if (!token) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text style={styles.statusText}>{status}</Text>
      </View>
    );
  }

  return (
    <LiveKitRoom
      video={true} // Set to true if you want video enabled by default
      audio={true}
      token={token}
      serverUrl={LIVEKIT_URL}
      onDisconnected={handleEndCall}
      onConnected={() => setStatus('Resonance Established')}
      style={{ flex: 1 }}
    >
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <View style={styles.header}>
          <Text style={styles.roomLabel}>RECITATION ROOM</Text>
          <Text style={styles.roomName}>{room}</Text>
        </View>

        <View style={styles.videoGrid}>
          {/* 3. The actual Video/Audio renderer */}
          <View style={styles.remoteView}>
             {/* This handles the automatic audio/video mixing for you */}
             <VideoConference 
                style={{ width: '100%', height: '100%', borderRadius: 32, overflow: 'hidden' }}
             />
          </View>
        </View>

        {/* 4. Controls */}
        <View style={[styles.controls, { paddingBottom: insets.bottom + 20 }]}>
          <TouchableOpacity style={styles.iconBtn}>
            <MaterialCommunityIcons name="microphone" size={28} color={COLORS.onSurface} />
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.iconBtn, styles.endCallBtn]} 
            onPress={handleEndCall}
          >
            <MaterialCommunityIcons name="phone-hangup" size={28} color="white" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.iconBtn}>
            <MaterialCommunityIcons name="video" size={28} color={COLORS.onSurface} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Mandatory for Audio to work on Web/Mobile */}
      <RoomAudioRenderer />
    </LiveKitRoom>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.surface },
  header: { alignItems: 'center', marginTop: 20 },
  roomLabel: { color: COLORS.primary, fontSize: 10, fontWeight: '800', letterSpacing: 2 },
  roomName: { color: COLORS.onSurface, fontSize: 16, opacity: 0.6, marginTop: 4 },
  videoGrid: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  remoteView: { 
    width: '100%', 
    aspectRatio: 3/4, 
    backgroundColor: '#181d1b', 
    borderRadius: 32, 
    justifyContent: 'center', 
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(91, 220, 176, 0.1)',
    overflow: 'hidden'
  },
  statusText: { color: COLORS.onSurface, marginTop: 20, fontSize: 14, opacity: 0.8 },
  controls: { 
    flexDirection: 'row', 
    justifyContent: 'center', 
    gap: 30, 
    alignItems: 'center' 
  },
  iconBtn: { 
    width: 64, 
    height: 64, 
    borderRadius: 32, 
    backgroundColor: '#262b2a', 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  endCallBtn: { backgroundColor: COLORS.error }
});
import { useUser } from '@clerk/clerk-expo';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import { Camera } from 'expo-camera';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// --- LIVEKIT MOBILE ---
import {
  AudioSession,
  isTrackReference,
  LiveKitRoom,
  registerGlobals,
  useRoomContext,
  useTracks,
  VideoTrack
} from '@livekit/react-native';
import { Track } from 'livekit-client';

// Register LiveKit globals for React Native
registerGlobals();

// --- CONVEX ---
import { useAction } from "convex/react";
import { api } from "../../convex/_generated/api";

const COLORS = {
  surface: '#0f1413',
  primary: '#5bdcb0',
  onSurface: '#dfe3e1',
  error: '#ff5252'
};

const LIVEKIT_URL = process.env.EXPO_PUBLIC_LIVEKIT_URL || "wss://quranconnect2-rnj34nvh.livekit.cloud";

export default function CallScreen() {
  const { room } = useLocalSearchParams();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { user } = useUser();
  
  const generateToken = useAction(api.livekit.generateToken);
  const [token, setToken] = useState<string | null>(null);
  const [status, setStatus] = useState('Preparing Sanctuary...');

  useEffect(() => {
    async function prepareAndGetToken() {
      try {
        // 1. Start Audio Session (critical for mobile audio)
        await AudioSession.startAudioSession();

        // 2. Request Permissions
        const { status: camStatus } = await Camera.requestCameraPermissionsAsync();
        const { status: micStatus } = await Audio.requestPermissionsAsync();

        if (camStatus !== 'granted' || micStatus !== 'granted') {
          Alert.alert("Permissions Required", "We need camera and microphone access to start the recitation session.");
          setStatus("Permission Denied");
          return;
        }

        // 3. Generate Token
        setStatus('Connecting...');
        const t = await generateToken({
          roomName: room as string,
          firstName: user?.firstName || "Scholar",
        });
        setToken(t);
      } catch (e) {
        console.error("Setup failed", e);
        setStatus("Connection Failed");
      }
    }
    prepareAndGetToken();

    // Cleanup audio session on unmount
    return () => {
      AudioSession.stopAudioSession();
    };
  }, [room]);

  const handleEndCall = () => {
    router.replace('/(tabs)');
  };

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
      serverUrl={LIVEKIT_URL}
      token={token}
      connect={true}
      audio={true}
      video={true}
      onDisconnected={handleEndCall}
    >
      <RoomContent onEndCall={handleEndCall} roomName={room as string} insets={insets} />
    </LiveKitRoom>
  );
}

function RoomContent({ onEndCall, roomName, insets }: any) {
  const room = useRoomContext();
  const tracks = useTracks([
    { source: Track.Source.Camera, withPlaceholder: true },
  ]);

  // Track mic/cam state for UI buttons
  const [isMicMuted, setIsMicMuted] = useState(false);
  const [isCamOff, setIsCamOff] = useState(false);

  const toggleMic = async () => {
    const enabled = room.localParticipant.isMicrophoneEnabled;
    await room.localParticipant.setMicrophoneEnabled(!enabled);
    setIsMicMuted(enabled);
  };

  const toggleCamera = async () => {
    const enabled = room.localParticipant.isCameraEnabled;
    await room.localParticipant.setCameraEnabled(!enabled);
    setIsCamOff(enabled);
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Text style={styles.roomLabel}>RECITATION ROOM</Text>
        <Text style={styles.roomName}>{roomName}</Text>
      </View>

      <View style={styles.videoGrid}>
        <View style={styles.remoteView}>
          {tracks.length > 0 ? (
            tracks.map((track) =>
              isTrackReference(track) ? (
                <VideoTrack
                  key={`${track.participant.sid}-${track.source}`}
                  trackRef={track}
                  style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
                />
              ) : null
            )
          ) : (
            <MaterialCommunityIcons name="account-voice" size={80} color="rgba(91, 220, 176, 0.2)" />
          )}
        </View>
      </View>

      <View style={[styles.controls, { paddingBottom: insets.bottom + 20 }]}>
        <TouchableOpacity style={styles.iconBtn} onPress={toggleMic}>
          <MaterialCommunityIcons 
            name={isMicMuted ? "microphone-off" : "microphone"} 
            size={28} 
            color={isMicMuted ? COLORS.error : COLORS.onSurface} 
          />
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.iconBtn, styles.endCallBtn]} 
          onPress={onEndCall}
        >
          <MaterialCommunityIcons name="phone-hangup" size={28} color="white" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.iconBtn} onPress={toggleCamera}>
          <MaterialCommunityIcons 
            name={isCamOff ? "video-off" : "video"} 
            size={28} 
            color={isCamOff ? COLORS.error : COLORS.onSurface} 
          />
        </TouchableOpacity>
      </View>
    </View>
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
    overflow: 'hidden',
  },
  statusText: { color: COLORS.onSurface, marginTop: 20, fontSize: 14, opacity: 0.8 },
  controls: { 
    flexDirection: 'row', 
    justifyContent: 'center', 
    gap: 30, 
    alignItems: 'center',
    paddingVertical: 20,
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
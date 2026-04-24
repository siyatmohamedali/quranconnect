import { ClerkLoaded, ClerkProvider, useAuth } from '@clerk/clerk-expo';
import { ConvexReactClient, useMutation } from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { Stack, useRouter, useSegments } from 'expo-router';
import React, { useEffect } from 'react';
import { View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Import your generated API (Convex creates this automatically)
import { api } from "../convex/_generated/api";

// THE LUMINOUS SCHOLAR DESIGN SYSTEM
const COLORS = {
  surface: '#0f1413', // Deep Emerald
};

// INITIALIZE CONVEX CLIENT
const convexUrl = process.env.EXPO_PUBLIC_CONVEX_URL!;
const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;
const convex = new ConvexReactClient(convexUrl);

function AuthProtection() {
  const { isSignedIn, isLoaded } = useAuth();
  const segments = useSegments();
  const router = useRouter();
  
  // This mutation syncs the user to your 'users' table
  const storeUser = useMutation(api.users.storeUser);

  useEffect(() => {
    if (!isLoaded) return;

    const inAuthGroup = segments[0] === 'Auth';

    if (isSignedIn) {
      // SILENT SYNC: Create/Update user in Convex
      storeUser();

      if (inAuthGroup) {
        router.replace('/(tabs)');
      }
    } else if (!inAuthGroup && segments.length > 0) {
      router.replace('/');
    }
  }, [isSignedIn, isLoaded, segments]);

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.surface }}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" /> 
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="Auth" />
        <Stack.Screen name="setup-profile" />
      </Stack>
    </View>
  );
}

export default function RootLayout() {
  return (
    <ClerkProvider publishableKey={publishableKey}>
      <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
        <SafeAreaProvider>
          <ClerkLoaded>
            <AuthProtection />
          </ClerkLoaded>
        </SafeAreaProvider>
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
}
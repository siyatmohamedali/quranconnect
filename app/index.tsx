import { borderRadius, colors, spacing, typography } from '@/constants/theme';
import { AntDesign } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Dimensions, Image, Pressable, StyleSheet, Text, View } from 'react-native';

const { width } = Dimensions.get('window');

export default function WelcomeScreen() {
  const router = useRouter();

  const handleGoogleLogin = () => {
    router.push('/Auth/sign-in');
  };

  return (
    <View style={styles.container}>
      {/* --- TOP SECTION: TITLE --- */}
      <View style={styles.headerSection}>
        <Text style={styles.title}>
          The community app built for{"\n"}
          <Text style={styles.highlight}>Quran Reciters</Text> & Listeners.
        </Text>
        <Text style={styles.subtitle}>
          Discover world-class reciters, find a teacher, or a recitation partner.
        </Text>
      </View>

      {/* --- MIDDLE SECTION: IMAGE GRID --- */}
      {/* You can replace this with your actual uploaded image later */}
      <View style={styles.imageContainer}>
         <Image 
            source={require('../assets/images/webimage.png.jpg')} // Make sure to save your image here
            style={styles.gridImage}
            resizeMode="cover"
         />
      </View>

      {/* --- BOTTOM SECTION: AUTH --- */}
      <View style={styles.footer}>
        <Pressable 
          style={styles.googleButton} 
          onPress={handleGoogleLogin}
        >
          <AntDesign name="google" size={20} color={colors.black} />
          <Text style={styles.googleButtonText}>Continue with Google</Text>
        </Pressable>
        
        <Text style={styles.termsText}>
          By continuing, you agree to our Terms & Privacy Policy.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: spacing.lg,
  },
  headerSection: {
    marginTop: 80,
    alignItems: 'center',
  },
  title: {
    ...typography.heading2,
    color: colors.text,
    textAlign: 'center',
    lineHeight: 32,
  },
  highlight: {
    color: '#A855F7', // The purple from your image
  },
  subtitle: {
    ...typography.bodySmall,
    color: colors.textMuted,
    textAlign: 'center',
    marginTop: spacing.md,
    paddingHorizontal: spacing.sm,
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: spacing.xl,
  },
  gridImage: {
    width: width,
    height: '100%',
    opacity: 0.9,
  },
  footer: {
    paddingBottom: 60,
    alignItems: 'center',
  },
  googleButton: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    width: '100%',
    height: 56,
    borderRadius: borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },
  googleButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.black,
  },
  termsText: {
    ...typography.caption,
    color: colors.textMuted,
    marginTop: spacing.md,
    fontSize: 10,
  },
});
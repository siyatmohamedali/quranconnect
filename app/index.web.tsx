import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Dimensions, Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function LandingPage() {
  const router = useRouter();
  const [dimensions, setDimensions] = useState(Dimensions.get('window'));

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setDimensions(window);
    });
    return () => subscription?.remove();
  }, []);

  const scrollToSection = (sectionId: string) => {
    if (typeof document !== 'undefined') {
      const element = document.getElementById(sectionId);
      element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const { width } = dimensions;
  const isMobile = width < 768;
  const isTablet = width >= 768 && width < 1024;
  const isDesktop = width >= 1024;

  // THE LUMINOUS SCHOLAR COLOR TOKENS
  const COLORS = {
    surface: '#0f1413',               // Deep Emerald Base
    onSurface: '#dfe3e1',             // Soft White Text
    onSurfaceVariant: '#bfc9c4',      // Muted Scholar Text
    primary: '#5bdcb0',               // Mint Emerald
    primaryContainer: '#004b38',      // Dark Forest
    secondary: '#e9c349',             // Refined Gold
    surfaceContainerLow: '#181d1b',   // Background shift
    surfaceContainerHigh: '#262b2a',  // Card shift
    surfaceContainerHighest: '#313634', // Feature shift
    outlineVariant: 'rgba(137, 147, 143, 0.15)', // Ghost Border
  };

  const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.surface },
    
    // Navigation
    navBar: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: isMobile ? 20 : isTablet ? 40 : 80,
      paddingVertical: isMobile ? 20 : 30,
      position: 'absolute',
      top: 0,
      width: '100%',
      zIndex: 10,
    },
    logoContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    brandName: { 
      color: COLORS.primary, 
      fontSize: isMobile ? 20 : 24, 
      fontWeight: '800', 
      letterSpacing: -1 
    },
    navLinks: { flexDirection: 'row', gap: isMobile ? 20 : isTablet ? 30 : 40 },
    navLink: { color: '#888', fontWeight: '600', fontSize: isMobile ? 13 : 15 },
    navCta: {
      backgroundColor: COLORS.primary,
      paddingHorizontal: isMobile ? 16 : 24,
      paddingVertical: isMobile ? 8 : 10,
      borderRadius: 99,
    },
    navCtaText: { 
      color: COLORS.primaryContainer, 
      fontWeight: '700', 
      fontSize: isMobile ? 12 : 14 
    },

    // Hero
    heroSection: {
      paddingTop: isMobile ? 100 : isTablet ? 140 : 160,
      paddingBottom: isMobile ? 60 : isTablet ? 80 : 100,
      paddingHorizontal: isMobile ? 20 : isTablet ? 40 : 80,
      minHeight: isMobile ? 600 : isTablet ? 700 : 800,
      justifyContent: 'center',
    },
    heroGrid: {
      flexDirection: isMobile ? 'column' : 'row',
      maxWidth: 1280,
      alignSelf: 'center',
      alignItems: 'center',
      width: '100%',
      gap: isMobile ? 40 : isTablet ? 30 : 0,
    },
    heroTextContent: { flex: 1, zIndex: 5 },
    heroTitle: {
      color: COLORS.onSurface,
      fontSize: isMobile ? 42 : isTablet ? 64 : 96,
      fontWeight: '800',
      lineHeight: isMobile ? 48 : isTablet ? 70 : 100,
      letterSpacing: -2,
      marginBottom: isMobile ? 20 : 32,
      fontFamily: 'Unbounded, system-ui, -apple-system, sans-serif',
    },
    heroSubtext: {
      color: COLORS.onSurfaceVariant,
      fontSize: isMobile ? 16 : isTablet ? 18 : 22,
      lineHeight: isMobile ? 24 : isTablet ? 28 : 34,
      maxWidth: isMobile ? '100%' : 550,
      marginBottom: isMobile ? 32 : 48,
      fontWeight: '300',
    },
    buttonGroup: { 
      flexDirection: isMobile ? 'column' : 'row', 
      gap: isMobile ? 12 : 20,
      width: isMobile ? '100%' : 'auto',
    },
    mainCta: {
      backgroundColor: COLORS.primary,
      paddingHorizontal: isMobile ? 32 : 40,
      paddingVertical: isMobile ? 16 : 20,
      borderRadius: 99,
      elevation: 10,
      alignItems: 'center',
    },
    mainCtaText: { 
      color: COLORS.primaryContainer, 
      fontWeight: '800', 
      fontSize: isMobile ? 16 : 18 
    },
    ghostCta: {
      borderWidth: 1,
      borderColor: COLORS.outlineVariant,
      paddingHorizontal: isMobile ? 32 : 40,
      paddingVertical: isMobile ? 16 : 20,
      borderRadius: 99,
      alignItems: 'center',
    },
    ghostCtaText: { 
      color: COLORS.secondary, 
      fontWeight: '600', 
      fontSize: isMobile ? 16 : 18 
    },

    // Image Frame
    heroImageContainer: { 
      flex: isTablet ? 0.6 : 0.8, 
      alignItems: isMobile ? 'center' : 'flex-end', 
      position: 'relative',
      width: '100%',
    },
    mobileImageContainer: {
      width: '100%',
      alignItems: 'center',
      marginTop: 20,
    },
    circleFrame: {
      width: isMobile ? Math.min(width - 40, 320) : isTablet ? 350 : 450,
      height: isMobile ? Math.min(width - 40, 320) : isTablet ? 350 : 450,
      borderRadius: 999,
      borderWidth: 1,
      borderColor: COLORS.outlineVariant,
      padding: isMobile ? 10 : 15,
    },
    imagePlaceholder: {
      flex: 1,
      backgroundColor: COLORS.surfaceContainerHigh,
      borderRadius: 999,
      overflow: 'hidden',
    },
    circleImage: {
      width: '100%',
      height: '100%',
      borderRadius: 999,
    },
    overlayGradient: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'rgba(15, 20, 19, 0.4)',
    },
    experienceBadge: {
      position: 'absolute',
      bottom: -20,
      left: -20,
      backgroundColor: 'rgba(38, 43, 42, 0.8)',
      padding: isMobile ? 16 : isTablet ? 20 : 24,
      borderRadius: isMobile ? 16 : 20,
      width: isMobile ? 180 : isTablet ? 200 : 220,
      borderWidth: 1,
      borderColor: COLORS.outlineVariant,
    },
    badgeHeader: {
      marginBottom: 8,
    },
    badgeTag: { 
      color: COLORS.secondary, 
      fontSize: isMobile ? 9 : 10, 
      fontWeight: '800', 
      letterSpacing: 2 
    },
    badgeText: { 
      color: COLORS.onSurface, 
      fontSize: isMobile ? 12 : 14, 
      fontWeight: '500', 
      lineHeight: isMobile ? 18 : 20 
    },

    // Bento Grid
    featuresSection: { 
      paddingVertical: isMobile ? 60 : isTablet ? 80 : 120, 
      paddingHorizontal: isMobile ? 20 : isTablet ? 40 : 80, 
      backgroundColor: COLORS.surfaceContainerLow 
    },
    sectionHeader: {
      marginBottom: isMobile ? 40 : 60,
    },
    sectionTag: { 
      color: COLORS.primary, 
      fontWeight: '800', 
      letterSpacing: isMobile ? 2 : 4, 
      fontSize: isMobile ? 10 : 12, 
      marginBottom: 12 
    },
    sectionTitle: { 
      color: COLORS.onSurface, 
      fontSize: isMobile ? 28 : isTablet ? 36 : 42, 
      fontWeight: '800', 
      marginBottom: isMobile ? 40 : 60 
    },
    bentoGrid: { 
      flexDirection: isMobile ? 'column' : 'row', 
      gap: isMobile ? 16 : 24, 
      maxWidth: 1280, 
      alignSelf: 'center',
      width: '100%',
    },
    bentoLarge: { 
      flex: isMobile ? 1 : 2, 
      backgroundColor: COLORS.surfaceContainerHighest, 
      padding: isMobile ? 28 : isTablet ? 36 : 48, 
      borderRadius: isMobile ? 24 : isTablet ? 32 : 40, 
      minHeight: isMobile ? 280 : isTablet ? 340 : 400, 
      justifyContent: 'center' 
    },
    bentoSmall: { 
      flex: 1, 
      backgroundColor: COLORS.surface, 
      padding: isMobile ? 28 : isTablet ? 36 : 48, 
      borderRadius: isMobile ? 24 : isTablet ? 32 : 40, 
      borderWidth: 1, 
      borderColor: COLORS.outlineVariant,
      minHeight: isMobile ? 240 : 'auto',
    },
    bentoTitle: { 
      color: COLORS.onSurface, 
      fontSize: isMobile ? 24 : isTablet ? 28 : 32, 
      fontWeight: '700', 
      marginBottom: isMobile ? 12 : 20 
    },
    bentoText: { 
      color: COLORS.onSurfaceVariant, 
      fontSize: isMobile ? 15 : 18, 
      lineHeight: isMobile ? 22 : 28 
    },

    // How It Works Section
    howItWorksSection: {
      paddingVertical: isMobile ? 60 : isTablet ? 80 : 120,
      paddingHorizontal: isMobile ? 20 : isTablet ? 40 : 80,
      backgroundColor: COLORS.surface,
    },
    stepsContainer: {
      flexDirection: isMobile ? 'column' : 'row',
      gap: isMobile ? 24 : 32,
      maxWidth: 1280,
      alignSelf: 'center',
      width: '100%',
    },
    stepCard: {
      flex: 1,
      backgroundColor: COLORS.surfaceContainerHigh,
      padding: isMobile ? 28 : 40,
      borderRadius: isMobile ? 24 : 32,
      borderWidth: 1,
      borderColor: COLORS.outlineVariant,
    },
    stepNumber: {
      width: isMobile ? 48 : 56,
      height: isMobile ? 48 : 56,
      borderRadius: 999,
      backgroundColor: COLORS.primary,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 20,
    },
    stepNumberText: {
      color: COLORS.primaryContainer,
      fontSize: isMobile ? 20 : 24,
      fontWeight: '800',
    },
    stepTitle: {
      color: COLORS.onSurface,
      fontSize: isMobile ? 20 : 24,
      fontWeight: '700',
      marginBottom: 12,
    },
    stepText: {
      color: COLORS.onSurfaceVariant,
      fontSize: isMobile ? 14 : 16,
      lineHeight: isMobile ? 20 : 24,
    },

    // Community Section
    communitySection: {
      paddingVertical: isMobile ? 60 : isTablet ? 80 : 120,
      paddingHorizontal: isMobile ? 20 : isTablet ? 40 : 80,
      backgroundColor: COLORS.surfaceContainerLow,
    },
    communityContent: {
      maxWidth: 1280,
      alignSelf: 'center',
      width: '100%',
    },
    communityText: {
      color: COLORS.onSurfaceVariant,
      fontSize: isMobile ? 18 : 24,
      lineHeight: isMobile ? 28 : 38,
      textAlign: 'center',
      marginBottom: isMobile ? 40 : 60,
      maxWidth: 800,
      alignSelf: 'center',
    },
    waitlistContainer: {
      alignItems: 'center',
      padding: isMobile ? 32 : 48,
      backgroundColor: COLORS.surfaceContainerHigh,
      borderRadius: isMobile ? 24 : 32,
      borderWidth: 1,
      borderColor: COLORS.outlineVariant,
      maxWidth: 600,
      alignSelf: 'center',
      width: '100%',
    },
    profileIconsRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 16,
    },
    profileIcon: {
      width: isMobile ? 44 : 52,
      height: isMobile ? 44 : 52,
      borderRadius: 999,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 3,
      borderColor: COLORS.surfaceContainerHigh,
    },
    profileInitial: {
      color: COLORS.primaryContainer,
      fontSize: isMobile ? 16 : 18,
      fontWeight: '700',
    },
    profileCountBadge: {
      width: isMobile ? 44 : 52,
      height: isMobile ? 44 : 52,
      borderRadius: 999,
      backgroundColor: COLORS.primary,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 3,
      borderColor: COLORS.surfaceContainerHigh,
    },
    profileCountText: {
      color: COLORS.primaryContainer,
      fontSize: isMobile ? 12 : 14,
      fontWeight: '800',
    },
    waitlistSubtext: {
      color: COLORS.onSurfaceVariant,
      fontSize: isMobile ? 14 : 16,
      marginBottom: 24,
      textAlign: 'center',
    },
    waitlistButton: {
      backgroundColor: COLORS.primary,
      paddingHorizontal: isMobile ? 40 : 56,
      paddingVertical: isMobile ? 16 : 20,
      borderRadius: 999,
      elevation: 5,
    },
    waitlistButtonText: {
      color: COLORS.primaryContainer,
      fontSize: isMobile ? 16 : 18,
      fontWeight: '800',
    },

    // CTA Section
    ctaWrapper: { 
      padding: isMobile ? 20 : isTablet ? 40 : 80 
    },
    ctaCard: {
      backgroundColor: COLORS.primary,
      borderRadius: isMobile ? 32 : isTablet ? 48 : 60,
      padding: isMobile ? 40 : isTablet ? 60 : 80,
      alignItems: 'center',
      maxWidth: 1100,
      alignSelf: 'center',
      width: '100%',
    },
    ctaTitle: { 
      color: COLORS.primaryContainer, 
      fontSize: isMobile ? 32 : isTablet ? 48 : 64, 
      fontWeight: '800', 
      textAlign: 'center', 
      marginBottom: isMobile ? 16 : 24,
      lineHeight: isMobile ? 38 : isTablet ? 54 : 70,
    },
    ctaSubtext: { 
      color: COLORS.primaryContainer, 
      fontSize: isMobile ? 16 : 20, 
      textAlign: 'center', 
      opacity: 0.8, 
      marginBottom: isMobile ? 32 : 48, 
      maxWidth: isMobile ? '100%' : 600,
      lineHeight: isMobile ? 24 : 30,
    },
    ctaFinalBtn: { 
      backgroundColor: COLORS.surface, 
      paddingHorizontal: isMobile ? 36 : 50, 
      paddingVertical: isMobile ? 16 : 22, 
      borderRadius: 99 
    },
    ctaFinalBtnText: { 
      color: COLORS.primary, 
      fontWeight: '800', 
      fontSize: isMobile ? 16 : 20 
    },

    // Footer
    footer: { 
      paddingVertical: isMobile ? 40 : 60, 
      paddingHorizontal: isMobile ? 20 : isTablet ? 40 : 80, 
      borderTopWidth: 1, 
      borderColor: 'rgba(255,255,255,0.05)', 
      alignItems: 'center' 
    },
    footerBrand: { 
      color: COLORS.primaryContainer, 
      fontWeight: '700', 
      fontSize: isMobile ? 16 : 18, 
      marginBottom: 12 
    },
    footerCopy: { 
      color: '#555', 
      fontSize: isMobile ? 11 : 13,
      textAlign: 'center',
      marginBottom: 16,
    },
    footerLinks: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
    },
    footerLink: {
      color: COLORS.primary,
      fontSize: isMobile ? 12 : 14,
      fontWeight: '600',
    },
    footerDivider: {
      color: '#555',
      fontSize: isMobile ? 12 : 14,
    },
  });

  return (
    <>
      {/* Google Fonts - Unbounded */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Unbounded:wght@200..900&display=swap');
      `}</style>
      
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      
      {/* --- TOP NAVIGATION BAR --- */}
      <View style={styles.navBar}>
        <View style={styles.logoContainer}>
          <Text style={styles.brandName}>QuranMatch</Text>
        </View>
        
        {!isMobile && (
          <View style={styles.navLinks}>
            <Pressable onPress={() => scrollToSection('features')}>
              <Text style={[styles.navLink, { color: COLORS.primary }]}>Features</Text>
            </Pressable>
            <Pressable onPress={() => scrollToSection('how-it-works')}>
              <Text style={styles.navLink}>How It Works</Text>
            </Pressable>
            <Pressable onPress={() => scrollToSection('community')}>
              <Text style={styles.navLink}>Community</Text>
            </Pressable>
          </View>
        )}

        <Pressable 
          onPress={() => router.push('/Auth/sign-in')}
          style={styles.navCta}
        >
          <Text style={styles.navCtaText}>Launch App</Text>
        </Pressable>
      </View>

      {/* --- HERO SECTION --- */}
      <View style={styles.heroSection}>
        <View style={styles.heroGrid}>
          
          {/* Left Column: Text Content */}
          <View style={styles.heroTextContent}>
            <Text style={styles.heroTitle}>
              Connect.{"\n"}
              <Text style={{ color: COLORS.primary }}>Recite.</Text>{"\n"}
              Perfect.
            </Text>
            
            <Text style={styles.heroSubtext}>
              The world's first platform for spontaneous Quran recitation matches. 
              Elevate your Tajweed through a digital sanctuary of global connection.
            </Text>

            <View style={styles.buttonGroup}>
              <Pressable 
                onPress={() => router.push('/Auth/sign-up')}
                style={styles.mainCta}
              >
                <Text style={styles.mainCtaText}>Start Matching</Text>
              </Pressable>
            </View>
          </View>

          {/* Right Column: Visual Sanctuary */}
          {!isMobile && (
            <View style={styles.heroImageContainer}>
              <View style={styles.circleFrame}>
                <View style={styles.imagePlaceholder}>
                   <Image 
                     source={{ uri: 'https://i.ibb.co/dsxNRk6V/1000367978.jpg' }}
                     style={styles.circleImage}
                     resizeMode="cover"
                   />
                   <View style={styles.overlayGradient} />
                </View>
              </View>
              
              {/* Floating Experience Badge */}
              {isDesktop && (
                <View style={styles.experienceBadge}>
                  <View style={styles.badgeHeader}>
                    <Text style={styles.badgeTag}>PREMIUM EXPERIENCE</Text>
                  </View>
                  <Text style={styles.badgeText}>
                    Harness the power of spontaneous spiritual growth.
                  </Text>
                </View>
              )}
            </View>
          )}
          
          {/* Mobile Image */}
          {isMobile && (
            <View style={styles.mobileImageContainer}>
              <View style={styles.circleFrame}>
                <View style={styles.imagePlaceholder}>
                   <Image 
                     source={{ uri: 'https://i.ibb.co/dsxNRk6V/1000367978.jpg' }}
                     style={styles.circleImage}
                     resizeMode="cover"
                   />
                   <View style={styles.overlayGradient} />
                </View>
              </View>
            </View>
          )}
        </View>
      </View>

      {/* --- BENTO GRID FEATURES --- */}
      <View style={styles.featuresSection} id="features">
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTag}>THE ECOSYSTEM</Text>
          <Text style={styles.sectionTitle}>Designed for Focus.</Text>
        </View>

        <View style={styles.bentoGrid}>
          {/* Large Feature Card */}
          <View style={styles.bentoLarge}>
            <Text style={styles.bentoTitle}>Live Global Network</Text>
            <Text style={styles.bentoText}>
              Connect with verified reciters and students from every corner of the globe. 
              Our intelligent algorithm ensures you find the right level of inspiration.
            </Text>
          </View>

          {/* Small Feature Card */}
          <View style={styles.bentoSmall}>
            <Text style={styles.bentoTitle}>Spontaneous Practice</Text>
            <Text style={styles.bentoText}>
              Break the routine. Spontaneous sessions mimic real-life spiritual encounters.
            </Text>
          </View>
        </View>
      </View>

      {/* --- HOW IT WORKS SECTION --- */}
      <View style={styles.howItWorksSection} id="how-it-works">
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTag}>THE PROCESS</Text>
          <Text style={styles.sectionTitle}>How It Works</Text>
        </View>

        <View style={styles.stepsContainer}>
          <View style={styles.stepCard}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>1</Text>
            </View>
            <Text style={styles.stepTitle}>Create Your Profile</Text>
            <Text style={styles.stepText}>
              Sign up and set your recitation preferences, skill level, and learning goals.
            </Text>
          </View>

          <View style={styles.stepCard}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>2</Text>
            </View>
            <Text style={styles.stepTitle}>Get Matched</Text>
            <Text style={styles.stepText}>
              Our intelligent algorithm pairs you with a compatible recitation partner instantly.
            </Text>
          </View>

          <View style={styles.stepCard}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>3</Text>
            </View>
            <Text style={styles.stepTitle}>Start Reciting</Text>
            <Text style={styles.stepText}>
              Join a live video session and practice Quran recitation together in real-time.
            </Text>
          </View>
        </View>
      </View>

      {/* --- COMMUNITY SECTION --- */}
      <View style={styles.communitySection} id="community">
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTag}>JOIN US</Text>
          <Text style={styles.sectionTitle}>A Global Community</Text>
        </View>

        <View style={styles.communityContent}>
          <Text style={styles.communityText}>
            Join thousands of Muslims worldwide who are elevating their Tajweed and building 
            meaningful connections through spontaneous Quran recitation sessions.
          </Text>
          
          <View style={styles.waitlistContainer}>
            <View style={styles.profileIconsRow}>
              <View style={[styles.profileIcon, { backgroundColor: '#5bdcb0' }]}>
                <Text style={styles.profileInitial}>A</Text>
              </View>
              <View style={[styles.profileIcon, { backgroundColor: '#e9c349', marginLeft: -12 }]}>
                <Text style={styles.profileInitial}>M</Text>
              </View>
              <View style={[styles.profileIcon, { backgroundColor: '#4a9d7f', marginLeft: -12 }]}>
                <Text style={styles.profileInitial}>S</Text>
              </View>
              <View style={[styles.profileIcon, { backgroundColor: '#7bc9a8', marginLeft: -12 }]}>
                <Text style={styles.profileInitial}>F</Text>
              </View>
              <View style={[styles.profileIcon, { backgroundColor: '#d4a843', marginLeft: -12 }]}>
                <Text style={styles.profileInitial}>K</Text>
              </View>
              <View style={[styles.profileCountBadge, { marginLeft: -12 }]}>
                <Text style={styles.profileCountText}>+2.5K</Text>
              </View>
            </View>
            
            <Text style={styles.waitlistSubtext}>
              Join 2,500+ users already on the waitlist
            </Text>
            
            <Pressable 
              onPress={() => router.push('/Auth/sign-up')}
              style={styles.waitlistButton}
            >
              <Text style={styles.waitlistButtonText}>Join the Waitlist</Text>
            </Pressable>
          </View>
        </View>
      </View>

      {/* --- CALL TO ACTION --- */}
      <View style={styles.ctaWrapper}>
        <View style={styles.ctaCard}>
          <Text style={styles.ctaTitle}>Your Recitation, Reimagined.</Text>
          <Text style={styles.ctaSubtext}>Join thousands of luminous scholars in the world's most focused digital sanctuary.</Text>
          <Pressable onPress={() => router.push('/Auth/sign-up')} style={styles.ctaFinalBtn}>
            <Text style={styles.ctaFinalBtnText}>Get Started Free</Text>
          </Pressable>
        </View>
      </View>

      {/* --- FOOTER --- */}
      <View style={styles.footer}>
        <Text style={styles.footerBrand}>QuranMatch</Text>
        <Text style={styles.footerCopy}>© 2026 QuranMatch. Digital Sanctuary for the Luminous Scholar.</Text>
        
        <View style={styles.footerLinks}>
          <Pressable onPress={() => router.push('/terms-of-service')}>
            <Text style={styles.footerLink}>Terms of Service</Text>
          </Pressable>
          <Text style={styles.footerDivider}>•</Text>
          <Pressable onPress={() => router.push('/privacy-policy')}>
            <Text style={styles.footerLink}>Privacy Policy</Text>
          </Pressable>
        </View>
      </View>

    </ScrollView>
    </>
  );
}

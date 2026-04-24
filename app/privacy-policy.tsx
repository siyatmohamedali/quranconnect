import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

const COLORS = {
  surface: '#0f1413',
  onSurface: '#dfe3e1',
  onSurfaceVariant: '#bfc9c4',
  primary: '#5bdcb0',
  primaryContainer: '#004b38',
  surfaceContainerHigh: '#262b2a',
};

export default function PrivacyPolicy() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <MaterialCommunityIcons name="arrow-left" size={24} color={COLORS.primary} />
        </Pressable>
        <Text style={styles.title}>Privacy Policy</Text>
        <Text style={styles.lastUpdated}>Last Updated: April 24, 2026</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>1. Introduction</Text>
          <Text style={styles.paragraph}>
            QuranMatch ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy 
            explains how we collect, use, disclose, and safeguard your information when you use our mobile 
            application and web platform for Quran recitation matching.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>2. Information We Collect</Text>
          <Text style={styles.paragraph}>
            We collect several types of information to provide and improve our Service:
          </Text>
          
          <Text style={styles.subheading}>Personal Information:</Text>
          <Text style={styles.bulletPoint}>• Name and email address</Text>
          <Text style={styles.bulletPoint}>• Profile picture (optional)</Text>
          <Text style={styles.bulletPoint}>• Age and location (country/region)</Text>
          <Text style={styles.bulletPoint}>• Recitation skill level and preferences</Text>
          
          <Text style={styles.subheading}>Usage Information:</Text>
          <Text style={styles.bulletPoint}>• Session history and duration</Text>
          <Text style={styles.bulletPoint}>• Matching preferences and patterns</Text>
          <Text style={styles.bulletPoint}>• Device information and IP address</Text>
          <Text style={styles.bulletPoint}>• App usage analytics</Text>
          
          <Text style={styles.subheading}>Communication Data:</Text>
          <Text style={styles.bulletPoint}>• Video and audio during live sessions (not recorded)</Text>
          <Text style={styles.bulletPoint}>• Chat messages within the app</Text>
          <Text style={styles.bulletPoint}>• Feedback and support communications</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>3. How We Use Your Information</Text>
          <Text style={styles.paragraph}>
            We use the collected information for the following purposes:
          </Text>
          <Text style={styles.bulletPoint}>• To provide and maintain our Service</Text>
          <Text style={styles.bulletPoint}>• To match you with compatible recitation partners</Text>
          <Text style={styles.bulletPoint}>• To facilitate video calling and communication</Text>
          <Text style={styles.bulletPoint}>• To improve and personalize your experience</Text>
          <Text style={styles.bulletPoint}>• To send you notifications and updates</Text>
          <Text style={styles.bulletPoint}>• To detect and prevent fraud or abuse</Text>
          <Text style={styles.bulletPoint}>• To comply with legal obligations</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>4. Video and Audio Sessions</Text>
          <Text style={styles.paragraph}>
            QuranMatch facilitates live video and audio sessions between users. Important points:
          </Text>
          <Text style={styles.bulletPoint}>• Sessions are NOT recorded or stored by QuranMatch</Text>
          <Text style={styles.bulletPoint}>• Video/audio data is transmitted peer-to-peer when possible</Text>
          <Text style={styles.bulletPoint}>• We use LiveKit for secure real-time communication</Text>
          <Text style={styles.bulletPoint}>• Session metadata (duration, participants) is stored for analytics</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>5. Data Sharing and Disclosure</Text>
          <Text style={styles.paragraph}>
            We do not sell your personal information. We may share your information in these situations:
          </Text>
          <Text style={styles.bulletPoint}>• With other users (profile information visible during matching)</Text>
          <Text style={styles.bulletPoint}>• With service providers (Convex, LiveKit, Clerk for authentication)</Text>
          <Text style={styles.bulletPoint}>• For legal compliance or to protect rights and safety</Text>
          <Text style={styles.bulletPoint}>• In connection with a business transfer or merger</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>6. Third-Party Services</Text>
          <Text style={styles.paragraph}>
            QuranMatch uses the following third-party services:
          </Text>
          <Text style={styles.bulletPoint}>• Clerk: Authentication and user management</Text>
          <Text style={styles.bulletPoint}>• Convex: Backend database and real-time data</Text>
          <Text style={styles.bulletPoint}>• LiveKit: Video calling infrastructure</Text>
          <Text style={styles.bulletPoint}>• Analytics services for app improvement</Text>
          <Text style={styles.paragraph}>
            Each service has its own privacy policy governing the use of your information.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>7. Data Security</Text>
          <Text style={styles.paragraph}>
            We implement appropriate technical and organizational measures to protect your information:
          </Text>
          <Text style={styles.bulletPoint}>• Encryption of data in transit and at rest</Text>
          <Text style={styles.bulletPoint}>• Secure authentication protocols</Text>
          <Text style={styles.bulletPoint}>• Regular security assessments</Text>
          <Text style={styles.bulletPoint}>• Limited access to personal information</Text>
          <Text style={styles.paragraph}>
            However, no method of transmission over the internet is 100% secure, and we cannot guarantee 
            absolute security.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>8. Data Retention</Text>
          <Text style={styles.paragraph}>
            We retain your personal information for as long as necessary to provide our Service and comply 
            with legal obligations. When you delete your account:
          </Text>
          <Text style={styles.bulletPoint}>• Your profile and personal data are permanently deleted</Text>
          <Text style={styles.bulletPoint}>• Session history is anonymized for analytics</Text>
          <Text style={styles.bulletPoint}>• Some data may be retained for legal compliance</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>9. Your Rights and Choices</Text>
          <Text style={styles.paragraph}>
            You have the following rights regarding your personal information:
          </Text>
          <Text style={styles.bulletPoint}>• Access: Request a copy of your data</Text>
          <Text style={styles.bulletPoint}>• Correction: Update inaccurate information</Text>
          <Text style={styles.bulletPoint}>• Deletion: Request deletion of your account and data</Text>
          <Text style={styles.bulletPoint}>• Opt-out: Unsubscribe from marketing communications</Text>
          <Text style={styles.bulletPoint}>• Data portability: Receive your data in a portable format</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>10. Children's Privacy</Text>
          <Text style={styles.paragraph}>
            QuranMatch is intended for users aged 13 and above. We do not knowingly collect information 
            from children under 13. If you believe we have collected information from a child under 13, 
            please contact us immediately.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>11. International Data Transfers</Text>
          <Text style={styles.paragraph}>
            Your information may be transferred to and processed in countries other than your own. We ensure 
            appropriate safeguards are in place to protect your information in accordance with this Privacy 
            Policy.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>12. Changes to This Privacy Policy</Text>
          <Text style={styles.paragraph}>
            We may update this Privacy Policy from time to time. We will notify you of significant changes 
            via email or through the app. Your continued use of QuranMatch after changes constitutes 
            acceptance of the updated policy.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>13. Contact Us</Text>
          <Text style={styles.paragraph}>
            If you have questions or concerns about this Privacy Policy or our data practices, please 
            contact us:
          </Text>
          <Text style={styles.contactInfo}>Email: privacy@quranmatch.com</Text>
          <Text style={styles.contactInfo}>Address: QuranMatch Inc., [Your Address]</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.paragraph}>
            By using QuranMatch, you acknowledge that you have read and understood this Privacy Policy.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.surface,
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 24,
    paddingBottom: 32,
    backgroundColor: COLORS.surfaceContainerHigh,
  },
  backButton: {
    marginBottom: 20,
  },
  title: {
    color: COLORS.onSurface,
    fontSize: 36,
    fontWeight: '800',
    marginBottom: 8,
  },
  lastUpdated: {
    color: COLORS.onSurfaceVariant,
    fontSize: 14,
    opacity: 0.7,
  },
  content: {
    paddingHorizontal: 24,
    paddingVertical: 32,
    maxWidth: 800,
    alignSelf: 'center',
    width: '100%',
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    color: COLORS.primary,
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 12,
  },
  subheading: {
    color: COLORS.onSurface,
    fontSize: 16,
    fontWeight: '600',
    marginTop: 12,
    marginBottom: 8,
  },
  paragraph: {
    color: COLORS.onSurfaceVariant,
    fontSize: 16,
    lineHeight: 26,
    marginBottom: 12,
  },
  bulletPoint: {
    color: COLORS.onSurfaceVariant,
    fontSize: 16,
    lineHeight: 26,
    marginLeft: 16,
    marginBottom: 8,
  },
  contactInfo: {
    color: COLORS.onSurfaceVariant,
    fontSize: 16,
    lineHeight: 26,
    marginLeft: 16,
  },
});

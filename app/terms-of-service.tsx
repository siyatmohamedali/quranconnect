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

export default function TermsOfService() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <MaterialCommunityIcons name="arrow-left" size={24} color={COLORS.primary} />
        </Pressable>
        <Text style={styles.title}>Terms of Service</Text>
        <Text style={styles.lastUpdated}>Last Updated: April 24, 2026</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>1. Acceptance of Terms</Text>
          <Text style={styles.paragraph}>
            By accessing and using QuranMatch ("the Service"), you accept and agree to be bound by the terms 
            and provision of this agreement. If you do not agree to these Terms of Service, please do not use 
            the Service.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>2. Description of Service</Text>
          <Text style={styles.paragraph}>
            QuranMatch is a platform that connects Muslims worldwide for spontaneous Quran recitation practice 
            sessions. The Service provides video calling capabilities, matching algorithms, and community features 
            to facilitate meaningful spiritual connections and Tajweed improvement.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>3. User Accounts</Text>
          <Text style={styles.paragraph}>
            To use QuranMatch, you must create an account. You are responsible for:
          </Text>
          <Text style={styles.bulletPoint}>• Maintaining the confidentiality of your account credentials</Text>
          <Text style={styles.bulletPoint}>• All activities that occur under your account</Text>
          <Text style={styles.bulletPoint}>• Notifying us immediately of any unauthorized use</Text>
          <Text style={styles.bulletPoint}>• Providing accurate and complete information</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>4. User Conduct</Text>
          <Text style={styles.paragraph}>
            You agree to use QuranMatch respectfully and in accordance with Islamic principles. You must not:
          </Text>
          <Text style={styles.bulletPoint}>• Use the Service for any unlawful purpose</Text>
          <Text style={styles.bulletPoint}>• Harass, abuse, or harm other users</Text>
          <Text style={styles.bulletPoint}>• Share inappropriate or offensive content</Text>
          <Text style={styles.bulletPoint}>• Impersonate others or provide false information</Text>
          <Text style={styles.bulletPoint}>• Attempt to gain unauthorized access to the Service</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>5. Content and Intellectual Property</Text>
          <Text style={styles.paragraph}>
            All content, features, and functionality of QuranMatch are owned by us and are protected by 
            international copyright, trademark, and other intellectual property laws. You retain ownership 
            of any content you create, but grant us a license to use it for providing the Service.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>6. Privacy and Data Protection</Text>
          <Text style={styles.paragraph}>
            Your privacy is important to us. Our collection and use of personal information is described in 
            our Privacy Policy. By using QuranMatch, you consent to our data practices as outlined in the 
            Privacy Policy.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>7. Video Sessions</Text>
          <Text style={styles.paragraph}>
            Video recitation sessions are live and not recorded by QuranMatch. However, you are responsible 
            for your own conduct during sessions. We reserve the right to monitor sessions for quality and 
            safety purposes.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>8. Subscription and Payments</Text>
          <Text style={styles.paragraph}>
            Some features of QuranMatch may require a paid subscription. All fees are non-refundable unless 
            otherwise stated. We reserve the right to change our pricing at any time with notice to users.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>9. Termination</Text>
          <Text style={styles.paragraph}>
            We reserve the right to suspend or terminate your account at any time for violations of these 
            Terms of Service or for any other reason at our discretion. You may also terminate your account 
            at any time through the app settings.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>10. Disclaimer of Warranties</Text>
          <Text style={styles.paragraph}>
            QuranMatch is provided "as is" without warranties of any kind. We do not guarantee that the 
            Service will be uninterrupted, secure, or error-free. Use of the Service is at your own risk.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>11. Limitation of Liability</Text>
          <Text style={styles.paragraph}>
            To the maximum extent permitted by law, QuranMatch shall not be liable for any indirect, 
            incidental, special, consequential, or punitive damages resulting from your use of the Service.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>12. Changes to Terms</Text>
          <Text style={styles.paragraph}>
            We reserve the right to modify these Terms of Service at any time. We will notify users of 
            significant changes via email or through the app. Continued use of the Service after changes 
            constitutes acceptance of the modified terms.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>13. Contact Information</Text>
          <Text style={styles.paragraph}>
            If you have questions about these Terms of Service, please contact us at:
          </Text>
          <Text style={styles.contactInfo}>Email: legal@quranmatch.com</Text>
          <Text style={styles.contactInfo}>Address: QuranMatch Inc., [Your Address]</Text>
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

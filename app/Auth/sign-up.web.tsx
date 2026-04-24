import { colors } from '@/constants/theme';
import { useOAuth, useSignUp } from '@clerk/clerk-expo';
import { AntDesign } from '@expo/vector-icons';
import { Link, useRouter } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';
import React, { useEffect, useState } from 'react';
import { Alert, Dimensions, Image, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

WebBrowser.maybeCompleteAuthSession();

export default function SignUpPageWeb() {
  const { signUp, setActive, isLoaded } = useSignUp();
  const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google' });
  const router = useRouter();

  const [dimensions, setDimensions] = useState(Dimensions.get('window'));
  const [emailAddress, setEmailAddress] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [pendingVerification, setPendingVerification] = React.useState(false);
  const [code, setCode] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setDimensions(window);
    });
    return () => subscription?.remove();
  }, []);

  const { width } = dimensions;
  const isMobile = width < 768;

  const onGoogleSignUp = async () => {
    try {
      const { createdSessionId, setActive: oauthSetActive } = await startOAuthFlow();

      if (createdSessionId && oauthSetActive) {
        await oauthSetActive({ session: createdSessionId });
        router.replace('/(tabs)');
      }
    } catch (err: any) {
      console.error('OAuth error', err);
      Alert.alert('Error', err.errors?.[0]?.message || 'Google sign up failed');
    }
  };

  const onSignUpPress = async () => {
    if (!isLoaded || !signUp) return;

    setLoading(true);
    try {
      await signUp.create({
        emailAddress,
        password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });
      setPendingVerification(true);
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
      Alert.alert('Error', err.errors?.[0]?.message || 'Sign up failed');
    } finally {
      setLoading(false);
    }
  };

  const onVerifyPress = async () => {
    if (!isLoaded || !signUp) return;

    setLoading(true);
    try {
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (signUpAttempt.status === 'complete') {
        await setActive({ session: signUpAttempt.createdSessionId });
        router.replace('/(tabs)');
      } else {
        console.error(JSON.stringify(signUpAttempt, null, 2));
        Alert.alert('Error', 'Verification failed. Please try again.');
      }
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
      Alert.alert('Error', err.errors?.[0]?.message || 'Verification failed');
    } finally {
      setLoading(false);
    }
  };

  if (pendingVerification) {
    return (
      <View style={[styles.container, isMobile && styles.containerMobile]}>
        <View style={[styles.formSide, isMobile && styles.formSideMobile]}>
          <View style={styles.formContainer}>
            <Text style={[styles.title, isMobile && styles.titleMobile]}>Verify your email</Text>
            <Text style={[styles.subtitle, isMobile && styles.subtitleMobile]}>
              We sent a code to {emailAddress}
            </Text>
            <TextInput
              style={styles.input}
              value={code}
              placeholder="Enter verification code"
              placeholderTextColor="#666666"
              onChangeText={setCode}
              keyboardType="numeric"
            />
            <Pressable
              style={({ pressed }) => [
                styles.button,
                (!code || loading) && styles.buttonDisabled,
                pressed && styles.buttonPressed,
              ]}
              onPress={onVerifyPress}
              disabled={!code || loading}
            >
              <Text style={styles.buttonText}>
                {loading ? 'Verifying...' : 'Verify'}
              </Text>
            </Pressable>
          </View>
        </View>
        {!isMobile && (
          <View style={styles.imageSide}>
            <Image 
              source={require('../../assets/images/webimage.png.jpg')}
              style={styles.image}
              resizeMode="cover"
            />
          </View>
        )}
      </View>
    );
  }

  return (
    <View style={[styles.container, isMobile && styles.containerMobile]}>
      {/* Left Side - Form */}
      <View style={[styles.formSide, isMobile && styles.formSideMobile]}>
        <View style={styles.formContainer}>
          <Text style={[styles.title, isMobile && styles.titleMobile]}>Sign up for QuranMatch</Text>

          <Pressable 
            style={({ pressed }) => [styles.googleButton, pressed && styles.buttonPressed]}
            onPress={onGoogleSignUp}
          >
            <AntDesign name="google" size={20} color="#000" />
            <Text style={styles.googleButtonText}>Continue with Google</Text>
          </Pressable>

          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>or</Text>
            <View style={styles.dividerLine} />
          </View>

          <Text style={styles.label}>Email address</Text>
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            value={emailAddress}
            placeholder="Enter email"
            placeholderTextColor="#666666"
            onChangeText={setEmailAddress}
            keyboardType="email-address"
          />

          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            value={password}
            placeholder="Enter password"
            placeholderTextColor="#666666"
            secureTextEntry={true}
            onChangeText={setPassword}
          />

          <Pressable
            style={({ pressed }) => [
              styles.button,
              (!emailAddress || !password || loading) && styles.buttonDisabled,
              pressed && styles.buttonPressed,
            ]}
            onPress={onSignUpPress}
            disabled={!emailAddress || !password || loading}
          >
            <Text style={styles.buttonText}>
              {loading ? 'Signing up...' : 'Sign up'}
            </Text>
          </Pressable>

          <View style={styles.linkContainer}>
            <Text style={styles.linkText}>Already have an account? </Text>
            <Link href="/Auth/sign-in">
              <Text style={styles.link}>Sign in</Text>
            </Link>
          </View>
        </View>
      </View>

      {/* Right Side - Image */}
      {!isMobile && (
        <View style={styles.imageSide}>
          <Image 
            source={require('../../assets/images/webimage.png.jpg')}
            style={styles.image}
            resizeMode="cover"
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: colors.background,
  },
  containerMobile: {
    flexDirection: 'column',
  },
  formSide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
    maxWidth: 500,
  },
  formSideMobile: {
    maxWidth: '100%',
    padding: 20,
    paddingTop: 60,
  },
  formContainer: {
    width: '100%',
    maxWidth: 400,
  },
  imageSide: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 32,
    textAlign: 'center',
  },
  titleMobile: {
    fontSize: 24,
    marginBottom: 24,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textMuted,
    marginBottom: 24,
    textAlign: 'center',
  },
  subtitleMobile: {
    fontSize: 14,
  },
  googleButton: {
    flexDirection: 'row',
    backgroundColor: colors.primary,
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
    borderWidth: 2,
    borderColor: colors.black,
  },
  googleButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.black,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.border,
  },
  dividerText: {
    marginHorizontal: 12,
    color: colors.textMuted,
    fontSize: 14,
  },
  label: {
    fontWeight: '600',
    fontSize: 14,
    color: colors.text,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: colors.surface,
    color: colors.text,
    marginBottom: 16,
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
    borderWidth: 2,
    borderColor: colors.black,
  },
  buttonPressed: {
    opacity: 0.8,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: colors.black,
    fontWeight: '700',
    fontSize: 16,
  },
  linkContainer: {
    flexDirection: 'row',
    gap: 4,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  linkText: {
    color: colors.textMuted,
    fontSize: 14,
  },
  link: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '600',
  },
});

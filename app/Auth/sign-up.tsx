import { colors } from '@/constants/theme';
import { useOAuth, useSignUp } from '@clerk/clerk-expo';
import { AntDesign } from '@expo/vector-icons';
import { Link, useRouter } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import { Alert, Pressable, Text as RNText, StyleSheet, TextInput, View } from 'react-native';

WebBrowser.maybeCompleteAuthSession();

export default function SignUpPage() {
  const { signUp, setActive, isLoaded } = useSignUp();
  const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google' });
  const router = useRouter();

  const [emailAddress, setEmailAddress] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [pendingVerification, setPendingVerification] = React.useState(false);
  const [code, setCode] = React.useState('');
  const [loading, setLoading] = React.useState(false);

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
      <View style={styles.container}>
        <RNText style={styles.title}>Verify your email</RNText>
        <RNText style={styles.subtitle}>
          We sent a code to {emailAddress}
        </RNText>
        <TextInput
          style={styles.input}
          value={code}
          placeholder="Enter verification code"
          placeholderTextColor={colors.textMuted}
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
          <RNText style={styles.buttonText}>
            {loading ? 'Verifying...' : 'Verify'}
          </RNText>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <RNText style={styles.title}>Sign up for QuranMatch</RNText>

      <Pressable 
        style={({ pressed }) => [styles.googleButton, pressed && styles.buttonPressed]}
        onPress={onGoogleSignUp}
      >
        <AntDesign name="google" size={20} color={colors.black} />
        <RNText style={styles.googleButtonText}>Continue with Google</RNText>
      </Pressable>

      <View style={styles.divider}>
        <View style={styles.dividerLine} />
        <RNText style={styles.dividerText}>or</RNText>
        <View style={styles.dividerLine} />
      </View>

      <RNText style={styles.label}>Email address</RNText>
      <TextInput
        style={styles.input}
        autoCapitalize="none"
        value={emailAddress}
        placeholder="Enter email"
        placeholderTextColor={colors.textMuted}
        onChangeText={setEmailAddress}
        keyboardType="email-address"
      />

      <RNText style={styles.label}>Password</RNText>
      <TextInput
        style={styles.input}
        value={password}
        placeholder="Enter password"
        placeholderTextColor={colors.textMuted}
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
        <RNText style={styles.buttonText}>
          {loading ? 'Signing up...' : 'Sign up'}
        </RNText>
      </Pressable>

      <View style={styles.linkContainer}>
        <RNText style={{ color: colors.textMuted }}>Already have an account? </RNText>
        <Link href="/Auth/sign-in">
          <RNText style={{ color: colors.primary, fontWeight: '600' }}>Sign in</RNText>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    gap: 12,
    justifyContent: 'center',
    backgroundColor: colors.background,
  },
  title: {
    marginBottom: 24,
    textAlign: 'center',
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text,
  },
  subtitle: {
    marginBottom: 12,
    opacity: 0.7,
    textAlign: 'center',
    color: colors.textMuted,
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
    marginVertical: 20,
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
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: colors.surface,
    color: colors.text,
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
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
  },
  linkContainer: {
    flexDirection: 'row',
    gap: 4,
    marginTop: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

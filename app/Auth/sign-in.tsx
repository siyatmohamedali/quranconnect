import { colors } from '@/constants/theme';
import { useOAuth, useSignIn } from '@clerk/clerk-expo';
import { AntDesign } from '@expo/vector-icons';
import { Link, useRouter } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import { Alert, Pressable, Text as RNText, StyleSheet, TextInput, View } from 'react-native';

WebBrowser.maybeCompleteAuthSession();

export default function SignInPage() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google' });
  const router = useRouter();

  const [emailAddress, setEmailAddress] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const onGoogleSignIn = async () => {
    try {
      const { createdSessionId, setActive: oauthSetActive } = await startOAuthFlow();

      if (createdSessionId && oauthSetActive) {
        await oauthSetActive({ session: createdSessionId });
        router.replace('/(tabs)');
      }
    } catch (err: any) {
      console.error('OAuth error', err);
      Alert.alert('Error', err.errors?.[0]?.message || 'Google sign in failed');
    }
  };

  const onSignInPress = async () => {
    if (!isLoaded || !signIn) return;

    setLoading(true);
    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      });

      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace('/(tabs)');
      } else {
        console.error(JSON.stringify(signInAttempt, null, 2));
        Alert.alert('Error', 'Sign in failed. Please try again.');
      }
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
      Alert.alert('Error', err.errors?.[0]?.message || 'Sign in failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <RNText style={styles.title}>Sign in to QuranMatch</RNText>

      <Pressable 
        style={({ pressed }) => [styles.googleButton, pressed && styles.buttonPressed]}
        onPress={onGoogleSignIn}
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
        onPress={onSignInPress}
        disabled={!emailAddress || !password || loading}
      >
        <RNText style={styles.buttonText}>
          {loading ? 'Signing in...' : 'Continue'}
        </RNText>
      </Pressable>

      <View style={styles.linkContainer}>
        <RNText style={{ color: colors.textMuted }}>Don't have an account? </RNText>
        <Link href="/Auth/sign-up">
          <RNText style={{ color: colors.primary, fontWeight: '600' }}>Sign up</RNText>
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

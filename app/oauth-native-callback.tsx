import { useRouter } from 'expo-router';
import { ActivityIndicator, View } from 'react-native';

export default function OAuthCallback() {
  const router = useRouter();

  // This page is just a "waiting room"
  // It stops the 404 screen from showing up
  return (
    <View style={{ 
      flex: 1, 
      backgroundColor: '#0a0a0a', 
      justifyContent: 'center', 
      alignItems: 'center' 
    }}>
      <ActivityIndicator size="large" color="#FFE600" />
    </View>
  );
}
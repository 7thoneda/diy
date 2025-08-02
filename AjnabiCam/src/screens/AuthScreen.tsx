import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import GradientButton from '../components/GradientButton';
import { userActions } from '../stores/useUserStore';
import theme, { commonStyles } from '../utils/theme';

interface AuthScreenProps {
  navigation: any;
}

const AuthScreen: React.FC<AuthScreenProps> = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleAnonymousSignIn = async () => {
    setIsLoading(true);
    try {
      const user = await userActions.createUser();
      if (user) {
        navigation.replace('Onboarding');
      } else {
        Alert.alert('Error', 'Failed to create user account');
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePhoneSignIn = () => {
    Alert.alert('Coming Soon', 'Phone authentication will be available soon!');
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={theme.gradients.primary}
        style={styles.backgroundGradient}
      >
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.content}>
            <View style={styles.logoContainer}>
              <Text style={styles.logo}>AjnabiCam</Text>
              <Text style={styles.tagline}>Emotional Video Dating</Text>
            </View>

            <View style={styles.buttonContainer}>
              <GradientButton
                title="🎭 Continue Anonymously"
                onPress={handleAnonymousSignIn}
                loading={isLoading}
                variant="secondary"
                size="large"
                fullWidth
                style={styles.button}
              />
              
              <GradientButton
                title="📱 Sign in with Phone"
                onPress={handlePhoneSignIn}
                variant="primary"
                size="large"
                fullWidth
                style={styles.button}
              />
            </View>

            <Text style={styles.disclaimer}>
              By continuing, you agree to our Terms of Service and Privacy Policy
            </Text>
          </View>
        </SafeAreaView>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundGradient: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: theme.spacing.xl,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: theme.spacing.xxxl,
  },
  logo: {
    fontSize: theme.typography.fontSize.display,
    fontWeight: theme.typography.fontWeight.bold as any,
    color: theme.colors.white,
    textAlign: 'center',
    marginBottom: theme.spacing.md,
  },
  tagline: {
    fontSize: theme.typography.fontSize.lg,
    color: theme.colors.whiteOpacity70,
    textAlign: 'center',
  },
  buttonContainer: {
    gap: theme.spacing.lg,
    marginBottom: theme.spacing.xl,
  },
  button: {
    // Additional button styling if needed
  },
  disclaimer: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.whiteOpacity70,
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default AuthScreen;
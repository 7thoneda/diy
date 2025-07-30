import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import GradientButton from '../components/GradientButton';
import CoinDisplay from '../components/CoinDisplay';
import { useUserStore } from '../stores/useUserStore';
import { userActions } from '../stores/useUserStore';
import theme, { commonStyles } from '../utils/theme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface HomeScreenProps {
  navigation: any;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const { user, profile, isLoading } = useUserStore();
  const [showPremiumOffer, setShowPremiumOffer] = useState(false);
  const [callsToday, setCallsToday] = useState(0);
  const [premiumSlotsLeft] = useState(Math.floor(Math.random() * 100) + 400); // Mock data

  useEffect(() => {
    // Initialize user data
    userActions.initializeUser();
    
    // Show premium offer after 3 calls
    if (callsToday >= 3 && !userActions.checkPremiumStatus()) {
      setShowPremiumOffer(true);
    }
  }, [callsToday]);

  const handleStartVideoChat = () => {
    if (!user) {
      Alert.alert('Error', 'Please complete your profile first');
      return;
    }

    // Check if user has enough coins or is premium
    if (!user.is_premium && user.coins < 5) {
      Alert.alert(
        'Insufficient Coins',
        'You need at least 5 coins to start a video chat. Watch an ad to earn free coins!',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Earn Coins', onPress: () => navigation.navigate('Coins') },
        ]
      );
      return;
    }

    navigation.navigate('Match');
  };

  const handleWatchAd = () => {
    // Simulate ad reward
    Alert.alert(
      'Ad Reward',
      'You earned 15 coins for watching an ad!',
      [
        {
          text: 'Claim',
          onPress: () => {
            userActions.addCoins(15, 'reward', 'Watched rewarded ad');
          },
        },
      ]
    );
  };

  const handleShareApp = () => {
    Alert.alert(
      'Share AjnabiCam',
      'Invite 3 friends and get 100 coins!',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Share', onPress: () => console.log('Share app') },
      ]
    );
  };

  const handleGoToCoins = () => {
    navigation.navigate('Coins');
  };

  const handleGoToPremium = () => {
    setShowPremiumOffer(false);
    navigation.navigate('Coins'); // In real app, this would be a Premium screen
  };

  const QuickActionCard = ({ 
    title, 
    subtitle, 
    icon, 
    onPress, 
    gradient = theme.gradients.primary,
    disabled = false 
  }: {
    title: string;
    subtitle: string;
    icon: string;
    onPress: () => void;
    gradient?: string[];
    disabled?: boolean;
  }) => (
    <TouchableOpacity
      style={[styles.quickActionCard, disabled && styles.disabledCard]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
    >
      <LinearGradient
        colors={gradient}
        style={styles.quickActionGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Ionicons name={icon as any} size={32} color={theme.colors.white} />
        <Text style={styles.quickActionTitle}>{title}</Text>
        <Text style={styles.quickActionSubtitle}>{subtitle}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={theme.gradients.background}
        style={styles.backgroundGradient}
      >
        <SafeAreaView style={styles.safeArea}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <Text style={styles.welcomeText}>
                Welcome{user?.is_anonymous ? ' Stranger' : ''}! 👋
              </Text>
              <Text style={styles.appTitle}>AjnabiCam</Text>
            </View>
            <View style={styles.headerRight}>
              <CoinDisplay
                coins={user?.coins || 0}
                onPress={handleGoToCoins}
                size="medium"
              />
              {user?.is_premium && (
                <View style={styles.premiumBadge}>
                  <Ionicons name="star" size={16} color={theme.colors.white} />
                  <Text style={styles.premiumText}>PRO</Text>
                </View>
              )}
            </View>
          </View>

          <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            {/* Stats Section */}
            <View style={styles.statsContainer}>
              <LinearGradient
                colors={[theme.colors.surface, theme.colors.surfaceLight]}
                style={styles.statsCard}
              >
                <Text style={styles.statsTitle}>Today's Stats</Text>
                <View style={styles.statsRow}>
                  <View style={styles.statItem}>
                    <Text style={styles.statNumber}>{callsToday}</Text>
                    <Text style={styles.statLabel}>Video Calls</Text>
                  </View>
                  <View style={styles.statItem}>
                    <Text style={styles.statNumber}>{user?.coins || 0}</Text>
                    <Text style={styles.statLabel}>Coins</Text>
                  </View>
                  <View style={styles.statItem}>
                    <Text style={styles.statNumber}>
                      {user?.is_premium ? '∞' : '2'}
                    </Text>
                    <Text style={styles.statLabel}>Unlocks Left</Text>
                  </View>
                </View>
              </LinearGradient>
            </View>

            {/* Main Action Button */}
            <View style={styles.mainActionContainer}>
              <GradientButton
                title="🎥 Start Video Chat"
                onPress={handleStartVideoChat}
                size="large"
                fullWidth
                style={styles.mainActionButton}
              />
            </View>

            {/* Quick Actions Grid */}
            <View style={styles.quickActionsContainer}>
              <Text style={styles.sectionTitle}>Quick Actions</Text>
              <View style={styles.quickActionsGrid}>
                <QuickActionCard
                  title="Earn Coins"
                  subtitle="Watch ads"
                  icon="play-circle"
                  onPress={handleWatchAd}
                  gradient={['#FFD700', '#FFA500']}
                />
                <QuickActionCard
                  title="Share & Earn"
                  subtitle="100 coins"
                  icon="share-social"
                  onPress={handleShareApp}
                  gradient={theme.gradients.success}
                />
                <QuickActionCard
                  title="Premium"
                  subtitle="Go Pro"
                  icon="star"
                  onPress={handleGoToPremium}
                  gradient={theme.gradients.premium}
                />
                <QuickActionCard
                  title="Profile"
                  subtitle="Edit info"
                  icon="person"
                  onPress={() => navigation.navigate('Profile')}
                  gradient={theme.gradients.primaryReverse}
                />
              </View>
            </View>

            {/* Premium Countdown Banner */}
            {!user?.is_premium && (
              <View style={styles.promoContainer}>
                <LinearGradient
                  colors={theme.gradients.premium}
                  style={styles.promoBanner}
                >
                  <View style={styles.promoContent}>
                    <Text style={styles.promoTitle}>⚡ Limited Time Offer!</Text>
                    <Text style={styles.promoSubtitle}>
                      Only {premiumSlotsLeft} premium slots left today!
                    </Text>
                    <TouchableOpacity
                      style={styles.promoButton}
                      onPress={handleGoToPremium}
                    >
                      <Text style={styles.promoButtonText}>Upgrade Now - ₹29</Text>
                    </TouchableOpacity>
                  </View>
                </LinearGradient>
              </View>
            )}

            {/* Premium Offer Popup after 3 chats */}
            {showPremiumOffer && (
              <View style={styles.offerPopup}>
                <LinearGradient
                  colors={theme.gradients.premium}
                  style={styles.offerCard}
                >
                  <Text style={styles.offerTitle}>🎉 Great Job!</Text>
                  <Text style={styles.offerSubtitle}>
                    You've completed 3 chats! Want to talk longer?
                  </Text>
                  <Text style={styles.offerBonus}>Get 50 coins FREE!</Text>
                  <View style={styles.offerButtons}>
                    <TouchableOpacity
                      style={styles.offerSkipButton}
                      onPress={() => setShowPremiumOffer(false)}
                    >
                      <Text style={styles.offerSkipText}>Maybe Later</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.offerClaimButton}
                      onPress={handleGoToPremium}
                    >
                      <Text style={styles.offerClaimText}>Claim Now</Text>
                    </TouchableOpacity>
                  </View>
                </LinearGradient>
              </View>
            )}
          </ScrollView>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
  },
  headerLeft: {
    flex: 1,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  welcomeText: {
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.textSecondary,
  },
  appTitle: {
    fontSize: theme.typography.fontSize.xxl,
    fontWeight: theme.typography.fontWeight.bold as any,
    color: theme.colors.text,
  },
  premiumBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.premium,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.small,
    gap: theme.spacing.xs,
  },
  premiumText: {
    color: theme.colors.white,
    fontSize: theme.typography.fontSize.xs,
    fontWeight: theme.typography.fontWeight.bold as any,
  },
  content: {
    flex: 1,
    paddingHorizontal: theme.spacing.lg,
  },
  statsContainer: {
    marginBottom: theme.spacing.lg,
  },
  statsCard: {
    padding: theme.spacing.lg,
    borderRadius: theme.borderRadius.medium,
    ...theme.shadows.medium,
  },
  statsTitle: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: theme.typography.fontWeight.semiBold as any,
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
    textAlign: 'center',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: theme.typography.fontSize.xxl,
    fontWeight: theme.typography.fontWeight.bold as any,
    color: theme.colors.primary,
  },
  statLabel: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.xs,
  },
  mainActionContainer: {
    marginBottom: theme.spacing.xl,
  },
  mainActionButton: {
    height: 60,
  },
  quickActionsContainer: {
    marginBottom: theme.spacing.xl,
  },
  sectionTitle: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: theme.typography.fontWeight.semiBold as any,
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: theme.spacing.md,
  },
  quickActionCard: {
    width: (SCREEN_WIDTH - theme.spacing.lg * 2 - theme.spacing.md) / 2,
    height: 120,
    borderRadius: theme.borderRadius.medium,
    overflow: 'hidden',
    ...theme.shadows.medium,
  },
  disabledCard: {
    opacity: 0.6,
  },
  quickActionGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.md,
  },
  quickActionTitle: {
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.semiBold as any,
    color: theme.colors.white,
    marginTop: theme.spacing.sm,
    textAlign: 'center',
  },
  quickActionSubtitle: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.whiteOpacity70,
    textAlign: 'center',
  },
  promoContainer: {
    marginBottom: theme.spacing.xl,
  },
  promoBanner: {
    borderRadius: theme.borderRadius.medium,
    padding: theme.spacing.lg,
    ...theme.shadows.medium,
  },
  promoContent: {
    alignItems: 'center',
  },
  promoTitle: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: theme.typography.fontWeight.bold as any,
    color: theme.colors.white,
    marginBottom: theme.spacing.sm,
  },
  promoSubtitle: {
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.whiteOpacity70,
    textAlign: 'center',
    marginBottom: theme.spacing.md,
  },
  promoButton: {
    backgroundColor: theme.colors.white,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.medium,
  },
  promoButtonText: {
    color: theme.colors.premium,
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.bold as any,
  },
  offerPopup: {
    position: 'absolute',
    top: 100,
    left: theme.spacing.lg,
    right: theme.spacing.lg,
    zIndex: 1000,
  },
  offerCard: {
    padding: theme.spacing.xl,
    borderRadius: theme.borderRadius.large,
    alignItems: 'center',
    ...theme.shadows.large,
  },
  offerTitle: {
    fontSize: theme.typography.fontSize.xl,
    fontWeight: theme.typography.fontWeight.bold as any,
    color: theme.colors.white,
    marginBottom: theme.spacing.sm,
  },
  offerSubtitle: {
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.whiteOpacity70,
    textAlign: 'center',
    marginBottom: theme.spacing.sm,
  },
  offerBonus: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: theme.typography.fontWeight.bold as any,
    color: theme.colors.white,
    marginBottom: theme.spacing.lg,
  },
  offerButtons: {
    flexDirection: 'row',
    gap: theme.spacing.md,
  },
  offerSkipButton: {
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.medium,
    borderWidth: 1,
    borderColor: theme.colors.white,
  },
  offerSkipText: {
    color: theme.colors.white,
    fontSize: theme.typography.fontSize.md,
  },
  offerClaimButton: {
    backgroundColor: theme.colors.white,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.medium,
  },
  offerClaimText: {
    color: theme.colors.premium,
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.bold as any,
  },
});

export default HomeScreen;
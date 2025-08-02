import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import GradientButton from '../components/GradientButton';
import theme, { commonStyles } from '../utils/theme';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

interface OnboardingSlide {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  gradient: string[];
}

const slides: OnboardingSlide[] = [
  {
    id: 1,
    title: 'Welcome to AjnabiCam! 💕',
    subtitle: 'Emotional Video Dating',
    description: 'Connect with amazing people through live video chats. Find your perfect match with emotion-based conversations.',
    icon: 'videocam',
    gradient: theme.gradients.primary,
  },
  {
    id: 2,
    title: 'Earn Coins! 🪙',
    subtitle: 'Free Rewards System',
    description: 'Get 100 free coins to start! Earn more by watching ads, sharing with friends, or making purchases.',
    icon: 'logo-bitcoin',
    gradient: ['#FFD700', '#FFA500'],
  },
  {
    id: 3,
    title: 'Random Video Matching 🎥',
    subtitle: 'Meet New People',
    description: 'Match with random people based on your preferences. Premium users get priority matching and reconnect features.',
    icon: 'people',
    gradient: theme.gradients.success,
  },
  {
    id: 4,
    title: 'Go Premium! ⭐',
    subtitle: 'Unlock All Features',
    description: 'Remove ads, unlimited profile unlocks, reconnect anytime, and exclusive premium features. Starting at just ₹29!',
    icon: 'star',
    gradient: theme.gradients.premium,
  },
];

interface OnboardingScreenProps {
  navigation: any;
}

const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ navigation }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      const nextSlide = currentSlide + 1;
      setCurrentSlide(nextSlide);
      scrollViewRef.current?.scrollTo({
        x: nextSlide * SCREEN_WIDTH,
        animated: true,
      });
    } else {
      handleGetStarted();
    }
  };

  const handleSkip = () => {
    handleGetStarted();
  };

  const handleGetStarted = () => {
    // Navigate to main app or auth screen
    navigation.replace('MainTabs');
  };

  const handleScroll = (event: any) => {
    const slide = Math.round(event.nativeEvent.contentOffset.x / SCREEN_WIDTH);
    setCurrentSlide(slide);
  };

  const renderSlide = (slide: OnboardingSlide, index: number) => (
    <View key={slide.id} style={styles.slide}>
      <LinearGradient
        colors={slide.gradient}
        style={styles.slideGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <SafeAreaView style={styles.safeArea}>
          {/* Skip Button */}
          {index < slides.length - 1 && (
            <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
              <Text style={styles.skipText}>Skip</Text>
            </TouchableOpacity>
          )}

          {/* Content */}
          <View style={styles.content}>
            {/* Icon */}
            <View style={styles.iconContainer}>
              <Ionicons
                name={slide.icon as any}
                size={80}
                color={theme.colors.white}
              />
            </View>

            {/* Text Content */}
            <View style={styles.textContainer}>
              <Text style={styles.title}>{slide.title}</Text>
              <Text style={styles.subtitle}>{slide.subtitle}</Text>
              <Text style={styles.description}>{slide.description}</Text>
            </View>

            {/* Coin Bonus for first slide */}
            {index === 0 && (
              <View style={styles.bonusContainer}>
                <View style={styles.coinBonus}>
                  <Ionicons name="logo-bitcoin" size={24} color={theme.colors.coin} />
                  <Text style={styles.bonusText}>+100 Free Coins!</Text>
                </View>
              </View>
            )}
          </View>

          {/* Bottom Section */}
          <View style={styles.bottomSection}>
            {/* Pagination Dots */}
            <View style={styles.pagination}>
              {slides.map((_, idx) => (
                <View
                  key={idx}
                  style={[
                    styles.dot,
                    {
                      backgroundColor: idx === index ? theme.colors.white : theme.colors.whiteOpacity50,
                    },
                  ]}
                />
              ))}
            </View>

            {/* Action Button */}
            <GradientButton
              title={index === slides.length - 1 ? 'Get Started' : 'Next'}
              onPress={handleNext}
              variant="secondary"
              size="large"
              fullWidth
              style={styles.actionButton}
            />
          </View>
        </SafeAreaView>
      </LinearGradient>
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScroll}
        scrollEventThrottle={16}
      >
        {slides.map((slide, index) => renderSlide(slide, index))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  slide: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  },
  slideGradient: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  skipButton: {
    position: 'absolute',
    top: 60,
    right: 20,
    zIndex: 1,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
  },
  skipText: {
    color: theme.colors.white,
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.medium as any,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.xl,
  },
  iconContainer: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: theme.colors.whiteOpacity50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.xxl,
    ...theme.shadows.large,
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
  },
  title: {
    fontSize: theme.typography.fontSize.xxxl,
    fontWeight: theme.typography.fontWeight.bold as any,
    color: theme.colors.white,
    textAlign: 'center',
    marginBottom: theme.spacing.md,
  },
  subtitle: {
    fontSize: theme.typography.fontSize.xl,
    fontWeight: theme.typography.fontWeight.semiBold as any,
    color: theme.colors.whiteOpacity70,
    textAlign: 'center',
    marginBottom: theme.spacing.lg,
  },
  description: {
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.whiteOpacity70,
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: theme.spacing.md,
  },
  bonusContainer: {
    alignItems: 'center',
  },
  coinBonus: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.whiteOpacity50,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.large,
    ...theme.shadows.medium,
  },
  bonusText: {
    marginLeft: theme.spacing.sm,
    fontSize: theme.typography.fontSize.lg,
    fontWeight: theme.typography.fontWeight.bold as any,
    color: theme.colors.white,
  },
  bottomSection: {
    paddingHorizontal: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginHorizontal: 6,
  },
  actionButton: {
    marginTop: theme.spacing.md,
  },
});

export default OnboardingScreen;
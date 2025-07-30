import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import GradientButton from '../components/GradientButton';
import CoinDisplay from '../components/CoinDisplay';
import { useUserStore } from '../stores/useUserStore';
import theme, { commonStyles } from '../utils/theme';

interface CoinsScreenProps {
  navigation: any;
}

const CoinsScreen: React.FC<CoinsScreenProps> = ({ navigation }) => {
  const { user } = useUserStore();

  const coinPacks = [
    { id: '1', coins: 30, price: 29, bonus: 0, isPopular: false },
    { id: '2', coins: 100, price: 99, bonus: 0, isPopular: true },
    { id: '3', coins: 350, price: 299, bonus: 50, isPopular: false },
  ];

  const premiumPlans = [
    { id: '1', name: '1-Day Premium', price: 29, duration: '1 day' },
    { id: '2', name: 'Weekly Premium', price: 199, duration: '7 days' },
    { id: '3', name: 'Monthly Premium', price: 299, duration: '30 days' },
    { id: '4', name: 'Lifetime Premium', price: 899, duration: 'Forever' },
  ];

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={theme.gradients.background}
        style={styles.backgroundGradient}
      >
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.header}>
            <Text style={commonStyles.headerTitle}>Coins & Premium</Text>
            <CoinDisplay coins={user?.coins || 0} size="large" />
          </View>

          <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            {/* Coin Packs */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>💰 Coin Packs</Text>
              {coinPacks.map((pack) => (
                <View key={pack.id} style={styles.packCard}>
                  <LinearGradient
                    colors={['#FFD700', '#FFA500']}
                    style={styles.packGradient}
                  >
                    {pack.isPopular && (
                      <View style={styles.popularBadge}>
                        <Text style={styles.popularText}>POPULAR</Text>
                      </View>
                    )}
                    <View style={styles.packContent}>
                      <Text style={styles.packCoins}>
                        {pack.coins}{pack.bonus > 0 ? ` + ${pack.bonus}` : ''} Coins
                      </Text>
                      <Text style={styles.packPrice}>₹{pack.price}</Text>
                    </View>
                    <GradientButton
                      title="Buy Now"
                      onPress={() => console.log('Buy pack', pack.id)}
                      variant="primary"
                      size="small"
                    />
                  </LinearGradient>
                </View>
              ))}
            </View>

            {/* Premium Plans */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>⭐ Premium Plans</Text>
              {premiumPlans.map((plan) => (
                <View key={plan.id} style={styles.planCard}>
                  <LinearGradient
                    colors={theme.gradients.premium}
                    style={styles.planGradient}
                  >
                    <View style={styles.planContent}>
                      <Text style={styles.planName}>{plan.name}</Text>
                      <Text style={styles.planDuration}>{plan.duration}</Text>
                      <Text style={styles.planPrice}>₹{plan.price}</Text>
                    </View>
                    <GradientButton
                      title="Upgrade"
                      onPress={() => console.log('Buy plan', plan.id)}
                      variant="secondary"
                      size="small"
                    />
                  </LinearGradient>
                </View>
              ))}
            </View>

            {/* Premium Features */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>✨ Premium Features</Text>
              <View style={styles.featuresCard}>
                <Text style={styles.featureItem}>• No ads</Text>
                <Text style={styles.featureItem}>• Unlimited profile unlocks</Text>
                <Text style={styles.featureItem}>• Priority matching</Text>
                <Text style={styles.featureItem}>• Reconnect anytime</Text>
                <Text style={styles.featureItem}>• AI assistant for flirting</Text>
                <Text style={styles.featureItem}>• Exclusive premium badge</Text>
              </View>
            </View>
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
  content: {
    flex: 1,
    paddingHorizontal: theme.spacing.lg,
  },
  section: {
    marginBottom: theme.spacing.xl,
  },
  sectionTitle: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: theme.typography.fontWeight.bold as any,
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
  },
  packCard: {
    marginBottom: theme.spacing.md,
    borderRadius: theme.borderRadius.medium,
    overflow: 'hidden',
    ...theme.shadows.medium,
  },
  packGradient: {
    padding: theme.spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  popularBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: theme.colors.error,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderBottomLeftRadius: theme.borderRadius.small,
  },
  popularText: {
    color: theme.colors.white,
    fontSize: theme.typography.fontSize.xs,
    fontWeight: theme.typography.fontWeight.bold as any,
  },
  packContent: {
    flex: 1,
  },
  packCoins: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: theme.typography.fontWeight.bold as any,
    color: theme.colors.textDark,
  },
  packPrice: {
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.textDark,
  },
  planCard: {
    marginBottom: theme.spacing.md,
    borderRadius: theme.borderRadius.medium,
    overflow: 'hidden',
    ...theme.shadows.medium,
  },
  planGradient: {
    padding: theme.spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  planContent: {
    flex: 1,
  },
  planName: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: theme.typography.fontWeight.bold as any,
    color: theme.colors.white,
  },
  planDuration: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.whiteOpacity70,
  },
  planPrice: {
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.semiBold as any,
    color: theme.colors.white,
  },
  featuresCard: {
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.lg,
    borderRadius: theme.borderRadius.medium,
    ...theme.shadows.medium,
  },
  featureItem: {
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
    lineHeight: 22,
  },
});

export default CoinsScreen;
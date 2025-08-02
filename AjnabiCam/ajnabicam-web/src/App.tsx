import React, { useState } from 'react';
import './App.css';

const AjnabiCam: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<'auth' | 'onboarding' | 'home'>('auth');
  const [onboardingSlide, setOnboardingSlide] = useState(0);
  const [coins, setCoins] = useState(100);
  const [isPremium, setIsPremium] = useState(false);

  const handleAnonymousLogin = () => {
    setCurrentScreen('onboarding');
  };

  const nextOnboardingSlide = () => {
    if (onboardingSlide < 3) {
      setOnboardingSlide(onboardingSlide + 1);
    } else {
      setCurrentScreen('home');
    }
  };

  const buyCoinPack = (amount: number, price: number) => {
    setCoins(coins + amount);
    alert(`✅ Purchased ${amount} coins for ₹${price}! You now have ${coins + amount} coins.`);
  };

  const upgradeToPremium = (plan: string, price: number) => {
    setIsPremium(true);
    alert(`🌟 Welcome to Premium! You've upgraded to ${plan} for ₹${price}.`);
  };

  const watchAd = () => {
    setCoins(coins + 15);
    alert('🎉 You earned 15 coins for watching an ad!');
  };

  // Auth Screen
  if (currentScreen === 'auth') {
    return (
      <div className="screen auth-screen">
        <div className="gradient-bg primary-gradient">
          <div className="auth-content">
            <div className="logo-container">
              <h1 className="logo">AjnabiCam</h1>
              <p className="tagline">Emotional Video Dating</p>
            </div>
            <div className="auth-buttons">
              <button className="btn btn-secondary" onClick={handleAnonymousLogin}>
                🎭 Continue Anonymously
              </button>
              <button className="btn btn-primary" onClick={() => alert('Phone auth coming soon!')}>
                📱 Sign in with Phone
              </button>
            </div>
            <p className="disclaimer">
              By continuing, you agree to our Terms of Service and Privacy Policy
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Onboarding Screen
  if (currentScreen === 'onboarding') {
    const slides = [
      {
        icon: '💕',
        title: 'Welcome to AjnabiCam!',
        subtitle: 'Emotional Video Dating',
        description: 'Connect with amazing people through live video chats. Find your perfect match with emotion-based conversations.',
        gradient: 'primary-gradient'
      },
      {
        icon: '🪙',
        title: 'Earn Coins!',
        subtitle: 'Free Rewards System',
        description: 'Get 100 free coins to start! Earn more by watching ads, sharing with friends, or making purchases.',
        gradient: 'coin-gradient'
      },
      {
        icon: '🎥',
        title: 'Random Video Matching',
        subtitle: 'Meet New People',
        description: 'Match with random people based on your preferences. Premium users get priority matching and reconnect features.',
        gradient: 'success-gradient'
      },
      {
        icon: '⭐',
        title: 'Go Premium!',
        subtitle: 'Unlock All Features',
        description: 'Remove ads, unlimited profile unlocks, reconnect anytime, and exclusive premium features. Starting at just ₹29!',
        gradient: 'premium-gradient'
      }
    ];

    const slide = slides[onboardingSlide];

    return (
      <div className="screen onboarding-screen">
        <div className={`gradient-bg ${slide.gradient}`}>
          <div className="onboarding-content">
            <div className="slide-indicator">
              {slides.map((_, index) => (
                <div 
                  key={index} 
                  className={`dot ${index === onboardingSlide ? 'active' : ''}`}
                />
              ))}
            </div>
            
            <div className="slide-content">
              <div className="icon-container">
                <span className="slide-icon">{slide.icon}</span>
              </div>
              <h2 className="slide-title">{slide.title}</h2>
              <h3 className="slide-subtitle">{slide.subtitle}</h3>
              <p className="slide-description">{slide.description}</p>
              
              {onboardingSlide === 0 && (
                <div className="coin-bonus">
                  <span className="bonus-text">🪙 +100 Free Coins!</span>
                </div>
              )}
            </div>

            <button className="btn btn-large" onClick={nextOnboardingSlide}>
              {onboardingSlide === 3 ? 'Get Started' : 'Next'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Home Screen
  return (
    <div className="screen home-screen">
      <div className="gradient-bg dark-gradient">
        {/* Header */}
        <header className="header">
          <div className="header-left">
            <h1 className="welcome-text">Welcome! 👋</h1>
            <h2 className="app-title">AjnabiCam</h2>
          </div>
          <div className="header-right">
            <div className="coin-display">
              <span className="coin-icon">🪙</span>
              <span className="coin-amount">{coins}</span>
            </div>
            {isPremium && (
              <div className="premium-badge">
                <span>⭐ PRO</span>
              </div>
            )}
          </div>
        </header>

        {/* Stats Card */}
        <div className="stats-card">
          <h3>Today's Stats</h3>
          <div className="stats-row">
            <div className="stat-item">
              <div className="stat-number">0</div>
              <div className="stat-label">Video Calls</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">{coins}</div>
              <div className="stat-label">Coins</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">{isPremium ? '∞' : '2'}</div>
              <div className="stat-label">Unlocks Left</div>
            </div>
          </div>
        </div>

        {/* Main Action Button */}
        <button className="btn btn-large btn-video-chat">
          🎥 Start Video Chat
        </button>

        {/* Quick Actions Grid */}
        <div className="quick-actions">
          <h3>Quick Actions</h3>
          <div className="actions-grid">
            <div className="action-card coin-card" onClick={watchAd}>
              <span className="action-icon">▶️</span>
              <div className="action-text">
                <div className="action-title">Earn Coins</div>
                <div className="action-subtitle">Watch ads</div>
              </div>
            </div>
            <div className="action-card share-card" onClick={() => alert('Share feature coming soon!')}>
              <span className="action-icon">📤</span>
              <div className="action-text">
                <div className="action-title">Share & Earn</div>
                <div className="action-subtitle">100 coins</div>
              </div>
            </div>
            <div className="action-card premium-card" onClick={() => upgradeToPremium('Premium', 29)}>
              <span className="action-icon">⭐</span>
              <div className="action-text">
                <div className="action-title">Premium</div>
                <div className="action-subtitle">Go Pro</div>
              </div>
            </div>
            <div className="action-card profile-card" onClick={() => alert('Profile editing coming soon!')}>
              <span className="action-icon">👤</span>
              <div className="action-text">
                <div className="action-title">Profile</div>
                <div className="action-subtitle">Edit info</div>
              </div>
            </div>
          </div>
        </div>

        {/* Coin Packs */}
        <div className="coin-section">
          <h3>💰 Coin Packs</h3>
          <div className="coin-packs">
            <div className="coin-pack" onClick={() => buyCoinPack(30, 29)}>
              <div className="pack-coins">30 Coins</div>
              <div className="pack-price">₹29</div>
            </div>
            <div className="coin-pack popular" onClick={() => buyCoinPack(100, 99)}>
              <div className="popular-label">POPULAR</div>
              <div className="pack-coins">100 Coins</div>
              <div className="pack-price">₹99</div>
            </div>
            <div className="coin-pack" onClick={() => buyCoinPack(350, 299)}>
              <div className="pack-coins">350 + 50 Coins</div>
              <div className="pack-price">₹299</div>
            </div>
          </div>
        </div>

        {/* Premium Plans */}
        <div className="premium-section">
          <h3>⭐ Premium Plans</h3>
          <div className="premium-plans">
            <div className="premium-plan" onClick={() => upgradeToPremium('1-Day Premium', 29)}>
              <div className="plan-name">1-Day Premium</div>
              <div className="plan-price">₹29</div>
            </div>
            <div className="premium-plan" onClick={() => upgradeToPremium('Weekly Premium', 199)}>
              <div className="plan-name">Weekly Premium</div>
              <div className="plan-price">₹199</div>
            </div>
            <div className="premium-plan" onClick={() => upgradeToPremium('Monthly Premium', 299)}>
              <div className="plan-name">Monthly Premium</div>
              <div className="plan-price">₹299</div>
            </div>
            <div className="premium-plan lifetime" onClick={() => upgradeToPremium('Lifetime Premium', 899)}>
              <div className="plan-name">Lifetime Premium</div>
              <div className="plan-price">₹899</div>
            </div>
          </div>
        </div>

        {/* Premium Offer Banner */}
        {!isPremium && (
          <div className="promo-banner">
            <div className="promo-content">
              <h4>⚡ Limited Time Offer!</h4>
              <p>Only 423 premium slots left today!</p>
              <button className="btn btn-promo" onClick={() => upgradeToPremium('Premium', 29)}>
                Upgrade Now - ₹29
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AjnabiCam;

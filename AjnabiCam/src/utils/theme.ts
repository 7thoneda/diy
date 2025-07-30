export const theme = {
  colors: {
    // Primary brand colors - warm pinks and oranges
    primary: '#F85888',
    primaryLight: '#FF7BA5',
    primaryDark: '#E63575',
    secondary: '#FF7A59',
    secondaryLight: '#FF9675',
    secondaryDark: '#E55A39',
    
    // Gradient colors
    gradientStart: '#F85888',
    gradientEnd: '#FF7A59',
    
    // Background colors
    background: '#000000',
    backgroundSecondary: '#1A1A1A',
    backgroundTertiary: '#2A2A2A',
    surface: '#333333',
    surfaceLight: '#404040',
    
    // Text colors
    text: '#FFFFFF',
    textSecondary: '#B0B0B0',
    textTertiary: '#808080',
    textDark: '#000000',
    
    // Status colors
    success: '#4CAF50',
    warning: '#FF9800',
    error: '#F44336',
    info: '#2196F3',
    
    // Coin colors
    coin: '#FFD700',
    coinShadow: '#B8860B',
    
    // Premium colors
    premium: '#9C27B0',
    premiumLight: '#E1BEE7',
    
    // Video call colors
    callActive: '#4CAF50',
    callInactive: '#F44336',
    
    // Transparent overlays
    overlay: 'rgba(0, 0, 0, 0.5)',
    overlayLight: 'rgba(0, 0, 0, 0.3)',
    
    // White with opacity
    white: '#FFFFFF',
    whiteOpacity50: 'rgba(255, 255, 255, 0.5)',
    whiteOpacity70: 'rgba(255, 255, 255, 0.7)',
  },
  
  gradients: {
    primary: ['#F85888', '#FF7A59'],
    primaryReverse: ['#FF7A59', '#F85888'],
    background: ['#1A1A1A', '#000000'],
    premium: ['#9C27B0', '#E91E63'],
    success: ['#4CAF50', '#8BC34A'],
    warning: ['#FF9800', '#FFC107'],
  },
  
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
    xxxl: 64,
  },
  
  borderRadius: {
    small: 8,
    medium: 16,
    large: 24,
    xl: 32,
    round: 50,
  },
  
  typography: {
    // Font families (will need to be loaded)
    fontFamily: {
      regular: 'System',
      medium: 'System',
      semiBold: 'System',
      bold: 'System',
    },
    
    // Font sizes
    fontSize: {
      xs: 12,
      sm: 14,
      md: 16,
      lg: 18,
      xl: 20,
      xxl: 24,
      xxxl: 32,
      display: 48,
    },
    
    // Line heights
    lineHeight: {
      tight: 1.2,
      normal: 1.4,
      relaxed: 1.6,
    },
    
    // Font weights
    fontWeight: {
      light: '300',
      normal: '400',
      medium: '500',
      semiBold: '600',
      bold: '700',
      extraBold: '800',
    },
  },
  
  shadows: {
    small: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    medium: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 8,
      elevation: 4,
    },
    large: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.2,
      shadowRadius: 16,
      elevation: 8,
    },
    glow: {
      shadowColor: '#F85888',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.3,
      shadowRadius: 10,
      elevation: 5,
    },
  },
  
  layout: {
    screenPadding: 20,
    cardPadding: 16,
    buttonHeight: 50,
    inputHeight: 50,
    headerHeight: 60,
    tabBarHeight: 80,
    avatarSize: {
      small: 40,
      medium: 60,
      large: 80,
      xl: 120,
    },
  },
  
  animation: {
    duration: {
      fast: 200,
      normal: 300,
      slow: 500,
    },
    easing: {
      easeIn: 'ease-in',
      easeOut: 'ease-out',
      easeInOut: 'ease-in-out',
      bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    },
  },
};

// Style helpers
export const createGradientStyle = (colors: string[], direction = '135deg') => ({
  background: `linear-gradient(${direction}, ${colors.join(', ')})`,
});

export const createShadowStyle = (shadowConfig: any) => shadowConfig;

// Common component styles
export const commonStyles = {
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  
  centerContainer: {
    flex: 1,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    backgroundColor: theme.colors.background,
  },
  
  screenPadding: {
    paddingHorizontal: theme.layout.screenPadding,
  },
  
  cardContainer: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.medium,
    padding: theme.layout.cardPadding,
    ...theme.shadows.medium,
  },
  
  primaryButton: {
    height: theme.layout.buttonHeight,
    borderRadius: theme.borderRadius.large,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    paddingHorizontal: theme.spacing.lg,
  },
  
  textInput: {
    height: theme.layout.inputHeight,
    borderRadius: theme.borderRadius.medium,
    paddingHorizontal: theme.spacing.md,
    backgroundColor: theme.colors.surface,
    color: theme.colors.text,
    fontSize: theme.typography.fontSize.md,
  },
  
  headerTitle: {
    fontSize: theme.typography.fontSize.xl,
    fontWeight: theme.typography.fontWeight.bold as any,
    color: theme.colors.text,
    textAlign: 'center' as const,
  },
  
  bodyText: {
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.text,
    lineHeight: theme.typography.fontSize.md * theme.typography.lineHeight.normal,
  },
  
  captionText: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textSecondary,
    lineHeight: theme.typography.fontSize.sm * theme.typography.lineHeight.normal,
  },
  
  avatarContainer: {
    borderRadius: theme.borderRadius.round,
    overflow: 'hidden' as const,
    ...theme.shadows.medium,
  },
  
  bottomSheetContainer: {
    backgroundColor: theme.colors.backgroundSecondary,
    borderTopLeftRadius: theme.borderRadius.large,
    borderTopRightRadius: theme.borderRadius.large,
    padding: theme.spacing.lg,
  },
  
  modalOverlay: {
    flex: 1,
    backgroundColor: theme.colors.overlay,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
  },
  
  modalContent: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.large,
    padding: theme.spacing.xl,
    margin: theme.spacing.lg,
    ...theme.shadows.large,
  },
  
  coinBadge: {
    backgroundColor: theme.colors.coin,
    borderRadius: theme.borderRadius.round,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    ...theme.shadows.small,
  },
  
  premiumBadge: {
    backgroundColor: theme.colors.premium,
    borderRadius: theme.borderRadius.small,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
  },
  
  loadingContainer: {
    flex: 1,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    backgroundColor: theme.colors.background,
  },
  
  errorContainer: {
    backgroundColor: theme.colors.error,
    borderRadius: theme.borderRadius.medium,
    padding: theme.spacing.md,
    margin: theme.spacing.md,
  },
  
  successContainer: {
    backgroundColor: theme.colors.success,
    borderRadius: theme.borderRadius.medium,
    padding: theme.spacing.md,
    margin: theme.spacing.md,
  },
  
  fab: {
    position: 'absolute' as const,
    bottom: theme.spacing.xl,
    right: theme.spacing.xl,
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    ...theme.shadows.large,
  },
};

export default theme;
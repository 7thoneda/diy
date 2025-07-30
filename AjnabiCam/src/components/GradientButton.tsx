import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import theme, { commonStyles } from '../utils/theme';

interface GradientButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  variant?: 'primary' | 'secondary' | 'premium' | 'success' | 'warning';
  size?: 'small' | 'medium' | 'large';
  style?: ViewStyle;
  textStyle?: TextStyle;
  fullWidth?: boolean;
}

const GradientButton: React.FC<GradientButtonProps> = ({
  title,
  onPress,
  disabled = false,
  loading = false,
  variant = 'primary',
  size = 'medium',
  style,
  textStyle,
  fullWidth = false,
}) => {
  const getGradientColors = () => {
    switch (variant) {
      case 'primary':
        return theme.gradients.primary;
      case 'secondary':
        return theme.gradients.primaryReverse;
      case 'premium':
        return theme.gradients.premium;
      case 'success':
        return theme.gradients.success;
      case 'warning':
        return theme.gradients.warning;
      default:
        return theme.gradients.primary;
    }
  };

  const getButtonHeight = () => {
    switch (size) {
      case 'small':
        return 40;
      case 'medium':
        return theme.layout.buttonHeight;
      case 'large':
        return 60;
      default:
        return theme.layout.buttonHeight;
    }
  };

  const getFontSize = () => {
    switch (size) {
      case 'small':
        return theme.typography.fontSize.sm;
      case 'medium':
        return theme.typography.fontSize.md;
      case 'large':
        return theme.typography.fontSize.lg;
      default:
        return theme.typography.fontSize.md;
    }
  };

  const buttonStyle = [
    styles.button,
    {
      height: getButtonHeight(),
      width: fullWidth ? '100%' : undefined,
      opacity: disabled || loading ? 0.6 : 1,
    },
    style,
  ];

  const textStyles = [
    styles.text,
    {
      fontSize: getFontSize(),
    },
    textStyle,
  ];

  return (
    <TouchableOpacity
      style={buttonStyle}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      <LinearGradient
        colors={getGradientColors()}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        <Text style={textStyles}>
          {loading ? 'Loading...' : title}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: theme.borderRadius.large,
    overflow: 'hidden',
    ...theme.shadows.medium,
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.lg,
  },
  text: {
    color: theme.colors.white,
    fontWeight: theme.typography.fontWeight.semiBold as any,
    textAlign: 'center',
  },
});

export default GradientButton;
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import theme from '../utils/theme';

interface CoinDisplayProps {
  coins: number;
  onPress?: () => void;
  size?: 'small' | 'medium' | 'large';
  showIcon?: boolean;
  animated?: boolean;
}

const CoinDisplay: React.FC<CoinDisplayProps> = ({
  coins,
  onPress,
  size = 'medium',
  showIcon = true,
  animated = false,
}) => {
  const getIconSize = () => {
    switch (size) {
      case 'small':
        return 16;
      case 'medium':
        return 20;
      case 'large':
        return 24;
      default:
        return 20;
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

  const getPadding = () => {
    switch (size) {
      case 'small':
        return theme.spacing.xs;
      case 'medium':
        return theme.spacing.sm;
      case 'large':
        return theme.spacing.md;
      default:
        return theme.spacing.sm;
    }
  };

  const formatCoins = (amount: number) => {
    if (amount >= 1000000) {
      return `${(amount / 1000000).toFixed(1)}M`;
    } else if (amount >= 1000) {
      return `${(amount / 1000).toFixed(1)}K`;
    }
    return amount.toString();
  };

  const containerStyle = [
    styles.container,
    {
      paddingHorizontal: getPadding() * 1.5,
      paddingVertical: getPadding(),
    },
    onPress && styles.pressable,
  ];

  const textStyle = [
    styles.text,
    {
      fontSize: getFontSize(),
    },
  ];

  const content = (
    <View style={containerStyle}>
      {showIcon && (
        <Ionicons
          name="logo-bitcoin"
          size={getIconSize()}
          color={theme.colors.coin}
          style={styles.icon}
        />
      )}
      <Text style={textStyle}>{formatCoins(coins)}</Text>
    </View>
  );

  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
        {content}
      </TouchableOpacity>
    );
  }

  return content;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.coin,
    borderRadius: theme.borderRadius.round,
    ...theme.shadows.small,
  },
  pressable: {
    ...theme.shadows.medium,
  },
  icon: {
    marginRight: theme.spacing.xs,
  },
  text: {
    color: theme.colors.textDark,
    fontWeight: theme.typography.fontWeight.bold as any,
  },
});

export default CoinDisplay;
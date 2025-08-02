import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import GradientButton from '../components/GradientButton';
import theme, { commonStyles } from '../utils/theme';

interface MatchScreenProps {
  navigation: any;
}

const MatchScreen: React.FC<MatchScreenProps> = ({ navigation }) => {
  return (
    <SafeAreaView style={[commonStyles.container, commonStyles.centerContainer]}>
      <Text style={commonStyles.headerTitle}>Video Matching</Text>
      <Text style={[commonStyles.bodyText, { textAlign: 'center', marginVertical: theme.spacing.lg }]}>
        Find random people to video chat with!
      </Text>
      <GradientButton
        title="Start Matching"
        onPress={() => navigation.navigate('VideoCall')}
        variant="primary"
        size="large"
      />
    </SafeAreaView>
  );
};

export default MatchScreen;
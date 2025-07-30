import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import GradientButton from '../components/GradientButton';
import theme, { commonStyles } from '../utils/theme';

interface VideoCallScreenProps {
  navigation: any;
}

const VideoCallScreen: React.FC<VideoCallScreenProps> = ({ navigation }) => {
  const handleEndCall = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={[commonStyles.container, commonStyles.centerContainer]}>
      <Text style={commonStyles.headerTitle}>Video Call</Text>
      <Text style={[commonStyles.bodyText, { textAlign: 'center', marginVertical: theme.spacing.lg }]}>
        Video call interface will be implemented here
      </Text>
      <GradientButton
        title="End Call"
        onPress={handleEndCall}
        variant="warning"
        size="large"
      />
    </SafeAreaView>
  );
};

export default VideoCallScreen;
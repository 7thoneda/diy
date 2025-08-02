import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import theme, { commonStyles } from '../utils/theme';

interface MessagesScreenProps {
  navigation: any;
}

const MessagesScreen: React.FC<MessagesScreenProps> = ({ navigation }) => {
  return (
    <SafeAreaView style={[commonStyles.container, commonStyles.centerContainer]}>
      <Text style={commonStyles.headerTitle}>Messages</Text>
      <Text style={[commonStyles.bodyText, { textAlign: 'center', marginTop: theme.spacing.lg }]}>
        Your conversations will appear here
      </Text>
    </SafeAreaView>
  );
};

export default MessagesScreen;
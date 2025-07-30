import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import theme, { commonStyles } from '../utils/theme';

interface ProfileScreenProps {
  navigation: any;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ navigation }) => {
  return (
    <SafeAreaView style={[commonStyles.container, commonStyles.centerContainer]}>
      <Text style={commonStyles.headerTitle}>Profile</Text>
      <Text style={[commonStyles.bodyText, { textAlign: 'center', marginTop: theme.spacing.lg }]}>
        Manage your profile and settings
      </Text>
    </SafeAreaView>
  );
};

export default ProfileScreen;
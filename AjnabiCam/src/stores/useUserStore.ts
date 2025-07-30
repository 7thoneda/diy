import { create } from 'zustand';
import { User, UserProfile, UserStore } from '../types';
import { DatabaseService } from '../services/database';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useUserStore = create<UserStore>((set, get) => ({
  user: null,
  profile: null,
  isLoading: false,
  error: null,

  setUser: (user: User | null) => {
    set({ user });
    if (user) {
      AsyncStorage.setItem('user', JSON.stringify(user));
    } else {
      AsyncStorage.removeItem('user');
    }
  },

  setProfile: (profile: UserProfile | null) => {
    set({ profile });
    if (profile) {
      AsyncStorage.setItem('profile', JSON.stringify(profile));
    } else {
      AsyncStorage.removeItem('profile');
    }
  },

  updateCoins: (amount: number) => {
    const { user } = get();
    if (user) {
      const updatedUser = { ...user, coins: user.coins + amount };
      set({ user: updatedUser });
      AsyncStorage.setItem('user', JSON.stringify(updatedUser));
    }
  },

  setPremium: (isPremium: boolean, expiresAt?: string) => {
    const { user } = get();
    if (user) {
      const updatedUser = { 
        ...user, 
        is_premium: isPremium,
        premium_expires_at: expiresAt 
      };
      set({ user: updatedUser });
      AsyncStorage.setItem('user', JSON.stringify(updatedUser));
    }
  },

  setLoading: (loading: boolean) => set({ isLoading: loading }),
  
  setError: (error: string | null) => set({ error }),
  
  clearError: () => set({ error: null }),
}));

// Helper functions for user operations
export const userActions = {
  // Initialize user from storage
  initializeUser: async () => {
    try {
      const userStr = await AsyncStorage.getItem('user');
      const profileStr = await AsyncStorage.getItem('profile');
      
      if (userStr) {
        const user = JSON.parse(userStr);
        useUserStore.getState().setUser(user);
        
        // Fetch fresh data from server
        const freshUser = await DatabaseService.getUserById(user.id);
        if (freshUser) {
          useUserStore.getState().setUser(freshUser);
        }
      }
      
      if (profileStr) {
        const profile = JSON.parse(profileStr);
        useUserStore.getState().setProfile(profile);
        
        // Fetch fresh profile data
        if (profile.user_id) {
          const freshProfile = await DatabaseService.getUserProfile(profile.user_id);
          if (freshProfile) {
            useUserStore.getState().setProfile(freshProfile);
          }
        }
      }
    } catch (error) {
      console.error('Error initializing user:', error);
    }
  },

  // Create new user
  createUser: async (phoneNumber?: string, deviceId?: string) => {
    useUserStore.getState().setLoading(true);
    useUserStore.getState().clearError();
    
    try {
      const user = await DatabaseService.createUser(phoneNumber, deviceId);
      if (user) {
        useUserStore.getState().setUser(user);
        return user;
      } else {
        throw new Error('Failed to create user');
      }
    } catch (error) {
      useUserStore.getState().setError(error instanceof Error ? error.message : 'Unknown error');
      return null;
    } finally {
      useUserStore.getState().setLoading(false);
    }
  },

  // Update user profile
  updateProfile: async (updates: Partial<UserProfile>) => {
    useUserStore.getState().setLoading(true);
    useUserStore.getState().clearError();
    
    try {
      const { user } = useUserStore.getState();
      if (!user) throw new Error('No user found');

      const updatedProfile = await DatabaseService.updateUserProfile(user.id, updates);
      if (updatedProfile) {
        useUserStore.getState().setProfile(updatedProfile);
        return updatedProfile;
      } else {
        throw new Error('Failed to update profile');
      }
    } catch (error) {
      useUserStore.getState().setError(error instanceof Error ? error.message : 'Unknown error');
      return null;
    } finally {
      useUserStore.getState().setLoading(false);
    }
  },

  // Spend coins
  spendCoins: async (amount: number, type: string, description: string) => {
    const { user } = useUserStore.getState();
    if (!user) return false;

    if (user.coins < amount) {
      useUserStore.getState().setError('Insufficient coins');
      return false;
    }

    try {
      const success = await DatabaseService.addCoinTransaction(
        user.id, 
        -amount, 
        type as any, 
        description
      );
      
      if (success) {
        useUserStore.getState().updateCoins(-amount);
        return true;
      }
      return false;
    } catch (error) {
      useUserStore.getState().setError(error instanceof Error ? error.message : 'Unknown error');
      return false;
    }
  },

  // Add coins (rewards, purchases)
  addCoins: async (amount: number, type: string, description: string) => {
    const { user } = useUserStore.getState();
    if (!user) return false;

    try {
      const success = await DatabaseService.addCoinTransaction(
        user.id, 
        amount, 
        type as any, 
        description
      );
      
      if (success) {
        useUserStore.getState().updateCoins(amount);
        return true;
      }
      return false;
    } catch (error) {
      useUserStore.getState().setError(error instanceof Error ? error.message : 'Unknown error');
      return false;
    }
  },

  // Update last active
  updateLastActive: async () => {
    const { user } = useUserStore.getState();
    if (user) {
      await DatabaseService.updateLastActive(user.id);
    }
  },

  // Check premium status
  checkPremiumStatus: () => {
    const { user } = useUserStore.getState();
    if (!user || !user.is_premium) return false;
    
    if (user.premium_expires_at) {
      const expiryDate = new Date(user.premium_expires_at);
      const now = new Date();
      
      if (now > expiryDate) {
        // Premium expired, update user
        useUserStore.getState().setPremium(false);
        return false;
      }
    }
    
    return true;
  },

  // Sign out
  signOut: async () => {
    useUserStore.getState().setUser(null);
    useUserStore.getState().setProfile(null);
    await AsyncStorage.clear();
  },
};
import { supabase } from './supabase';
import { 
  User, 
  UserProfile, 
  CoinTransaction, 
  VideoCall, 
  Match, 
  Message, 
  PremiumPlan,
  CoinPack,
  RazorpayOrder,
  AppConfig 
} from '../types';
import * as Device from 'expo-device';

export class DatabaseService {
  // User Management
  static async createUser(phoneNumber?: string, deviceId?: string): Promise<User | null> {
    try {
      const newDeviceId = deviceId || Device.deviceId || `device_${Date.now()}`;
      
      const { data, error } = await supabase
        .from('users')
        .insert({
          phone_number: phoneNumber,
          is_anonymous: !phoneNumber,
          interests: [],
          photos: [],
          coins: 100, // Free signup coins
          is_premium: false,
          is_verified: false,
          device_id: newDeviceId,
          last_active: new Date().toISOString(),
        })
        .select()
        .single();

      if (error) throw error;

      // Record the signup bonus transaction
      if (data) {
        await this.addCoinTransaction(data.id, 100, 'signup_bonus', 'Welcome bonus for new user');
      }

      return data;
    } catch (error) {
      console.error('Error creating user:', error);
      return null;
    }
  }

  static async getUserById(userId: string): Promise<User | null> {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching user:', error);
      return null;
    }
  }

  static async getUserByPhone(phoneNumber: string): Promise<User | null> {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('phone_number', phoneNumber)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching user by phone:', error);
      return null;
    }
  }

  static async updateUser(userId: string, updates: Partial<User>): Promise<User | null> {
    try {
      const { data, error } = await supabase
        .from('users')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', userId)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error updating user:', error);
      return null;
    }
  }

  static async updateLastActive(userId: string): Promise<void> {
    try {
      await supabase
        .from('users')
        .update({ last_active: new Date().toISOString() })
        .eq('id', userId);
    } catch (error) {
      console.error('Error updating last active:', error);
    }
  }

  // Profile Management
  static async createUserProfile(userId: string, profile: Partial<UserProfile>): Promise<UserProfile | null> {
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .insert({
          user_id: userId,
          ...profile,
          is_online: true,
          last_seen: new Date().toISOString(),
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error creating user profile:', error);
      return null;
    }
  }

  static async getUserProfile(userId: string): Promise<UserProfile | null> {
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      return null;
    }
  }

  static async updateUserProfile(userId: string, updates: Partial<UserProfile>): Promise<UserProfile | null> {
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .update(updates)
        .eq('user_id', userId)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error updating user profile:', error);
      return null;
    }
  }

  // Coin System
  static async getUserCoins(userId: string): Promise<number> {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('coins')
        .eq('id', userId)
        .single();

      if (error) throw error;
      return data?.coins || 0;
    } catch (error) {
      console.error('Error fetching user coins:', error);
      return 0;
    }
  }

  static async addCoinTransaction(
    userId: string, 
    amount: number, 
    type: CoinTransaction['type'], 
    description: string
  ): Promise<boolean> {
    try {
      // Start a transaction
      const { data: user, error: userError } = await supabase
        .from('users')
        .select('coins')
        .eq('id', userId)
        .single();

      if (userError) throw userError;

      const newCoinBalance = user.coins + amount;
      
      // Prevent negative coin balance
      if (newCoinBalance < 0) {
        throw new Error('Insufficient coins');
      }

      // Update user coins
      const { error: updateError } = await supabase
        .from('users')
        .update({ coins: newCoinBalance })
        .eq('id', userId);

      if (updateError) throw updateError;

      // Record transaction
      const { error: transactionError } = await supabase
        .from('coin_transactions')
        .insert({
          user_id: userId,
          amount,
          type,
          description,
          created_at: new Date().toISOString(),
        });

      if (transactionError) throw transactionError;

      return true;
    } catch (error) {
      console.error('Error adding coin transaction:', error);
      return false;
    }
  }

  static async getCoinTransactions(userId: string, limit = 50): Promise<CoinTransaction[]> {
    try {
      const { data, error } = await supabase
        .from('coin_transactions')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(limit);

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching coin transactions:', error);
      return [];
    }
  }

  // Video Call Management
  static async createVideoCall(callerId: string, receiverId: string): Promise<VideoCall | null> {
    try {
      const { data, error } = await supabase
        .from('video_calls')
        .insert({
          caller_id: callerId,
          receiver_id: receiverId,
          status: 'connecting',
          started_at: new Date().toISOString(),
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error creating video call:', error);
      return null;
    }
  }

  static async updateVideoCallStatus(callId: string, status: VideoCall['status'], duration?: number): Promise<boolean> {
    try {
      const updates: any = { status };
      
      if (status === 'ended' || status === 'rejected') {
        updates.ended_at = new Date().toISOString();
        if (duration) {
          updates.duration = duration;
        }
      }

      const { error } = await supabase
        .from('video_calls')
        .update(updates)
        .eq('id', callId);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error updating video call status:', error);
      return false;
    }
  }

  // Matching System
  static async findRandomMatch(userId: string, genderPreference?: string): Promise<User[]> {
    try {
      let query = supabase
        .from('users')
        .select(`
          *,
          user_profiles(*)
        `)
        .neq('id', userId)
        .eq('user_profiles.is_online', true)
        .gt('last_active', new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()) // Active in last 24 hours
        .limit(10);

      if (genderPreference && genderPreference !== 'both') {
        query = query.eq('user_profiles.gender', genderPreference);
      }

      const { data, error } = await query;

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error finding random match:', error);
      return [];
    }
  }

  // Premium Plans
  static async getPremiumPlans(): Promise<PremiumPlan[]> {
    try {
      const { data, error } = await supabase
        .from('premium_plans')
        .select('*')
        .eq('is_active', true)
        .order('price_inr', { ascending: true });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching premium plans:', error);
      return [];
    }
  }

  static async activatePremium(userId: string, planId: string): Promise<boolean> {
    try {
      const { data: plan, error: planError } = await supabase
        .from('premium_plans')
        .select('*')
        .eq('id', planId)
        .single();

      if (planError) throw planError;

      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + plan.duration_days);

      const { error } = await supabase
        .from('users')
        .update({
          is_premium: true,
          premium_expires_at: expiresAt.toISOString(),
        })
        .eq('id', userId);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error activating premium:', error);
      return false;
    }
  }

  // Coin Packs
  static async getCoinPacks(): Promise<CoinPack[]> {
    try {
      const { data, error } = await supabase
        .from('coin_packs')
        .select('*')
        .order('price_inr', { ascending: true });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching coin packs:', error);
      return [];
    }
  }

  // Payment Orders
  static async createRazorpayOrder(
    userId: string,
    amount: number,
    itemType: 'coins' | 'premium',
    itemId: string
  ): Promise<RazorpayOrder | null> {
    try {
      const { data, error } = await supabase
        .from('razorpay_orders')
        .insert({
          user_id: userId,
          razorpay_order_id: `order_${Date.now()}`, // This should be from Razorpay API
          amount,
          currency: 'INR',
          status: 'created',
          item_type: itemType,
          item_id: itemId,
          created_at: new Date().toISOString(),
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error creating Razorpay order:', error);
      return null;
    }
  }

  static async updatePaymentStatus(orderId: string, status: 'paid' | 'failed', paymentId?: string): Promise<boolean> {
    try {
      const updates: any = { status };
      if (paymentId) {
        updates.payment_id = paymentId;
      }

      const { error } = await supabase
        .from('razorpay_orders')
        .update(updates)
        .eq('id', orderId);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error updating payment status:', error);
      return false;
    }
  }

  // App Configuration
  static async getAppConfig(): Promise<AppConfig | null> {
    try {
      const { data, error } = await supabase
        .from('app_config')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching app config:', error);
      return null;
    }
  }

  // Real-time subscriptions
  static subscribeToVideoCallUpdates(callId: string, callback: (payload: any) => void) {
    return supabase
      .channel(`video_call_${callId}`)
      .on('postgres_changes', 
        { event: 'UPDATE', schema: 'public', table: 'video_calls', filter: `id=eq.${callId}` },
        callback
      )
      .subscribe();
  }

  static subscribeToUserUpdates(userId: string, callback: (payload: any) => void) {
    return supabase
      .channel(`user_${userId}`)
      .on('postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'users', filter: `id=eq.${userId}` },
        callback
      )
      .subscribe();
  }

  static subscribeToMatches(userId: string, callback: (payload: any) => void) {
    return supabase
      .channel(`matches_${userId}`)
      .on('postgres_changes',
        { event: '*', schema: 'public', table: 'matches', filter: `user1_id=eq.${userId}` },
        callback
      )
      .on('postgres_changes',
        { event: '*', schema: 'public', table: 'matches', filter: `user2_id=eq.${userId}` },
        callback
      )
      .subscribe();
  }
}
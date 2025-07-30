export interface User {
  id: string;
  phone_number?: string;
  is_anonymous: boolean;
  bio?: string;
  interests: string[];
  photos: string[]; // URLs to uploaded photos (max 3)
  coins: number;
  is_premium: boolean;
  premium_expires_at?: string;
  created_at: string;
  updated_at: string;
  is_verified: boolean;
  device_id: string;
  last_active: string;
}

export interface VideoCall {
  id: string;
  caller_id: string;
  receiver_id: string;
  status: 'connecting' | 'connected' | 'ended' | 'rejected';
  started_at: string;
  ended_at?: string;
  duration?: number; // in seconds
  rating?: number; // 1-5 stars
}

export interface CoinTransaction {
  id: string;
  user_id: string;
  amount: number; // negative for spending, positive for earning
  type: 'purchase' | 'reward' | 'unlock_profile' | 'reconnect' | 'boost' | 'chat' | 'signup_bonus';
  description: string;
  created_at: string;
}

export interface PremiumPlan {
  id: string;
  name: string;
  duration_days: number;
  price_inr: number;
  features: string[];
  is_active: boolean;
}

export interface UserProfile {
  id: string;
  user_id: string;
  display_name?: string;
  age?: number;
  gender?: 'male' | 'female' | 'other';
  location?: string;
  looking_for?: 'male' | 'female' | 'both';
  is_online: boolean;
  last_seen: string;
}

export interface Match {
  id: string;
  user1_id: string;
  user2_id: string;
  matched_at: string;
  last_message_at?: string;
  is_active: boolean;
}

export interface Message {
  id: string;
  match_id: string;
  sender_id: string;
  content: string;
  type: 'text' | 'emoji' | 'gift';
  created_at: string;
  is_read: boolean;
}

export interface AdReward {
  id: string;
  user_id: string;
  ad_type: 'rewarded' | 'interstitial';
  coins_earned: number;
  created_at: string;
}

export interface BoostSession {
  id: string;
  user_id: string;
  started_at: string;
  expires_at: string;
  is_active: boolean;
  coins_spent: number;
}

export interface CoinPack {
  id: string;
  name: string;
  coins: number;
  price_inr: number;
  bonus_coins: number;
  is_popular: boolean;
  discount_percentage?: number;
}

export interface RazorpayOrder {
  id: string;
  user_id: string;
  razorpay_order_id: string;
  amount: number;
  currency: string;
  status: 'created' | 'paid' | 'failed';
  item_type: 'coins' | 'premium';
  item_id: string;
  created_at: string;
  payment_id?: string;
}

export interface NotificationSettings {
  user_id: string;
  match_notifications: boolean;
  message_notifications: boolean;
  call_notifications: boolean;
  promotion_notifications: boolean;
  updated_at: string;
}

export interface ReportUser {
  id: string;
  reporter_id: string;
  reported_id: string;
  reason: 'inappropriate_content' | 'spam' | 'harassment' | 'fake_profile' | 'other';
  description?: string;
  created_at: string;
  status: 'pending' | 'reviewed' | 'resolved';
}

export interface AppConfig {
  id: string;
  free_signup_coins: number;
  unlock_profile_cost: number;
  reconnect_cost: number;
  boost_cost: number;
  boost_duration_hours: number;
  chat_cost_per_minute: number;
  rewarded_ad_coins: number;
  min_app_version: string;
  maintenance_mode: boolean;
  telegram_group_url: string;
  created_at: string;
  updated_at: string;
}

// Store types
export interface UserStore {
  user: User | null;
  profile: UserProfile | null;
  isLoading: boolean;
  error: string | null;
  setUser: (user: User | null) => void;
  setProfile: (profile: UserProfile | null) => void;
  updateCoins: (amount: number) => void;
  setPremium: (isPremium: boolean, expiresAt?: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
}

export interface VideoCallStore {
  currentCall: VideoCall | null;
  isInCall: boolean;
  callDuration: number;
  localStream: any;
  remoteStream: any;
  isVideoMuted: boolean;
  isAudioMuted: boolean;
  setCurrentCall: (call: VideoCall | null) => void;
  setInCall: (inCall: boolean) => void;
  setCallDuration: (duration: number) => void;
  setLocalStream: (stream: any) => void;
  setRemoteStream: (stream: any) => void;
  toggleVideo: () => void;
  toggleAudio: () => void;
  endCall: () => void;
}

export interface MatchStore {
  matches: Match[];
  currentMatch: Match | null;
  isMatching: boolean;
  setMatches: (matches: Match[]) => void;
  setCurrentMatch: (match: Match | null) => void;
  setMatching: (matching: boolean) => void;
  addMatch: (match: Match) => void;
  removeMatch: (matchId: string) => void;
}
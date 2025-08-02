import { create } from 'zustand';
import { VideoCall, VideoCallStore } from '../types';
import { DatabaseService } from '../services/database';

export const useVideoCallStore = create<VideoCallStore>((set, get) => ({
  currentCall: null,
  isInCall: false,
  callDuration: 0,
  localStream: null,
  remoteStream: null,
  isVideoMuted: false,
  isAudioMuted: false,

  setCurrentCall: (call: VideoCall | null) => set({ currentCall: call }),
  
  setInCall: (inCall: boolean) => set({ isInCall: inCall }),
  
  setCallDuration: (duration: number) => set({ callDuration: duration }),
  
  setLocalStream: (stream: any) => set({ localStream: stream }),
  
  setRemoteStream: (stream: any) => set({ remoteStream: stream }),
  
  toggleVideo: () => {
    const { isVideoMuted, localStream } = get();
    if (localStream) {
      const videoTrack = localStream.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = isVideoMuted;
        set({ isVideoMuted: !isVideoMuted });
      }
    }
  },
  
  toggleAudio: () => {
    const { isAudioMuted, localStream } = get();
    if (localStream) {
      const audioTrack = localStream.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = isAudioMuted;
        set({ isAudioMuted: !isAudioMuted });
      }
    }
  },
  
  endCall: () => {
    const { localStream, remoteStream, currentCall, callDuration } = get();
    
    // Stop all tracks
    if (localStream) {
      localStream.getTracks().forEach((track: any) => track.stop());
    }
    if (remoteStream) {
      remoteStream.getTracks().forEach((track: any) => track.stop());
    }
    
    // Update call status in database
    if (currentCall) {
      DatabaseService.updateVideoCallStatus(currentCall.id, 'ended', callDuration);
    }
    
    // Reset state
    set({
      currentCall: null,
      isInCall: false,
      callDuration: 0,
      localStream: null,
      remoteStream: null,
      isVideoMuted: false,
      isAudioMuted: false,
    });
  },
}));

// Helper functions for video call operations
export const videoCallActions = {
  // Start a new call
  startCall: async (callerId: string, receiverId: string) => {
    try {
      const call = await DatabaseService.createVideoCall(callerId, receiverId);
      if (call) {
        useVideoCallStore.getState().setCurrentCall(call);
        useVideoCallStore.getState().setInCall(true);
        return call;
      }
      return null;
    } catch (error) {
      console.error('Error starting call:', error);
      return null;
    }
  },

  // Accept incoming call
  acceptCall: async (callId: string) => {
    try {
      const success = await DatabaseService.updateVideoCallStatus(callId, 'connected');
      if (success) {
        useVideoCallStore.getState().setInCall(true);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error accepting call:', error);
      return false;
    }
  },

  // Reject incoming call
  rejectCall: async (callId: string) => {
    try {
      const success = await DatabaseService.updateVideoCallStatus(callId, 'rejected');
      if (success) {
        useVideoCallStore.getState().setCurrentCall(null);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error rejecting call:', error);
      return false;
    }
  },

  // Initialize WebRTC stream
  initializeStream: async () => {
    try {
      // For now, we'll simulate stream initialization
      // In real implementation, this would use react-native-webrtc
      const mockStream = {
        id: `stream_${Date.now()}`,
        getVideoTracks: () => [{ enabled: true }],
        getAudioTracks: () => [{ enabled: true }],
        getTracks: () => [{ stop: () => {} }],
      };
      
      useVideoCallStore.getState().setLocalStream(mockStream);
      return mockStream;
    } catch (error) {
      console.error('Error initializing stream:', error);
      return null;
    }
  },

  // Start call timer
  startCallTimer: () => {
    const interval = setInterval(() => {
      const { callDuration, isInCall } = useVideoCallStore.getState();
      if (!isInCall) {
        clearInterval(interval);
        return;
      }
      useVideoCallStore.getState().setCallDuration(callDuration + 1);
    }, 1000);
    
    return interval;
  },

  // Format call duration
  formatCallDuration: (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  },
};
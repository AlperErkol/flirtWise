import { create } from "zustand";

interface OfflineState {
  isOnline: boolean;
  setOnlineStatus: (status: boolean) => void;
}

const useOfflineStore = create<OfflineState>((set) => ({
  isOnline: true,
  setOnlineStatus: (status) => set({ isOnline: status }),
}));

export default useOfflineStore;

import { create } from "zustand";

const useProfileStore = create((set) => ({
  userProfile: null,
  setUserProfile: (profile: any) => set({ userProfile: profile }),
  clearUserProfile: () => set({ userProfile: null }),
}));

export default useProfileStore;

import { useEffect } from "react";
import NetInfo from "@react-native-community/netinfo";
import useOfflineStore from "../store/offlineStore";

export const useNetworkStatus = () => {
  const setOnlineStatus = useOfflineStore((state) => state.setOnlineStatus);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setOnlineStatus(state.isConnected ?? false);
    });

    return () => unsubscribe();
  }, []);
};

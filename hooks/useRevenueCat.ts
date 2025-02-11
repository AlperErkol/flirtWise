import { useEffect, useState, useMemo } from "react";
import Purchases, {
  CustomerInfo,
  PurchasesOffering,
} from "react-native-purchases";
import RevenueCatService from "@/services/payment/RevenueCatService";

interface UseRevenueCatReturn {
  customerInfo: CustomerInfo | null;
  isProMember: boolean;
  currentOffering: PurchasesOffering | null;
  refreshPurchaserInfo: () => Promise<void>;
  isLoading: boolean;
}

const typesOfSubscriptions = {
  weekly: "rc_499_1w",
  quarterly: "rc_4799_1q",
};

export const useRevenueCat = (): UseRevenueCatReturn => {
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo | null>(null);
  const [currentOffering, setCurrentOffering] =
    useState<PurchasesOffering | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const isProMember = useMemo(
    () =>
      customerInfo?.activeSubscriptions.includes(typesOfSubscriptions.weekly) ||
      customerInfo?.activeSubscriptions.includes(
        typesOfSubscriptions.quarterly
      ),
    [customerInfo?.activeSubscriptions]
  );

  const refreshPurchaserInfo = async () => {
    try {
      const customerInfo = await Purchases.getCustomerInfo();
      setCustomerInfo(customerInfo);
    } catch (error) {
      console.error("Failed to refresh purchaser info:", error);
    }
  };

  useEffect(() => {
    const initializeData = async () => {
      try {
        await RevenueCatService.initialize();
        await refreshPurchaserInfo();
        const offerings = await RevenueCatService.getOfferings();
        setCurrentOffering(offerings.current);
      } catch (error) {
        console.error("Failed to initialize RevenueCat data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeData();
  }, []);

  useEffect(() => {
    const customerInfoUpdated = async (purchaserInfo: CustomerInfo) => {
      setCustomerInfo(purchaserInfo);
    };

    Purchases.addCustomerInfoUpdateListener(customerInfoUpdated);
  }, []);

  return {
    isProMember: isProMember ?? false,
    customerInfo,
    currentOffering,
    refreshPurchaserInfo,
    isLoading,
  };
};

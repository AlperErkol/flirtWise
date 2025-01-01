import { useEffect, useState } from 'react';
import Purchases, { CustomerInfo, PurchasesError } from 'react-native-purchases';
import { usePremiumStore } from '@/store/usePremiumStore';

interface UseRevenueCatReturn {
  customerInfo: CustomerInfo | null;
  isProMember: boolean;
  isLoading: boolean;
  error: PurchasesError | null;
  currentOffering: any;
  checkPremiumStatus: () => Promise<void>;
}

export const useRevenueCat = (): UseRevenueCatReturn => {
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo | null>(null);
  const [currentOffering, setCurrentOffering] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<PurchasesError | null>(null);
  const { setPremium } = usePremiumStore();

  const checkPremiumStatus = async () => {
    try {
      setIsLoading(true);
      const customerInfo = await Purchases.getCustomerInfo();
      setCustomerInfo(customerInfo);

      const isProMember = customerInfo.entitlements.active['pro'] !== undefined; 
      setPremium(isProMember);

      const offerings = await Purchases.getOfferings();
      setCurrentOffering(offerings.current);

      setError(null);
    } catch (error: any) {
      setError(error);
      setPremium(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkPremiumStatus();

    // RevenueCat'ten gelen güncellemeleri dinle
    const customerInfoUpdateListener = Purchases.addCustomerInfoUpdateListener(
      (info: CustomerInfo) => {
        setCustomerInfo(info);
        const isProMember = info.entitlements.active['pro'] !== undefined;
        setPremium(isProMember);
      }
    );


  }, []);

  return {
    customerInfo,
    isProMember: customerInfo?.entitlements.active['pro'] !== undefined,
    isLoading,
    error,
    currentOffering,
    checkPremiumStatus
  };
}; 
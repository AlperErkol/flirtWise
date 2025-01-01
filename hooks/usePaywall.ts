import RevenueCatUI, { PAYWALL_RESULT } from 'react-native-purchases-ui';
import { useRevenueCat } from './useRevenueCat';
import { Alert } from 'react-native';

export const usePaywall = () => {
  const { checkPremiumStatus } = useRevenueCat();

  const showAlreadyPremiumAlert = () => {
    Alert.alert(
      "Active Premium+ Subscription",
      "You already have an active Premium+ subscription. You can access all premium features.",
      [{ text: "OK", style: "default" }],
      { cancelable: true }
    );
  };

  const showPaywall = async (): Promise<boolean> => {
    console.log("showPaywall başlatıldı");
    try {
      const paywallResult = await RevenueCatUI.presentPaywallIfNeeded({
        requiredEntitlementIdentifier: "pro",
    });
      console.log('Paywall sonucu:', paywallResult);
      
      switch (paywallResult) {
        case PAYWALL_RESULT.PURCHASED:
          console.log('Satın alma başarılı');
          await checkPremiumStatus();
          return true;
        case PAYWALL_RESULT.RESTORED:
          console.log('Satın alma geri yüklendi');
          await checkPremiumStatus();
          return true;
        case PAYWALL_RESULT.NOT_PRESENTED:
          console.log('Paywall gösterilmedi (Kullanıcı zaten premium)');
          showAlreadyPremiumAlert();
          return false;
        case PAYWALL_RESULT.ERROR:
          console.log('Paywall hatası');
          return false;
        case PAYWALL_RESULT.CANCELLED:
          console.log('Kullanıcı iptal etti');
          return false;
        default:
          console.log('Bilinmeyen sonuç:', paywallResult);
          return false;
      }
    } catch (error) {
      console.error('Paywall hatası:', error);
      return false;
    }
  };

  return { showPaywall };
}; 
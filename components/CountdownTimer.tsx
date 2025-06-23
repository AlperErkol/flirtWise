import React, { useState, useEffect } from "react";
import { TouchableOpacity, Text, View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { usePaywall } from "@/hooks/usePaywall";
import { useRevenueCat } from "@/hooks/useRevenueCat";

const StatusIndicator = () => {
  const { showOnboardingPaywall, showPaywall } = usePaywall();
  const { isProMember, isLoading, customerInfo } = useRevenueCat();

  const [timeLeft, setTimeLeft] = useState<{
    hours: number;
    minutes: number;
    seconds: number;
  }>({ hours: 0, minutes: 0, seconds: 0 });
  const [isExpired, setIsExpired] = useState(false);
  const [trialDaysLeft, setTrialDaysLeft] = useState<number | null>(null);

  // Check if user is in trial period
  const isInTrial = React.useMemo(() => {
    if (!customerInfo) return false;

    // Check if user has active entitlements and any of them is in trial
    const activeEntitlements = customerInfo.entitlements.active;
    if (Object.keys(activeEntitlements).length > 0) {
      // Check if any active entitlement is in trial period
      for (const [key, entitlement] of Object.entries(activeEntitlements)) {
        if (entitlement.willRenew && entitlement.isActive) {
          // Check if purchase date is recent (indicating trial)
          const purchaseDate = new Date(entitlement.latestPurchaseDate);
          const now = new Date();
          const daysSincePurchase =
            (now.getTime() - purchaseDate.getTime()) / (1000 * 60 * 60 * 24);

          // If purchased within last 7 days and will renew, likely in trial
          if (daysSincePurchase < 7) {
            return true;
          }
        }
      }
    }
    return false;
  }, [customerInfo]);

  // Calculate trial days left
  useEffect(() => {
    if (!isInTrial || !customerInfo) return;

    const activeEntitlements = customerInfo.entitlements.active;
    if (Object.keys(activeEntitlements).length > 0) {
      const entitlement = Object.values(activeEntitlements)[0];
      if (entitlement.expirationDate) {
        const expirationDate = new Date(entitlement.expirationDate);
        const now = new Date();
        const daysLeft = Math.ceil(
          (expirationDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
        );
        setTrialDaysLeft(Math.max(0, daysLeft));
      }
    }
  }, [isInTrial, customerInfo]);

  // Original countdown timer logic for free users
  useEffect(() => {
    // Only run countdown for free users (not pro, not in trial)
    if (isProMember || isInTrial) return;

    const initializeTimer = async () => {
      try {
        let startTime = await AsyncStorage.getItem("countdown_start_time");

        if (!startTime) {
          const now = new Date().getTime();
          await AsyncStorage.setItem("countdown_start_time", now.toString());
          startTime = now.toString();
        }

        const startTimeMs = parseInt(startTime);
        const endTime = startTimeMs + 24 * 60 * 60 * 1000;

        const updateTimer = () => {
          const now = new Date().getTime();
          const remaining = endTime - now;

          if (remaining <= 0) {
            setIsExpired(true);
            setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
            return;
          }

          const hours = Math.floor(remaining / (1000 * 60 * 60));
          const minutes = Math.floor(
            (remaining % (1000 * 60 * 60)) / (1000 * 60)
          );
          const seconds = Math.floor((remaining % (1000 * 60)) / 1000);

          setTimeLeft({ hours, minutes, seconds });
        };

        updateTimer();
        const interval = setInterval(updateTimer, 1000);
        return () => clearInterval(interval);
      } catch (error) {
        console.error("Error initializing countdown timer:", error);
      }
    };

    initializeTimer();
  }, [isProMember, isInTrial]);

  const handlePress = () => {
    if (!isProMember) {
      // Use different triggers based on timer state
      if (isExpired) {
        showPaywall(); // campaign_trigger for expired users
      } else {
        showOnboardingPaywall(); // onboarding_trigger for active countdown
      }
    }
  };

  const formatTime = (time: number) => {
    return time.toString().padStart(2, "0");
  };

  // Don't render while loading
  if (isLoading) {
    return null;
  }

  // Pro Member Status
  if (isProMember && !isInTrial) {
    return (
      <View style={[styles.container, styles.proContainer]}>
        <View style={styles.timerContent}>
          <View style={[styles.iconContainer, styles.proIconContainer]}>
            <Ionicons name="star" size={16} color="#FFD700" />
          </View>
          <Text style={styles.proText}>PRO</Text>
        </View>
      </View>
    );
  }

  // Trial Member Status
  if (isInTrial && trialDaysLeft !== null) {
    return (
      <View style={[styles.container, styles.trialContainer]}>
        <View style={styles.timerContent}>
          <View style={[styles.iconContainer, styles.trialIconContainer]}>
            <Ionicons name="time" size={16} color="#FF6347" />
          </View>
          <Text style={styles.trialText}>Premium</Text>
        </View>
        <View style={[styles.badge, styles.trialBadge]}>
          <Text style={styles.trialBadgeText}>TRIAL</Text>
        </View>
      </View>
    );
  }

  // Free User - Original Countdown Timer
  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <View style={styles.timerContent}>
        <View style={styles.iconContainer}>
          <Ionicons name="time" size={16} color="#FF6347" />
        </View>
        <View style={styles.timeContainer}>
          {isExpired ? (
            <Text style={styles.upgradeText}>UPGRADE</Text>
          ) : (
            <Text style={styles.timerText}>
              {formatTime(timeLeft.hours)}:{formatTime(timeLeft.minutes)}:
              {formatTime(timeLeft.seconds)}
            </Text>
          )}
        </View>
      </View>
      {!isExpired && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>LIMITED</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 8,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#FF6347",
    position: "relative",
  },
  proContainer: {
    borderColor: "#FFD700",
    backgroundColor: "#FFFEF7",
  },
  trialContainer: {
    borderColor: "#FF6347",
    backgroundColor: "#FFF5F5",
  },
  timerContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  iconContainer: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#FFF",
    justifyContent: "center",
    alignItems: "center",
  },
  proIconContainer: {
    backgroundColor: "#FFD700",
  },
  trialIconContainer: {
    backgroundColor: "#FFF",
  },
  timeContainer: {
    minWidth: 60,
  },
  timerText: {
    fontSize: 12,
    fontFamily: "Inter_600SemiBold",
    color: "#FF6347",
    letterSpacing: -0.3,
  },
  upgradeText: {
    fontSize: 12,
    fontFamily: "Inter_700Bold",
    color: "#FF6347",
    letterSpacing: 0.5,
  },
  proText: {
    fontSize: 12,
    fontFamily: "Inter_700Bold",
    color: "#FFD700",
    letterSpacing: 0.5,
  },
  trialText: {
    fontSize: 12,
    fontFamily: "Inter_600SemiBold",
    color: "#FF6347",
    letterSpacing: -0.3,
  },
  badge: {
    position: "absolute",
    top: -6,
    right: -6,
    backgroundColor: "#FFD700",
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  trialBadge: {
    backgroundColor: "#FF6347",
  },
  trialBadgeText: {
    fontSize: 8,
    fontFamily: "Inter_700Bold",
    color: "#FFF",
    letterSpacing: 0.5,
  },
  badgeText: {
    fontSize: 8,
    fontFamily: "Inter_700Bold",
    color: "#FF6347",
    letterSpacing: 0.5,
  },
});

export default StatusIndicator;

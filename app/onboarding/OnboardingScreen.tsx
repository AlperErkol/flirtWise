import React, { useState } from "react";
import { View, StyleSheet, Dimensions, Text } from "react-native";
import GlobalSafeAreaView from "@/components/GlobalSafeAreaView";
import { useTranslation } from "@/hooks/useTranslation";
import { useSharedValue } from "react-native-reanimated";
import Carousel, { ICarouselInstance } from "react-native-reanimated-carousel";
import { Button } from "@rneui/themed";
import globalStyles from "@/constants/style";
import WelcomeScreen from "./WelcomeScreen";
import HowItWorksScreen from "./HowItWorksScreen";
import BenefitsScreen from "./BenefitsScreen";
import FinalScreen from "./FinalScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import Header from "@/components/Header";
import { usePaywall } from "@/hooks/usePaywall";
import ProfileMaxxingScreen from "./ProfileMaxxingScreen";

const data = [
  <WelcomeScreen />,
  <HowItWorksScreen />,
  <ProfileMaxxingScreen />,
  <BenefitsScreen />,
  <FinalScreen />,
];

const { width, height } = Dimensions.get("window");

const buttonText = [
  "stopSayingHey",
  "createMyOpener",
  "boostMyProfile",
  "tellMeWhatToText",
  "startFlirtingSmarter",
];

export default function Index() {
  const { t } = useTranslation();
  const ref = React.useRef<ICarouselInstance>(null);
  const progress = useSharedValue<number>(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselHeight = height * 0.7;
  const { showOnboardingPaywall } = usePaywall();

  const handleButtonPress = async () => {
    if (activeIndex === 4) {
      await AsyncStorage.setItem("onboardingCompleted", "true");
      showOnboardingPaywall();
      router.replace("/(tabs)");
    } else {
      ref.current?.scrollTo({
        index: activeIndex + 1,
        count: activeIndex - progress.value,
        animated: true,
      });
    }
  };

  return (
    <GlobalSafeAreaView>
      <Header logo />
      <View style={styles.paginationContainer}>
        {data.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              activeIndex === index ? styles.activeDot : styles.inactiveDot,
            ]}
          />
        ))}
      </View>
      <View style={{ height: carouselHeight }}>
        <Carousel
          enabled={false}
          ref={ref}
          testID={"xxx"}
          loop={false}
          width={width}
          height={carouselHeight}
          snapEnabled={true}
          pagingEnabled={true}
          autoPlay={false}
          onSnapToItem={(index) => setActiveIndex(index)}
          data={data}
          renderItem={({ item }) => item}
        />
      </View>
      <Button
        title={t(buttonText[activeIndex])}
        buttonStyle={[globalStyles.button, globalStyles.secondaryButton]}
        titleStyle={globalStyles.buttonText}
        onPress={handleButtonPress}
        style={{ display: "flex", alignItems: "center" }}
        containerStyle={styles.buttonStyle}
      />
    </GlobalSafeAreaView>
  );
}

const styles = StyleSheet.create({
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
    width: "100%",
    paddingHorizontal: 10,
  },
  dot: {
    height: 3,
    marginHorizontal: 2,
    flex: 1,
  },
  activeDot: {
    backgroundColor: "#4F46E5",
  },
  inactiveDot: {
    backgroundColor: "#d3d3d3",
  },
  buttonStyle: {
    position: "absolute",
    bottom: 60,
    left: 20,
    right: 20,
  },
});

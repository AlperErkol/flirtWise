import React, { useState } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
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
const data = [
  <WelcomeScreen />,
  <HowItWorksScreen />,
  <BenefitsScreen />,
  <FinalScreen />,
];

const { width, height } = Dimensions.get("window");

const buttonText = [
  "fixMyMessagesNow",
  "generateMyOpener",
  "saveMyChat",
  "startFlirtingSmarter",
];

export default function Index({ navigation }: any) {
  const { t } = useTranslation();
  const ref = React.useRef<ICarouselInstance>(null);
  const progress = useSharedValue<number>(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselHeight = height * 0.7;

  const handleButtonPress = async () => {
    if (activeIndex === 3) {
      await AsyncStorage.setItem("onboardingCompleted", "true");
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
      <View style={{ height: carouselHeight }}>
        <Carousel
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
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
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

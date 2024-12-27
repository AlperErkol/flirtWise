import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import Carousel from "react-native-reanimated-carousel";
import GlobalSafeAreaView from "@/components/GlobalSafeAreaView";
import Theme from "@/constants/Theme";

const { width } = Dimensions.get("window");

// Premium+ özellikleri
const premiumFeatures = [
  {
    id: "1",
    title: "Unlimited Access",
    description: "Enjoy unlimited usage of all features.",
    icon: "infinite",
  },
  {
    id: "2",
    title: "Advanced AI Performance",
    description: "Get more creative and detailed recommendations.",
    icon: "bulb-outline",
  },
  {
    id: "3",
    title: "Ad-Free Experience",
    description: "Enjoy a seamless experience without ads.",
    icon: "remove-circle-outline",
  },
  {
    id: "4",
    title: "Personalized Suggestions",
    description: "Receive tips tailored to your preferences.",
    icon: "person-outline",
  },
];

const packages = [
  {
    id: "WEEKLY",
    title: "1 Week",
    price: "$4.99 / week",
    generalPrice: "$4.99",
    description: "Unlimited AI chat and all premium features.",
    icon: "calendar-outline",
  },
  {
    id: "MONTHLY",
    title: "1 Month",
    price: "$3.99 / week",
    generalPrice: "$15.99",
    description: "Save 25%! Best value for yearly subscription.",
    icon: "pricetag-outline",
  },
  {
    id: "QUARTERLY",
    title: "3 Months",
    price: "$3.69 / week",
    generalPrice: "$47.99",
    description: "Enjoy premium features for a lifetime.",
    icon: "ribbon-outline",
  },
];

export default function PricingScreen() {
  const [selectedPackage, setSelectedPackage] = useState("QUARTERLY");
  const [currentSlide, setCurrentSlide] = useState(0);

  const handlePurchase = () => {
    console.log(`Satın alma işlemi başlatılıyor: ${selectedPackage}`);
  };

  return (
    <GlobalSafeAreaView bgWhite>
      <Carousel
        loop
        width={width - 40}
        height={200}
        autoPlay
        pagingEnabled
        data={premiumFeatures}
        scrollAnimationDuration={1000}
        onSnapToItem={(index) => setCurrentSlide(index)}
        renderItem={({ item }) => (
          <View style={styles.featureCard}>
            <Ionicons name={item.icon as any} size={36} style={styles.icon} />
            <Text style={styles.featureTitle}>{item.title}</Text>
            <Text style={styles.featureDescription}>{item.description}</Text>
          </View>
        )}
      />
      {/* Pagination */}
      <View style={styles.pagination}>
        {premiumFeatures.map((_, index) => (
          <View
            key={index}
            style={[
              styles.paginationDot,
              currentSlide === index && styles.activeDot,
            ]}
          />
        ))}
      </View>

      {/* Package Cards */}
      <View style={styles.packageContainer}>
        <View style={styles.row}>
          {packages.slice(0, 2).map((pkg) => (
            <TouchableOpacity
              key={pkg.id}
              style={[
                styles.packageCard,
                selectedPackage === pkg.id
                  ? styles.selectedPackageCard
                  : styles.unselectedPackageCard,
              ]}
              onPress={() => setSelectedPackage(pkg.id)}
            >
              <Ionicons name={pkg.icon as any} size={26} style={styles.icon} />
              <Text style={styles.packageTitle}>{pkg.title}</Text>
              <Text style={styles.packagePrice}>{pkg.price}</Text>
              <Text style={styles.packageDescription}>{pkg.description}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <TouchableOpacity
          style={[
            styles.lifetimeCard,
            selectedPackage === "QUARTERLY"
              ? styles.selectedPackageCard
              : styles.unselectedPackageCard,
          ]}
          onPress={() => setSelectedPackage("QUARTERLY")}
        >
          <Ionicons name="ribbon-outline" size={26} style={styles.icon} />
          <Text style={styles.packageTitle}>{packages[2].title}</Text>
          <Text style={styles.packagePrice}>{packages[2].price}</Text>
          <Text style={styles.packageDescription}>
            {packages[2].description}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Purchase Button */}
      <TouchableOpacity style={styles.buyButton} onPress={handlePurchase}>
        <Text style={styles.buyText}>
          Purchase {packages.find((pkg) => pkg.id === selectedPackage)?.title}{" "}
          for {packages.find((pkg) => pkg.id === selectedPackage)?.generalPrice}
        </Text>
      </TouchableOpacity>
    </GlobalSafeAreaView>
  );
}

const styles = StyleSheet.create({
  featureCard: {
    borderRadius: 10,
    alignItems: "center",
  },
  icon: {
    marginBottom: 10,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  featureDescription: {
    fontSize: 14,
    color: "#555",
    textAlign: "center",
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 5,
    top: -210,
  },
  paginationDot: {
    width: 6,
    height: 6,
    borderRadius: 4,
    backgroundColor: "#ccc",
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: Theme.colors.primary,
  },
  packageContainer: {
    width: "100%",
    marginTop: 10,
    top: -170,
  },
  row: {
    flexDirection: "row",
    marginBottom: 10,
    gap: 10,
  },
  packageCard: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    borderRadius: 10,
    padding: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  lifetimeCard: {
    backgroundColor: "#f2f2f2",
    borderRadius: 10,
    padding: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    width: "100%",
  },
  selectedPackageCard: {
    borderColor: Theme.colors.primary,
    borderWidth: 2,
  },
  unselectedPackageCard: {
    borderColor: "#ccc",
    borderWidth: 2,
  },
  packageTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 5,
  },
  packagePrice: {
    fontSize: 16,
    color: "#000",
    marginBottom: 5,
    fontWeight: "800",
  },
  packageDescription: {
    fontSize: 12,
    color: "#777",
    textAlign: "center",
  },
  buyButton: {
    position: "absolute",
    left: 15,
    bottom: 40,
    width: width - 30,
    backgroundColor: "#000",
    paddingVertical: 15,
    borderRadius: 15,
    alignItems: "center",
  },
  buyText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 15,
  },
});

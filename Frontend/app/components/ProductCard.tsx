import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import PriceRow from "./PriceRow";
import { getCheapestPlatform } from "@/utils/priceUtils";

type Props = {
  id: string;
  name: string;
  image: { uri: string } | number;
  prices: Record<string, number>;
  isFavourite: boolean;
  toggleFavourite: (id: string) => void;
};

const ProductCard = ({ id, name, image, prices, isFavourite, toggleFavourite }: Props) => {
  const cheapest = getCheapestPlatform(prices);
  const cheapestPlatform = cheapest?.platform || "";

  return (
    <View style={styles.card}>
      <Image source={image} style={styles.image} resizeMode="contain" />
      <Text style={styles.name}>{name}</Text>

      {Object.entries(prices).map(([platform, price]) => (
        <PriceRow
          key={platform}
          platform={platform}
          price={price}
          isCheapest={platform === cheapestPlatform}
        />
      ))}

      <TouchableOpacity
        onPress={() => toggleFavourite(id)}
        style={[styles.button, isFavourite ? styles.favActive : styles.favInactive]}
      >
        <Text style={styles.buttonText}>
          {isFavourite ? "Remove Favourite" : "Add to Favourite"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    padding: 12,
    borderRadius: 12,
    margin: 8,
  },
  image: {
    width: "100%",
    height: 120,
    borderRadius: 8,
    marginBottom: 8,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 6,
  },
  button: {
    paddingVertical: 6,
    borderRadius: 8,
    marginTop: 8,
  },
  favActive: {
    backgroundColor: "#ef4444",
  },
  favInactive: {
    backgroundColor: "#2563eb",
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "600",
  },
});

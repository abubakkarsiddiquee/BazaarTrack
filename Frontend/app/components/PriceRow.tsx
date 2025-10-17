import React from "react";
import { View, Text, StyleSheet } from "react-native";

type Props = {
  platform: string;
  price: number | string;
  isCheapest: boolean;
};

const PriceRow = ({ platform, price, isCheapest }: Props) => {
  const numericPrice = Number(price) || 0; // Convert to number safely

  return (
    <View style={styles.row}>
      <Text style={styles.platform}>{platform}</Text>
      <Text style={[styles.price, isCheapest && styles.cheapest]}>
        ৳{numericPrice.toFixed(2)}
      </Text>
    </View>
  );
};

export default PriceRow;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 4,
    borderBottomWidth: 0.5,
    borderBottomColor: "#e5e7eb",
    marginBottom: 4,
  },
  platform: {
    fontSize: 14,
    color: "#4b5563",
  },
  price: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
  },
  cheapest: {
    color: "#16a34a", // Green for cheapest price
    fontWeight: "700",
  },
});

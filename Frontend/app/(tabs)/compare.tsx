import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  ActivityIndicator,
  Platform,
} from "react-native";
import axios from "axios";

const API_URL =
  Platform.OS === "android" || Platform.OS === "ios"
    ? "http://10.15.34.61:3000"
    : "http://localhost:3000";

interface Product {
  id: string;
  name: string;
  image: string;
  price?: number;
}

export default function Compare() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/products`);
      setProducts(res.data);
    } catch (err) {
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading)
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2563eb" />
        <Text>Loading Products...</Text>
      </View>
    );

  const stores = ["Chaldal", "Shwapno", "Agora", "Meena Bazar", "Unimart"];

  return (
    <ScrollView horizontal nestedScrollEnabled>
      <ScrollView style={styles.container}>
        <Text style={styles.title}>🛒 Compare Product Prices</Text>

        {/* Header Row */}
        <View style={[styles.row, styles.headerRow]}>
          <View style={[styles.cell, styles.productCell]}>
            <Text style={styles.headerText}>Product</Text>
          </View>
          {stores.map((store, index) => (
            <View key={index} style={styles.cell}>
              <Text style={styles.headerText}>{store}</Text>
            </View>
          ))}
        </View>

        {/* Data Rows */}
        {products.map((item) => (
          <View key={item.id} style={styles.row}>
            {/* Product Cell */}
            <View style={[styles.cell, styles.productCell]}>
              <Image source={{ uri: item.image }} style={styles.image} />
              <Text style={styles.productName}>
                {item.name.split(" ").map((word: string, i: number) => (
                  <Text key={i}>
                    {word}{"\n"}
                  </Text>
                ))}
              </Text>
            </View>

            {/* Store Prices */}
            {stores.map((store, index) => (
              <View key={index} style={styles.cell}>
                {store === "Chaldal" ? (
                  <Text style={styles.price}>
                    {item.price ? `৳${item.price}` : "—"}
                  </Text>
                ) : (
                  <Text style={styles.placeholder}>—</Text>
                )}
              </View>
            ))}
          </View>
        ))}
      </ScrollView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
    color: "#166534",
    marginBottom: 12,
  },
  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
    backgroundColor: "#fff",
    alignItems: "center",
  },
  headerRow: {
    backgroundColor: "#16A34A",
  },
  cell: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    minWidth: 100,
    borderRightWidth: 1,
    borderRightColor: "#E5E7EB",
  },
  headerText: {
    color: "#fff",
    fontWeight: "700",
    textAlign: "center",
  },
  productCell: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: 8,
    minWidth: 120, // narrower for mobile
  },
  productName: {
    flexShrink: 1,
    color: "#111827",
    fontWeight: "500",
    fontSize: 14,
  },
  image: {
    width: 40,
    height: 40,
    marginRight: 8,
    borderRadius: 6,
  },
  price: {
    color: "#15803D",
    fontWeight: "600",
  },
  placeholder: {
    color: "#9CA3AF",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

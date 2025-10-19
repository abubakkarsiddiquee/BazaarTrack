import React, { useState, useCallback } from "react";
import { View, FlatList, ActivityIndicator, Text, Platform } from "react-native";
import axios from "axios";
import ProductCard from "@/components/ProductCard";
import useFavourites from "@/hooks/useFavourites";
import { useFocusEffect } from "@react-navigation/native";

const API_URL =
  Platform.OS === "android" || Platform.OS === "ios"
    ? "http://10.15.34.61:3000"
    : "http://localhost:3000";

type Product = {
  id: string;
  name: string;
  product_image_url: string;
  prices: Record<string, number>;
};

export default function Favourites() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { favourites, toggleFavourite } = useFavourites();

  const formatProducts = (data: any[]) =>
    data.reduce((acc: Product[], curr: any) => {
      const existing = acc.find((p) => p.id === curr.id);
      if (existing) existing.prices[curr.market] = curr.price;
      else
        acc.push({
          id: curr.id,
          name: curr.name,
          product_image_url: curr.product_image_url,
          prices: { [curr.market]: curr.price },
        });
      return acc;
    }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/products`);
      const allProducts = formatProducts(res.data);
      const favProducts = allProducts.filter((p) => favourites.includes(p.id));
      setProducts(favProducts);
    } catch (err) {
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };

  // Auto-refresh when the page is focused
  useFocusEffect(
    useCallback(() => {
      fetchProducts();
    }, [favourites])
  );

  if (loading)
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#2563eb" />
        <Text>Loading Favourite Products...</Text>
      </View>
    );

  if (products.length === 0)
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>No favourite products added yet.</Text>
      </View>
    );

  return (
    <View style={{ flex: 1, paddingTop: 32, backgroundColor: "#f3f4f6" }}>
      <FlatList
        data={products}
        numColumns={2}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={{ justifyContent: "space-between", paddingHorizontal: 12 }}
        contentContainerStyle={{ paddingBottom: 40 }}
        renderItem={({ item }) => (
          <ProductCard
            id={item.id}
            name={item.name}
            image={{ uri: item.product_image_url || "https://via.placeholder.com/150" }}
            prices={item.prices}
            isFavourite={favourites.includes(item.id)}
            toggleFavourite={toggleFavourite}
          />
        )}
      />
    </View>
  );
}

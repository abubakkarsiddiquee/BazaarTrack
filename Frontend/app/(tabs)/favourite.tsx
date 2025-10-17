import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { Product, getFavourites, removeFavourite } from "../utils/favourites";

export default function Favourite() {
  const [favourites, setFavourites] = useState<Product[]>([]);

  const loadFavourites = async () => {
    const favs = await getFavourites();
    setFavourites(favs);
  };

  useEffect(() => {
    loadFavourites();
  }, []);

  const handleRemove = async (id: string) => {
    await removeFavourite(id);
    loadFavourites();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Favourite Products</Text>
      {favourites.length === 0 ? (
        <Text style={styles.emptyText}>No favourites yet.</Text>
      ) : (
        <FlatList
          data={favourites}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <View>
                <Text style={styles.productName}>{item.name}</Text>
                <Text style={styles.productDetails}>৳{item.price} | {item.shop}</Text>
              </View>
              <TouchableOpacity style={styles.removeButton} onPress={() => handleRemove(item.id)}>
                <Text style={styles.removeText}>Remove</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f8f9fa" },
  title: { fontSize: 28, fontWeight: "700", color: "#1f8ef1", marginBottom: 20 },
  emptyText: { fontSize: 16, color: "#6c757d", textAlign: "center", marginTop: 50 },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
  },
  productName: { fontSize: 18, fontWeight: "600" },
  productDetails: { fontSize: 14, color: "#6c757d", marginTop: 4 },
  removeButton: { backgroundColor: "#e74c3c", paddingVertical: 6, paddingHorizontal: 12, borderRadius: 8 },
  removeText: { color: "#fff", fontWeight: "600" },
});

// app/hooks/useFavourites.ts
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function useFavourites() {
  const [favourites, setFavourites] = useState<string[]>([]);

  useEffect(() => {
    loadFavourites();
  }, []);

  const loadFavourites = async () => {
    try {
      const data = await AsyncStorage.getItem("favourites");
      if (data) setFavourites(JSON.parse(data));
    } catch (err) {
      console.error("Error loading favourites:", err);
    }
  };

  const saveFavourites = async (items: string[]) => {
    try {
      await AsyncStorage.setItem("favourites", JSON.stringify(items));
    } catch (err) {
      console.error("Error saving favourites:", err);
    }
  };

  const toggleFavourite = (id: string) => {
    setFavourites((prev) => {
      const updated = prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id];
      saveFavourites(updated);
      return updated;
    });
  };

  return { favourites, toggleFavourite };
}

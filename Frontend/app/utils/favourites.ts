import AsyncStorage from "@react-native-async-storage/async-storage";

const FAV_KEY = "FAV_PRODUCTS";

export interface Product {
  id: string;
  name: string;
  price: number;
  shop: string;
}

export const getFavourites = async (): Promise<Product[]> => {
  const json = await AsyncStorage.getItem(FAV_KEY);
  return json ? JSON.parse(json) : [];
};

export const addFavourite = async (product: Product) => {
  const currentFavs = await getFavourites();
  const exists = currentFavs.find(p => p.id === product.id);
  if (!exists) {
    await AsyncStorage.setItem(FAV_KEY, JSON.stringify([...currentFavs, product]));
  }
};

export const removeFavourite = async (id: string) => {
  const currentFavs = await getFavourites();
  const updated = currentFavs.filter(p => p.id !== id);
  await AsyncStorage.setItem(FAV_KEY, JSON.stringify(updated));
};

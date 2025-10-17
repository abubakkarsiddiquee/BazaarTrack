import React from "react";
import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";

export default function Compare() {
  const items = [
    {
      id: "1",
      name: "Miniket Rice 5kg",
      image:
        "https://chaldn.com/_mpimage/miniket-rice-5-kg?src=https%3A%2F%2Fchaldn.com%2F_3d360%2Fmpimage%2Fminiket-rice-5-kg",
      prices: [
        { store: "Chaldal", price: 480 },
        { store: "Shwapno", price: 500 },
        { store: "Daraz Mart", price: 475 },
      ],
    },
    {
      id: "2",
      name: "Lentil (Dal) 1kg",
      image:
        "https://chaldn.com/_mpimage/masoor-dal-red-lentil-loose-1-kg?src=https%3A%2F%2Fchaldn.com%2F_3d360%2Fmpimage%2Fmasoor-dal-red-lentil-loose-1-kg",
      prices: [
        { store: "Chaldal", price: 160 },
        { store: "Agora", price: 170 },
        { store: "Shwapno", price: 165 },
      ],
    },
    {
      id: "3",
      name: "Banana (Dozen)",
      image:
        "https://chaldn.com/_mpimage/banana-sagor-dozen?src=https%3A%2F%2Fchaldn.com%2F_3d360%2Fmpimage%2Fbanana-sagor-dozen",
      prices: [
        { store: "Chaldal", price: 110 },
        { store: "Shwapno", price: 120 },
        { store: "Meenaclick", price: 115 },
      ],
    },
  ];

  const getLowestPrice = (prices: any[]) =>
    prices.reduce((min, p) => (p.price < min.price ? p : min));

  return (
    <View className="flex-1 bg-gray-50 p-4">
      <Text className="text-2xl font-bold text-green-700 text-center mb-4">
        Compare Daily Essentials 🛒
      </Text>

      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const bestDeal = getLowestPrice(item.prices);
          return (
            <View className="bg-white rounded-2xl shadow-sm p-4 mb-4">
              <View className="flex-row items-center mb-3">
                <Image
                  source={{ uri: item.image }}
                  className="w-16 h-16 rounded-lg mr-4"
                  resizeMode="contain"
                />
                <View className="flex-1">
                  <Text className="text-lg font-semibold text-gray-800">
                    {item.name}
                  </Text>
                  <Text className="text-green-700 font-medium mt-1">
                    Best: {bestDeal.store} - ৳{bestDeal.price}
                  </Text>
                </View>
              </View>

              <View className="border-t border-gray-100 pt-2">
                {item.prices.map((p, i) => (
                  <View
                    key={i}
                    className="flex-row justify-between py-1 border-b border-gray-50"
                  >
                    <Text className="text-gray-600">{p.store}</Text>
                    <Text
                      className={`font-medium ${
                        p.price === bestDeal.price
                          ? "text-green-600"
                          : "text-gray-700"
                      }`}
                    >
                      ৳{p.price}
                    </Text>
                  </View>
                ))}
              </View>

              <TouchableOpacity className="mt-3 bg-green-600 rounded-xl py-2">
                <Text className="text-white text-center font-semibold">
                  View Best Offer
                </Text>
              </TouchableOpacity>
            </View>
          );
        }}
      />
    </View>
  );
}

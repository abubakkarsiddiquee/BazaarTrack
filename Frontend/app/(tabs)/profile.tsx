import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

type User = {
  email: string;
  created_at?: string;
};

export default function Profile() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Fetch user data from AsyncStorage
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const email = await AsyncStorage.getItem("userEmail");
        const createdAt = await AsyncStorage.getItem("userCreatedAt");
        if (email) {
          setUser({ email, created_at: createdAt || "N/A" });
        } else {
          Alert.alert("Session Expired", "Please log in again.");
          router.replace("/Auth/Login");
        }
      } catch (error) {
        Alert.alert("Error", "Failed to load user data.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  // Logout function
  const handleLogout = async () => {
    try {
      await AsyncStorage.multiRemove(["userToken", "userEmail", "userCreatedAt"]);
      router.replace("/Auth/Login");
    } catch (error) {
      Alert.alert("Error", "Unable to logout. Try again.");
    }
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#3b82f6" />
        <Text className="text-gray-600 mt-3 text-base">Loading Profile...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white p-6">
      <Text className="text-3xl font-bold text-gray-900 mb-6 text-center">My Profile</Text>

      <View className="bg-gray-100 p-6 rounded-2xl shadow-md mb-6">
        <Text className="text-gray-600 text-sm">Email</Text>
        <Text className="text-lg font-semibold text-gray-900">{user?.email}</Text>

        <View className="mt-4">
          <Text className="text-gray-600 text-sm">Member Since</Text>
          <Text className="text-lg font-semibold text-gray-900">
            {user?.created_at || "Not available"}
          </Text>
        </View>
      </View>

      <TouchableOpacity
        onPress={handleLogout}
        className="bg-red-500 py-4 rounded-xl shadow-lg"
        activeOpacity={0.8}
      >
        <Text className="text-white text-center font-semibold text-lg">Log Out</Text>
      </TouchableOpacity>
    </View>
  );
}

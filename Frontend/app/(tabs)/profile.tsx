import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

export default function Profile() {
  const [user, setUser] = useState<{ email: string; created_at?: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Load user data from AsyncStorage
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const email = await AsyncStorage.getItem("userEmail");
        const createdAt = await AsyncStorage.getItem("userCreatedAt"); // optional
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

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("userToken");
      await AsyncStorage.removeItem("userEmail");
      await AsyncStorage.removeItem("userCreatedAt");
      router.replace("/Auth/Login");
    } catch (error) {
      Alert.alert("Error", "Unable to logout. Try again.");
    }
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#3b82f6" />
        <Text className="text-gray-600 mt-3">Loading Profile...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white p-6">
      <Text className="text-3xl font-bold text-gray-900 mb-6 text-center">My Profile</Text>

      <View className="bg-gray-100 p-4 rounded-2xl mb-6">
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
        className="bg-red-500 py-4 rounded-xl"
        activeOpacity={0.8}
      >
        <Text className="text-white text-center font-semibold text-lg">Log Out</Text>
      </TouchableOpacity>
    </View>
  );
}

import React, { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

export default function Index() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkLogin = async () => {
      const token = await AsyncStorage.getItem("token");

      if (token) {
        // logged in
        router.replace("/Auth/Login");
      } else {
        // not logged in
        router.replace("/Auth/Login");
      }
      setLoading(false);
    };

    checkLogin();
  }, []);

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return null;
}

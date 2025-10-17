import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);

  // 🔹 Auto-check if user already logged in
  useEffect(() => {
    const checkLoginStatus = async () => {
      const userToken = await AsyncStorage.getItem("userToken");
      if (userToken) {
        router.replace("/(tabs)/dashboard"); // Already logged in
      } else {
        setLoading(false);
      }
    };
    checkLoginStatus();
  }, []);

  const handleLogin = async () => {
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    if (!trimmedEmail || !trimmedPassword) {
      Alert.alert("Error", "Please enter both email and password");
      return;
    }

    try {
      const response = await fetch("http://192.168.0.101:3000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmedEmail, password: trimmedPassword }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert("Success", "Login successful!");
        // 🔹 Save token or user info locally
        await AsyncStorage.setItem("userToken", data.token || "dummy-token");
        router.replace("/(tabs)/dashboard"); // Go to dashboard
      } else {
        Alert.alert("Error", data.message || "Invalid credentials");
      }
    } catch (error) {
      Alert.alert("Error", "Unable to connect to the server");
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#3b82f6" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.replace("/Auth/Signup")}>
        <Text style={styles.signupText}>Don’t have an account? Sign up</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", justifyContent: "center", paddingHorizontal: 24 },
  title: { fontSize: 32, fontWeight: "bold", marginBottom: 32, textAlign: "center", color: "#111827" },
  input: { borderWidth: 1, borderColor: "#d1d5db", padding: 14, borderRadius: 10, marginBottom: 20, fontSize: 16, backgroundColor: "#f9fafb" },
  button: { backgroundColor: "#3b82f6", paddingVertical: 16, borderRadius: 10, marginBottom: 20 },
  buttonText: { color: "#fff", textAlign: "center", fontWeight: "600", fontSize: 18 },
  signupText: { textAlign: "center", color: "#6b7280", fontSize: 15 },
});

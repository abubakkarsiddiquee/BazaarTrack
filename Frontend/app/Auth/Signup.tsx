import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import React, { useState } from "react";

export default function Signup() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Signup handler
  const handleSignup = async () => {
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    if (!trimmedEmail || !trimmedPassword) {
      Alert.alert("Error", "Please enter both email and password");
      return;
    }

    try {
      const response = await fetch("http://192.168.0.101:3000/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmedEmail, password: trimmedPassword }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert("Success", "Account created successfully!");
        // Navigate to main tab layout after signup
       // router.replace("/(tabs)/dashboard");
      } else {
        Alert.alert("Error", data.message || "Signup failed");
      }
    } catch (error) {
      Alert.alert("Error", "Unable to connect to the server");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>

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
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      {/* <TouchableOpacity onPress={() => router.replace("/Auth/Login")}>
        <Text style={styles.loginText}>Already have an account? Login</Text>
      </TouchableOpacity> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 32,
    textAlign: "center",
    color: "#111827",
  },
  input: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    padding: 14,
    borderRadius: 10,
    marginBottom: 20,
    fontSize: 16,
    backgroundColor: "#f9fafb",
  },
  button: {
    backgroundColor: "#3b82f6",
    paddingVertical: 16,
    borderRadius: 10,
    marginBottom: 20,
  },
  buttonText: {
    color: "#ffffff",
    textAlign: "center",
    fontWeight: "600",
    fontSize: 18,
  },
  loginText: {
    textAlign: "center",
    color: "#6b7280",
    fontSize: 15,
  },
});

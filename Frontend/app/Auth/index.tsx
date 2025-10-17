import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function AuthIndex() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>BazaarTrack</Text>
      <Text style={styles.subtitle}>
        Track local shop prices and save on your daily purchases.
      </Text>

      <TouchableOpacity
        style={styles.loginButton}
        onPress={() => router.push("/Auth/Login")}
      >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.signupButton}
        onPress={() => router.push("/Auth/Signup")}
      >
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 30,
    backgroundColor: "#f8f9fa",
  },
  title: {
    fontSize: 36,
    fontWeight: "700",
    color: "#1f8ef1",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#6c757d",
    textAlign: "center",
    marginBottom: 40,
    paddingHorizontal: 10,
  },
  loginButton: {
    width: "80%",
    backgroundColor: "#1f8ef1",
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 15,
    elevation: 2, // subtle shadow for Android
  },
  signupButton: {
    width: "80%",
    backgroundColor: "#2ecc71",
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
    elevation: 2,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});

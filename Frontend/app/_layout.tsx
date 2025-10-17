// app/_layout.tsx
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: true}}>
      {/* Auth Screens */}
      <Stack.Screen name="Auth/Login" />
      <Stack.Screen name="Auth/Signup" />

      {/* Main Tabs */}
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}

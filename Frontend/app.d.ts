// app.d.ts
import "react-native";
import { TailwindCSS } from "nativewind";

declare module "react-native" {
  interface ViewProps extends TailwindCSS {}
  interface TextProps extends TailwindCSS {}
  interface TextInputProps extends TailwindCSS {}
  interface ScrollViewProps extends TailwindCSS {}
}

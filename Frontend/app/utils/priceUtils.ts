// app/utils/priceUtils.ts
export const formatPrice = (price: number): string => {
  if (typeof price !== "number" || Number.isNaN(price)) return "N/A";
  return `৳${price.toFixed(2)}`;
};

export const getCheapestPlatform = (prices: Record<string, number | null | undefined>) => {
  const valid = Object.entries(prices).filter(([_, v]) => typeof v === "number" && !Number.isNaN(v));
  if (valid.length === 0) return null;
  const [platform, price] = valid.reduce((min, cur) => (cur[1]! < min[1]! ? cur : min));
  return { platform, price: price as number };
};

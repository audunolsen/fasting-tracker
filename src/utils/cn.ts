export default function cn(...cls: unknown[]) {
  // return cls.filter(Boolean).join(" ")
  return cls.filter((e) => typeof e === "string").join(" ")
}

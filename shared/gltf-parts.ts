export type GltfPartKey = "body" | "doors" | "hood" | "engine" | "chassis" | "wheels";

export const GLTF_PART_KEYS: GltfPartKey[] = ["body", "doors", "hood", "engine", "chassis", "wheels"];

export function classifyBodyMesh(index: number, total: number): Exclude<GltfPartKey, "wheels"> {
  const ratio = total > 0 ? index / total : 0;
  if (ratio < 0.34) return "body";
  if (ratio < 0.52) return "doors";
  if (ratio < 0.65) return "hood";
  if (ratio < 0.82) return "engine";
  return "chassis";
}

export function isolateParts(selected: GltfPartKey | null): GltfPartKey[] {
  return selected ? GLTF_PART_KEYS.filter(part => part !== selected) : [];
}

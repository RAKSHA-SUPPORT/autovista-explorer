import { describe, expect, it } from "vitest";
import { classifyBodyMesh, GLTF_PART_KEYS, isolateParts } from "../shared/gltf-parts";

describe("real GLTF part mapping", () => {
  it("keeps the body mesh classification deterministic", () => {
    expect([0, 9, 10, 14, 15, 18, 19, 24, 25, 29].map(index => classifyBodyMesh(index, 30))).toEqual([
      "body", "body", "body", "doors", "doors", "hood", "hood", "engine", "chassis", "chassis",
    ]);
  });

  it("isolates exactly one part and restores every part", () => {
    expect(isolateParts("doors")).toEqual(["body", "hood", "engine", "chassis", "wheels"]);
    expect(isolateParts(null)).toEqual([]);
    expect(GLTF_PART_KEYS).toHaveLength(6);
  });
});

import { describe, expect, it } from "vitest";
import { fitCameraDistance, orbitLimits } from "../shared/camera-fit";

describe("responsive GLB camera fitting", () => {
  it("fits the largest model dimension with padding", () => {
    const distance = fitCameraDistance({ x: 4.8, y: 1.4, z: 2.1 }, 34, 1.7, 1.25);
    expect(distance).toBeGreaterThan(7);
    expect(distance).toBeLessThan(14);
  });

  it("keeps zoom controls bounded relative to the fitted distance", () => {
    const limits = orbitLimits(10);
    expect(limits.min).toBe(6.2);
    expect(limits.max).toBe(26.5);
    expect(limits.min).toBeLessThan(limits.max);
  });
});

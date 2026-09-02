import { describe, expect, it, vi } from "vitest";

const mockedDb = vi.hoisted(() => ({ value: null as any }));
vi.mock("./db", () => ({ getDb: async () => mockedDb.value }));

import { FALLBACK_CARS, bodyStyles, fuelTypes, getCarBySlug, getRelatedCars, listCatalog } from "./catalog";
import { appRouter } from "./routers";
import { catalogRowsToCsv, parseCatalogCsv } from "../shared/catalog-csv";

describe("AutoVista catalog helpers", () => {
  it("ships a varied representative archive with stable slugs", () => {
    expect(FALLBACK_CARS.length).toBeGreaterThanOrEqual(8);
    expect(new Set(FALLBACK_CARS.map(car => car.make)).size).toBeGreaterThanOrEqual(6);
    expect(FALLBACK_CARS.every(car => car.slug && car.specs.length > 0 && car.sources.length > 0)).toBe(true);
  });

  it("filters the fallback archive by search, body style, and fuel type", async () => {
    const result = await listCatalog({ search: "M4", bodyStyle: "Coupe", fuelType: "Petrol", limit: 10 });
    expect(result.cars.some(car => car.slug === "bmw-m4-g82-competition")).toBe(true);
    expect(result.cars.every(car => car.bodyStyle === "Coupe" && car.fuelType === "Petrol")).toBe(true);
    expect(bodyStyles).toContain("SUV");
    expect(fuelTypes).toContain("Electric");
  });

  it("returns a complete detail record and related machines", async () => {
    const car = await getCarBySlug("bmw-m4-g82-competition");
    expect(car?.model).toBe("M4");
    expect(car?.components.length).toBeGreaterThan(0);
    const related = await getRelatedCars("bmw-m4-g82-competition");
    expect(related.every(item => item.slug !== "bmw-m4-g82-competition")).toBe(true);
  });
});

describe("protected comparison workflow", () => {
  it("rejects unauthenticated comparison-set access", async () => {
    const caller = appRouter.createCaller({ user: null, req: {} as never, res: {} as never });
    await expect(caller.comparisons.list()).rejects.toMatchObject({ code: "UNAUTHORIZED" });
  });
});


describe("protected favorites and admin workflow boundaries", () => {
  it("rejects unauthenticated favorites access", async () => {
    const caller = appRouter.createCaller({ user: null, req: {} as never, res: {} as never });
    await expect(caller.favorites.list()).rejects.toMatchObject({ code: "UNAUTHORIZED" });
  });

  it("rejects non-admin catalog mutations", async () => {
    const caller = appRouter.createCaller({ user: { id: 7, role: "user" } as never, req: {} as never, res: {} as never });
    await expect(caller.admin.deleteCar({ trimId: 1 })).rejects.toMatchObject({ code: "FORBIDDEN" });
    await expect(caller.admin.exportData()).rejects.toMatchObject({ code: "FORBIDDEN" });
  });
});


describe("CSV catalog exchange", () => {
  it("round-trips quoted commas, escaped quotes, and multiline summaries", () => {
    const original = [{ make: "AutoVista", model: "Signal", generation: "S1", trim: "Base", year: 2026, bodyStyle: "Coupe", fuelType: "Electric", horsepower: 400, summary: "A precise, quiet machine with a \"technical\" character.\nBuilt for long arcs." }];
    const csv = catalogRowsToCsv(original);
    expect(parseCatalogCsv(csv)).toEqual(original);
  });
});

describe("fallback workflow contracts", () => {
  it("keeps favorites callable and returns a safe empty state without a database", async () => {
    const user = { id: 11, role: "user" } as never;
    const caller = appRouter.createCaller({ user, req: {} as never, res: {} as never });
    expect(await caller.favorites.list()).toEqual([]);
    expect(await caller.favorites.toggle({ trimId: 1 })).toEqual({ saved: false });
  });

  it("keeps admin create, update, delete, import, and export contracts callable", async () => {
    const user = { id: 12, role: "admin" } as never;
    const caller = appRouter.createCaller({ user, req: {} as never, res: {} as never });
    expect((await caller.admin.exportData()).length).toBeGreaterThan(0);
    expect(await caller.admin.createCar({ make: "Test Make", model: "Test Model", generation: "T1", trim: "Base", year: 2026, bodyStyle: "Sedan", fuelType: "Electric", horsepower: 200, summary: "A sufficiently descriptive catalog entry for a workflow test." })).toMatchObject({ success: false });
    expect(await caller.admin.updateCar({ trimId: 1, horsepower: 200 })).toMatchObject({ success: false });
    expect(await caller.admin.deleteCar({ trimId: 1 })).toMatchObject({ success: false });
    expect(await caller.admin.importRecords({ records: [{ make: "Test Make", model: "Test Model", generation: "T1", trim: "Base", year: 2026, bodyStyle: "Sedan", fuelType: "Electric", horsepower: 200, summary: "A sufficiently descriptive catalog entry for a workflow test." }] })).toMatchObject({ success: false });
  });
});


describe("working database success paths", () => {
  it("toggles and lists a favorite against a working database mock", async () => {
    const savedRows: Array<{ id: number; trimId: number }> = [];
    const db = {
      select: () => ({ from() { return this; }, where() { return this; }, limit: async () => savedRows.map(row => ({ id: row.id })), then: (resolve: (value: unknown) => unknown) => Promise.resolve(savedRows.map(row => ({ trimId: row.trimId }))).then(resolve) }),
      insert: () => ({ values: async (value: { userId: number; trimId: number }) => { savedRows.push({ id: savedRows.length + 1, trimId: value.trimId }); } }),
      delete: () => ({ where: async () => { savedRows.pop(); } }),
    };
    mockedDb.value = db;
    const caller = appRouter.createCaller({ user: { id: 21, role: "user" } as never, req: {} as never, res: {} as never });
    expect(await caller.favorites.toggle({ trimId: 1 })).toEqual({ saved: true });
    expect((await caller.favorites.list()).map((car: any) => car?.slug)).toEqual(["bmw-m4-g82-competition"]);
    expect(await caller.favorites.toggle({ trimId: 1 })).toEqual({ saved: false });
    mockedDb.value = null;
  });

  it("returns successful admin update and delete results against a working database mock", async () => {
    const db = { update: () => ({ set: () => ({ where: async () => undefined }) }), delete: () => ({ where: async () => undefined }) };
    mockedDb.value = db;
    const caller = appRouter.createCaller({ user: { id: 22, role: "admin" } as never, req: {} as never, res: {} as never });
    expect(await caller.admin.updateCar({ trimId: 1, horsepower: 725, summary: "A sufficiently detailed catalog summary for the working database test.", priceFrom: "$1" })).toEqual({ success: true });
    expect(await caller.admin.deleteCar({ trimId: 1 })).toEqual({ success: true });
    mockedDb.value = null;
  });
});


describe("remaining admin success paths", () => {
  it("creates, imports, and exports catalog records with a working database mock", async () => {
    let nextId = 100;
    const query = { from() { return this; }, leftJoin() { return this; }, innerJoin() { return this; }, where() { return this; }, orderBy() { return this; }, limit: async () => [], then: (resolve: (value: unknown) => unknown) => Promise.resolve([]).then(resolve) };
    const db = { select: () => query, insert: () => ({ values: () => ({ $returningId: async () => [{ id: nextId++ }] }) }) };
    mockedDb.value = db;
    const caller = appRouter.createCaller({ user: { id: 23, role: "admin" } as never, req: {} as never, res: {} as never });
    const record = { make: "Test Make", model: "Test Model", generation: "T1", trim: "Base", year: 2026, bodyStyle: "Sedan", fuelType: "Electric", horsepower: 200, summary: "A sufficiently descriptive catalog entry for a working workflow test." };
    expect(await caller.admin.createCar(record)).toMatchObject({ success: true });
    expect(await caller.admin.importRecords({ records: [record] })).toMatchObject({ success: true, imported: 1 });
    expect((await caller.admin.exportData()).length).toBeGreaterThan(0);
    mockedDb.value = null;
  });
});

describe("vehicle identity consistency", () => {
  it("keeps the Porsche dossier tied to Porsche imagery and no BMW GLB", async () => {
    const porsche = await getCarBySlug("porsche-911-carrera-t-992");
    expect(porsche?.make).toBe("Porsche");
    expect(porsche?.model).toBe("911");
    expect(porsche?.heroImageUrl).toContain("porsche-911-carrera");
    expect(porsche?.has3d).toBe(false);
  });
});

it("keeps the enabled BMW showcase aligned with the BMW M4 asset", async () => {
  const bmw = await getCarBySlug("bmw-m4-g82-competition");
  expect(bmw?.make).toBe("BMW");
  expect(bmw?.model).toBe("M4");
  expect(bmw?.heroImageUrl).toContain("bmw-m4-competition");
  expect(bmw?.has3d).toBe(true);
  expect(bmw?.summary).toContain("M4 Competition");
    expect(bmw?.generation).toBe("G82");
    expect(bmw?.trim).toBe("Competition M Package");
});

it("emits a consistent BMW M4 record from the database-backed catalog path", async () => {
  const trim = { id: 1, slug: "bmw-m4-g82-competition", name: "Competition M Package", modelYear: 2021, bodyStyle: "Coupe", fuelType: "Petrol", powertrain: "3.0L M TwinPower Turbo inline-six", drivetrain: "AWD", transmission: "8-speed M Steptronic", horsepower: 503, torqueNm: 650, zeroToSixty: "3.8 s", topSpeedKph: 290, rangeKm: null, efficiency: "10.2 l/100 km", priceFrom: "$79,100", productionStatus: "Current", summary: "A rear-biased M4 Competition built around a high-output inline-six.", heroImageUrl: "/manus-storage/bmw-m4-competition_7e520286.jpg", isPublished: 1 };
  let selectCount = 0;
  const responses = [
    [{ trim, generation: { label: "G82", slug: "m4-g82" }, model: { name: "M4", slug: "m4" }, make: { name: "BMW", slug: "bmw" } }],
    [], [], [],
    [{ modelUrl: "/manus-storage/bmw_m4_competition_m_package_aaa37e83.glb", assetStatus: "ready" }],
  ];
  const query = { from() { return this; }, leftJoin() { return this; }, innerJoin() { return this; }, where() { return this; }, orderBy() { return this; }, limit() { return this; }, then(resolve: (value: unknown) => unknown) { return Promise.resolve(responses[selectCount++] ?? []).then(resolve); } };
  mockedDb.value = { select: () => query };
  const result = await listCatalog({ limit: 1 });
  expect(result.cars[0]).toMatchObject({ slug: "bmw-m4-g82-competition", make: "BMW", model: "M4", heroImageUrl: "/manus-storage/bmw-m4-competition_7e520286.jpg", has3d: true });
  mockedDb.value = null;
});

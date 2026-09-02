import { index, int, json, mysqlEnum, mysqlTable, text, timestamp, uniqueIndex, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

export const makes = mysqlTable("makes", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 120 }).notNull(),
  slug: varchar("slug", { length: 140 }).notNull(),
  country: varchar("country", { length: 80 }),
  foundedYear: int("foundedYear"),
  description: text("description"),
  logoUrl: varchar("logoUrl", { length: 500 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
}, table => ({ slugIdx: uniqueIndex("makes_slug_idx").on(table.slug) }));

export const models = mysqlTable("models", {
  id: int("id").autoincrement().primaryKey(),
  makeId: int("makeId").notNull(),
  name: varchar("name", { length: 120 }).notNull(),
  slug: varchar("slug", { length: 140 }).notNull(),
  segment: varchar("segment", { length: 80 }),
  bodyStyle: varchar("bodyStyle", { length: 50 }),
  description: text("description"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
}, table => ({ slugIdx: uniqueIndex("models_slug_idx").on(table.slug), makeIdx: index("models_make_idx").on(table.makeId) }));

export const generations = mysqlTable("generations", {
  id: int("id").autoincrement().primaryKey(),
  modelId: int("modelId").notNull(),
  label: varchar("label", { length: 120 }).notNull(),
  slug: varchar("slug", { length: 180 }).notNull(),
  startYear: int("startYear"),
  endYear: int("endYear"),
  platform: varchar("platform", { length: 100 }),
  market: varchar("market", { length: 80 }).default("Global"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
}, table => ({ slugIdx: uniqueIndex("generations_slug_idx").on(table.slug), modelIdx: index("generations_model_idx").on(table.modelId) }));

export const trims = mysqlTable("trims", {
  id: int("id").autoincrement().primaryKey(),
  generationId: int("generationId").notNull(),
  name: varchar("name", { length: 160 }).notNull(),
  slug: varchar("slug", { length: 220 }).notNull(),
  modelYear: int("modelYear"),
  bodyStyle: mysqlEnum("bodyStyle", ["Sedan", "Coupe", "SUV", "Hatchback", "Wagon", "Convertible", "Pickup", "Van", "Supercar", "Touring"]),
  fuelType: mysqlEnum("fuelType", ["Petrol", "Diesel", "Hybrid", "Plug-in Hybrid", "Electric", "Hydrogen"]),
  powertrain: varchar("powertrain", { length: 120 }),
  drivetrain: mysqlEnum("drivetrain", ["RWD", "FWD", "AWD", "4WD"]),
  transmission: varchar("transmission", { length: 100 }),
  horsepower: int("horsepower"),
  torqueNm: int("torqueNm"),
  zeroToSixty: varchar("zeroToSixty", { length: 30 }),
  topSpeedKph: int("topSpeedKph"),
  rangeKm: int("rangeKm"),
  efficiency: varchar("efficiency", { length: 80 }),
  priceFrom: varchar("priceFrom", { length: 50 }),
  productionStatus: mysqlEnum("productionStatus", ["Current", "Discontinued", "Concept"]).default("Current").notNull(),
  summary: text("summary"),
  heroImageUrl: varchar("heroImageUrl", { length: 500 }),
  isPublished: int("isPublished").default(1).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
}, table => ({ slugIdx: uniqueIndex("trims_slug_idx").on(table.slug), generationIdx: index("trims_generation_idx").on(table.generationId), searchIdx: index("trims_search_idx").on(table.modelYear, table.bodyStyle, table.fuelType, table.horsepower) }));

export const specifications = mysqlTable("specifications", {
  id: int("id").autoincrement().primaryKey(),
  trimId: int("trimId").notNull(),
  category: varchar("category", { length: 80 }).notNull(),
  specKey: varchar("specKey", { length: 100 }).notNull(),
  value: varchar("value", { length: 240 }).notNull(),
  unit: varchar("unit", { length: 40 }),
  sortOrder: int("sortOrder").default(0).notNull(),
}, table => ({ trimIdx: index("specifications_trim_idx").on(table.trimId) }));

export const mediaAssets = mysqlTable("mediaAssets", {
  id: int("id").autoincrement().primaryKey(),
  trimId: int("trimId").notNull(),
  type: mysqlEnum("type", ["hero", "gallery", "diagram", "interior", "detail"]).default("gallery").notNull(),
  url: varchar("url", { length: 500 }).notNull(),
  altText: varchar("altText", { length: 240 }).notNull(),
  caption: varchar("caption", { length: 240 }),
  sortOrder: int("sortOrder").default(0).notNull(),
}, table => ({ trimIdx: index("media_assets_trim_idx").on(table.trimId) }));

export const sources = mysqlTable("sources", {
  id: int("id").autoincrement().primaryKey(),
  trimId: int("trimId").notNull(),
  specId: int("specId"),
  publisher: varchar("publisher", { length: 160 }).notNull(),
  url: varchar("url", { length: 600 }).notNull(),
  publicationDate: varchar("publicationDate", { length: 40 }),
  notes: text("notes"),
}, table => ({ trimIdx: index("sources_trim_idx").on(table.trimId) }));

export const threeDAssets = mysqlTable("threeDAssets", {
  id: int("id").autoincrement().primaryKey(),
  trimId: int("trimId").notNull(),
  modelUrl: varchar("modelUrl", { length: 600 }),
  previewUrl: varchar("previewUrl", { length: 600 }),
  assetStatus: mysqlEnum("assetStatus", ["ready", "processing", "fallback", "missing"]).default("fallback").notNull(),
  cameraJson: json("cameraJson"),
  notes: text("notes"),
}, table => ({ trimIdx: uniqueIndex("three_d_assets_trim_idx").on(table.trimId) }));

export const components = mysqlTable("components", {
  id: int("id").autoincrement().primaryKey(),
  threeDAssetId: int("threeDAssetId").notNull(),
  partKey: varchar("partKey", { length: 80 }).notNull(),
  label: varchar("label", { length: 120 }).notNull(),
  category: varchar("category", { length: 80 }).notNull(),
  nodeName: varchar("nodeName", { length: 160 }),
  transformJson: json("transformJson"),
  description: text("description"),
  sortOrder: int("sortOrder").default(0).notNull(),
}, table => ({ assetIdx: index("components_asset_idx").on(table.threeDAssetId) }));

export const favorites = mysqlTable("favorites", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  trimId: int("trimId").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
}, table => ({ userIdx: index("favorites_user_idx").on(table.userId), uniqueFavorite: uniqueIndex("favorites_user_trim_idx").on(table.userId, table.trimId) }));

export const comparisonSets = mysqlTable("comparisonSets", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId"),
  shareToken: varchar("shareToken", { length: 80 }).unique(),
  title: varchar("title", { length: 160 }).default("Untitled comparison").notNull(),
  trimIdsJson: json("trimIdsJson").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
}, table => ({ userIdx: index("comparison_sets_user_idx").on(table.userId) }));

export type Make = typeof makes.$inferSelect;
export type Model = typeof models.$inferSelect;
export type Generation = typeof generations.$inferSelect;
export type Trim = typeof trims.$inferSelect;
export type Specification = typeof specifications.$inferSelect;
export type MediaAsset = typeof mediaAssets.$inferSelect;
export type Source = typeof sources.$inferSelect;
export type ThreeDAsset = typeof threeDAssets.$inferSelect;
export type Component = typeof components.$inferSelect;
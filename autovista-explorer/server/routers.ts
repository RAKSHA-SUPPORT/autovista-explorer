import { and, eq } from "drizzle-orm";
import { z } from "zod";
import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { adminProcedure, protectedProcedure, publicProcedure, router } from "./_core/trpc";
import { comparisonSets, generations, makes, models, specifications, threeDAssets, trims, favorites } from "../drizzle/schema";
import { getDb } from "./db";
import { FALLBACK_CARS, getAdminRows, getCarBySlug, getCatalogStats, getMakes, getRelatedCars, listCatalog } from "./catalog";

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  catalog: router({
    stats: publicProcedure.query(() => getCatalogStats()),
    makes: publicProcedure.query(() => getMakes()),
    list: publicProcedure.input(z.object({ search: z.string().optional(), bodyStyle: z.string().optional(), fuelType: z.string().optional(), make: z.string().optional(), sort: z.string().optional(), limit: z.number().int().min(1).max(100).default(12), offset: z.number().int().min(0).default(0) }).optional()).query(({ input }) => listCatalog(input ?? {})),
    bySlug: publicProcedure.input(z.object({ slug: z.string() })).query(({ input }) => getCarBySlug(input.slug)),
    related: publicProcedure.input(z.object({ slug: z.string() })).query(({ input }) => getRelatedCars(input.slug)),
    compare: publicProcedure.input(z.object({ slugs: z.array(z.string()).min(1).max(3) })).query(async ({ input }) => Promise.all(input.slugs.map(slug => getCarBySlug(slug)))),
  }),
  comparisons: router({
    list: protectedProcedure.query(async ({ ctx }) => {
      const db = await getDb();
      if (!db) return [];
      return db.select().from(comparisonSets).where(eq(comparisonSets.userId, ctx.user.id));
    }),
    save: protectedProcedure.input(z.object({ title: z.string().min(1).max(160).default("Untitled comparison"), slugs: z.array(z.string()).min(1).max(3) })).mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) return { success: false as const };
      const shareToken = `cmp-${ctx.user.id}-${Date.now()}`;
      await db.insert(comparisonSets).values({ userId: ctx.user.id, shareToken, title: input.title, trimIdsJson: input.slugs });
      return { success: true as const, shareToken };
    }),
    delete: protectedProcedure.input(z.object({ id: z.number().int().positive() })).mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) return { success: false as const };
      await db.delete(comparisonSets).where(and(eq(comparisonSets.id, input.id), eq(comparisonSets.userId, ctx.user.id)));
      return { success: true as const };
    }),
  }),
  favorites: router({
    list: protectedProcedure.query(async ({ ctx }) => {
      const db = await getDb();
      if (!db) return [];
      const rows = await db.select({ trimId: favorites.trimId }).from(favorites).where(eq(favorites.userId, ctx.user.id));
      return rows.map(row => FALLBACK_CARS.find(car => car.id === row.trimId)).filter(Boolean);
    }),
    toggle: protectedProcedure.input(z.object({ trimId: z.number().int().positive() })).mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) return { saved: false };
      const existing = await db.select({ id: favorites.id }).from(favorites).where(and(eq(favorites.userId, ctx.user.id), eq(favorites.trimId, input.trimId))).limit(1);
      if (existing.length) {
        await db.delete(favorites).where(eq(favorites.id, existing[0].id));
        return { saved: false };
      }
      await db.insert(favorites).values({ userId: ctx.user.id, trimId: input.trimId });
      return { saved: true };
    }),
  }),
  admin: router({
    list: adminProcedure.input(z.object({ search: z.string().optional() }).optional()).query(({ input }) => getAdminRows(input?.search)),
    updateCar: adminProcedure.input(z.object({ trimId: z.number().int().positive(), horsepower: z.number().int().min(0).optional(), summary: z.string().min(20).optional(), priceFrom: z.string().optional() })).mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) return { success: false, message: "Database unavailable" };
      await db.update(trims).set({ horsepower: input.horsepower, summary: input.summary, priceFrom: input.priceFrom }).where(eq(trims.id, input.trimId));
      return { success: true };
    }),
    deleteCar: adminProcedure.input(z.object({ trimId: z.number().int().positive() })).mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) return { success: false, message: "Database unavailable" };
      await db.delete(trims).where(eq(trims.id, input.trimId));
      return { success: true };
    }),
    exportData: adminProcedure.query(async () => getAdminRows()),
    importRecords: adminProcedure.input(z.object({ records: z.array(z.object({ make: z.string().min(2), model: z.string().min(1), generation: z.string().min(1), trim: z.string().min(1), year: z.number().int(), bodyStyle: z.string(), fuelType: z.string(), horsepower: z.number().int(), summary: z.string().min(20) })).min(1).max(50) })).mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) return { success: false, imported: 0 };
      let imported = 0;
      for (const record of input.records) {
        const makeSlug = record.make.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
        const existingMake = await db.select({ id: makes.id }).from(makes).where(eq(makes.slug, makeSlug)).limit(1);
        const makeId = existingMake[0]?.id ?? (await db.insert(makes).values({ name: record.make, slug: makeSlug }).$returningId())[0].id;
        const modelSlug = `${record.model}-${makeId}-${Date.now()}-${imported}`.toLowerCase().replace(/[^a-z0-9]+/g, "-");
        const [modelRow] = await db.insert(models).values({ makeId, name: record.model, slug: modelSlug, segment: record.bodyStyle, bodyStyle: record.bodyStyle }).$returningId();
        const [generationRow] = await db.insert(generations).values({ modelId: modelRow.id, label: record.generation, slug: `${modelSlug}-generation`, startYear: record.year, market: "Global" }).$returningId();
        const [trimRow] = await db.insert(trims).values({ generationId: generationRow.id, name: record.trim, slug: `${modelSlug}-${record.trim}`.toLowerCase().replace(/[^a-z0-9]+/g, "-"), modelYear: record.year, bodyStyle: record.bodyStyle as any, fuelType: record.fuelType as any, horsepower: record.horsepower, summary: record.summary, productionStatus: "Current", isPublished: 1 }).$returningId();
        await db.insert(threeDAssets).values({ trimId: trimRow.id, assetStatus: "fallback" });
        imported += 1;
      }
      return { success: true, imported };
    }),
    createCar: adminProcedure.input(z.object({ make: z.string().min(2), model: z.string().min(1), generation: z.string().min(1), trim: z.string().min(1), year: z.number().int().min(1886).max(2100), bodyStyle: z.string().min(1), fuelType: z.string().min(1), horsepower: z.number().int().min(0), summary: z.string().min(20) })).mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) return { success: false, message: "Database unavailable" };
      const makeSlug = input.make.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
      const slugBase = `${makeSlug}-${input.model}-${input.trim}`.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
      const existingMake = await db.select({ id: makes.id }).from(makes).where(eq(makes.slug, makeSlug)).limit(1);
      const makeId = existingMake[0]?.id ?? (await db.insert(makes).values({ name: input.make, slug: makeSlug }).$returningId())[0].id;
      const modelSlug = `${input.model}-${makeId}`.toLowerCase().replace(/[^a-z0-9]+/g, "-");
      const [modelRow] = await db.insert(models).values({ makeId, name: input.model, slug: modelSlug, segment: input.bodyStyle, bodyStyle: input.bodyStyle }).$returningId();
      const [generationRow] = await db.insert(generations).values({ modelId: modelRow.id, label: input.generation, slug: `${slugBase}-generation`, startYear: input.year, market: "Global" }).$returningId();
      const [trimRow] = await db.insert(trims).values({ generationId: generationRow.id, name: input.trim, slug: slugBase, modelYear: input.year, bodyStyle: input.bodyStyle as any, fuelType: input.fuelType as any, horsepower: input.horsepower, summary: input.summary, productionStatus: "Current", isPublished: 1 }).$returningId();
      await db.insert(specifications).values({ trimId: trimRow.id, category: "Performance", specKey: "Power", value: String(input.horsepower), unit: "hp", sortOrder: 0 });
      await db.insert(threeDAssets).values({ trimId: trimRow.id, assetStatus: "fallback", notes: "Configure a licensed GLB asset in the admin pipeline." });
      return { success: true, slug: slugBase };
    }),
  }),
});

export type AppRouter = typeof appRouter;

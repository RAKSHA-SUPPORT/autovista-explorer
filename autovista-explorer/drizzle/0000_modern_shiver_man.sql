CREATE TABLE `comparisonSets` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int,
	`shareToken` varchar(80),
	`title` varchar(160) NOT NULL DEFAULT 'Untitled comparison',
	`trimIdsJson` json NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `comparisonSets_id` PRIMARY KEY(`id`),
	CONSTRAINT `comparisonSets_shareToken_unique` UNIQUE(`shareToken`)
);
--> statement-breakpoint
CREATE TABLE `components` (
	`id` int AUTO_INCREMENT NOT NULL,
	`threeDAssetId` int NOT NULL,
	`partKey` varchar(80) NOT NULL,
	`label` varchar(120) NOT NULL,
	`category` varchar(80) NOT NULL,
	`nodeName` varchar(160),
	`transformJson` json,
	`description` text,
	`sortOrder` int NOT NULL DEFAULT 0,
	CONSTRAINT `components_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `favorites` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`trimId` int NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `favorites_id` PRIMARY KEY(`id`),
	CONSTRAINT `favorites_user_trim_idx` UNIQUE(`userId`,`trimId`)
);
--> statement-breakpoint
CREATE TABLE `generations` (
	`id` int AUTO_INCREMENT NOT NULL,
	`modelId` int NOT NULL,
	`label` varchar(120) NOT NULL,
	`slug` varchar(180) NOT NULL,
	`startYear` int,
	`endYear` int,
	`platform` varchar(100),
	`market` varchar(80) DEFAULT 'Global',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `generations_id` PRIMARY KEY(`id`),
	CONSTRAINT `generations_slug_idx` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `makes` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(120) NOT NULL,
	`slug` varchar(140) NOT NULL,
	`country` varchar(80),
	`foundedYear` int,
	`description` text,
	`logoUrl` varchar(500),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `makes_id` PRIMARY KEY(`id`),
	CONSTRAINT `makes_slug_idx` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `mediaAssets` (
	`id` int AUTO_INCREMENT NOT NULL,
	`trimId` int NOT NULL,
	`type` enum('hero','gallery','diagram','interior','detail') NOT NULL DEFAULT 'gallery',
	`url` varchar(500) NOT NULL,
	`altText` varchar(240) NOT NULL,
	`caption` varchar(240),
	`sortOrder` int NOT NULL DEFAULT 0,
	CONSTRAINT `mediaAssets_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `models` (
	`id` int AUTO_INCREMENT NOT NULL,
	`makeId` int NOT NULL,
	`name` varchar(120) NOT NULL,
	`slug` varchar(140) NOT NULL,
	`segment` varchar(80),
	`bodyStyle` varchar(50),
	`description` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `models_id` PRIMARY KEY(`id`),
	CONSTRAINT `models_slug_idx` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `sources` (
	`id` int AUTO_INCREMENT NOT NULL,
	`trimId` int NOT NULL,
	`specId` int,
	`publisher` varchar(160) NOT NULL,
	`url` varchar(600) NOT NULL,
	`publicationDate` varchar(40),
	`notes` text,
	CONSTRAINT `sources_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `specifications` (
	`id` int AUTO_INCREMENT NOT NULL,
	`trimId` int NOT NULL,
	`category` varchar(80) NOT NULL,
	`specKey` varchar(100) NOT NULL,
	`value` varchar(240) NOT NULL,
	`unit` varchar(40),
	`sortOrder` int NOT NULL DEFAULT 0,
	CONSTRAINT `specifications_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `threeDAssets` (
	`id` int AUTO_INCREMENT NOT NULL,
	`trimId` int NOT NULL,
	`modelUrl` varchar(600),
	`previewUrl` varchar(600),
	`assetStatus` enum('ready','processing','fallback','missing') NOT NULL DEFAULT 'fallback',
	`cameraJson` json,
	`notes` text,
	CONSTRAINT `threeDAssets_id` PRIMARY KEY(`id`),
	CONSTRAINT `three_d_assets_trim_idx` UNIQUE(`trimId`)
);
--> statement-breakpoint
CREATE TABLE `trims` (
	`id` int AUTO_INCREMENT NOT NULL,
	`generationId` int NOT NULL,
	`name` varchar(160) NOT NULL,
	`slug` varchar(220) NOT NULL,
	`modelYear` int,
	`bodyStyle` enum('Sedan','Coupe','SUV','Hatchback','Wagon','Convertible','Pickup','Van','Supercar','Touring'),
	`fuelType` enum('Petrol','Diesel','Hybrid','Plug-in Hybrid','Electric','Hydrogen'),
	`powertrain` varchar(120),
	`drivetrain` enum('RWD','FWD','AWD','4WD'),
	`transmission` varchar(100),
	`horsepower` int,
	`torqueNm` int,
	`zeroToSixty` varchar(30),
	`topSpeedKph` int,
	`rangeKm` int,
	`efficiency` varchar(80),
	`priceFrom` varchar(50),
	`productionStatus` enum('Current','Discontinued','Concept') NOT NULL DEFAULT 'Current',
	`summary` text,
	`heroImageUrl` varchar(500),
	`isPublished` int NOT NULL DEFAULT 1,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `trims_id` PRIMARY KEY(`id`),
	CONSTRAINT `trims_slug_idx` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` int AUTO_INCREMENT NOT NULL,
	`openId` varchar(64) NOT NULL,
	`name` text,
	`email` varchar(320),
	`loginMethod` varchar(64),
	`role` enum('user','admin') NOT NULL DEFAULT 'user',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`lastSignedIn` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_openId_unique` UNIQUE(`openId`)
);
--> statement-breakpoint
CREATE INDEX `comparison_sets_user_idx` ON `comparisonSets` (`userId`);--> statement-breakpoint
CREATE INDEX `components_asset_idx` ON `components` (`threeDAssetId`);--> statement-breakpoint
CREATE INDEX `favorites_user_idx` ON `favorites` (`userId`);--> statement-breakpoint
CREATE INDEX `generations_model_idx` ON `generations` (`modelId`);--> statement-breakpoint
CREATE INDEX `media_assets_trim_idx` ON `mediaAssets` (`trimId`);--> statement-breakpoint
CREATE INDEX `models_make_idx` ON `models` (`makeId`);--> statement-breakpoint
CREATE INDEX `sources_trim_idx` ON `sources` (`trimId`);--> statement-breakpoint
CREATE INDEX `specifications_trim_idx` ON `specifications` (`trimId`);--> statement-breakpoint
CREATE INDEX `trims_generation_idx` ON `trims` (`generationId`);--> statement-breakpoint
CREATE INDEX `trims_search_idx` ON `trims` (`modelYear`,`bodyStyle`,`fuelType`,`horsepower`);
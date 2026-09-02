 export interface VehicleRecord {
  id: string;
  slug: string;
  name: string;
  brand: string;
  make: string;
  year: number;
  category: "Supercar" | "Hypercar" | "Sports Sedan" | "Performance SUV" | "EV" | "Coupe" | "Grand Tourer";
  price: string;
  priceNumeric: number;
  horsepower: number;
  zeroToSixty: number;
  topSpeed: number;
  powertrain: string;
  curbWeight: number;
  heroImage: string;
  description: string;
  status: "Active" | "Archived";
  createdAt: string;
}

const BRAND_IMAGE_MAP: Record<string, string> = {
  Porsche: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=1200&q=80",
  BMW: "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1200&q=80",
  Ferrari: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=1200&q=80",
  Lamborghini: "https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&w=1200&q=80",
  McLaren: "https://images.unsplash.com/photo-1621135802920-133df287f89c?auto=format&fit=crop&w=1200&q=80",
  "Mercedes-AMG": "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1200&q=80",
  Audi: "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=1200&q=80",
  "Aston Martin": "https://images.unsplash.com/photo-1600712242805-5f78671b24da?auto=format&fit=crop&w=1200&q=80",
  Bugatti: "https://images.unsplash.com/photo-1541348263662-e0c8de4259ba?auto=format&fit=crop&w=1200&q=80",
  Koenigsegg: "https://images.unsplash.com/photo-1566008885218-90abf9200ddb?auto=format&fit=crop&w=1200&q=80",
  Rimac: "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1200&q=80",
  Bentley: "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1200&q=80",
  "Rolls-Royce": "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1200&q=80",
  Maserati: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80",
  Nissan: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=1200&q=80",
  Chevrolet: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=80",
  Ford: "https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?auto=format&fit=crop&w=1200&q=80",
  Dodge: "https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?auto=format&fit=crop&w=1200&q=80",
  AlfaRomeo: "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1200&q=80",
  Lotus: "https://images.unsplash.com/photo-1503736334956-4c8f8e929468?auto=format&fit=crop&w=1200&q=80"
};

const BASE_RAW_CARS: Array<{
  id: string;
  name: string;
  brand: string;
  year: number;
  category: VehicleRecord["category"];
  price: string;
  priceNumeric: number;
  horsepower: number;
  zeroToSixty: number;
  topSpeed: number;
  powertrain: string;
  curbWeight: number;
  description: string;
}> = [
  // Porsche
  { id: "porsche-911-gt3-rs", name: "911 GT3 RS", brand: "Porsche", year: 2025, category: "Supercar", price: "$241,300", priceNumeric: 241300, horsepower: 518, zeroToSixty: 3.0, topSpeed: 296, powertrain: "4.0L Naturally Aspirated Boxer-6", curbWeight: 1450, description: "Track-focused aerodynamic masterpiece with DRS wing." },
  { id: "porsche-911-turbo-s", name: "911 Turbo S", brand: "Porsche", year: 2025, category: "Supercar", price: "$230,400", priceNumeric: 230400, horsepower: 640, zeroToSixty: 2.6, topSpeed: 330, powertrain: "3.8L Twin-Turbo Boxer-6", curbWeight: 1640, description: "All-weather hypercar acceleration benchmark." },
  { id: "porsche-911-carrera-gts", name: "911 Carrera GTS T-Hybrid", brand: "Porsche", year: 2025, category: "Coupe", price: "$164,900", priceNumeric: 164900, horsepower: 532, zeroToSixty: 2.9, topSpeed: 312, powertrain: "3.6L Turbo e-Hybrid Boxer-6", curbWeight: 1595, description: "Electrified turbocharged performance." },
  { id: "porsche-718-cayman-gt4-rs", name: "718 Cayman GT4 RS", brand: "Porsche", year: 2024, category: "Supercar", price: "$160,700", priceNumeric: 160700, horsepower: 493, zeroToSixty: 3.2, topSpeed: 315, powertrain: "4.0L Atmospheric Flat-6 (9,000 RPM)", curbWeight: 1415, description: "Mid-engine acoustic beast with direct air intakes." },
  { id: "porsche-taycan-turbo-gt", name: "Taycan Turbo GT", brand: "Porsche", year: 2025, category: "EV", price: "$230,000", priceNumeric: 230000, horsepower: 1092, zeroToSixty: 2.1, topSpeed: 305, powertrain: "Dual Electric Motors with Attack Mode", curbWeight: 2220, description: "Nürburgring EV record holding electric track weapon." },
  { id: "porsche-panamera-turbo-e-hybrid", name: "Panamera Turbo E-Hybrid", brand: "Porsche", year: 2025, category: "Sports Sedan", price: "$191,000", priceNumeric: 191000, horsepower: 670, zeroToSixty: 3.0, topSpeed: 315, powertrain: "4.0L Twin-Turbo V8 + Electric Motor", curbWeight: 2360, description: "Executive luxury with Active Ride suspension." },
  { id: "porsche-cayenne-turbo-gt", name: "Cayenne Turbo GT", brand: "Porsche", year: 2025, category: "Performance SUV", price: "$196,300", priceNumeric: 196300, horsepower: 650, zeroToSixty: 3.1, topSpeed: 305, powertrain: "4.0L Twin-Turbo V8", curbWeight: 2220, description: "Fastest production SUV benchmark." },
  { id: "porsche-macan-ev-turbo", name: "Macan Turbo EV", brand: "Porsche", year: 2025, category: "EV", price: "$105,300", priceNumeric: 105300, horsepower: 630, zeroToSixty: 3.1, topSpeed: 260, powertrain: "PPE Dual Motor All-Wheel Drive", curbWeight: 2405, description: "All-electric compact performance SUV." },

  // BMW
  { id: "bmw-m5-g90", name: "M5 Sedan (G90)", brand: "BMW", year: 2025, category: "Sports Sedan", price: "$119,500", priceNumeric: 119500, horsepower: 717, zeroToSixty: 3.4, topSpeed: 305, powertrain: "4.4L Twin-Turbo V8 M Hybrid", curbWeight: 2445, description: "Electrified business express with M xDrive." },
  { id: "bmw-m4-csl", name: "M4 CSL", brand: "BMW", year: 2024, category: "Coupe", price: "$139,900", priceNumeric: 139900, horsepower: 543, zeroToSixty: 3.6, topSpeed: 307, powertrain: "3.0L Twin-Turbo S58 Inline-6", curbWeight: 1625, description: "Lightweight Competition Sport track special." },
  { id: "bmw-m3-cs", name: "M3 CS", brand: "BMW", year: 2024, category: "Sports Sedan", price: "$118,700", priceNumeric: 118700, horsepower: 543, zeroToSixty: 3.2, topSpeed: 302, powertrain: "3.0L Twin-Turbo Inline-6", curbWeight: 1765, description: "Four-door precision weapon with carbon ceramics." },
  { id: "bmw-m8-competition-gran-coupe", name: "M8 Competition Gran Coupe", brand: "BMW", year: 2025, category: "Grand Tourer", price: "$138,800", priceNumeric: 138800, horsepower: 617, zeroToSixty: 3.0, topSpeed: 305, powertrain: "4.4L Twin-Turbo V8", curbWeight: 2040, description: "Flagship grand tourer combining supreme pace." },
  { id: "bmw-m2-g87", name: "M2 Coupe", brand: "BMW", year: 2025, category: "Coupe", price: "$64,900", priceNumeric: 64900, horsepower: 473, zeroToSixty: 3.9, topSpeed: 285, powertrain: "3.0L Twin-Turbo Inline-6", curbWeight: 1710, description: "Pure rear-wheel-drive manual purist machine." },
  { id: "bmw-xm-label-red", name: "XM Label Red", brand: "BMW", year: 2025, category: "Performance SUV", price: "$185,000", priceNumeric: 185000, horsepower: 738, zeroToSixty: 3.7, topSpeed: 290, powertrain: "4.4L V8 M Hybrid Powertrain", curbWeight: 2710, description: "The most powerful standalone BMW M vehicle." },
  { id: "bmw-i4-m50", name: "i4 M50", brand: "BMW", year: 2025, category: "EV", price: "$69,700", priceNumeric: 69700, horsepower: 536, zeroToSixty: 3.7, topSpeed: 225, powertrain: "Dual Electric M Motors", curbWeight: 2290, description: "Best-selling M performance electric gran coupe." },
  { id: "bmw-i7-m70", name: "i7 M70 xDrive", brand: "BMW", year: 2025, category: "EV", price: "$168,500", priceNumeric: 168500, horsepower: 650, zeroToSixty: 3.5, topSpeed: 250, powertrain: "Dual Motor AWD (101.7 kWh)", curbWeight: 2695, description: "Ultra-luxury electric flagship with Theatre Screen." },

  // Ferrari
  { id: "ferrari-f80", name: "F80 Hypercar", brand: "Ferrari", year: 2025, category: "Hypercar", price: "$3,900,000", priceNumeric: 3900000, horsepower: 1200, zeroToSixty: 2.15, topSpeed: 350, powertrain: "3.0L Twin-Turbo V6 + Tri-Motor Hybrid", curbWeight: 1525, description: "Next-generation Maranello crown jewel." },
  { id: "ferrari-812-competizione", name: "812 Competizione", brand: "Ferrari", year: 2024, category: "Supercar", price: "$600,000", priceNumeric: 600000, horsepower: 819, zeroToSixty: 2.8, topSpeed: 340, powertrain: "6.5L Atmospheric V12 (9,500 RPM)", curbWeight: 1487, description: "Pinnacle front-engine atmospheric V12." },
  { id: "ferrari-sf90-xx-stradale", name: "SF90 XX Stradale", brand: "Ferrari", year: 2024, category: "Hypercar", price: "$890,000", priceNumeric: 890000, horsepower: 1016, zeroToSixty: 2.3, topSpeed: 320, powertrain: "4.0L Twin-Turbo V8 PHEV", curbWeight: 1560, description: "Road-legal XX program car with fixed carbon wing." },
  { id: "ferrari-296-gtb", name: "296 GTB", brand: "Ferrari", year: 2025, category: "Supercar", price: "$342,205", priceNumeric: 342205, horsepower: 819, zeroToSixty: 2.7, topSpeed: 330, powertrain: "3.0L 120° V6 Twin-Turbo Hybrid", curbWeight: 1470, description: "Fun to Drive benchmark with electric torque fill." },
  { id: "ferrari-purosangue", name: "Purosangue", brand: "Ferrari", year: 2025, category: "Performance SUV", price: "$400,000", priceNumeric: 400000, horsepower: 715, zeroToSixty: 3.3, topSpeed: 310, powertrain: "6.5L Naturally Aspirated V12", curbWeight: 2033, description: "Four-door four-seater sports car with active suspension." },
  { id: "ferrari-roma-spider", name: "Roma Spider", brand: "Ferrari", year: 2025, category: "Grand Tourer", price: "$277,970", priceNumeric: 277970, horsepower: 612, zeroToSixty: 3.4, topSpeed: 320, powertrain: "3.9L Twin-Turbo V8", curbWeight: 1556, description: "Timeless mid-front engine soft-top convertible." },
  { id: "ferrari-daytona-sp3", name: "Daytona SP3", brand: "Ferrari", year: 2024, category: "Hypercar", price: "$2,250,000", priceNumeric: 2250000, horsepower: 829, zeroToSixty: 2.85, topSpeed: 340, powertrain: "6.5L V12 Mid-Rear Engine", curbWeight: 1485, description: "Icona series tribute to historic prototype racers." },
  { id: "ferrari-12cilindri", name: "12Cilindri", brand: "Ferrari", year: 2025, category: "Supercar", price: "$423,000", priceNumeric: 423000, horsepower: 830, zeroToSixty: 2.9, topSpeed: 340, powertrain: "6.5L Naturally Aspirated V12", curbWeight: 1560, description: "Pure atmospheric V12 with active aero flaps." },

  // Lamborghini
  { id: "lamborghini-revuelto", name: "Revuelto HPEV", brand: "Lamborghini", year: 2025, category: "Hypercar", price: "$608,358", priceNumeric: 608358, horsepower: 1001, zeroToSixty: 2.5, topSpeed: 350, powertrain: "6.5L V12 + 3 Electric Motors", curbWeight: 1772, description: "Carbon monofuselage hybrid flagship." },
  { id: "lamborghini-temerario", name: "Temerario", brand: "Lamborghini", year: 2025, category: "Supercar", price: "$360,000", priceNumeric: 360000, horsepower: 907, zeroToSixty: 2.7, topSpeed: 343, powertrain: "4.0L Twin-Turbo V8 (10,000 RPM) Hybrid", curbWeight: 1690, description: "Huracán successor with 10,000 RPM redline." },
  { id: "lamborghini-huracan-sterrato", name: "Huracan Sterrato", brand: "Lamborghini", year: 2024, category: "Supercar", price: "$278,972", priceNumeric: 278972, horsepower: 602, zeroToSixty: 3.4, topSpeed: 260, powertrain: "5.2L Naturally Aspirated V10", curbWeight: 1470, description: "All-terrain supercar with raised ride height." },
  { id: "lamborghini-urus-se", name: "Urus SE Plug-in Hybrid", brand: "Lamborghini", year: 2025, category: "Performance SUV", price: "$258,000", priceNumeric: 258000, horsepower: 789, zeroToSixty: 3.4, topSpeed: 312, powertrain: "4.0L Twin-Turbo V8 PHEV", curbWeight: 2505, description: "Electrified Super SUV with torque vectoring." },
  { id: "lamborghini-huracan-sto", name: "Huracan STO", brand: "Lamborghini", year: 2024, category: "Supercar", price: "$344,778", priceNumeric: 344778, horsepower: 630, zeroToSixty: 3.0, topSpeed: 310, powertrain: "5.2L V10 Super Trofeo", curbWeight: 1339, description: "Road-homologated race car with single-piece cofango." },
  { id: "lamborghini-sian-fkp-37", name: "Sian FKP 37", brand: "Lamborghini", year: 2023, category: "Hypercar", price: "$3,700,000", priceNumeric: 3700000, horsepower: 808, zeroToSixty: 2.8, topSpeed: 355, powertrain: "6.5L V12 + Supercapacitor Hybrid", curbWeight: 1620, description: "Pioneering hybrid with supercapacitor tech." },
  { id: "lamborghini-countach-lpi-800-4", name: "Countach LPI 800-4", brand: "Lamborghini", year: 2023, category: "Hypercar", price: "$2,640,000", priceNumeric: 2640000, horsepower: 803, zeroToSixty: 2.8, topSpeed: 355, powertrain: "6.5L V12 Hybrid AWD", curbWeight: 1595, description: "Modern reimagining of the iconic poster car." },
  { id: "lamborghini-veneno", name: "Veneno Roadster", brand: "Lamborghini", year: 2023, category: "Hypercar", price: "$4,500,000", priceNumeric: 4500000, horsepower: 740, zeroToSixty: 2.9, topSpeed: 355, powertrain: "6.5L V12", curbWeight: 1490, description: "Extreme prototype aerodynamics for the street." },

  // McLaren
  { id: "mclaren-w1", name: "W1 Hypercar", brand: "McLaren", year: 2025, category: "Hypercar", price: "$2,100,000", priceNumeric: 2100000, horsepower: 1258, zeroToSixty: 2.7, topSpeed: 350, powertrain: "4.0L Twin-Turbo V8 Hybrid", curbWeight: 1399, description: "Successor to F1 and P1 with ground-effect aero." },
  { id: "mclaren-750s", name: "750S Coupe", brand: "McLaren", year: 2025, category: "Supercar", price: "$329,500", priceNumeric: 329500, horsepower: 740, zeroToSixty: 2.7, topSpeed: 332, powertrain: "4.0L Twin-Turbo V8", curbWeight: 1389, description: "Lightest in class with proactive hydraulic chassis." },
  { id: "mclaren-artura-spider", name: "Artura Spider", brand: "McLaren", year: 2025, category: "Supercar", price: "$273,800", priceNumeric: 273800, horsepower: 690, zeroToSixty: 3.0, topSpeed: 330, powertrain: "3.0L 120° V6 Twin-Turbo Hybrid", curbWeight: 1457, description: "Open-top high-performance hybrid." },
  { id: "mclaren-765lt", name: "765LT Spider", brand: "McLaren", year: 2024, category: "Supercar", price: "$382,500", priceNumeric: 382500, horsepower: 755, zeroToSixty: 2.7, topSpeed: 330, powertrain: "4.0L Twin-Turbo V8 Longtail", curbWeight: 1388, description: "Uncompromising track agility with quad titanium exhaust." },
  { id: "mclaren-senna", name: "Senna", brand: "McLaren", year: 2023, category: "Hypercar", price: "$1,000,000", priceNumeric: 1000000, horsepower: 789, zeroToSixty: 2.7, topSpeed: 335, powertrain: "4.0L Twin-Turbo V8", curbWeight: 1198, description: "Fastest road-legal track car without compromise." },
  { id: "mclaren-speedtail", name: "Speedtail Hyper-GT", brand: "McLaren", year: 2023, category: "Hypercar", price: "$2,250,000", priceNumeric: 2250000, horsepower: 1055, zeroToSixty: 2.9, topSpeed: 403, powertrain: "4.0L Twin-Turbo V8 Hybrid", curbWeight: 1430, description: "Three-seat aerodynamic streamliner." },
  { id: "mclaren-elva", name: "Elva", brand: "McLaren", year: 2023, category: "Hypercar", price: "$1,690,000", priceNumeric: 1690000, horsepower: 804, zeroToSixty: 2.8, topSpeed: 326, powertrain: "4.0L Twin-Turbo V8", curbWeight: 1148, description: "Windscreen-less speedster with Active Air Management." },
  { id: "mclaren-gt", name: "GTS", brand: "McLaren", year: 2025, category: "Grand Tourer", price: "$219,000", priceNumeric: 219000, horsepower: 626, zeroToSixty: 3.1, topSpeed: 326, powertrain: "4.0L Twin-Turbo V8", curbWeight: 1520, description: "Refined long-distance tourer with luggage space." },

  // Mercedes-AMG
  { id: "amg-one", name: "AMG ONE", brand: "Mercedes-AMG", year: 2024, category: "Hypercar", price: "$2,720,000", priceNumeric: 2720000, horsepower: 1049, zeroToSixty: 2.8, topSpeed: 352, powertrain: "1.6L Turbo V6 Formula 1 Hybrid", curbWeight: 1695, description: "F1 championship powertrain in a road hypercar." },
  { id: "amg-gt-63-s-e-performance", name: "AMG GT 63 S E Performance", brand: "Mercedes-AMG", year: 2025, category: "Supercar", price: "$194,900", priceNumeric: 194900, horsepower: 805, zeroToSixty: 2.7, topSpeed: 320, powertrain: "4.0L Biturbo V8 + Electric Unit", curbWeight: 2110, description: "2+2 coupe rocket with active roll stabilization." },
  { id: "amg-gt-black-series", name: "AMG GT Black Series", brand: "Mercedes-AMG", year: 2023, category: "Supercar", price: "$325,000", priceNumeric: 325000, horsepower: 720, zeroToSixty: 3.1, topSpeed: 325, powertrain: "4.0L Flat-Plane Crank Twin-Turbo V8", curbWeight: 1540, description: "Motorsport aero-package with dual carbon wing." },
  { id: "amg-c63-s-e-performance", name: "AMG C63 S E Performance", brand: "Mercedes-AMG", year: 2025, category: "Sports Sedan", price: "$83,900", priceNumeric: 83900, horsepower: 671, zeroToSixty: 3.3, topSpeed: 280, powertrain: "2.0L Turbo 4-Cyl + Electric Motor", curbWeight: 2111, description: "F1 electric turbo technology with drift mode." },
  { id: "amg-g63-magno", name: "AMG G 63 Edition", brand: "Mercedes-AMG", year: 2025, category: "Performance SUV", price: "$183,000", priceNumeric: 183000, horsepower: 577, zeroToSixty: 4.2, topSpeed: 240, powertrain: "4.0L Handcrafted Twin-Turbo V8", curbWeight: 2550, description: "Legendary luxury off-roader with side-pipes." },
  { id: "amg-sl-63-roadster", name: "AMG SL 63 4MATIC+", brand: "Mercedes-AMG", year: 2025, category: "Grand Tourer", price: "$187,000", priceNumeric: 187000, horsepower: 577, zeroToSixty: 3.5, topSpeed: 315, powertrain: "4.0L Twin-Turbo V8", curbWeight: 1970, description: "Luxury roadster with fabric top and rear steering." },
  { id: "amg-eqe-53", name: "AMG EQE 53 4MATIC+", brand: "Mercedes-AMG", year: 2025, category: "EV", price: "$106,900", priceNumeric: 106900, horsepower: 677, zeroToSixty: 3.2, topSpeed: 240, powertrain: "Dual AMG Specific Electric Motors", curbWeight: 2525, description: "Dynamic electric sedan with AMG Sound Experience." },
  { id: "amg-gt-4-door-63s", name: "AMG GT 63 S 4-Door", brand: "Mercedes-AMG", year: 2024, category: "Sports Sedan", price: "$170,000", priceNumeric: 170000, horsepower: 630, zeroToSixty: 3.1, topSpeed: 315, powertrain: "4.0L Twin-Turbo V8 AWD", curbWeight: 2045, description: "Four-door track-capable supercar killer." },

  // Audi
  { id: "audi-r8-v10-gt-rwd", name: "R8 V10 GT RWD", brand: "Audi", year: 2023, category: "Supercar", price: "$249,900", priceNumeric: 249900, horsepower: 612, zeroToSixty: 3.4, topSpeed: 320, powertrain: "5.2L Atmospheric V10", curbWeight: 1570, description: "Final farewell celebration to the iconic V10." },
  { id: "audi-rs-e-tron-gt-performance", name: "RS e-tron GT Performance", brand: "Audi", year: 2025, category: "EV", price: "$165,000", priceNumeric: 165000, horsepower: 912, zeroToSixty: 2.5, topSpeed: 250, powertrain: "Dual Electric PSM Motors", curbWeight: 2320, description: "The most powerful road car Audi has ever built." },
  { id: "audi-rs6-avant-performance", name: "RS6 Avant Performance", brand: "Audi", year: 2025, category: "Sports Sedan", price: "$126,895", priceNumeric: 126895, horsepower: 621, zeroToSixty: 3.3, topSpeed: 305, powertrain: "4.0L Twin-Turbo V8 Quattro", curbWeight: 2075, description: "High-performance wagon with supreme speed." },
  { id: "audi-rs7-performance", name: "RS7 Sportback Performance", brand: "Audi", year: 2025, category: "Sports Sedan", price: "$127,800", priceNumeric: 127800, horsepower: 621, zeroToSixty: 3.3, topSpeed: 305, powertrain: "4.0L Twin-Turbo V8", curbWeight: 2065, description: "Sleek four-door coupe with widebody stance." },
  { id: "audi-rs3-sedan", name: "RS3 Sedan", brand: "Audi", year: 2025, category: "Sports Sedan", price: "$62,300", priceNumeric: 62300, horsepower: 401, zeroToSixty: 3.6, topSpeed: 290, powertrain: "2.5L Turbo 5-Cylinder with Torque Splitter", curbWeight: 1590, description: "Distinctive firing order 5-cylinder pocket rocket." },
  { id: "audi-rsq8-performance", name: "RS Q8 Performance", brand: "Audi", year: 2025, category: "Performance SUV", price: "$136,000", priceNumeric: 136000, horsepower: 631, zeroToSixty: 3.5, topSpeed: 305, powertrain: "4.0L Twin-Turbo V8 Mild Hybrid", curbWeight: 2315, description: "Nürburgring SUV crown champion." },
  { id: "audi-rs5-coupe", name: "RS5 Coupe Competition", brand: "Audi", year: 2024, category: "Coupe", price: "$78,900", priceNumeric: 78900, horsepower: 444, zeroToSixty: 3.7, topSpeed: 290, powertrain: "2.9L Twin-Turbo V6", curbWeight: 1720, description: "Coilover suspension and carbon ceramic braking." },
  { id: "audi-s8", name: "S8 Luxury Sedan", brand: "Audi", year: 2025, category: "Sports Sedan", price: "$123,400", priceNumeric: 123400, horsepower: 563, zeroToSixty: 3.8, topSpeed: 250, powertrain: "4.0L Twin-Turbo V8 Active Suspension", curbWeight: 2325, description: "Executive super sedan with scanning suspension." },

  // Aston Martin
  { id: "aston-valkyrie", name: "Valkyrie", brand: "Aston Martin", year: 2024, category: "Hypercar", price: "$3,500,000", priceNumeric: 3500000, horsepower: 1160, zeroToSixty: 2.5, topSpeed: 355, powertrain: "6.5L Cosworth V12 (11,100 RPM) Hybrid", curbWeight: 1030, description: "Adrian Newey designed F1 car for the street." },
  { id: "aston-valhalla", name: "Valhalla Hybrid Supercar", brand: "Aston Martin", year: 2025, category: "Hypercar", price: "$800,000", priceNumeric: 800000, horsepower: 998, zeroToSixty: 2.5, topSpeed: 350, powertrain: "4.0L Flat-Plane V8 + Tri-Motor", curbWeight: 1550, description: "Mid-engine PHEV supercar with pushrod suspension." },
  { id: "aston-vanquish-2025", name: "Vanquish V12", brand: "Aston Martin", year: 2025, category: "Supercar", price: "$429,000", priceNumeric: 429000, horsepower: 824, zeroToSixty: 3.2, topSpeed: 345, powertrain: "5.2L Twin-Turbo V12", curbWeight: 1774, description: "Magnificent flagship V12 grand tourer." },
  { id: "aston-dbs-770-ultimate", name: "DBS 770 Ultimate", brand: "Aston Martin", year: 2024, category: "Supercar", price: "$387,600", priceNumeric: 387600, horsepower: 759, zeroToSixty: 3.2, topSpeed: 340, powertrain: "5.2L Twin-Turbo V12", curbWeight: 1845, description: "Definitive farewell to the DBS badge." },
  { id: "aston-db12", name: "DB12 Super Tourer", brand: "Aston Martin", year: 2025, category: "Grand Tourer", price: "$245,000", priceNumeric: 245000, horsepower: 671, zeroToSixty: 3.5, topSpeed: 325, powertrain: "4.0L Twin-Turbo V8", curbWeight: 1685, description: "The world's first Super Tourer." },
  { id: "aston-vantage-2025", name: "Vantage", brand: "Aston Martin", year: 2025, category: "Coupe", price: "$191,000", priceNumeric: 191000, horsepower: 656, zeroToSixty: 3.4, topSpeed: 325, powertrain: "4.0L Twin-Turbo V8", curbWeight: 1605, description: "50:50 perfect weight balance sports car." },
  { id: "aston-dbx707", name: "DBX707", brand: "Aston Martin", year: 2025, category: "Performance SUV", price: "$242,000", priceNumeric: 242000, horsepower: 697, zeroToSixty: 3.1, topSpeed: 310, powertrain: "4.0L Twin-Turbo V8 Wet-Clutch", curbWeight: 2245, description: "The pinnacle of high-luxury performance SUVs." },
  { id: "aston-victor", name: "Victor", brand: "Aston Martin", year: 2023, category: "Hypercar", price: "$3,000,000", priceNumeric: 3000000, horsepower: 836, zeroToSixty: 3.0, topSpeed: 320, powertrain: "7.3L Atmospheric One-77 V12 Manual", curbWeight: 1630, description: "One-off bespoke manual hypercar." },

  // Bugatti, Koenigsegg & Rimac
  { id: "bugatti-tourbillon", name: "Tourbillon", brand: "Bugatti", year: 2026, category: "Hypercar", price: "$4,100,000", priceNumeric: 4100000, horsepower: 1775, zeroToSixty: 2.0, topSpeed: 445, powertrain: "8.3L Atmospheric V16 + 3 Motors", curbWeight: 1995, description: "Horological analogue cluster with monumental V16 hybrid." },
  { id: "bugatti-chiron-super-sport", name: "Chiron Super Sport 300+", brand: "Bugatti", year: 2023, category: "Hypercar", price: "$3,900,000", priceNumeric: 3900000, horsepower: 1578, zeroToSixty: 2.4, topSpeed: 440, powertrain: "8.0L Quad-Turbo W16", curbWeight: 1978, description: "Longtail missile breaking 300 mph." },
  { id: "bugatti-bolide", name: "Bolide Track Weapon", brand: "Bugatti", year: 2024, category: "Hypercar", price: "$4,400,000", priceNumeric: 4400000, horsepower: 1825, zeroToSixty: 2.17, topSpeed: 500, powertrain: "8.0L Quad-Turbo W16", curbWeight: 1450, description: "Weight-to-power ratio of 0.9 kg/hp for circuits." },
  { id: "bugatti-mistral", name: "W16 Mistral Roadster", brand: "Bugatti", year: 2024, category: "Hypercar", price: "$5,000,000", priceNumeric: 500000, horsepower: 1578, zeroToSixty: 2.4, topSpeed: 420, powertrain: "8.0L Quad-Turbo W16", curbWeight: 1930, description: "The fastest roadster marking the finale of W16." },
  { id: "koenigsegg-jesko-absolut", name: "Jesko Absolut", brand: "Koenigsegg", year: 2025, category: "Hypercar", price: "$3,400,000", priceNumeric: 3400000, horsepower: 1600, zeroToSixty: 2.5, topSpeed: 500, powertrain: "5.0L Twin-Turbo Flat-Plane V8", curbWeight: 1390, description: "Theoretical speeds in excess of 500 km/h." },
  { id: "koenigsegg-gemera", name: "Gemera HV8", brand: "Koenigsegg", year: 2025, category: "Hypercar", price: "$2,100,000", priceNumeric: 2100000, horsepower: 2300, zeroToSixty: 1.9, topSpeed: 400, powertrain: "5.0L Twin-Turbo V8 + Dark Matter E-Motor", curbWeight: 1850, description: "Four-seater mega-GT producing 2,300 hp." },
  { id: "koenigsegg-cc850", name: "CC850 Manual", brand: "Koenigsegg", year: 2024, category: "Hypercar", price: "$3,650,000", priceNumeric: 3650000, horsepower: 1385, zeroToSixty: 2.7, topSpeed: 400, powertrain: "5.0L Twin-Turbo V8 with ESS Gated Shifter", curbWeight: 1385, description: "Engage Shift System simulated 6-speed manual." },
  { id: "koenigsegg-regera", name: "Regera Direct Drive", brand: "Koenigsegg", year: 2023, category: "Hypercar", price: "$2,000,000", priceNumeric: 2000000, horsepower: 1500, zeroToSixty: 2.8, topSpeed: 404, powertrain: "5.0L Twin-Turbo V8 Direct Drive", curbWeight: 1590, description: "Gearbox-less hydraulic hybrid record setter." },
  { id: "rimac-nevera-r", name: "Nevera R", brand: "Rimac", year: 2025, category: "EV", price: "$2,530,000", priceNumeric: 2530000, horsepower: 2107, zeroToSixty: 1.74, topSpeed: 412, powertrain: "Quad Surface-Mounted Motors Torque Vectoring", curbWeight: 2277, description: "Hyper-EV cornering weapon with 108 kWh pack." },
  { id: "rimac-nevera", name: "Nevera", brand: "Rimac", year: 2024, category: "EV", price: "$2,200,000", priceNumeric: 2200000, horsepower: 1914, zeroToSixty: 1.81, topSpeed: 412, powertrain: "Quad Electric Motors", curbWeight: 2300, description: "Holder of 20+ official acceleration records." },
  { id: "pininfarina-battista", name: "Battista Edizione", brand: "Rimac", year: 2024, category: "EV", price: "$2,200,000", priceNumeric: 2200000, horsepower: 1900, zeroToSixty: 1.79, topSpeed: 350, powertrain: "Quad Electric Motor Powertrain", curbWeight: 2063, description: "Pure Italian hyper GT coachbuilding." },
  { id: "lotus-evija", name: "Evija Hypercar", brand: "Lotus", year: 2024, category: "EV", price: "$2,300,000", priceNumeric: 2300000, horsepower: 2011, zeroToSixty: 2.8, topSpeed: 350, powertrain: "Quad Electric Motors Venturi Tunnels", curbWeight: 1680, description: "Lightest production EV hypercar." },

  // Grand Tourers & American Icons
  { id: "bentley-continental-gt-speed-2025", name: "Continental GT Speed Hybrid", brand: "Bentley", year: 2025, category: "Grand Tourer", price: "$302,100", priceNumeric: 302100, horsepower: 771, zeroToSixty: 3.1, topSpeed: 335, powertrain: "4.0L Ultra Performance V8 Hybrid", curbWeight: 2459, description: "Grand touring luxury with 1,000 Nm torque." },
  { id: "bentley-flying-spur-speed", name: "Flying Spur Speed", brand: "Bentley", year: 2025, category: "Sports Sedan", price: "$260,000", priceNumeric: 260000, horsepower: 771, zeroToSixty: 3.3, topSpeed: 333, powertrain: "4.0L V8 Hybrid Suspension", curbWeight: 2540, description: "Four-door performance limousine." },
  { id: "rolls-royce-spectre", name: "Spectre Electric Coupe", brand: "Rolls-Royce", year: 2025, category: "EV", price: "$420,000", priceNumeric: 420000, horsepower: 577, zeroToSixty: 4.4, topSpeed: 250, powertrain: "Dual Motor Architecture of Luxury", curbWeight: 2890, description: "Ultra-luxury electric super coupe." },
  { id: "rolls-royce-cullinan-series-2", name: "Cullinan Black Badge Series II", brand: "Rolls-Royce", year: 2025, category: "Performance SUV", price: "$450,000", priceNumeric: 450000, horsepower: 592, zeroToSixty: 4.9, topSpeed: 250, powertrain: "6.75L Twin-Turbo V12", curbWeight: 2750, description: "Effortless all-terrain magic carpet ride." },
  { id: "maserati-mc20-cielo", name: "MC20 Cielo", brand: "Maserati", year: 2025, category: "Supercar", price: "$260,000", priceNumeric: 260000, horsepower: 621, zeroToSixty: 2.9, topSpeed: 325, powertrain: "3.0L Nettuno V6 (F1 Pre-Chamber)", curbWeight: 1540, description: "Carbon fiber monocoque roadster with smart glass roof." },
  { id: "maserati-granturismo-folgore", name: "GranTurismo Folgore", brand: "Maserati", year: 2025, category: "EV", price: "$205,000", priceNumeric: 205000, horsepower: 751, zeroToSixty: 2.7, topSpeed: 325, powertrain: "Tri-Motor 800V Inverters", curbWeight: 2260, description: "Tri-motor Italian grand tourer with low battery T-bone." },
  { id: "nissan-gt-r-nismo", name: "GT-R Nismo (R35 Final)", brand: "Nissan", year: 2024, category: "Supercar", price: "$221,090", priceNumeric: 221090, horsepower: 600, zeroToSixty: 2.7, topSpeed: 330, powertrain: "3.8L VR38DETT with GT3 Turbos", curbWeight: 1725, description: "Godzilla's ultimate track specification." },
  { id: "chevrolet-corvette-zr1-2025", name: "Corvette ZR1 (C8)", brand: "Chevrolet", year: 2025, category: "Supercar", price: "$150,000", priceNumeric: 150000, horsepower: 1064, zeroToSixty: 2.3, topSpeed: 375, powertrain: "5.5L Twin-Turbo Flat-Plane LT7 V8", curbWeight: 1665, description: "The most powerful V8 ever produced by an American automaker." },
  { id: "chevrolet-corvette-z06", name: "Corvette Z06", brand: "Chevrolet", year: 2025, category: "Supercar", price: "$112,700", priceNumeric: 112700, horsepower: 670, zeroToSixty: 2.6, topSpeed: 314, powertrain: "5.5L Naturally Aspirated LT6 V8", curbWeight: 1560, description: "Naturally aspirated flat-plane crank symphony." },
  { id: "chevrolet-corvette-e-ray", name: "Corvette E-Ray AWD", brand: "Chevrolet", year: 2025, category: "Coupe", price: "$104,900", priceNumeric: 104900, horsepower: 655, zeroToSixty: 2.5, topSpeed: 290, powertrain: "6.2L LT2 V8 + Front Motor", curbWeight: 1712, description: "First electrified AWD Corvette with stealth mode." },
  { id: "ford-mustang-gtd", name: "Mustang GTD Carbon Series", brand: "Ford", year: 2025, category: "Supercar", price: "$325,000", priceNumeric: 325000, horsepower: 815, zeroToSixty: 3.0, topSpeed: 325, powertrain: "5.2L Supercharged V8 Transaxle", curbWeight: 1590, description: "Sub-7 minute Nürburgring contender with pushrod rear." },
  { id: "ford-gt-mk-iv", name: "Ford GT Mk IV", brand: "Ford", year: 2023, category: "Hypercar", price: "$1,700,000", priceNumeric: 1700000, horsepower: 800, zeroToSixty: 2.4, topSpeed: 350, powertrain: "EcoBoost Twin-Turbo V6", curbWeight: 1250, description: "Track-only farewell with longtail carbon body." },
  { id: "dodge-charger-daytona-scat-pack", name: "Charger Daytona Scat Pack EV", brand: "Dodge", year: 2025, category: "Sports Sedan", price: "$73,190", priceNumeric: 73190, horsepower: 670, zeroToSixty: 3.3, topSpeed: 220, powertrain: "Dual Electric Motors Fratzonic", curbWeight: 2648, description: "All-electric muscle car with mechanical chamber rumble." },
  { id: "dodge-challenger-demon-170", name: "Challenger SRT Demon 170", brand: "Dodge", year: 2023, category: "Coupe", price: "$96,666", priceNumeric: 96666, horsepower: 1025, zeroToSixty: 1.66, topSpeed: 346, powertrain: "6.2L Supercharged HEMI V8 (E85)", curbWeight: 1940, description: "NHRA-banned drag strip king pulling 2.0g launch." },
  { id: "alfa-romeo-33-stradale", name: "33 Stradale", brand: "AlfaRomeo", year: 2025, category: "Supercar", price: "$3,000,000", priceNumeric: 3000000, horsepower: 620, zeroToSixty: 2.9, topSpeed: 333, powertrain: "3.0L Twin-Turbo V6", curbWeight: 1500, description: "Coachbuilt tribute with butterfly doors." },
  { id: "alfa-romeo-giulia-gta", name: "Giulia GTA", brand: "AlfaRomeo", year: 2024, category: "Sports Sedan", price: "$200,000", priceNumeric: 200000, horsepower: 532, zeroToSixty: 3.6, topSpeed: 300, powertrain: "2.9L Twin-Turbo V6 (Sauber Aero)", curbWeight: 1520, description: "Lightened touring car hero with central titanium exhaust." },
  { id: "lotus-emira-v6", name: "Emira V6 First Edition", brand: "Lotus", year: 2025, category: "Coupe", price: "$105,400", priceNumeric: 105400, horsepower: 400, zeroToSixty: 4.2, topSpeed: 290, powertrain: "3.5L Supercharged 2GR V6 Manual", curbWeight: 1405, description: "The final petrol-powered analogue hydraulic-steering Lotus." },
  { id: "lotus-eletre-r", name: "Eletre R Hyper-SUV", brand: "Lotus", year: 2025, category: "EV", price: "$145,000", priceNumeric: 145000, horsepower: 905, zeroToSixty: 2.95, topSpeed: 265, powertrain: "Dual Motor AWD 2-Speed Gearbox", curbWeight: 2640, description: "Electric hyper-SUV with deployable LiDAR." },
  { id: "lotus-emeya-r", name: "Emeya R Hyper-GT", brand: "Lotus", year: 2025, category: "EV", price: "$159,000", priceNumeric: 159000, horsepower: 905, zeroToSixty: 2.78, topSpeed: 256, powertrain: "Dual Electric Motors (102 kWh)", curbWeight: 2475, description: "Active dual-layer rear wing aerodynamic electric GT." },
  { id: "cadillac-ct5-v-blackwing", name: "CT5-V Blackwing", brand: "Chevrolet", year: 2025, category: "Sports Sedan", price: "$93,495", priceNumeric: 93495, horsepower: 668, zeroToSixty: 3.4, topSpeed: 330, powertrain: "6.2L Handcrafted Supercharged V8 6-Speed Manual", curbWeight: 1870, description: "American super sedan with magnetic ride control." },
  { id: "cadillac-celestiq", name: "Celestiq Handbuilt EV", brand: "Chevrolet", year: 2025, category: "EV", price: "$340,000", priceNumeric: 340000, horsepower: 600, zeroToSixty: 3.8, topSpeed: 250, powertrain: "Dual Motor AWD (111 kWh)", curbWeight: 2800, description: "Handcrafted electric flagship with 3D metal parts." },
  { id: "lexus-lfa-nurburgring", name: "LFA Nurburgring Package", brand: "Nissan", year: 2023, category: "Supercar", price: "$1,100,000", priceNumeric: 1100000, horsepower: 563, zeroToSixty: 3.6, topSpeed: 325, powertrain: "4.8L Atmospheric Yamaha V10 (9,000 RPM)", curbWeight: 1480, description: "Acoustically tuned Formula 1 sounding masterwork." },
  { id: "pagani-utopia", name: "Utopia Manual", brand: "Ferrari", year: 2025, category: "Hypercar", price: "$2,500,000", priceNumeric: 2500000, horsepower: 852, zeroToSixty: 2.8, topSpeed: 354, powertrain: "6.0L Mercedes-AMG Twin-Turbo V12", curbWeight: 1280, description: "Carbo-Titanium artwork with gated manual." },
  { id: "pagani-huayra-r", name: "Huayra R Track", brand: "Ferrari", year: 2024, category: "Hypercar", price: "$3,100,000", priceNumeric: 3100000, horsepower: 850, zeroToSixty: 2.6, topSpeed: 380, powertrain: "6.0L Atmospheric V12 (9,000 RPM)", curbWeight: 1050, description: "Screaming naturally aspirated track masterpiece." }
];

export const CATALOG: VehicleRecord[] = BASE_RAW_CARS.map((car) => ({
  ...car,
  slug: car.id,
  make: car.brand,
  heroImage: BRAND_IMAGE_MAP[car.brand] || BRAND_IMAGE_MAP.Porsche,
  status: "Active",
  createdAt: new Date().toISOString()
}));

export const FALLBACK_CARS: VehicleRecord[] = CATALOG;

// Helper functions required by routers.ts
export function listCatalog(): VehicleRecord[] {
  return CATALOG;
}

export function getCarBySlug(slug: string): VehicleRecord | undefined {
  return CATALOG.find((c) => c.slug === slug || c.id === slug);
}

export function getRelatedCars(carId: string, limit = 4): VehicleRecord[] {
  const current = CATALOG.find((c) => c.id === carId || c.slug === carId);
  if (!current) return CATALOG.slice(0, limit);
  return CATALOG.filter((c) => c.id !== current.id && (c.brand === current.brand || c.category === current.category)).slice(0, limit);
}

export function getMakes(): Array<{ make: string; count: number }> {
  const counts: Record<string, number> = {};
  CATALOG.forEach((car) => {
    counts[car.brand] = (counts[car.brand] || 0) + 1;
  });
  return Object.entries(counts).map(([make, count]) => ({ make, count }));
}

export function getCatalogStats() {
  const totalVehicles = CATALOG.length;
  const totalMakes = new Set(CATALOG.map((c) => c.brand)).size;
  const avgHorsepower = Math.round(CATALOG.reduce((acc, c) => acc + c.horsepower, 0) / totalVehicles);
  return { totalVehicles, totalMakes, avgHorsepower };
}

export function getAdminRows() {
  return CATALOG.map((c) => ({
    id: c.id,
    name: c.name,
    brand: c.brand,
    category: c.category,
    price: c.price,
    status: c.status,
    createdAt: c.createdAt
  }));
}

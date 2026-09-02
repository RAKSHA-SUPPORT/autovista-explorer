import { ArrowLeft, ArrowUpRight, CarFront, ChevronRight } from "lucide-react";
import { Link, useRoute } from "wouter";
import { AutoVistaLayout } from "@/components/AutoVistaLayout";
import { VehicleCard } from "@/components/VehicleCard";
import { trpc } from "@/lib/trpc";

export default function ModelDetail() {
  const [, params] = useRoute("/models/:modelSlug");
  const modelSlug = params?.modelSlug ?? "";
  const { data: catalog, isLoading } = trpc.catalog.list.useQuery({ limit: 100 });
  const cars = catalog?.cars.filter(car => car.modelSlug === modelSlug) ?? [];
  const first = cars[0];
  const modelLabel = isLoading ? "Loading model" : first?.model ?? "Unknown";
  return <AutoVistaLayout><div className="mx-auto max-w-[1440px] px-5 py-12 lg:px-10 lg:py-16"><div className="mb-8 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-white/30"><Link href="/cars" className="flex items-center gap-2 hover:text-white"><ArrowLeft size={13} /> Archive</Link><ChevronRight size={12} /><Link href={`/makes/${first?.makeSlug ?? ""}`} className="hover:text-white">{first?.make ?? "Manufacturer"}</Link><ChevronRight size={12} /><span className="text-white/55">{isLoading ? "Loading…" : first?.model ?? "Model"}</span></div><section className="border-b border-white/[0.09] pb-12"><div className="mb-5 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.22em] text-[#c8f06a]"><CarFront size={13} /> Model family file</div><div className="flex flex-col justify-between gap-8 md:flex-row md:items-end"><div><h1 className="font-display text-7xl font-semibold leading-[0.84] tracking-[-0.08em] text-white md:text-9xl">{modelLabel}<span className="text-[#c8f06a]">.</span></h1><p className="mt-5 text-sm text-white/40">{isLoading ? "Loading manufacturer" : first?.make ?? "Unknown maker"} · {isLoading ? "—" : cars.length} indexed configuration{cars.length === 1 ? "" : "s"}</p></div><p className="max-w-md text-base leading-7 text-white/45">Move through the generations and trims that define this model. Each entry opens into a complete technical dossier.</p></div></section><section className="mt-12"><div className="mb-5 flex items-center justify-between"><div><div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#c8f06a]">Configurations / 01</div><h2 className="mt-2 font-display text-4xl font-semibold tracking-[-0.06em] text-white">Choose your line.</h2></div><Link href="/cars" className="hidden items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-white/40 hover:text-[#c8f06a] sm:flex">All vehicles <ArrowUpRight size={14} /></Link></div>{isLoading ? <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3"><div className="h-80 animate-pulse rounded-[22px] bg-white/[0.05]" /></div> : <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">{cars.map(car => <VehicleCard key={car.slug} car={car} />)}</div>}</section></div></AutoVistaLayout>;
}

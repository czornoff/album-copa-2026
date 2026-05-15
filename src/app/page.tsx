"use client";

import { useState, useEffect, useMemo } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StickerCard from "@/components/StickerCard";
import {
  STICKERS_DATA,
  ALL_STICKERS,
  GROUPS,
  ISO_MAP,
  EMBLEM_MAP,
  PLAYER_DATA_MAP,
} from "@/data/stickers";
import {
  Trophy,
  CheckCircle2,
  Circle,
  Search,
  ChevronRight,
  Link as LinkIcon,
} from "lucide-react";
import Link from "next/link";

// Definição local para evitar problemas de importação/cache
function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(" ");
}

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [userStickers, setUserStickers] = useState<
    { code: string; quantity: number }[]
  >([]);
  const [selectedGroup, setSelectedGroup] = useState<string | "Specials">("A");
  const [selectedTeamId, setSelectedTeamId] = useState(
    STICKERS_DATA.find((t) => t.group === "A")?.id || "BRA",
  );
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    }
  }, [status, router]);

  useEffect(() => {
    if (session) {
      fetch("/album-copa-2026/api/stickers")
        .then((res) => res.json())
        .then((data) => {
          setUserStickers(data.stickers || []);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [session]);

  const handleStickerAction = async (
    code: string,
    action: "toggle" | "increment" | "decrement",
  ) => {
    const updated = [...userStickers];
    const index = updated.findIndex((s) => s.code === code);

    if (action === "toggle") {
      if (index > -1) {
        if (updated[index].quantity > 1) return;
        updated.splice(index, 1);
      } else updated.push({ code, quantity: 1 });
    } else if (action === "increment") {
      if (index > -1) updated[index].quantity += 1;
      else updated.push({ code, quantity: 1 });
    } else if (action === "decrement") {
      if (index > -1) {
        if (updated[index].quantity > 1) updated[index].quantity -= 1;
        else updated.splice(index, 1);
      }
    }

    setUserStickers(updated);

    try {
      await fetch("/album-copa-2026/api/stickers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, action }),
      });
    } catch (err) {
      console.error("Failed to sync sticker status");
    }
  };

  const stats = useMemo(() => {
    const uniqueOwned = userStickers.length;
    const totalPossible = ALL_STICKERS.length;
    const missing = totalPossible - uniqueOwned;
    const percentage = Math.round((uniqueOwned / totalPossible) * 100);
    const repeated = userStickers.reduce(
      (acc, curr) => acc + (curr.quantity - 1),
      0,
    );

    return { uniqueOwned, totalPossible, missing, percentage, repeated };
  }, [userStickers]);

  const currentTeams = useMemo(() => {
    if (selectedGroup === "Specials") {
      return STICKERS_DATA.filter((t) => !t.group);
    }
    return STICKERS_DATA.filter((t) => t.group === selectedGroup);
  }, [selectedGroup]);

  const filteredStickers = useMemo(() => {
    if (search) {
      const searchLower = search.toLowerCase();
      return ALL_STICKERS.filter((code) => {
        const matchesCode = code.toLowerCase().includes(searchLower);
        const player = PLAYER_DATA_MAP[code];
        const matchesName = player?.name.toLowerCase().includes(searchLower);
        return matchesCode || matchesName;
      });
    }
    const team = STICKERS_DATA.find((t) => t.id === selectedTeamId);
    return team?.stickers || [];
  }, [selectedTeamId, search]);

  const userId = (session?.user as any)?.id;
  const [copying, setCopying] = useState(false);

  const copyPublicLink = () => {
    if (!userId) return;
    const url =
      typeof window !== "undefined"
        ? `${window.location.origin}/album-copa-2026/public/${userId}`
        : "";
    navigator.clipboard.writeText(url);
    setCopying(true);
    setTimeout(() => setCopying(false), 2000);
  };

  if (!mounted || status === "loading" || loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-secondary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="animate-in fade-in slide-in-from-left duration-700">
            <h1 className="text-4xl md:text-5xl font-black mb-3 text-transparent bg-clip-text bg-gradient-to-r from-secondary to-amber-500">
              Copa do Mundo 2026
            </h1>
            <p className="text-slate-400">
              Controle sua coleção oficial Panini
            </p>
          </div>
        </header>

        {/* Stats Section */}
        <section className="mb-12 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          <div className="rounded-2xl bg-white/5 p-4 md:p-6 border border-white/10 backdrop-blur-sm">
            <div className="flex items-center gap-3 md:gap-4">
              <div className="flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-xl bg-primary/20 text-primary">
                <Trophy size={20} />
              </div>
              <div>
                <p className="text-[10px] md:text-sm font-medium text-slate-400">
                  Progresso
                </p>
                <p className="text-xl md:text-2xl font-bold">
                  {stats.percentage}%
                </p>
              </div>
            </div>
            <div className="mt-4 h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-500"
                style={{ width: `${stats.percentage}%` }}
              ></div>
            </div>
          </div>

          <div className="rounded-2xl bg-white/5 p-4 md:p-6 border border-white/10 backdrop-blur-sm shadow-lg shadow-green-500/5">
            <div className="flex items-center gap-3 md:gap-4">
              <div className="flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-xl bg-green-500/20 text-green-500">
                <CheckCircle2 size={20} />
              </div>
              <div>
                <p className="text-[10px] md:text-sm font-medium text-slate-400">
                  Possui
                </p>
                <p className="text-xl md:text-2xl font-bold">
                  {stats.uniqueOwned}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-white/5 p-4 md:p-6 border border-white/10 backdrop-blur-sm">
            <div className="flex items-center gap-3 md:gap-4">
              <div className="flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-xl bg-red-500/20 text-red-500">
                <Circle size={20} />
              </div>
              <div>
                <p className="text-[10px] md:text-sm font-medium text-slate-400">
                  Faltam
                </p>
                <p className="text-xl md:text-2xl font-bold">{stats.missing}</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-white/5 p-4 md:p-6 border border-white/10 backdrop-blur-sm shadow-lg shadow-secondary/5 relative flex flex-col justify-between min-h-[120px]">
            <div className="flex items-center gap-3 md:gap-4">
              <div className="flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-xl bg-secondary/20 text-secondary">
                <Trophy size={20} />
              </div>
              <div>
                <p className="text-[10px] md:text-sm font-medium text-slate-400">
                  Repetidas
                </p>
                <p className="text-xl md:text-2xl font-bold">
                  {stats.repeated}
                </p>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-2">
              <Link
                href="/repeated"
                className={cn(
                  "flex-1 flex items-center justify-center gap-2 rounded-lg py-2 text-[10px] md:text-xs font-bold transition-all border",
                  stats.repeated > 0
                    ? "bg-secondary text-primary border-secondary hover:bg-secondary/90 shadow-lg shadow-secondary/10"
                    : "bg-white/5 text-slate-500 border-white/10 pointer-events-none opacity-50",
                )}
              >
                VER TODAS <ChevronRight size={14} />
              </Link>

              <button
                onClick={copyPublicLink}
                disabled={stats.repeated === 0}
                className={cn(
                  "flex-1 flex items-center justify-center gap-2 rounded-lg py-2 text-[10px] md:text-xs font-bold transition-all border",
                  stats.repeated > 0
                    ? "bg-white/5 text-secondary border-secondary/30 hover:bg-secondary/10"
                    : "bg-white/5 text-slate-500 border-white/10 opacity-50 cursor-not-allowed",
                )}
              >
                {copying ? (
                  <>
                    <CheckCircle2 size={14} className="text-green-500" />
                    <span className="text-green-500">COPIADO</span>
                  </>
                ) : (
                  <>
                    <LinkIcon size={14} />
                    <span>COMPARTILHAR</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </section>

        {/* Navigation Section */}
        <section className="space-y-8">
          {/* Groups and Specials */}
          <div className="flex flex-col gap-6">
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => {
                  setSelectedGroup("Specials");
                  setSelectedTeamId("FWC");
                }}
                className={cn(
                  "whitespace-nowrap rounded-full px-6 py-2 text-sm font-bold transition-all border",
                  selectedGroup === "Specials"
                    ? "bg-primary text-white border-primary shadow-[0_0_15px_rgba(138,21,56,0.5)]"
                    : "bg-white/5 text-slate-400 border-white/10 hover:border-white/20",
                )}
              >
                Especiais
              </button>
              {GROUPS.map((g) => (
                <button
                  key={g}
                  onClick={() => {
                    setSelectedGroup(g);
                    const firstTeam = STICKERS_DATA.find((t) => t.group === g);
                    if (firstTeam) setSelectedTeamId(firstTeam.id);
                  }}
                  className={cn(
                    "min-w-[44px] md:min-w-[100px] h-11 flex items-center justify-center rounded-full text-[10px] md:text-xs font-bold transition-all border px-2",
                    selectedGroup === g
                      ? "bg-secondary text-primary border-secondary shadow-[0_0_15px_rgba(255,204,0,0.3)]"
                      : "bg-white/5 text-slate-400 border-white/10 hover:border-white/20",
                  )}
                >
                  <span className="hidden md:inline mr-1">GRUPO</span> {g}
                </button>
              ))}
            </div>

            {/* Selection Buttons of current Group */}
            <div className="flex flex-wrap items-center gap-3">
              {currentTeams.map((team) => {
                const isoMap: Record<string, string> = {
                  MEX: "mx",
                  RSA: "za",
                  KOR: "kr",
                  CZE: "cz",
                  CAN: "ca",
                  BIH: "ba",
                  QAT: "qa",
                  SUI: "ch",
                  BRA: "br",
                  MAR: "ma",
                  HAI: "ht",
                  SCO: "gb-sct",
                  USA: "us",
                  CRO: "hr",
                  GHA: "gh",
                  PAN: "pa",
                  GER: "de",
                  CUW: "cw",
                  CIV: "ci",
                  ECU: "ec",
                  NED: "nl",
                  JPN: "jp",
                  SWE: "se",
                  TUN: "tn",
                  BEL: "be",
                  CPV: "cv",
                  KSA: "sa",
                  URU: "uy",
                  ESP: "es",
                  NZL: "nz",
                  AUS: "au",
                  PAR: "py",
                  FRA: "fr",
                  SEN: "sn",
                  NOR: "no",
                  IRQ: "iq",
                  ARG: "ar",
                  ALG: "dz",
                  AUT: "at",
                  JOR: "jo",
                  POR: "pt",
                  JAM: "jm",
                  UZB: "uz",
                  COL: "co",
                  ENG: "gb-eng",
                  ITA: "it",
                  COD: "cd",
                  IRN: "ir",
                };
                const emblemMap: Record<string, string> = {
                  MEX: "mexico.png",
                  RSA: "south-africa.png",
                  KOR: "south-korea.png",
                  CZE: "czechia.png",
                  CAN: "canada.png",
                  BIH: "bosnia-herzegovina.png",
                  QAT: "qatar.png",
                  SUI: "switzerland.png",
                  BRA: "brazil.png",
                  MAR: "morocco.png",
                  HAI: "haiti.png",
                  SCO: "scotland.png",
                  USA: "united-states.png",
                  CRO: "croatia.png",
                  GHA: "ghana.png",
                  PAN: "panama.png",
                  GER: "germany.png",
                  CUW: "curacao.png",
                  CIV: "ivory-coast.png",
                  ECU: "ecuador.png",
                  NED: "netherlands.png",
                  JPN: "japan.png",
                  SWE: "sweden.png",
                  TUN: "tunisia.png",
                  BEL: "belgium.png",
                  CPV: "cape-verde.png",
                  KSA: "saudi-arabia.png",
                  URU: "uruguay.png",
                  ESP: "spain.png",
                  NZL: "new-zealand.png",
                  AUS: "australia.png",
                  PAR: "paraguay.png",
                  FRA: "france.png",
                  SEN: "senegal.png",
                  NOR: "norway.png",
                  IRQ: "iraq.png",
                  ARG: "argentina.png",
                  ALG: "algeria.png",
                  AUT: "austria.png",
                  JOR: "jordan.png",
                  POR: "portugal.png",
                  UZB: "uzbekistan.png",
                  COL: "colombia.png",
                  ENG: "england.png",
                  COD: "dr-congo.png",
                  IRN: "iran.png",
                  FWC: "FIFA.png",
                };
                const isoCode = isoMap[team.id];
                const emblemFile = emblemMap[team.id];

                return (
                  <button
                    key={team.id}
                    onClick={() => {
                      setSelectedTeamId(team.id);
                      setSearch("");
                    }}
                    className={cn(
                      "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-all border",
                      selectedTeamId === team.id && !search
                        ? "bg-white/10 text-white border-white/20 ring-1 ring-white/10"
                        : "bg-white/5 text-slate-400 border-white/10 hover:bg-white/10 hover:text-white",
                    )}
                  >
                    <span className="flex items-center gap-2">
                      {isoCode ? (
                        <img
                          src={`https://flagcdn.com/w40/${isoCode}.png`}
                          alt=""
                          className="w-5 h-auto rounded-sm shadow-sm"
                        />
                      ) : (
                        <span>{team.name.split(" ")[0]}</span>
                      )}
                      <span className="max-w-[80px] md:max-w-none truncate">
                        {team.name.split(" ").slice(1).join(" ")}
                      </span>
                      {emblemFile ? (
                        <img
                          src={`/album-copa-2026/emblems/${emblemFile}`}
                          alt=""
                          className="w-5 h-5 object-contain ml-1"
                        />
                      ) : (
                        !["FWC", "CC"].includes(team.id) && (
                          <div className="flex h-5 w-5 items-center justify-center rounded-sm bg-white/10 text-secondary ml-1">
                            <Trophy size={12} />
                          </div>
                        )
                      )}
                    </span>
                    {selectedTeamId === team.id && !search && (
                      <ChevronRight size={16} className="text-secondary" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Search Bar */}
            <div className="relative max-w-md">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                size={18}
              />
              <input
                type="text"
                placeholder="Buscar por código ou nome (ex: BRA 10 ou Messi)"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-2xl bg-white/5 border border-white/10 pl-12 pr-4 py-3 text-sm focus:border-secondary focus:ring-1 focus:ring-secondary outline-none transition-all"
              />
            </div>
          </div>

          {/* Sticker Grid */}
          <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10">
            {filteredStickers.map((code) => {
              const sticker = userStickers.find((s) => s.code === code);
              return (
                <StickerCard
                  key={code}
                  code={code}
                  count={sticker?.quantity || 0}
                  onToggle={() => handleStickerAction(code, "toggle")}
                  onIncrement={(e) => {
                    e.stopPropagation();
                    handleStickerAction(code, "increment");
                  }}
                  onDecrement={(e) => {
                    e.stopPropagation();
                    handleStickerAction(code, "decrement");
                  }}
                />
              );
            })}
          </div>

          {filteredStickers.length === 0 && (
            <div className="py-20 text-center">
              <p className="text-slate-500 text-lg">
                Nenhuma figurinha encontrada.
              </p>
            </div>
          )}
        </section>
      </main>
      <div className="container mx-auto px-4 py-8">
        <Footer />
      </div>
    </div>
  );
}

"use client";

import { useState, useEffect, useMemo } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StickerCard from "@/components/StickerCard";
import { STICKERS_DATA, ALL_STICKERS, GROUPS, ISO_MAP } from "@/data/stickers";
import { Trophy, ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function AdquiredPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [userStickers, setUserStickers] = useState<{ code: string; quantity: number }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (status === "unauthenticated") router.push("/auth/signin");
  }, [status, router]);

  useEffect(() => {
    if (session) {
      fetch("/album-copa-2026/api/stickers")
        .then((res) => res.json())
        .then((data) => { setUserStickers(data.stickers || []); setLoading(false); })
        .catch(() => setLoading(false));
    }
  }, [session]);

  const handleStickerAction = async (code: string, action: "toggle" | "increment" | "decrement") => {
    const updated = [...userStickers];
    const index = updated.findIndex((s) => s.code === code);
    if (action === "toggle") {
      if (index > -1) { if (updated[index].quantity > 1) return; updated.splice(index, 1); }
      else updated.push({ code, quantity: 1 });
    } else if (action === "increment") {
      if (index > -1) updated[index].quantity += 1; else updated.push({ code, quantity: 1 });
    } else if (action === "decrement") {
      if (index > -1) { if (updated[index].quantity > 1) updated[index].quantity -= 1; else updated.splice(index, 1); }
    }
    setUserStickers(updated);
    try {
      await fetch("/album-copa-2026/api/stickers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, action }),
      });
    } catch { console.error("Failed to sync sticker status"); }
  };

  const ownedMap = useMemo(() => {
    const map: Record<string, number> = {};
    userStickers.forEach((s) => { map[s.code] = s.quantity; });
    return map;
  }, [userStickers]);

  const totalAdquired = useMemo(() => userStickers.length, [userStickers]);

  // Agrupar por grupo e depois por seleção
  const groupedData = useMemo(() => {
    const groups: { groupLabel: string; teams: { id: string; name: string; owned: { code: string; quantity: number }[]; total: number }[] }[] = [];

    // Especiais primeiro
    const specialTeams = STICKERS_DATA.filter((t) => !t.group)
      .map((team) => ({
        id: team.id,
        name: team.name,
        total: team.stickers.length,
        owned: team.stickers.filter((c) => ownedMap[c] > 0).map((c) => ({ code: c, quantity: ownedMap[c] })),
      }))
      .filter((t) => t.owned.length > 0);
    if (specialTeams.length > 0) groups.push({ groupLabel: "Especiais", teams: specialTeams });

    // Grupos A–H
    GROUPS.forEach((g) => {
      const teams = STICKERS_DATA.filter((t) => t.group === g)
        .map((team) => ({
          id: team.id,
          name: team.name,
          total: team.stickers.length,
          owned: team.stickers.filter((c) => ownedMap[c] > 0).map((c) => ({ code: c, quantity: ownedMap[c] })),
        }))
        .filter((t) => t.owned.length > 0);
      if (teams.length > 0) groups.push({ groupLabel: `Grupo ${g}`, teams });
    });

    return groups;
  }, [ownedMap]);

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
        <Link href="/" className="mb-8 inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
          <ChevronLeft size={20} /> Voltar para a Coleção
        </Link>

        <div className="mb-10">
          <h1 className="text-4xl font-black tracking-tight text-white mb-2">Minhas Figurinhas</h1>
          <p className="text-slate-400">{totalAdquired} figurinha{totalAdquired !== 1 ? "s" : ""} na coleção</p>
        </div>

        {totalAdquired === 0 ? (
          <div className="rounded-3xl border-2 border-dashed border-white/10 py-24 text-center">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-white/5 text-slate-600">
              <Trophy size={40} />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Sem figurinhas ainda</h2>
            <p className="text-slate-500">Quando você marcar figurinhas, elas aparecerão aqui.</p>
          </div>
        ) : (
          <div className="space-y-10">
            {groupedData.map(({ groupLabel, teams }) => (
              <div key={groupLabel}>
                {/* Separador de grupo */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-px flex-1 bg-white/10" />
                  <span className="text-xs font-black uppercase tracking-widest text-secondary px-3 py-1 rounded-full border border-secondary/30 bg-secondary/10">
                    {groupLabel}
                  </span>
                  <div className="h-px flex-1 bg-white/10" />
                </div>

                <div className="space-y-8">
                  {teams.map((team) => (
                    <section key={team.id}>
                      {/* Card de cabeçalho da seleção */}
                      <div className="flex items-center gap-3 mb-4 p-3 rounded-xl bg-white/5 border border-white/10">
                        <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center border border-white/10 shrink-0">
                          {ISO_MAP[team.id] ? (
                            <img src={`https://flagcdn.com/w80/${ISO_MAP[team.id]}.png`} alt="" className="w-6 h-auto rounded-sm" />
                          ) : (
                            <Trophy size={14} className="text-secondary" />
                          )}
                        </div>
                        <div className="flex-1">
                          <h2 className="text-sm font-bold">{team.name.split(" ").slice(1).join(" ") || team.name}</h2>
                        </div>
                        <span className="text-xs font-black text-green-400 bg-green-400/10 px-2 py-1 rounded-full">
                          {team.owned.length}/{team.total}
                        </span>
                      </div>

                      <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10">
                        {team.owned.map(({ code, quantity }) => (
                          <StickerCard
                            key={code}
                            code={code}
                            count={quantity}
                            onToggle={() => handleStickerAction(code, "toggle")}
                            onIncrement={(e) => { e.stopPropagation(); handleStickerAction(code, "increment"); }}
                            onDecrement={(e) => { e.stopPropagation(); handleStickerAction(code, "decrement"); }}
                          />
                        ))}
                      </div>
                    </section>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
      <div className="container mx-auto px-4 py-8">
        <Footer />
      </div>
    </div>
  );
}

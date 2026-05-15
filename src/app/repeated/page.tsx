"use client";

import { useState, useEffect, useMemo } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StickerCard from "@/components/StickerCard";
import { ALL_STICKERS } from "@/data/stickers";
import { Trophy, ChevronLeft, Share2 } from "lucide-react";
import Link from "next/link";

export default function RepeatedPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [userStickers, setUserStickers] = useState<
    { code: string; quantity: number }[]
  >([]);
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

  const repeatedStickers = useMemo(() => {
    return userStickers.filter((s) => s.quantity > 1);
  }, [userStickers]);

  const totalRepeated = useMemo(() => {
    return repeatedStickers.reduce((acc, curr) => acc + (curr.quantity - 1), 0);
  }, [repeatedStickers]);

  if (!mounted || status === "loading" || loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-secondary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
        >
          <ChevronLeft size={20} />
          Voltar para a Coleção
        </Link>

        <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-4xl font-black tracking-tight text-white mb-2">
              Minhas Repetidas
            </h1>
            <p className="text-slate-400">
              Gerencie suas figurinhas para troca ({totalRepeated} totais)
            </p>
          </div>

          <button
            className="flex items-center gap-2 rounded-xl bg-secondary px-6 py-3 font-bold text-primary hover:bg-secondary/90 transition-all shadow-lg"
            onClick={() => {
              const text = `Tenho estas repetidas para trocar: ${repeatedStickers.map((s) => `${s.code} (x${s.quantity - 1})`).join(", ")}`;
              navigator.clipboard.writeText(text);
              alert("Lista copiada para a área de transferência!");
            }}
          >
            <Share2 size={20} />
            Copiar Lista de Trocas
          </button>
        </div>

        {repeatedStickers.length > 0 ? (
          <div className="grid grid-cols-3 gap-6 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10">
            {repeatedStickers.map((sticker) => (
              <StickerCard
                key={sticker.code}
                code={sticker.code}
                count={sticker.quantity}
                onToggle={() => handleStickerAction(sticker.code, "toggle")}
                onIncrement={(e) => {
                  e.stopPropagation();
                  handleStickerAction(sticker.code, "increment");
                }}
                onDecrement={(e) => {
                  e.stopPropagation();
                  handleStickerAction(sticker.code, "decrement");
                }}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border-2 border-dashed border-white/10 py-24 text-center">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-white/5 text-slate-600">
              <Trophy size={40} />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">
              Sem repetidas ainda
            </h2>
            <p className="text-slate-500">
              Quando você marcar mais de uma figurinha, elas aparecerão aqui.
            </p>
          </div>
        )}
      </main>
      <div className="container mx-auto px-4 py-8">
        <Footer />
      </div>
    </div>
  );
}

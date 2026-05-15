"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Navbar from "@/components/Navbar";
import { User, Lock, Save, ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function ProfilePage() {
  const { data: session, update } = useSession();
  const [mounted, setMounted] = useState(false);
  const [name, setName] = useState(session?.user?.name || "");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/album-copa/api/user", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, password }),
      });

      if (res.ok) {
        setMessage("Perfil atualizado com sucesso!");
        update({ name });
      } else {
        setMessage("Erro ao atualizar perfil.");
      }
    } catch (err) {
      setMessage("Erro ao atualizar perfil.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      <main className="container mx-auto max-w-2xl px-4 py-8">
        <Link 
          href="/" 
          className="mb-8 flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
        >
          <ChevronLeft size={20} />
          Voltar para a Coleção
        </Link>

        <div className="rounded-2xl bg-white/5 border border-white/10 p-8 backdrop-blur-sm">
          <h1 className="mb-8 text-3xl font-bold">Editar Perfil</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {message && (
              <div className="rounded-lg bg-green-500/10 p-3 text-center text-sm font-medium text-green-500 border border-green-500/20">
                {message}
              </div>
            )}

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">Nome</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-lg bg-white/5 border border-white/10 pl-10 pr-4 py-3 text-white focus:border-secondary outline-none transition-all"
                  placeholder="Seu nome"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">Nova Senha (deixe em branco para não alterar)</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-lg bg-white/5 border border-white/10 pl-10 pr-4 py-3 text-white focus:border-secondary outline-none transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-3 text-sm font-semibold text-white shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all disabled:opacity-50"
            >
              {loading ? (
                "Salvando..."
              ) : (
                <>
                  <Save size={18} />
                  Salvar Alterações
                </>
              )}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}

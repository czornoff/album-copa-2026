"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Trophy } from "lucide-react";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/album-copa/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        router.push("/auth/signin?registered=true");
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("Ocorreu um erro ao tentar registrar.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-900 to-black px-4">
      <div className="w-full max-w-md space-y-8 rounded-2xl bg-white/5 p-8 backdrop-blur-xl border border-white/10 shadow-2xl">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/20 text-secondary">
            <Trophy size={32} />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Criar Conta</h1>
          <p className="mt-2 text-sm text-slate-400">Comece sua coleção agora mesmo</p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="rounded-lg bg-red-500/10 p-3 text-center text-sm font-medium text-red-500 border border-red-500/20">
              {error}
            </div>
          )}
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-300">Nome Completo</label>
              <input
                type="text"
                required
                className="mt-1 block w-full rounded-lg bg-white/5 border border-white/10 px-4 py-3 text-white placeholder-slate-500 focus:border-secondary focus:ring-1 focus:ring-secondary transition-all outline-none"
                placeholder="Seu nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300">Email</label>
              <input
                type="email"
                required
                className="mt-1 block w-full rounded-lg bg-white/5 border border-white/10 px-4 py-3 text-white placeholder-slate-500 focus:border-secondary focus:ring-1 focus:ring-secondary transition-all outline-none"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300">Senha</label>
              <input
                type="password"
                required
                className="mt-1 block w-full rounded-lg bg-white/5 border border-white/10 px-4 py-3 text-white placeholder-slate-500 focus:border-secondary focus:ring-1 focus:ring-secondary transition-all outline-none"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-primary py-3 text-sm font-semibold text-white shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all disabled:opacity-50"
          >
            {loading ? "Criando conta..." : "Registrar"}
          </button>

          <p className="text-center text-sm text-slate-400">
            Já tem uma conta?{" "}
            <Link href="/auth/signin" className="font-semibold text-secondary hover:underline">
              Entrar
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

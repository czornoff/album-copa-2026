"use client";

import { useState, useEffect } from "react";
import { signOut, useSession } from "next-auth/react";
import { Trophy, LogOut, User as UserIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  const { data: session } = useSession();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-slate-900/50 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/20 text-secondary">
            <Trophy size={24} />
          </div>
          <span className="text-xl font-bold tracking-tight text-white hidden sm:block">
            Controle de Figurinhas
          </span>
        </div>

        {session?.user && (
          <div className="flex items-center gap-2 sm:gap-4">
            <Link 
              href="/profile"
              className="flex items-center gap-3 rounded-full bg-white/5 pl-1 pr-3 py-1 border border-white/10 hover:bg-white/10 transition-all"
            >
              {session.user.image ? (
                <Image
                  src={session.user.image}
                  alt={session.user.name || "User"}
                  width={32}
                  height={32}
                  className="rounded-full"
                />
              ) : (
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary/20 text-secondary">
                  <UserIcon size={18} />
                </div>
              )}
              <span className="text-sm font-medium text-slate-200 hidden md:block">
                {session.user.name}
              </span>
            </Link>
            <button
              onClick={() => signOut()}
              className="flex items-center justify-center h-10 w-10 rounded-lg text-slate-400 hover:bg-red-500/10 hover:text-red-500 transition-all"
              title="Sair"
            >
              <LogOut size={20} />
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

"use client";

import { useState, useEffect } from "react";
import { signOut, useSession } from "next-auth/react";
import { LogOut, User as UserIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

function WhatsAppIcon({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

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
            <Image src="/album-copa-2026/album-copa-2026.png" alt="Copa 2026" width={24} height={24} />
          </div>
          <span className="text-xl font-bold tracking-tight text-white hidden sm:block">
            Controle de Figurinhas
          </span>
        </div>

        {session?.user && (
          <div className="flex items-center gap-2 sm:gap-4">
            <button
              onClick={() => {
                const text = encodeURIComponent("Confira e controle o seu Álbum da Copa 2026! ⚽🏆");
                const url = encodeURIComponent(window.location.href);
                window.open(`https://api.whatsapp.com/send/?text=${text}%0A${url}`, "_blank");
              }}
              className="flex items-center justify-center h-10 w-10 rounded-lg text-slate-400 hover:bg-green-500/10 hover:text-green-500 transition-all"
              title="Compartilhar no WhatsApp"
            >
              <WhatsAppIcon size={20} />
            </button>
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

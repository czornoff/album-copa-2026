"use client";

import { useEffect, useState } from "react";
import { Download, Share, X } from "lucide-react";

export function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // Registrar o Service Worker
    if ("serviceWorker" in navigator) {
      // Usando o basePath que já está configurado no next.config.ts
      navigator.serviceWorker
        .register("/album-copa-2026/sw.js")
        .then((registration) => {
          console.log("Service Worker registrado com sucesso:", registration.scope);
        })
        .catch((error) => {
          console.error("Falha ao registrar o Service Worker:", error);
        });
    }

    // Detectar iOS para exibir instruções manuais
    const isIosDevice =
      /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
    const isStandalone = window.matchMedia("(display-mode: standalone)").matches || (window.navigator as any).standalone === true;

    if (isIosDevice && !isStandalone) {
      setIsIOS(true);
      setShowPrompt(true);
    }

    // Capturar o evento de instalação (Android / Windows / Chrome)
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      if (!isStandalone) {
        setShowPrompt(true);
      }
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === "accepted") {
      setShowPrompt(false);
    }
    setDeferredPrompt(null);
  };

  if (!showPrompt) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 animate-in slide-in-from-bottom-4 fade-in duration-300">
      <div className="bg-slate-800 border border-secondary/30 rounded-2xl p-4 shadow-xl shadow-black/50 flex flex-col gap-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-secondary/20 rounded-xl flex items-center justify-center text-secondary">
              <Download size={20} />
            </div>
            <div>
              <h3 className="text-white font-bold text-sm">Instalar Aplicativo</h3>
              <p className="text-slate-400 text-xs">
                {isIOS 
                  ? "Adicione à tela inicial para acesso rápido." 
                  : "Instale o app para uma melhor experiência."}
              </p>
            </div>
          </div>
          <button 
            onClick={() => setShowPrompt(false)}
            className="text-slate-400 hover:text-white transition-colors p-1"
          >
            <X size={16} />
          </button>
        </div>
        
        {isIOS ? (
          <div className="bg-white/5 rounded-xl p-3 flex items-center gap-2 text-xs text-slate-300">
            <span>Toque em</span>
            <Share size={14} className="text-secondary" />
            <span>(Compartilhar) e depois em <strong>"Adicionar à Tela de Início"</strong>.</span>
          </div>
        ) : (
          <button 
            onClick={handleInstallClick}
            className="w-full bg-secondary hover:bg-secondary/90 text-black font-bold text-sm py-2 rounded-xl transition-colors"
          >
            Instalar Agora
          </button>
        )}
      </div>
    </div>
  );
}

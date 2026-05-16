"use client";

import { useEffect, useRef } from "react";
import { QRCodeSVG } from "qrcode.react";
import { X, Copy, CheckCircle2 } from "lucide-react";
import { useState } from "react";

interface ShareModalProps {
  url: string;
  onClose: () => void;
}

export function ShareModal({ url, onClose }: ShareModalProps) {
  const [copied, setCopied] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) onClose();
  };

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4 animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-sm bg-slate-900 border border-white/10 rounded-3xl p-6 shadow-2xl animate-in slide-in-from-bottom-4 duration-300">
        {/* Botão fechar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/10"
        >
          <X size={20} />
        </button>

        {/* Título */}
        <div className="mb-6 text-center">
          <h2 className="text-xl font-black text-white mb-1">Compartilhar Lista</h2>
          <p className="text-sm text-slate-400">Compartilhe suas figurinhas repetidas para troca</p>
        </div>

        {/* QR Code */}
        <div className="flex justify-center mb-6">
          <div className="bg-white p-3 rounded-2xl shadow-lg">
            <QRCodeSVG
              value={url}
              size={180}
              bgColor="#ffffff"
              fgColor="#0a0a0a"
              level="M"
            />
          </div>
        </div>

        {/* Link copiável */}
        <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-3 py-2 mb-4">
          <p className="flex-1 text-xs text-slate-300 truncate font-mono">{url}</p>
          <button
            onClick={handleCopy}
            className="shrink-0 flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg transition-all bg-secondary/20 text-secondary hover:bg-secondary/30 border border-secondary/30"
          >
            {copied ? (
              <>
                <CheckCircle2 size={13} className="text-green-400" />
                <span className="text-green-400">Copiado!</span>
              </>
            ) : (
              <>
                <Copy size={13} />
                Copiar
              </>
            )}
          </button>
        </div>

        <p className="text-center text-xs text-slate-500">
          Aponte a câmera para o QR Code para acessar a lista
        </p>
      </div>
    </div>
  );
}

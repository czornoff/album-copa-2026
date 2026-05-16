"use client";

import { cn } from "../lib/utils";
import { Plus, Minus, Trophy } from "lucide-react";
import { ISO_MAP, EMBLEM_MAP, PLAYER_DATA_MAP } from "@/data/stickers";

const cnLocal = cn;

interface StickerCardProps {
  code: string;
  count: number;
  onIncrement: (e: React.MouseEvent) => void;
  onDecrement: (e: React.MouseEvent) => void;
  onToggle?: () => void;
}

export default function StickerCard({
  code,
  count,
  onIncrement,
  onDecrement,
  onToggle,
}: StickerCardProps) {
  const isOwned = count > 0;

  const [teamId, suffix] = code.split(" ");
  const player = PLAYER_DATA_MAP[code];
  const isoCode = ISO_MAP[teamId];
  const emblemFile = EMBLEM_MAP[teamId];

  return (
    <div
      onClick={!isOwned ? onToggle : undefined}
      className={cnLocal(
        "group relative flex flex-col bg-slate-900/50 border transition-all duration-300 overflow-hidden",
        "aspect-[3/4] w-full max-w-[140px] mx-auto rounded-xl",
        isOwned
          ? "border-secondary shadow-lg shadow-secondary/10"
          : "border-white/10 cursor-pointer hover:border-white/30 hover:bg-white/5",
      )}
    >
      {/* Header with Code */}
      <div className="flex items-center justify-between px-2 py-1 bg-black/40 border-b border-white/5">
        <span className="text-[10px] font-black text-secondary tracking-tighter uppercase">
          {teamId}
        </span>
        <span className="text-[10px] font-black text-white">{suffix}</span>
      </div>

      {/* Content Area */}
      <div className="flex-1 flex flex-col items-center justify-center w-full overflow-hidden text-center px-1 py-2">
        {player?.isSpecial ? (
          <div className="flex-1 w-full flex flex-col items-center justify-center gap-2">
            {suffix === "01" && emblemFile ? (
              <img
                src={`/album-copa-2026/emblems/${emblemFile}`}
                alt="Escudo"
                className={cnLocal(
                  "w-12 h-12 object-contain transition-all",
                  !isOwned && "opacity-60",
                )}
              />
            ) : suffix === "13" ? (
              <div
                className={cnLocal(
                  "flex flex-col items-center justify-center border-2 border-dashed border-white/10 rounded-lg w-full h-full p-2",
                  !isOwned && "opacity-30 grayscale",
                )}
              >
                <span className="text-xs font-black text-white tracking-widest text-center">
                  TIME
                </span>
                <span className="text-[8px] font-bold text-slate-500 mt-1 uppercase">
                  {teamId}
                </span>
              </div>
            ) : (
              <span className="text-xl font-black text-white">
                {player.name}
              </span>
            )}
            <span
              className={cnLocal(
                "text-[9px] font-bold uppercase px-2 py-0.5 rounded-full",
                isOwned
                  ? "bg-secondary text-white"
                  : "bg-white/5 text-slate-500",
              )}
            >
              {player.position === "BADGE" ? "Escudo" : player.position === "TEAM" ? "Equipe" : player.position}
            </span>
          </div>
        ) : player ? (
          <>
            <span
              className={cnLocal(
                "text-[13px] font-black leading-tight line-clamp-3 uppercase mb-2 px-1",
                isOwned ? "text-white" : "text-slate-400",
              )}
            >
              {player.name}
            </span>
            <span
              className={cnLocal(
                "text-[10px] font-bold px-3 py-1 rounded-full transition-colors",
                isOwned
                  ? "bg-secondary/20 text-secondary"
                  : "bg-white/5 text-slate-500",
              )}
            >
              {player.position}
            </span>
          </>
        ) : (
          <span
            className={cnLocal(
              "text-4xl font-black transition-colors",
              isOwned ? "text-white" : "text-slate-400",
            )}
          >
           {suffix}
          </span>
        )}
      </div>

      {/* FOOTER CONTROLS — só aparece quando possui ao menos 1 */}
      {isOwned && (
        <div className="flex items-stretch h-8 w-full border-t border-white/5">
          <button
            onClick={(e) => onDecrement(e)}
            className="flex-1 flex items-center justify-center bg-red-600 hover:bg-red-700 text-white transition-colors"
          >
            <Minus size={14} strokeWidth={3} />
          </button>

          <div className="flex-[1.5] flex items-center justify-center bg-[#FFC000] text-black font-black text-xs border-x border-black/10">
            {count}
          </div>

          <button
            onClick={(e) => onIncrement(e)}
            className="flex-1 flex items-center justify-center bg-green-600 hover:bg-green-700 text-white transition-colors"
          >
            <Plus size={14} strokeWidth={3} />
          </button>
        </div>
      )}
    </div>
  );
}

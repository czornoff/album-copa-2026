import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import { STICKERS_DATA, PLAYER_DATA_MAP, ISO_MAP } from "@/data/stickers";
import Navbar from "@/components/Navbar";
import mongoose from "mongoose";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

async function getRepeatedStickers(userId: string) {
  await dbConnect();
  
  try {
    const isValidObjectId = mongoose.Types.ObjectId.isValid(userId) && (String(new mongoose.Types.ObjectId(userId)) === userId);
    
    // Busca flexível e nativa
    const query: any = { 
      $or: [
        { providerId: userId },
        { email: userId } 
      ]
    };
    
    if (isValidObjectId) {
      query.$or.push({ _id: new mongoose.Types.ObjectId(userId) });
    } else {
      query.$or.push({ _id: userId });
    }

    const user = await User.collection.findOne(query);
    
    if (!user || !user.stickers) return [];
    
    return user.stickers
      .filter((s: any) => s.quantity > 1)
      .map((s: any) => ({
        code: s.code,
        quantity: s.quantity - 1
      }));
  } catch (error) {
    console.error("Error fetching user stickers:", error);
    return [];
  }
}

export default async function PublicRepeatedPage({ params }: { params: Promise<{ userId: string }> }) {
  const { userId } = await params;
  const repeatedStickers = await getRepeatedStickers(userId);
  
  // Agrupar por seleção
  const groupedRepeated = STICKERS_DATA.map(team => {
    const teamRepeated = team.stickers
      .map(code => {
        const found = repeatedStickers.find(s => s.code === code);
        return found ? { code, quantity: found.quantity } : null;
      })
      .filter(Boolean);
    
    return {
      ...team,
      repeated: teamRepeated
    };
  }).filter(team => team.repeated.length > 0);

  const totalRepeatedCount = repeatedStickers.reduce((acc, curr) => acc + curr.quantity, 0);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <header className="mb-10 text-center">
          <h1 className="text-4xl font-black mb-2 text-transparent bg-clip-text bg-gradient-to-r from-secondary to-amber-500">
            Figurinhas Repetidas
          </h1>
          <p className="text-slate-400">Lista pública para trocas • ID: {userId}</p>
          
          <div className="mt-6 inline-flex items-center gap-4 bg-white/5 border border-white/10 px-6 py-3 rounded-2xl">
            <div className="text-center">
              <span className="block text-2xl font-black text-secondary">{totalRepeatedCount}</span>
              <span className="text-[10px] uppercase font-bold text-slate-500">Total Repetidas</span>
            </div>
            <div className="w-px h-8 bg-white/10" />
            <div className="text-center">
              <span className="block text-2xl font-black text-white">{groupedRepeated.length}</span>
              <span className="text-[10px] uppercase font-bold text-slate-500">Seleções</span>
            </div>
          </div>
        </header>

        {groupedRepeated.length === 0 ? (
          <div className="py-20 text-center border-2 border-dashed border-white/5 rounded-3xl">
            <p className="text-slate-500 text-lg">Este colecionador ainda não possui figurinhas repetidas.</p>
          </div>
        ) : (
          <div className="space-y-12">
            {groupedRepeated.map((team) => (
              <section key={team.id} className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10">
                    <img 
                      src={`https://flagcdn.com/w80/${ISO_MAP[team.id]}.png`} 
                      alt="" 
                      className="w-6 h-auto rounded-sm shadow-sm"
                    />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">{team.name.split(' ').slice(1).join(' ')}</h2>
                    <p className="text-xs text-secondary font-bold uppercase">{team.repeated.length} repetidas disponíveis</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10">
                  {team.repeated.map((stk: any) => {
                    const [tId, suffix] = stk.code.split(" ");
                    const player = PLAYER_DATA_MAP[stk.code];
                    
                    return (
                      <div 
                        key={stk.code}
                        className="relative flex flex-col bg-slate-900/80 border border-secondary/30 rounded-xl aspect-[3/4] overflow-hidden shadow-lg shadow-secondary/5"
                      >
                        <div className="bg-secondary/20 py-1 text-center border-b border-secondary/20">
                          <span className="text-[10px] font-black text-white uppercase">{stk.code}</span>
                        </div>
                        
                        <div className="flex-1 flex flex-col items-center justify-center p-2 text-center">
                          <span className="text-[11px] font-black leading-tight uppercase text-white mb-1 line-clamp-3">
                            {player?.name || suffix}
                          </span>
                          <span className="text-[9px] font-bold text-secondary uppercase">
                            {player?.position}
                          </span>
                        </div>

                        <div className="bg-[#FFC000] py-1 text-center border-t border-black/10">
                          <span className="text-xs font-black text-black">+{stk.quantity}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            ))}
          </div>
        )}
      </main>
      
      <footer className="py-20 text-center text-slate-600 text-sm">
        <p>© 2026 Controle de Figurinhas • Sistema de Trocas</p>
      </footer>
    </div>
  );
}

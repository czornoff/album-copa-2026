import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: "No autorizado" }, { status: 401 });
  }

  await dbConnect();
  const user = await User.findOne({ email: session.user?.email });

  if (!user) {
    return NextResponse.json({ message: "Usuario no encontrado" }, { status: 404 });
  }

  // Sincronização automática do providerId (Google ID) para usuários existentes
  if (!user.providerId && (session.user as any).id) {
    user.providerId = (session.user as any).id;
    await user.save();
  }

  return NextResponse.json({ stickers: user.stickers });
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: "No autorizado" }, { status: 401 });
  }

  const { code, action } = await req.json();

  await dbConnect();
  const user = await User.findOne({ email: session.user?.email });

  if (!user) {
    return NextResponse.json({ message: "Usurio no encontrado" }, { status: 404 });
  }

  const stickerIndex = user.stickers.findIndex((s: any) => s.code === code);

  if (action === "toggle") {
    if (stickerIndex > -1) {
      user.stickers.splice(stickerIndex, 1);
    } else {
      user.stickers.push({ code, quantity: 1 });
    }
  } else if (action === "increment") {
    if (stickerIndex > -1) {
      user.stickers[stickerIndex].quantity += 1;
    } else {
      user.stickers.push({ code, quantity: 1 });
    }
  } else if (action === "decrement") {
    if (stickerIndex > -1) {
      if (user.stickers[stickerIndex].quantity > 1) {
        user.stickers[stickerIndex].quantity -= 1;
      } else {
        user.stickers.splice(stickerIndex, 1);
      }
    }
  }

  await user.save();
  return NextResponse.json({ stickers: user.stickers });
}

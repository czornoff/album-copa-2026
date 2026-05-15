import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function PATCH(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: "No autorizado" }, { status: 401 });
  }

  const { name, password } = await req.json();

  await dbConnect();
  const user = await User.findOne({ email: session.user?.email });

  if (!user) {
    return NextResponse.json({ message: "Usurio no encontrado" }, { status: 404 });
  }

  if (name) user.name = name;
  if (password) {
    user.password = await bcrypt.hash(password, 10);
  }

  await user.save();

  return NextResponse.json({ message: "Perfil atualizado com sucesso" });
}

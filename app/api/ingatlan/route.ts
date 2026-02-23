import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const inggatlanok = await prisma.ingatlan.findMany({
      include: {
        kategora: true, // relációs (virtuális) mező megjelenítése
      },
      omit: {
        kategoria_id: true, // mező tíltása
      },
    });
    return NextResponse.json(inggatlanok);
  } catch (error) {
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Ismeretlen hiba!" },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const újIngatlan = await prisma.ingatlan.create({
      data: body,
    });
    return NextResponse.json({ id: újIngatlan.id }, { status: 201 });
  } catch (error) {
    if (error instanceof Error && error.message.includes("is missing")) {
      return NextResponse.json({ message: "Hiányos adatok" }, { status: 400 });
    }
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Ismeretlen hiba!" },
      { status: 500 },
    );
  }
}

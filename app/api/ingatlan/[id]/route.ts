import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    await prisma.ingatlan.delete({
      where: { id: Number(id) },
    });
    return NextResponse.json({ status: 204 });
  } catch (error) {
    if (error instanceof Error && error.message.includes("No record was found for a delete.")) {
      return NextResponse.json({ message: "Az ingatlan nem létezik." }, { status: 404 });
    }
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Ismeretlen hiba!" },
      { status: 500 },
    );
  }
}

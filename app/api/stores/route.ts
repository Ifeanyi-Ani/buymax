import prismaDb from "@/lib/prismaDb";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const { userId } = auth();
    const body = await req.json();

    const { name } = body;
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    if (!name) {
      return new NextResponse("Name is required", { status: 404 });
    }
    const store = await prismaDb.store.create({
      data: { name, userId },
    });

    return NextResponse.json(store);
}

import prismaDb from "@/lib/prismaDb";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string } },
) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { name } = body;
    const { storeId } = params;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!name) {
      return new NextResponse("name is required", { status: 400 });
    }

    if (!storeId) {
      return new NextResponse("storeId is required", { status: 400 });
    }

    const updateStore = await prismaDb.store.updateMany({
      where: {
        id: storeId,
        userId,
      },
      data: {
        name,
      },
    });

    return NextResponse.json(updateStore);
  } catch (error) {
    console.log("STORE_PATCH", error);
    return new NextResponse("Something went wrong");
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string } },
) {
  try {
    const { userId } = auth();
    const { storeId } = params;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!storeId) {
      return new NextResponse("storeId is required", { status: 400 });
    }

    await prismaDb.store.deleteMany({
      where: {
        id: storeId,
        userId,
      },
    });

    return NextResponse.json({ message: "Store deleted sucessfully" });
  }
}

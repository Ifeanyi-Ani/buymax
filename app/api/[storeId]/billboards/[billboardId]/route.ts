import prismaDb from "@/lib/prismaDb";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

interface Props {
  params: {
    storeId: string;
    billboardId: string;
  };
}

export async function PATCH(req: Request, props: Props) {
  try {
    const body = await req.json();

    const {
      params: { storeId, billboardId },
    } = props;

    const { userId } = auth();
    const { label, imageUrl } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!storeId) {
      return new NextResponse("storeId is required!", { status: 400 });
    }

    if (!billboardId) {
      return new NextResponse("billboardId is required", { status: 400 });
    }

    if (!label && !imageUrl) {
      return new NextResponse(
        "Make sure you are passing label and imageUrl field correctly",
        { status: 400 },
      );
    }

    const storeByUserId = await prismaDb.store.findFirst({
      where: {
        id: storeId,
        userId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const updateBillboard = await prismaDb.billboard.updateMany({
      where: {
        id: billboardId,
        storeId,
      },
      data: {
        label,
        imageUrl,
      },
    });

    return NextResponse.json(updateBillboard);
  } catch (error) {
    console.error("BILLBOARD_PATCH", error);
    return new NextResponse("Internal Server Error");
  }
}


import { auth } from "@clerk/nextjs/server";
interface PostProps {
  params: {
    storeId: string;
  };
}
export async function POST(req: Request, props: PostProps) {
  try {
    // Extract store ID from the request parameters
    const {
      params: { storeId },
    } = props;

    // Extract the authenticated user's ID from the request context, in my case clerk
    const { userId } = auth();

    // Parse request body as JSON and extract store details
    const body = await req.json();
    const { label, imageUrl } = body;

    // Validate user ID.
    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    // Validate store ID and store details before creating a new store in the database.
    if (!storeId) {
      return new NextResponse("storeId is required", { status: 400 });
    }

    if (!label && !imageUrl) {
      return new NextResponse("Label and image URL are required", {
        status: 400,
      });
    }

    // Retrieve the store with the provided ID and check if it belongs to the authenticated user.
    const storeByUserId = await prismaDb.store.findFirst({
      where: {
        userId,
        id: storeId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

  } catch (error) {
    console.error("BILLBOARD_POST", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}


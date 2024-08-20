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

  } catch (error) {
    console.error("BILLBOARD_POST", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}


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

  } catch (error) {
    console.error("BILLBOARD_POST", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}


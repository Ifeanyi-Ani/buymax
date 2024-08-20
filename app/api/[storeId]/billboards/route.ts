interface PostProps {
  params: {
    storeId: string;
  };
}
export async function POST(req: Request, props: PostProps) {
  try {
  } catch (error) {
    console.error("BILLBOARD_POST", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}


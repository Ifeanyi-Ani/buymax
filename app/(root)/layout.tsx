import prismaDb from "@/lib/prismaDb";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function SetupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = auth();

  if (!userId) {
    redirect("/login");
  }

  const store = await prismaDb.store.findFirst({ where: { userId } });

  if (store) {
    redirect(`/${store.id}`);
  }

  return children;
}

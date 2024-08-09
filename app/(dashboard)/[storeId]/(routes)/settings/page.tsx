import prismaDb from "@/lib/prismaDb";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";
import { SettingForm } from "./_components/SettingForm";

type Props = {
  params: {
    storeId: string;
  };
};

const SettingsPage = async ({ params }: Props) => {
  const { userId } = auth();
  const { storeId } = params;

  if (!userId) {
    redirect("/login");
  }
  const store = await prismaDb.store.findFirst({
    where: {
      id: storeId,
      userId,
    },
  });
  if (!store) {
    redirect("/");
  }
};
export default SettingsPage;

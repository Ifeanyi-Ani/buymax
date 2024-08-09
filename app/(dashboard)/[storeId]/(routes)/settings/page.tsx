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
  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-4 pt-6">
        <SettingForm initialData={store} storeId={storeId}/>
      </div>
    </div>
  );
};
export default SettingsPage;

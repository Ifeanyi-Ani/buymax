import { UserButton } from "@clerk/nextjs";
import React from "react";
import MainNav from "@/components/MainNav";
import StoreSwticher from "./StoreSwitcher";
import prismaDb from "@/lib/prismaDb";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const Navbar = async () => {
  const { userId } = auth();

  if (!userId) {
    redirect("/login");
  }
  const store = await prismaDb.store.findMany({
    where: {
      userId: userId,
    },
  });

  return (
    <div className="border-b ">
      <div className="flex h-16 items-center px-4 gap-4">
        <StoreSwticher items={store} />
        <MainNav />
        <div className="ml-auto flex items-center space-x-4">
          <UserButton afterSwitchSessionUrl="/" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;

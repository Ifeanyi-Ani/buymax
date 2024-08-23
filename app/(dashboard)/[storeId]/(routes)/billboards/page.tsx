import React from "react";
import { BillboardClient } from "./_components/BillboardClient";
import { BillboardCol } from "./_components/Columns";
import prismaDb from "@/lib/prismaDb";
import { format } from "date-fns";

type Props = {
  params: { storeId: string };
};

const Billboardpage = async (props: Props) => {
  const {
    params: { storeId },
  } = props;

  const billboards = await prismaDb.billboard.findMany({
    where: { storeId },
    orderBy: { createdAt: "desc" },
  });

  const mapBillbaord: BillboardCol[] = billboards.map((item) => ({
    id: item.id,
    label: item.label,
    createdAt: format(item.createdAt, "MMMM dd, yyyy"),
  }));

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardClient billboards={mapBillbaord} />
      </div>
    </div>
  );
};

export default Billboardpage;

"use client";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/Heading";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { BillboardCol, columns } from "./Columns";
import { DataTable } from "@/components/DataTable";
import { ApiList } from "@/components/api-list";

interface Props {
  billboards: BillboardCol[];
}
export const BillboardClient = (props: Props) => {
  const { billboards } = props;
  const router = useRouter();
  const { storeId } = useParams();
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Billboard(${billboards?.length})`}
          description="Manage billboard for your store"
        />

        <Button onClick={() => router.push(`/${storeId}/billboards/new`)}>
          <Plus className="h-4 w-4" />
          Add New
        </Button>
      </div>

      <Separator />

      <DataTable searchKey="label" columns={columns} data={billboards} />

      <Heading title="API" description="API calls for billboards" />

      <Separator />

      <ApiList entityName="billboards" entityIdName="billboardId" />
    </>
  );
};

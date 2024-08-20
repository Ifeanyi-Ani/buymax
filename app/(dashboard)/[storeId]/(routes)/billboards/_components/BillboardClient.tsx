"use client";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/Heading";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { Separator } from "@/components/ui/separator";

export const BillboardClient = () => {
  const router = useRouter();
  const { storeId } = useParams();
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title="Billboard(0)"
          description="Manage billboard for your store"
        />

        <Button onClick={() => router.push(`/${storeId}/billboards/new`)}>
          <Plus className="h-4 w-4" />
          Add New
        </Button>
      </div>

      <Separator />
    </>
  );
};

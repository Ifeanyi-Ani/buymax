import prismaDb from "@/lib/prismaDb";
import { BillboardForm } from "../_components/BillboardForm";

const BillboardPage = async ({
  params,
}: {
  params: { billboardId: string };
}) => {
  const { billboardId } = params;
  const billboard = await prismaDb.billboard.findUnique({
    where: {
      id: billboardId,
    },
  });
  return (
    <section className="flex flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardForm initialData={billboard} />
      </div>
    </section>
  );
};

export default BillboardPage;

import { Billboard, Store } from "@prisma/client";
import { Heading } from "@/components/Heading";
import { Separator } from "@/components/ui/separator";
type Props = {
  initialData: Billboard | null;
};

export const BillboardForm: React.FC<Props> = ({ initialData }) => {
  const title = initialData ? "Edit billboard" : "Create billboard";
  const description = initialData ? "Edit a billboard" : "Add a new billboard";
  const formMessage = initialData ? "Billboard updated" : "Billboard created";
  const buttonText = initialData ? "Save changes" : "Create";

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
      </div>
      <Separator />
    </>
  );
};

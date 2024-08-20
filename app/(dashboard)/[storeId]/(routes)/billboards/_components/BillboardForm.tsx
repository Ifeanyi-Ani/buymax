import { Billboard, Store } from "@prisma/client";
import { Heading } from "@/components/Heading";
import { Separator } from "@/components/ui/separator";
type Props = {
  initialData: Billboard | null;
};

export const BillboardForm: React.FC<Props> = ({ initialData }) => {
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
      </div>
      <Separator />
    </>
  );
};

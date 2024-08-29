import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BillboardCol } from "./Columns";
import { Button } from "@/components/ui/button";
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react";
import { toast } from "sonner";
import { UseAlertModal } from "@/components/modals/alert-modal";
import { useState } from "react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";

interface Props {
  data: BillboardCol;
}

export const CellAction = (props: Props) => {
  const { data } = props;
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const { storeId } = useParams();
  const router = useRouter();

  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    toast.success("ID copied to the clipboard");
  };

  const onDelete = async () => {
    try {
      setLoading(true);

      await axios.delete(`/api/${storeId}/billboards/${data.id}`);
      toast.success("Billboard deleted successfully");

      router.refresh();
    } catch (error) {
      console.error("DELETE/UI", error);
      toast.error("Someting went wrong");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };
  return (
    <div>
      <UseAlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        isLoading={loading}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>

          <DropdownMenuSeparator />

          <DropdownMenuItem onClick={() => onCopy(data.id)}>
            <Copy className="mr-2 h-4 w-4" />
            Copy Id
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() => router.push(`/${storeId}/billboards/${data.id}`)}
          >
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </DropdownMenuItem>

          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Trash className="mr-2 h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

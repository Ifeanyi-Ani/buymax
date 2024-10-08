"use client";
import * as z from "zod";
import axios from "axios";
import { Store } from "@prisma/client";
import React, { useState } from "react";
import { Heading } from "@/components/Heading";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { UseAlertModal } from "@/components/modals/alert-modal";
import { ApiInfo } from "@/components/api-info";
import { OriginUrl } from "@/hooks/use-originURL";

type Props = {
  initialData: Store;
  storeId: string;
};
const formSchema = z.object({
  name: z.string().min(1),
});
type SettingsFormValues = z.infer<typeof formSchema>;

export const SettingForm = ({ initialData, storeId }: Props) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const origin = OriginUrl();

  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });

  const onSubmit = async (values: SettingsFormValues) => {
    try {
      setLoading(true);
      await axios.patch(`/api/stores/${storeId}`, values);
      toast.success("Store updated sucessfully");
      router.refresh();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while updating store");
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      await axios.delete(`/api/stores/${storeId}`);
      toast.success("Store deleted successfully");
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Make sure you removed all products and categories first.");
    }
  };
  return (
    <>
      <UseAlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        isLoading={loading}
      />
      <div className="flex items-center justify-between">
        <Heading title="Settings" description="Manage your preference" />
        <Button
          disabled={loading}
          variant="destructive"
          size="icon"
          onClick={() => {
            setOpen(true);
          }}
        >
          <Trash className="h-4 w-4" />
        </Button>
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <div className="grid grid-cols-3 gap-">
            <FormField
              control={form.control}
              name="name"
              render={function (props) {
                return (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="Store name"
                        {...props.field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
          </div>
          <Button disabled={loading} className="ml-auto" type="submit">
            Save changes
          </Button>
        </form>
      </Form>

      <Separator />

      <ApiInfo
        title="test"
        description={`${origin}/api/${storeId}`}
        variant="public"
      />
    </>
  );
};

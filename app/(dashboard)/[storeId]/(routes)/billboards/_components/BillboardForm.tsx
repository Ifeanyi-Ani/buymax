"use client";
import * as z from "zod";
import axios from "axios";
import { Trash } from "lucide-react";
import React, { useState } from "react";

import { Billboard, Store } from "@prisma/client";

import { useForm } from "react-hook-form";
import { useParams, useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { OriginUrl } from "@/hooks/use-originURL";
import { ApiInfo } from "@/components/api-info";

import { Heading } from "@/components/Heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
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
import ImageUpload from "@/components/ImageUpload";

const formSchema = z.object({
  label: z.string().min(3),
  imageUrl: z.string().min(3),
});

type BillboardFormValues = z.infer<typeof formSchema>;

type Props = {
  initialData: Billboard | null;
};

export const BillboardForm: React.FC<Props> = ({ initialData }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { billboardId, storeId } = useParams();

  const origin = OriginUrl();

  const title = initialData ? "Edit billboard" : "Create billboard";
  const description = initialData ? "Edit a billboard" : "Add a new billboard";
  const formMessage = initialData ? "Billboard updated" : "Billboard created";
  const buttonText = initialData ? "Save changes" : "Create";

  const form = useForm<BillboardFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || { label: "", imageUrl: "" },
  });

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
      </div>
      <Separator />
      <Form {...form}>
        <form
          className="space-y-8 w-full"
        >
          <FormField
            control={form.control}
            name="imageUrl"
            render={function (props) {
              const { field } = props;
              console.log("field ", field);
              return (
                <FormItem>
                  <FormLabel>Billboard image</FormLabel>
                  <FormControl>
                    <ImageUpload
                      disabled={loading}
                      value={field.value ? [field.value] : []}
                      onChange={(url) => field.onChange(url)}
                      onRemove={() => field.onChange()}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

    </>
  );
};

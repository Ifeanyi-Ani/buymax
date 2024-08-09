"use client";
import * as z from "zod";
import axios from "axios";
import { Store } from "@prisma/client";
import React, { useState } from "react";
import { Heading } from "./Heading";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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

type Props = {
  initialData: Store;
  storeId: string;
};
const formSchema = z.object({
  name: z.string().min(1),
});
type SettingsFormValues = z.infer<typeof formSchema>;

export const SettingForm = ({ initialData, storeId }: Props) => {
  const [loading, setLoading] = useState(false);

  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });

  const onSubmit = async (values: SettingsFormValues) => {
    try {
      setLoading(true);
      await axios.patch(`/api/stores/${storeId}`, values);
      toast.success("Store updated sucessfully");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while updating store");
    } finally {
      setLoading(false);
    }
  };
};

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

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
      </div>
      <Separator />
    </>
  );
};

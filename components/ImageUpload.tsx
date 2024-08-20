"use client";

import { useEffect, useState } from "react";

import { ImagePlusIcon, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface ImageUploadProps {
  disabled: boolean;
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
  value: string[];
}
const ImageUpload = (props: ImageUploadProps) => {
  return (
    <div>
    </div>
  );
};

export default ImageUpload;

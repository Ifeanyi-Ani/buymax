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
  const { disabled, onChange, onRemove, value } = props;
  const [mounted, setMounted] = useState(false);

  const onUpload = (result: any) => {
    console.log("onUpload result", result);
    console.log("on upload url ", result?.info?.secure_url);
    onChange(result?.info?.secure_url);
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div>
    </div>
  );
};

export default ImageUpload;

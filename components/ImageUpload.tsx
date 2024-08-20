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
      <div className="mb-4 flex items-center gap-4">
        {value.map((url: string) => {
          return (
            <div
              key={url}
              className="relative w-[200px] h-[200px] rounded-md overflow-hidden"
            >
              <div className="z-10 absolute top-2 right-2">
                <Button
                  type="button"
                  variant="destructive"
                  onClick={() => onRemove(url)}
                  size="icon"
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>

              <Image
                fill
                className="object-cover"
                alt="billboard-image"
                src={url}
              />
            </div>
          );
        })}
      </div>

    </div>
  );
};

export default ImageUpload;

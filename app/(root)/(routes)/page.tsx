"use client";
import { useStoreModal } from "@/hooks/use-store-model";
import { useEffect } from "react";
export default function Home() {
  const { onOpen, isOpen } = useStoreModal();
  useEffect(() => {
    if (!isOpen) {
      onOpen();
    }
  }, [isOpen, onOpen]);
  return null;
}

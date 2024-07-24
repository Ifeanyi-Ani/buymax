"use client";
import { UserButton } from "@clerk/nextjs";
import { useStoreModal } from "@/hooks/use-store-model";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
export default function Home() {
  const { onOpen, isOpen } = useStoreModal();
  useEffect(() => {
    if (!isOpen) {
      onOpen();
    }
  }, [isOpen, onOpen]);
  return (
    <main className="p-4">
      home page
      <Button onClick={() => onOpen()}>open</Button>
    </main>
  );
}

"use client";
import StoreModal from "@/components/modals/store-modal";
import { useEffect, useState } from "react";

export const ModalProvider = () => {
  const [isMounted, setisMounted] = useState<boolean>(true);
  useEffect(() => {
    setisMounted(true);
  }, []);
  if (!isMounted) null;

  return <StoreModal />;
};

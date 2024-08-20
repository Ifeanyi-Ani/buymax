import { useEffect, useState } from "react";

export const OriginUrl = () => {
  const [mounted, setMounted] = useState(false);

  const origin =
    typeof window !== "undefined" && window.location.origin
      ? window.location.origin
      : "";

  useEffect(() => {
    setMounted(true);
  }, [mounted]);

  if (!mounted) return null;

  return origin;
};

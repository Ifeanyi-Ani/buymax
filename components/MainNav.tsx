"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import React from "react";

type MainNavProps = {} & React.HTMLAttributes<HTMLElement>;

export default function MainNav({ className, ...props }: MainNavProps) {
  const pathname = usePathname();
  const { storeId } = useParams();

  const routes = [
    {
      href: `/${storeId}/settings`,
      label: "Settings",
      active: pathname === `/${storeId}/settings`,
    },
  ];
  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)}>
      {routes.map((route, idx) => (
        <Link
          key={idx}
          href={route.href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            route.active
              ? "text-black dark:text-white"
              : "text-muted-foregroud",
          )}
        >
          {route.label}
        </Link>
      ))}
    </nav>
  );
}

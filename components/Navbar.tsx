import { UserButton } from "@clerk/nextjs";
import React from "react";
import MainNav from "@/components/MainNav";
import StoreSwticher from "./StoreSwitcher";
import prismaDb from "@/lib/prismaDb";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { LogIn, LogOut, User } from "lucide-react";

import Image from "next/image";

import { Button } from "@/components/ui/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import somindo from "@/public/somindo.png";

export default function Navbar() {
  const { data: session, status } = useSession();

  return (
    <nav className="bg-primary p-4 border-b-2 border-primary">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center gap-x-3">
          <Image
            src={somindo}
            alt="Somindo Logo"
            width={50}
            height={50}
          />
          <span className="text-2xl font-bold text-accent">
            SOMINDO
          </span>
        </Link>
        {status === "loading" ? (
          <div className="w-10 h-10 bg-gray-600 rounded-full animate-pulse" />
        ) : session ? (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <img
                src={session.user?.image || ""}
                alt="User avatar"
                className="h-10 w-10 rounded-full object-cover"
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-56 bg-secondary text-secondary-foreground"
              align="end"
              forceMount
            >
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {session.user?.name}
                  </p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {session.user?.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => signOut()}>
                <LogOut className="w-4 h-4 mr-2" />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button onClick={() => signIn("discord")}>
            <LogIn className="w-4 h-4 mr-2" /> Login
          </Button>
        )}
      </div>
    </nav>
  );
}
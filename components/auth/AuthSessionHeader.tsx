"use client";

import { signOutAction } from "@/app/actions";
import Link from "next/link";
import Image from "next/image";
import { Button } from "../ui/button";
import { FaCoins } from "react-icons/fa";
import { useSupabase } from "@/hooks/useSupabase";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
export default function AuthSessionHeader() {
  const { userTokens } = useSupabase();

  return (
    <div className="flex items-center justify-between w-full px-4 lg:px-40 py-2 lg:py-4 bg-white border-b">
      <div className="flex items-center gap-2">
        <Image
          src="/logo.png"
          alt="Logo"
          width={32}
          height={32}
          className="rounded-full"
        />
        <span className="font-bold tracking-tight text-lg">InterviewAI</span>
      </div>

      <div className="flex items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">My Account</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-36">
            <DropdownMenuItem className="flex items-center gap-2 bg-rose-600/20 text-rose-600">
              <FaCoins className="h-4 w-4 text-rose-600" />
              <span className="font-medium">{userTokens || 0} tokens</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href="/pricing" className="w-full">
                Pricing
              </Link>
            </DropdownMenuItem>
            <form action={signOutAction} className="w-full">
              <DropdownMenuItem asChild>
                <button type="submit" className="w-full text-left text-red-600">
                  Logout
                </button>
              </DropdownMenuItem>
            </form>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

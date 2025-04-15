"use client";

import { Button } from "@/components/ui/button";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { handleGithubLogin, handleGoogleLogin } from "@/app/actions";

export function AuthSocialButtons() {
  return (
    <div className="grid grid-cols-2 gap-4">
      <form action={handleGithubLogin}>
        <Button
          type="submit"
          variant="outline"
          className="w-full flex items-center justify-center gap-2"
        >
          <FaGithub className="h-4 w-4" />
          <span>Github</span>
        </Button>
      </form>
      <form action={handleGoogleLogin}>
        <Button
          type="submit"
          variant="outline"
          className="w-full flex items-center justify-center gap-2"
        >
          <FcGoogle className="h-4 w-4" />
          <span>Google</span>
        </Button>
      </form>
    </div>
  );
} 
import { signInAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/auth/AuthFormMessage";
import { SubmitButton } from "@/components/auth/AuthSubmitButton";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { AuthPasswordInput } from "@/components/auth/AuthPasswordInput";
import { AuthSocialButtons } from "@/components/auth/AuthSocialButtons";
import AuthHeader from "@/components/auth/AuthHeader";

export default async function Login(props: { searchParams: Promise<Message> }) {
  const searchParams = await props.searchParams;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-white">
      <div className="w-full max-w-[400px] space-y-6">
        <AuthHeader
          title="Welcome back"
          subtitle="Practice interviews with AI and get instant feedback to improve your skills"
        />

        <form className="space-y-4">
          <div className="space-y-2">
            <Input
              name="email"
              placeholder="Email or username"
              required
              className="w-full px-4 py-2 border rounded-lg"
            />
            <AuthPasswordInput />
          </div>

          <SubmitButton
            pendingText="Signing in..."
            formAction={signInAction}
            className="w-full bg-black text-white rounded-lg py-2 font-medium hover:bg-gray-800 transition-colors"
          >
            Log in
          </SubmitButton>
        </form>

        <div className="space-y-4">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                Or authorize with
              </span>
            </div>
          </div>

          <AuthSocialButtons />
        </div>

        <div className="text-center space-y-3">
          <Link
            href="/forgot-password"
            className="text-sm text-gray-600 hover:underline"
          >
            Forgot password?
          </Link>
          <div className="text-sm text-gray-600">
            Don't have an account?{" "}
            <Link href="/sign-up" className="text-black hover:underline">
              Sign up
            </Link>
          </div>
          <FormMessage message={searchParams} />
        </div>
      </div>
    </div>
  );
}

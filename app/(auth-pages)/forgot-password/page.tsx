import { resetPasswordAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/auth/AuthFormMessage";
import { SubmitButton } from "@/components/auth/AuthSubmitButton";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import AuthHeader from "@/components/auth/AuthHeader";

export default async function ForgotPassword(props: { searchParams: Promise<Message> }) {
  const searchParams = await props.searchParams;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-white">
      <div className="w-full max-w-[400px] space-y-6">
        <AuthHeader
          title="Reset your password"
          subtitle="Design better and spend less time without restricting creative freedom"
        />

        {/* Reset Password Form */}
        <form className="space-y-4">
          <div className="space-y-2">
            <Input
              name="email"
              type="email"
              placeholder="Enter your email"
              required
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>

          <SubmitButton 
            pendingText="Sending reset link..." 
            formAction={resetPasswordAction}
            className="w-full bg-black text-white rounded-lg py-2 font-medium hover:bg-gray-800 transition-colors"
          >
            Send reset link
          </SubmitButton>
        </form>

        {/* Footer Links */}
        <div className="text-center space-y-3">
          <div className="text-sm text-gray-600">
            Remember your password?{" "}
            <Link href="/sign-in" className="text-black hover:underline">
              Sign in
            </Link>
          </div>
          <FormMessage message={searchParams} />
        </div>
      </div>
    </div>
  );
}

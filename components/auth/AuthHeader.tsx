import Image from "next/image";

interface AuthHeaderProps {
  title: string;
  subtitle: string;
}

export default function AuthHeader({ title, subtitle }: AuthHeaderProps) {
  return (
    <div className="text-center space-y-3">
      <div className="flex justify-center">
        <Image
          src="/logo.png"
          alt="Logo"
          width={40}
          height={40}
          className="rounded-full"
        />
      </div>
      <h1 className="text-2xl font-semibold">{title}</h1>
      <p className="text-sm text-gray-600">{subtitle}</p>
    </div>
  );
} 
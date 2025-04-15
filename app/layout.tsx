import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "AI Interview Coach",
  description: "Master your interview skills with AI-powered question generation and feedback",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Kalam:wght@400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${inter.className} bg-white`}>
        <main className="min-h-screen">{children}</main>
      </body>
    </html>
  );
}

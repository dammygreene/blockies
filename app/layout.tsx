import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BLOCKIES | Your wallet already has a face",
  description:
    "BLOCKIES is an interactive Ethereum mint experience where each wallet mints its own deterministic blockie identity.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

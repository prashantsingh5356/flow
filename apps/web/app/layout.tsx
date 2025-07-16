import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers/provider";
import StoreProvider from "./providers/StoreProvider";

export const metadata: Metadata = {
  title: "Flow",
  description: "Task management application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <StoreProvider>{children}</StoreProvider>
        </Providers>
      </body>
    </html>
  );
}

import React from "react";
import "./globals.css";
import Providers from "./providers";

export const metadata = {
  title: "Manene",
  description: "Kiizan Kiizan's management app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

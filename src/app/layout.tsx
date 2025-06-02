import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import StoreProvider from "@/redux/StoreProvider";
import { Providers } from "./providers";
import Toast from "@/components/elements/Toast";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Ikobana Frozen Food",
  description: "Ikobana Frozen Food",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <StoreProvider>
        <body
          className={`${poppins.variable} ${poppins.className} antialiased`}
        >
          <Providers>
            {children}
            <Toast />
          </Providers>
        </body>
      </StoreProvider>
    </html>
  );
}

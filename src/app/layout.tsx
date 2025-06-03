import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ComboHub",
  description: "An app for sharing fighting game combos.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html>
      <body>
        {children}
      </body>
    </html>
  );
}
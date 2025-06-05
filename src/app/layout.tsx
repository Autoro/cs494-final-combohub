import ComboHubAppBar from "@/components/comboHubAppBar";
import { UserContextProvider } from "@/contexts/userContext";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ComboHub",
  description: "An app for sharing fighting game combos.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html>
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet" />
      </head>
      <body>
        <UserContextProvider>
          <AppRouterCacheProvider>
            <ComboHubAppBar />
            {children}
          </AppRouterCacheProvider>
        </UserContextProvider>
      </body>
    </html>
  );
}
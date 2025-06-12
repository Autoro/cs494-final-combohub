import ComboHubAppBar from "@/components/ComboHubAppBar";
import ComboHubClientProviders from "@/components/ComboHubClientProvider";
import { Box } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ComboHub",
  description: "An app for sharing fighting game combos.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html>
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet" />
      </head>
      <body>
        <AppRouterCacheProvider>
          <ComboHubClientProviders>
            <Box sx={{ p: 1 }}>
              <ComboHubAppBar />
              {children}
            </Box>
          </ComboHubClientProviders>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
"use client";

import { UserContextProvider } from "@/contexts/userContext";
import theme from "@/theme/default";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { ReactNode } from "react";

export default function ComboHubClientProviders({ children }: { children: ReactNode; }) {
  return (
    <ThemeProvider theme={theme}>
      <UserContextProvider>
        <CssBaseline />
        {children}
      </UserContextProvider>
    </ThemeProvider>
  );
}
"use client";

import { GamesContextProvider } from "../contexts/gamesContext";
import { UserContextProvider } from "../contexts/userContext";
import theme from "../theme/default";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { ReactNode } from "react";

export default function ComboHubClientProviders({ children }: { children: ReactNode; }) {
  return (
    <ThemeProvider theme={theme}>
      <UserContextProvider>
        <GamesContextProvider>
          <CssBaseline />
          {children}
        </GamesContextProvider>
      </UserContextProvider>
    </ThemeProvider>
  );
}
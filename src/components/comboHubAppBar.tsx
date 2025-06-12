"use client";

import { AppBar, Toolbar, Typography } from "@mui/material";
import Link from "next/link";
import GameMenu from "./GameMenu";
import UserMenu from "./UserMenu";

export default function ComboHubAppBar() {
  return (
      <AppBar position="static">
        <Toolbar>
          <Link href="/" style={{ marginRight: 64, textDecoration: "none" }}>
            <Typography
              variant="h6"
              noWrap
              sx={{
                fontWeight: 700,
                letterSpacing: '.2rem',
              }}
            >
              COMBOHUB
            </Typography>
          </Link>
          <GameMenu />
          <UserMenu />
        </Toolbar>
      </AppBar>
  );
}
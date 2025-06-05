"use client";

import { withUserContext } from "@/contexts/userContext";
import { AppBar, Avatar, Box, Button, Container, IconButton, Popover, Toolbar, Typography } from "@mui/material";
import Link from "next/link";
import { useState } from "react";

export default function ComboHubAppBar() {
  const { user, logIn, logOut } = withUserContext();
  const [popoverElement, setPopoverElement] = useState<HTMLButtonElement | null>(null);

  const handleUserClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!user) {
      logIn();
    } else {
      setPopoverElement(e.currentTarget);
    }
  };

  const handleLogOut = () => {
    logOut();
    setPopoverElement(null);
  }

  const handleUserClose = () => setPopoverElement(null);

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link href="/" style={{ textDecoration: "none" }}>
            <Typography
              variant="h6"
              noWrap
              sx={{
                mr: 2,
                display: 'flex',
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'white'
              }}
            >
              COMBOHUB
            </Typography>
          </Link>

          <IconButton onClick={handleUserClick} sx={{ ml: "auto", p: 0, color: "white" }}>
            {
              user
                ? <Avatar src={user.photoURL ?? ""} alt={user.displayName ?? ""} />
                : <Box component="span" className="material-symbols-outlined" sx={{ width: 40, height: 40, lineHeight: "40px" }}>person</Box>
            }
          </IconButton>

          <Popover
            open={!!popoverElement}
            anchorEl={popoverElement}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left"
            }}
            onClose={handleUserClose}
          >
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Button variant="text" onClick={handleUserClose}>
                <Link href="/profile" style={{ color: "black", textDecoration: "none" }}>Profile</Link>
              </Button>
              <Button onClick={handleLogOut} style={{ color: "black" }}>Log Out</Button>
            </Box>
          </Popover>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
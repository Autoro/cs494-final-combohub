import { Button, Menu, MenuItem, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { MouseEvent, useState } from "react";

export default function GameMenu() {
  const [menuElement, setMenuElement] = useState<HTMLButtonElement | null>(null);
  const router = useRouter();

  const handleMenuOpen = (e: MouseEvent<HTMLButtonElement>) => {
    setMenuElement(e.currentTarget);
  };

  const handleMenuClick = (href: string) => {
    router.push(href);
    setMenuElement(null);
  };

  const handleMenuClose = () => setMenuElement(null);

  return (
    <>
      <Button variant="text" sx={{ mr: 2, cursor: "pointer" }} onClick={handleMenuOpen}>
        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
            letterSpacing: '.2rem',
          }}
        >
          GAMES
        </Typography>
      </Button>
      <Menu
        open={!!menuElement}
        anchorEl={menuElement}
        onClose={handleMenuClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <MenuItem onClick={() => handleMenuClick("#")}>Game 1</MenuItem>
        <MenuItem onClick={() => handleMenuClick("#")}>Game 2</MenuItem>
        <MenuItem onClick={() => handleMenuClick("#")}>Game 3</MenuItem>
        <MenuItem onClick={() => handleMenuClick("/games")}>View All</MenuItem>
      </Menu>
    </>
  );
}
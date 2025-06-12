import { withGamesContext } from "@/contexts/gamesContext";
import { Button, Menu, MenuItem, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { MouseEvent, useState } from "react";

export default function GameMenu() {
  const [menuElement, setMenuElement] = useState<HTMLButtonElement | null>(null);
  const { games } = withGamesContext();
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
        {
          games.map((game, i) =>
            <MenuItem key={i} onClick={() => handleMenuClick(`/games/${game.id}/characters`)}>{game.name}</MenuItem>
          )
        }
        <MenuItem onClick={() => handleMenuClick("/games")}>View All</MenuItem>
      </Menu>
    </>
  );
}
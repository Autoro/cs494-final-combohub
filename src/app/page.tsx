"use client";

import GameCard from "@/components/GameCard";
import { useGamesContext } from "@/contexts/gamesContext";
import { Grid } from "@mui/material";

export default function GameList() {
  const { games } = useGamesContext();

  return (
    <Grid container spacing={2} sx={{mt: 2}}>
      {
        games.map((game, i) =>
          <GameCard game={game} key={i} />
        )
      }
    </Grid>
  );
}
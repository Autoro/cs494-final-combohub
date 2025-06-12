"use client";

import GameCard from "../components/GameCard";
import { withGamesContext } from "../contexts/gamesContext";
import { Grid } from "@mui/material";

export default function GameList() {
  const { games } = withGamesContext();

  return (
    <Grid container spacing={2} sx={{ mt: 2 }}>
      {
        games.map((game, i) =>
          <GameCard game={game} key={i} />
        )
      }
    </Grid>
  );
}
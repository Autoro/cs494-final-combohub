"use client";

import CharacterCard from "@/components/CharacterCard";
import { useGamesContext } from "@/contexts/gamesContext";
import { Character } from "@/models/character";
import { Game } from "@/models/game";
import { Box, Grid, Typography } from "@mui/material";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function CharacterList() {
  const { gameId } = useParams();
  const { findGame } = useGamesContext();
  const [characters, setCharacters] = useState<Character[]>([]);

  useEffect(() => {
    fetch(`/api/games/${gameId}/characters`)
      .then((response) => response.json())
      .then((data: { game: Game, characters: Character[]; }) => {
        const characters = data.characters.sort((a: Character, b: Character) => a.name < b.name ? -1 : 1);
        setCharacters(characters);
      });
  }, []);

  let game = null;
  if (!gameId || !(game = findGame(gameId.toString()))) {
    return (
      <Box sx={{ mt: 2 }}>
        <Typography>Loading...</Typography>
      </Box>
    );
  }

  return (
    <Grid container spacing={2} sx={{ mt: 2 }}>
      {
        game && characters.map((character: Character, i) =>
          <CharacterCard game={game} character={character} key={i} />
        )
      }
    </Grid>
  );
}
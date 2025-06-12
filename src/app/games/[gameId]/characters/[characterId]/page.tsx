"use client";

import { withGamesContext } from "@/contexts/gamesContext";
import { Character } from "@/models/character";
import { Box, Divider, Paper, Stack, Typography, } from "@mui/material";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function CharacterDetails() {
  const { gameId, characterId } = useParams();
  const { findGame } = withGamesContext();
  const [character, setCharacter] = useState<Character | null>(null);

  let game = null;
  if (!gameId || !(game = findGame(gameId.toString()))) {
    return (
      <Box sx={{ mt: 2 }}>
        <Typography>Invalid game selected.</Typography>
      </Box>
    );
  }

  useEffect(() => {
    fetch(`/api/characters/${characterId}`)
      .then((response) => response.json())
      .then((data: { character: Character; }) => setCharacter(data.character));
  }, []);

  return (
    <Box sx={{ mt: 2 }}>
      {
        character && (
          <Stack direction="row" spacing={2}>
            <Paper sx={{ p: 1 }}>
              <Typography variant="h4" sx={{ textAlign: "center" }}>{character.name}</Typography>
              <Divider sx={{ mb: 2 }} />
              <Box component="img" src={`/images/characters/${game.slug}/${character.imageFile}`} height={600} sx={{ objectFit: "contain" }} />
            </Paper>
            <Stack spacing={2} sx={{ flex: 1 }}>
              <Paper sx={{ flex: 1, p: 1, flexGrow: "revert" }}>
                <Typography variant="h5" sx={{ textAlign: "center" }}>Overview</Typography>
                <Divider sx={{ mb: 1 }} />
                <Typography>No overview.</Typography>
              </Paper>
              <Paper sx={{ flex: 1, p: 1, flexGrow: "revert" }}>
                <Typography variant="h5" sx={{ textAlign: "center" }}>Combos</Typography>
                <Divider sx={{ mb: 1 }} />
                <Typography>No combos.</Typography>
              </Paper>
            </Stack>
          </Stack>
        )
      }
    </Box>
  );
}
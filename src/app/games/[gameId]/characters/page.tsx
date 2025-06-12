"use client";

import CharacterCard from "@/components/CharacterCard";
import { Character } from "@/models/character";
import { Game } from "@/models/game";
import { Container, Grid } from "@mui/material";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const { gameId } = useParams();
  const [game, setGame] = useState<Game | null>(null);
  const [characters, setCharacters] = useState<Character[]>([]);

  useEffect(() => {
    fetch(`/api/games/${gameId}/characters`)
      .then((response) => response.json())
      .then((data: { game: Game, characters: Character[]; }) => {
        const characters = data.characters.sort((a: Character, b: Character) => a.name < b.name ? -1 : 1);
        setGame(data.game);
        setCharacters(characters);
      });
  }, []);

  return (
    <Container>
      <Grid container spacing={2} sx={{ mt: 2 }}>
        {
          game && characters.map((character: Character, i) =>
            <CharacterCard game={game} character={character} key={i} />
          )
        }
      </Grid>
    </Container>
  );
}
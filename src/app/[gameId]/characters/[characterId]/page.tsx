"use client";

import ComboRow from "@/components/ComboRow";
import { withGamesContext } from "@/contexts/gamesContext";
import { withUserContext } from "@/contexts/userContext";
import { Character } from "@/models/character";
import { Combo } from "@/models/combo";
import { Box, Button, Divider, Grid, Paper, Stack, TextField, Tooltip, Typography } from "@mui/material";
import { useParams } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";

export default function CharacterDetails() {
  const { gameId, characterId } = useParams();
  const { user } = withUserContext();
  const { findGame } = withGamesContext();
  const [character, setCharacter] = useState<Character | null>(null);
  const [combos, setCombos] = useState<Combo[]>([]);
  const [editing, setEditing] = useState<boolean>(false);

  const [notation, setNotation] = useState<string>("");
  const [damage, setDamage] = useState<string>("");
  const [position, setPosition] = useState<string>("");
  const [notes, setNotes] = useState<string>("");


  useEffect(() => {
    fetch(`/api/characters/${characterId}`)
      .then((response) => response.json())
      .then((data) => setCharacter(data.character));
  }, []);

  useEffect(() => {
    fetch(`/api/characters/${characterId}/combos`)
      .then((response) => response.json())
      .then((data) => setCombos(data.combos));
  }, []);

  let game = null;
  if (!gameId || !(game = findGame(gameId.toString()))) {
    return (
      <Box sx={{ mt: 2 }}>
        <Typography>Loading...</Typography>
      </Box>
    );
  }

  const handleComboChange = (e: ChangeEvent<HTMLInputElement>) => setNotation(e.target.value);
  const handleDamageChange = (e: ChangeEvent<HTMLInputElement>) => setDamage(e.target.value);
  const handlePositionChange = (e: ChangeEvent<HTMLInputElement>) => setPosition(e.target.value);
  const handleNotesChange = (e: ChangeEvent<HTMLInputElement>) => setNotes(e.target.value);

  const handleAddClick = () => setEditing(true);
  const handleCancelClick = () => {
    setNotation("");
    setDamage("");
    setPosition("");
    setNotes("");
    setEditing(false);
  };
  const handleSaveClick = () => {
    if (user) {
      const combo = {
        characterId,
        creatorId: user.uid,
        notation,
        damage,
        position,
        notes
      };

      fetch(`/api/characters/${characterId}/combos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(combo)
      })
        .then((response) => response.json())
        .then((data) => setCombos([...combos, data.combo]));
    }

    setNotation("");
    setDamage("");
    setPosition("");
    setNotes("");
    setEditing(false);
  };

  const handleComboDelete = (combo: Combo) => {
    fetch(`/api/characters/${characterId}/combos/${combo.id}`);

    const filteredCombos = combos.filter((c) => c.id != combo.id);
    setCombos([...filteredCombos]);
  };

  return (
    <Box sx={{ mt: 2 }}>
      {
        character &&
        <Stack direction="row" spacing={2}>
          <Paper sx={{ p: 1 }}>
            <Typography variant="h4" sx={{ textAlign: "center" }}>{character.name}</Typography>
            <Divider sx={{ mb: 2 }} />
            <Box component="img" src={`/images/characters/${game.slug}/${character.imageFile}`} height={600} sx={{ objectFit: "contain" }} />
          </Paper>
          <Stack spacing={2} sx={{ flex: 1 }}>
            <Paper sx={{ flex: 1, p: 1, flexGrow: "revert" }}>
              <Typography variant="h5" sx={{ alignContent: "center" }}>Overview</Typography>
              <Divider sx={{ mb: 1 }} />
              {
                character.overview
                  ? <Typography variant="body1">{character.overview}</Typography>
                  : <Typography variant="body1" sx={{fontStyle: "italic"}}>None</Typography>
              }
            </Paper>
            <Paper sx={{ flex: 1, p: 1, flexGrow: "revert" }}>
              <Stack direction="row">
                <Typography variant="h5" sx={{ alignContent: "center" }}>Combos</Typography>
              </Stack>
              <Divider sx={{ mb: 1 }} />

              <Grid container spacing={2}>
                {
                  (combos.length > 0 || editing) &&
                  <>
                    <Grid size={4}>
                      <Typography>Combo</Typography>
                    </Grid>
                    <Grid size={1}>
                      <Typography>Damage</Typography>
                    </Grid>
                    <Grid size={2}>
                      <Typography>Position</Typography>
                    </Grid>
                    <Grid size={4}>
                      <Typography>Notes</Typography>
                    </Grid>
                  </>
                }
                {
                  combos.length > 0 &&
                  combos.map((combo, i) =>
                    <ComboRow combo={combo} onDelete={handleComboDelete} key={i} />
                  )
                }
                {
                  combos.length == 0 && !editing &&
                  <Typography variant="body1" sx={{fontStyle: "italic"}}>None</Typography>
                }
                {
                  editing &&
                  <>
                    <Grid size={4}>
                      <TextField value={notation} onChange={handleComboChange} placeholder="[CH] 236[A] > 5B > 5C > 2C > 5D > 5B > 5C > 22B > 2C > 236[A]~D > 6B > 5C..." fullWidth></TextField>
                    </Grid>
                    <Grid size={1}>
                      <TextField value={damage} onChange={handleDamageChange} placeholder="1234" fullWidth></TextField>
                    </Grid>
                    <Grid size={2}>
                      <TextField value={position} onChange={handlePositionChange} placeholder="Midscreen, Corner, etc." fullWidth></TextField>
                    </Grid>
                    <Grid size={4}>
                      <TextField value={notes} onChange={handleNotesChange} placeholder="Anything else (optional)" fullWidth></TextField>
                    </Grid>
                  </>
                }
              </Grid>

              <Box mt={2} textAlign="center">
                {
                  !editing
                    ? <Tooltip title="Add a combo">
                      <Button variant="contained" onClick={handleAddClick} disabled={!user}>
                        <Box className="material-symbols-outlined">add</Box>
                      </Button>
                    </Tooltip>
                    : <>
                      <Button variant="contained" onClick={handleSaveClick} sx={{ mr: 1 }}>Save</Button>
                      <Button variant="contained" onClick={handleCancelClick}>Cancel</Button>
                    </>
                }
              </Box>
            </Paper>
          </Stack>
        </Stack>
      }
    </Box >
  );
}
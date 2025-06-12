import { withUserContext } from "../contexts/userContext";
import { Combo } from "../models/combo";
import { Box, Grid, IconButton, Typography } from "@mui/material";

export default function ComboRow(props: { combo: Combo; onDelete: (combo: Combo) => void; }) {
  const { user } = withUserContext();

  return (
    <>
      <Grid size={4}>
        <Typography>{props.combo.notation}</Typography>
      </Grid>
      <Grid size={1}>
        <Typography>{props.combo.damage}</Typography>
      </Grid>
      <Grid size={2}>
        <Typography>{props.combo.position}</Typography>
      </Grid>
      <Grid size={4}>
        <Typography>{props.combo.notes}</Typography>
      </Grid>
      {
        user?.uid == props.combo.creatorId &&
        <Grid size={1}>
          <IconButton onClick={() => props.onDelete(props.combo)}>
            <Box className="material-symbols-outlined" sx={{ color: "darkred" }}>delete</Box>
          </IconButton>
        </Grid>
      }

    </>
  );
}
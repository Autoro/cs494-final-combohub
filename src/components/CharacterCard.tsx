import { Character } from "@/models/character";
import { Game } from "@/models/game";
import { Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

export default function CharacterCard(props: { game: Game, character: Character; }) {
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/${props.character.gameId}/characters/${props.character.id}`);
  };

  return (
    <Card sx={{ display: "flex", width: 300, height: 300 }}>
      <CardActionArea onClick={handleCardClick}>
        <CardContent sx={{ height: "75%", alignContent: "center" }}>
          <CardMedia component="img" src={`/images/characters/${props.game.slug}/${props.character.imageFile}`} height="100%" sx={{objectFit: "contain"}} />
        </CardContent>
        <CardContent>
          <Typography variant="body1" sx={{ textAlign: "center" }}>{props.character.name}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
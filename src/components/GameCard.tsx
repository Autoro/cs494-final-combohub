import { Game } from "../models/game";
import { Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

export default function GameCard(props: { game: Game; }) {
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/${props.game.id}/characters`);
  };

  return (
    <Card sx={{ display: "flex", width: 300, height: 300 }}>
      <CardActionArea onClick={handleCardClick}>
        <CardContent sx={{ height: "75%", alignContent: "center" }}>
          <CardMedia component="img" src={`/images/logos/${props.game.slug}.png`} height="100%" sx={{ objectFit: "contain" }} />
        </CardContent>
        <CardContent>
          <Typography variant="body1" sx={{ textAlign: "center" }}>{props.game.name}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
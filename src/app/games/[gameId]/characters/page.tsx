import { Box, Typography } from "@mui/material";
import Link from "next/link";

export default async function Home({ params }: { params: { gameId: string; }; }) {
  const { gameId } = await params;

  return (
    <>
      <Box>Coming soon...</Box>
      <Link href={`/games/${gameId}/characters`} style={{ marginRight: 64, textDecoration: "none" }}>
        <Typography>
          View All Character
        </Typography>
      </Link>
    </>
  );
}
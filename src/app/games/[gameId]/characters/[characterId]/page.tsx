import { Box } from "@mui/material";

export default async function Home({ params }: { params: { gameId: string, characterId: string; }; }) {
  const { gameId, characterId } = await params;
  
  return (
    <Box>Coming soon...</Box>
  );
}
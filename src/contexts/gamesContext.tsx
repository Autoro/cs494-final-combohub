import { Game } from "@/models/game";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

interface GamesContextType {
  games: Game[];
  findGame: (gameId: string) => Game | undefined;
}

const GamesContext = createContext<GamesContextType | undefined>(undefined);

export const withGamesContext = () => {
  const context = useContext(GamesContext);

  if (!context) {
    throw Error("withGamesContext context must be called from within a GamesContextProvider");
  }

  return context;
};

export const GamesContextProvider = ({ children }: { children: ReactNode; }) => {
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    fetch("/api/games")
      .then((response) => response.json())
      .then((data: { games: Game[]; }) => {
        const games = data.games.sort((a: Game, b: Game) => a.name < b.name ? -1 : 1);
        setGames(games);
      });
  }, []);

  const findGame = (gameId: string) => {
    return games.find((game) => game.id == gameId);
  };

  return (
    <GamesContext.Provider value={{ games, findGame }}>
      {children}
    </GamesContext.Provider>
  );
};
import { Game } from "@/models/game";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

interface GamesContextType {
  games: Game[];
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

  return (
    <GamesContext.Provider value={{ games }}>
      {children}
    </GamesContext.Provider>
  );
};
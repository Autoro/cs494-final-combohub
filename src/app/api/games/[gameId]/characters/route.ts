import { db } from "@/services/firebase";
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { NextRequest } from "next/server";

export async function GET(_: NextRequest, { params }: { params: Promise<{ gameId: string; }>; }) {
  const { gameId } = await params;

  if (gameId) {
    const gameSnap = await getDoc(doc(db, "games", gameId));

    if (gameSnap.exists()) {
      const game = {
        id: gameSnap.id,
        ...gameSnap.data()
      };

      const q = await query(collection(db, "characters"), where("gameId", "==", gameId));
      const charactersSnap = await getDocs(q);
      const characters = charactersSnap.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data()
        };
      });

      return Response.json({ game, characters });
    }
  }

  return new Response("", { status: 404 });
}
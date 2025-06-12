import { db } from "@/services/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { NextRequest } from "next/server";

export async function GET(_: NextRequest, { params }: { params: Promise<{ gameId: string; }>; }) {
  const { gameId } = await params;

  if (gameId) {
    const charactersSnap = await getDocs(
      query(
        collection(db, "characters"),
        where("gameId", "==", gameId)
      )
    );
    
    const characters = charactersSnap.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data()
      };
    });

    return Response.json({ characters });
  }

  return new Response("", { status: 400 });
}
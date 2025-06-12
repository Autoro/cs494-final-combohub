import { db } from "../../../../services/firebase";
import { doc, getDoc } from "firebase/firestore";
import { NextRequest } from "next/server";

export async function GET(_: NextRequest, { params }: { params: Promise<{ characterId: string; }>; }) {
  const { characterId } = await params;

  if (characterId) {
    const characterDoc = await getDoc(doc(db, "characters", characterId));

    if (characterDoc.exists()) {
      const character = {
        id: characterDoc.id,
        ...characterDoc.data()
      };

      return Response.json({ character });
    }
  }

  return new Response("", { status: 400 });
}
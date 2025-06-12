import { db } from "../../../../../services/firebase";
import { addDoc, collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { NextRequest } from "next/server";

export async function GET(_: NextRequest, { params }: { params: Promise<{ characterId: string; }>; }) {
  const { characterId } = await params;

  if (characterId) {
    const combosSnap = await getDocs(
      query(
        collection(db, "combos"),
        where("characterId", "==", characterId)
      )
    );

    const combos = combosSnap.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data()
      };
    });

    return Response.json({ combos });
  }
}

export async function POST(request: NextRequest, { params }: { params: Promise<{ characterId: string; }>; }) {
  const { characterId } = await params;

  if (characterId) {
    const characterDoc = await getDoc(doc(db, "characters", characterId));

    if (characterDoc.exists()) {
      const combo = await request.json();
      const comboRef = await addDoc(collection(db, "combos"), combo);

      return Response.json({
        combo: {
          id: comboRef.id,
          ...combo
        }
      });
    }
  }

  return new Response("", { status: 400 });
}
import { db } from "@/services/firebase";
import { collection, getDocs } from "firebase/firestore";
export async function GET() {
  const snapshot = await getDocs(collection(db, "games"));
  const games = snapshot.docs.map((doc) => {
    return {
      id: doc.id,
      ...doc.data()
    };
  });

  return Response.json({ games });
}
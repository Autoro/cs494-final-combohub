import { db } from "../../../../../../services/firebase";
import { deleteDoc, doc } from "firebase/firestore";
import { NextRequest } from "next/server";

export async function GET(_: NextRequest, { params }: { params: Promise<{ comboId: string; }>; }) {
  const { comboId } = await params;

  if (comboId) {
    await deleteDoc(doc(db, "combos", comboId));

    return new Response("", { status: 200 });
  }

  return new Response("", { status: 400 });
}
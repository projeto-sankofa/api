import { env } from "@/config";
import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

const decodedKey = Buffer.from(env.FIREBASE_PRIVATE_KEY, "base64").toString(
  "utf-8"
);

const firebaseCert = cert({
  projectId: env.FIREBASE_PROJECT_ID,
  clientEmail: env.FIREBASE_CLIENT_EMAIL,
  privateKey: decodedKey,
});

if (getApps().length === 0) {
  initializeApp({
    credential: firebaseCert,
  });
}

export const db = getFirestore()

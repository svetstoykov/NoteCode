// src/services/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth, signInAnonymously } from "firebase/auth";
import { getDatabase, ref, set, get } from "firebase/database";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);

// Ensure authentication before database operations
const ensureAuth = async () => {
  if (!auth.currentUser) {
    await signInAnonymously(auth);
  }
};

export const saveData = async <T>(id: string, data: T): Promise<void> => {
  try {
    await ensureAuth();
    const dbRef = ref(database, `notecode/${id}`);
    await set(dbRef, data);
    toast.success("Link Generated!");
  } catch {
    toast.error("Failed to save code snippet!");
  }
};

export const getData = async <T>(id: string): Promise<T | null> => {
  try {
    await ensureAuth();
    const dbRef = ref(database, `notecode/${id}`);
    const snapshot = await get(dbRef);
    return snapshot.exists() ? (snapshot.val() as T) : null;
  } catch {
    toast.error("Could not retrieve code snippet!");
    return null;
  }
};

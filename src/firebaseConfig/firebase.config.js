import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const { VITE_API_KEY_FIREBASE } = import.meta.env;
//duchaunee
export const firebaseConfig = {
  apiKey: VITE_API_KEY_FIREBASE,
  authDomain: "shoes-shopping-web.firebaseapp.com",
  projectId: "shoes-shopping-web",
  storageBucket: "shoes-shopping-web.appspot.com",
  messagingSenderId: "979140287595",
  appId: "1:979140287595:web:fb49fba850abadd3f9252e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;

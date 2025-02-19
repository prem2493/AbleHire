import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyCz28Vs0d-cnYlsg-hoeGT0GoUofMWhG_o",
  authDomain: "ablehire-b3701.firebaseapp.com",
  projectId: "ablehire-b3701",
  storageBucket: "ablehire-b3701.firebasestorage.app",
  messagingSenderId: "491729541229",
  appId: "1:491729541229:web:8c1b0da0b1e35d7556c764"
};
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app)
export default app
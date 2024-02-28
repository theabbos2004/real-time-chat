import { getApps , initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDAJ32-XHEdjQCjw2TlBlwgsCIqrLHmMUo",
  authDomain: "chat-85f9d.firebaseapp.com",
  projectId: "chat-85f9d",
  storageBucket: "chat-85f9d.appspot.com",
  messagingSenderId: "389669596765",
  appId: "1:389669596765:web:040eccbf1c8e7c727ce7b4",
  measurementId: "G-9Q08GBB4CY"
};

export const app = !getApps().length ? initializeApp(firebaseConfig) : getApps();
export const auth =getAuth()
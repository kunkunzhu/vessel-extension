/** @format */

import firebase_app from "../firebaseConfig";
import {
  signInWithEmailAndPassword,
  getAuth,
  signOut,
} from "firebase/auth/web-extension";
import { AuthResI } from "../lib/types";

const auth = getAuth(firebase_app);

export const logIn = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<AuthResI> => {
  console.log("logging in...");
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log("logged in successfully!");
      return { success: true, user: userCredential.user };
    })
    .catch((error) => {
      console.log("logging in unsuccessful?!");
      return { success: false, error: error.message };
    });
  return { success: false };
};

export const logOut = async () => {
  signOut(auth)
    .then(() => {
      return { success: true };
    })
    .catch((error) => {
      return { success: false, error };
    });
};
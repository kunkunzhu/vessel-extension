/** @format */

import db from "../firebase/storage";
import { collection, setDoc, doc } from "firebase/firestore";
import { WordI } from "../lib/types";

export const addWordForUser = async (userId: string, wordData: WordI) => {
  try {
    const wordsCollection = collection(db, "users", userId, "words");
    const wordDoc = doc(wordsCollection, wordData.word.toLocaleLowerCase());

    await setDoc(wordDoc, {
      ...wordData,
      timestamp: new Date().toISOString(),
    });
    console.log("successfully added word: ", wordData.word);
  } catch (error) {
    console.log("error adding word: ", error);
  }
};

/** @format */

import db from "../firebase/storage";
import { collection, setDoc, doc, getDoc } from "firebase/firestore";
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

export const checkIfWordExists = async (userId: string, word: string) => {
  try {
    const wordDocRef = doc(db, "users", userId, "words", word);

    const wordDocSnap = await getDoc(wordDocRef);

    if (wordDocSnap.exists()) {
      console.log(
        `looks like the word ${word} has already been added to collection!`
      );
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log("error checking for word existence: ", error);
  }
};

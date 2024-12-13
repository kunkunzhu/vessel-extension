/** @format */

import { WordI } from "../lib/types";

export const fetchWord = async ({ word }: { word: string }) => {
  console.log("Fetching word!");

  const res = await fetch(
    `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
  );
  if (!res.ok) {
    const error =
      "Oops! Looks like this word does not exist in our dictionary ᴖ̈";
    console.log(error);
    return { success: false, error: error };
  }
  const data = await res.json();

  if (!data[0]) {
    const error = "Word not found";
    console.log(error);
    return { success: false, error: error };
  }

  let phonetic = undefined;
  if (data[0].phonetics[0]) {
    phonetic = data[0].phonetics[0].audio;
  }

  const meanings = data[0].meanings.map((meaning: any) => ({
    type: meaning.partOfSpeech,
    meanings: meaning.definitions.map((def: any) => def.definition),
  }));

  const dictWord: WordI = {
    word: word,
    phonetic: phonetic,
    definitions: meanings,
  };

  return {
    success: true,
    word: dictWord,
  };
};

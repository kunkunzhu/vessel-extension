/** @format */

import { WordI } from "./types";

interface handleTabQueryProps {
  queryFunc: ({ activeTab }: { activeTab: chrome.tabs.Tab }) => void;
  setError?: (error: string) => void;
}

export const handleTabQuery = ({
  queryFunc,
  setError,
}: handleTabQueryProps) => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    console.log("active tab!");

    const activeTab = tabs[0];
    const tabUrl = activeTab?.url;

    if (!tabUrl && setError) {
      setError("No page found ᴖ̈");
    }

    if (activeTab.id) {
      // inject content.js if it's not already loaded
      chrome.scripting.executeScript(
        {
          target: { tabId: activeTab.id },
          files: ["content.js"],
        },
        () => {
          console.log("content script injected!");
          queryFunc({ activeTab });
        }
      );
    }
  });
};

export const fetchWord = async ({ word }: { word: string }) => {
  console.log("Fetching word!");
  const res = await fetch(
    `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
  );
  if (!res.ok) {
    const error = "Word not found";
    console.log(error);
    return { success: false, error: error };
  }
  const data = await res.json();

  if (!data[0]) {
    const error = "Word not found";
    console.log(error);
    return { success: false, error: error };
  }

  const phonetic = data[0].phonetics[0].audio;
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

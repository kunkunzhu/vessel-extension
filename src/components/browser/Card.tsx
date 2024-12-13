/** @format */
import { useEffect, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { AiFillSound } from "react-icons/ai";
import { DefinitionsI, WordI } from "../../lib/types";
import { User } from "firebase/auth";
import { addWordForUser, checkIfWordExists } from "../../services/storage";
import { IoMdCheckmark } from "react-icons/io";
import { fetchWord } from "../../services/dict";

interface CardI {
  word: string;
  user: User;
}

function Circle() {
  return (
    <div className="size-2 rounded-full bg-secondary drop-shadow-bullet"></div>
  );
}

function Bullet({ text, italic }: { text: string; italic?: boolean }) {
  return (
    <div className={`flex gap-2 text-sm ${italic && "italic"}`}>
      <span className="flex items-start pt-2">
        <Circle />
      </span>
      {text}
    </div>
  );
}

function CardContent({ dictWord, user }: { dictWord: WordI; user: User }) {
  const [added, setAdded] = useState<boolean>(false);

  let { word, phonetic, definitions } = dictWord;

  // brevity is the soul of wit
  if (definitions.length > 3) {
    definitions = definitions.slice(0, 3);
  }

  useEffect(() => {
    const checkWordExistence = async () => {
      const exists = await checkIfWordExists(user.uid, dictWord.word);
      if (exists && !added) {
        setAdded(true);
      }
    };

    checkWordExistence();
  }, [dictWord]);

  const renderDefinition = ({
    def,
    last = false,
  }: {
    def: DefinitionsI;
    last?: boolean;
  }) => {
    console.log("fetching definition...", def);

    let meanings = def.meanings;
    // brevity is the soul of wit
    if (meanings.length > 3) {
      meanings = meanings.slice(0, 3);
    }

    return (
      <div
        className={`flex flex-col gap-1 ${
          !last && "pb-2 border-b border-secondary"
        }`}
      >
        <div className="text-accent italic text-xs">{def.type}</div>
        {meanings.map((meaning) => (
          <Bullet text={meaning} />
        ))}
      </div>
    );
  };

  const playSound = ({ phonetic }: { phonetic: string }) => {
    const audio = new Audio(phonetic);
    audio.play().catch((error) => {
      console.error("Failed to play the sound:", error);
    });
  };

  const addWord = async ({ dictWord }: { dictWord: WordI }) => {
    const userId = user.uid;
    await addWordForUser(userId, dictWord);
    setAdded(true);
  };

  return (
    <>
      <div className="flex justify-between items-center text-3xl font-title italic pb-2 border-b border-secondary">
        <div className="flex gap-4 items-center">
          <div className="capitalize">{word}</div>
          {phonetic && (
            <AiFillSound
              onClick={() => playSound({ phonetic })}
              className="text-secondary opacity-50 cursor-crosshair text-sm hover:opacity-100 transition-all"
            />
          )}
        </div>
        <div className="rounded-full bg-secondary cursor-crosshair hover:drop-shadow-bullet text-background items-center flex p-1 size-7 transition-all hover:size-8">
          {added ? (
            <IoMdCheckmark />
          ) : (
            <IoMdAdd onClick={() => addWord({ dictWord })} />
          )}
        </div>
      </div>

      {definitions.map((def: DefinitionsI, index: number) => {
        const last = index == definitions.length - 1;
        return renderDefinition({ def, last });
      })}
    </>
  );
}

export function Card({ word, user }: CardI) {
  const [dictWord, setDictWord] = useState<WordI | null>(null);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const getWord = async () => {
      const res = await fetchWord({ word });
      if (res.success && res.word) {
        setDictWord(res.word);
      } else if (res.error) {
        setError(res.error);
      }
    };

    getWord();
  }, [word]);

  return (
    <div className="flex flex-col gap-4 px-8 py-6 rounded-lg border-accent border w-96 h-auto bg-white">
      {error && (
        <div className="flex flex-col gap-2">
          <span className="text-lg">{error}</span>
          <span className="opacity-50">
            Please try selecting any other word on the page haha ᵕ̈
          </span>
        </div>
      )}
      {dictWord && <CardContent dictWord={dictWord} user={user} />}
    </div>
  );
}

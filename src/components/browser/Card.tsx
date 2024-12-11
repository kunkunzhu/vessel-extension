/** @format */
import { useEffect, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { fetchWord } from "../../lib/utils";
import { DefinitionsI, WordI } from "../../lib/types";

interface CardI {
  word: string;
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

function CardContent({ dictWord }: { dictWord: WordI }) {
  console.log("this is the word:", dictWord);

  const { word, definitions } = dictWord;

  console.log("about the word:", word, definitions);

  const renderDefinition = ({
    def,

    last = false,
  }: {
    def: DefinitionsI;

    last?: boolean;
  }) => {
    console.log("rendering definition...", def);
    return (
      <div
        className={`flex flex-col gap-1 ${
          !last && "pb-2 border-b border-secondary"
        }`}
      >
        <div className="text-accent italic text-xs">{def.type}</div>
        {def.meanings.map((meaning) => (
          <Bullet text={meaning} />
        ))}
      </div>
    );
  };

  return (
    <>
      <div className="flex justify-between items-center text-3xl font-title italic pb-2 border-b border-secondary">
        <div className="capitalize">{word}</div>
        <div className="rounded-full bg-secondary cursor-crosshair hover:drop-shadow-bullet text-background items-center flex p-1 size-7 transition-all hover:size-8">
          <IoMdAdd />
        </div>
      </div>

      {definitions.map((def: DefinitionsI, index: number) => {
        const last = index == definitions.length - 1;
        return renderDefinition({ def, last });
      })}
    </>
  );
}

export function Card({ word }: CardI) {
  const [dictWord, setDictWord] = useState<WordI | null>(null);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const getWord = async () => {
      const res = await fetchWord({ word });

      if (res.success && res.word) {
        setDictWord(res.word);
      } else {
        setError(error);
      }
    };

    getWord();
  }, [word]);

  return (
    <div className="flex flex-col gap-4 px-8 py-6 rounded-lg border-accent border w-96 h-auto bg-white">
      {error && <div>{error}</div>}
      {dictWord && <CardContent dictWord={dictWord} />}
    </div>
  );
}

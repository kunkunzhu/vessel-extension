/** @format */
import { IoMdAdd } from "react-icons/io";

interface CardI {
  word: string;
}

function Circle() {
  return (
    <div className="size-3 rounded-full bg-secondary drop-shadow-bullet"></div>
  );
}

function Bullet({ text, italic }: { text: string; italic?: boolean }) {
  return (
    <div className={`flex gap-2 text-sm ${italic && "italic"}`}>
      <span className="flex items-center">
        <Circle />
      </span>
      {text}
    </div>
  );
}

export function Card({ word }: CardI) {
  return (
    <div className="flex flex-col gap-4 px-8 py-6 rounded-lg border-accent border w-96 h-auto bg-white">
      <div className="flex justify-between items-center text-3xl font-title italic pb-2 border-b border-secondary">
        <div className="capitalize">{word}</div>
        <div className="rounded-full bg-secondary cursor-crosshair hover:drop-shadow-bullet text-background items-center flex p-1 size-7 transition-all hover:size-8">
          <IoMdAdd />
        </div>
      </div>
      <div className="flex flex-col gap-1 pb-2 border-b border-secondary">
        <Bullet text="柔韧性, 灵活性" />
        <Bullet text="The quality of being flexible, adaptable, or easily bent without breaking." />
      </div>
      <div className="flex flex-col gap-1">
        <Bullet text="Here, it means that the relationship's value lies in its flexibility, reflecting the strength and grace of softness." />
        <Bullet
          text="'这段关系的珍贵之处在于它的柔软性，因为柔软中蕴含着伟大。'"
          italic={true}
        />
      </div>
    </div>
  );
}

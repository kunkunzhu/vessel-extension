/** @format */

function Word({ word }: { word: string }) {
  return (
    <div className="bg-secondary cursor-crosshair hover:bg-accent hover:text-background transition-all rounded-lg px-4 py-1 text-lg font-title">
      {word}
    </div>
  );
}

export function Collection({ words }: { words: string[] }) {
  return (
    <div className="flex gap-4">
      {words.map((word) => (
        <Word word={word} />
      ))}
    </div>
  );
}

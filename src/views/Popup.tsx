/** @format */

import { LinkButton } from "../components/Buttons";

export default function Popup({ message }: { message: string }) {
  return (
    <div className="flex flex-col gap-4 px-6 py-4 text-primary rounded-lg border-accent border w-96 h-auto bg-white">
      <div className="flex flex-col gap-1 pb-2 border-secondary border-b">
        <div className="font-title text-3xl italic">Welcome to Vessel.</div>
        <div className="text-md">Expand your vocabulary as you browse. </div>
      </div>
      <div>{message}</div>
      <div className="flex w-full justify-between pr-10">
        <LinkButton text="Collection" to="/home" />
        <LinkButton text="Settings" to="/home" />
      </div>
    </div>
  );
}

/** @format */

import { LinkButton } from "../components/Buttons";

// user management, configure settings such as language selection etc.

export default function Setting() {
  return (
    <div className="flex flex-col gap-4 px-6 py-4 text-primary rounded-lg border-accent border w-96 h-auto bg-white">
      <div className="flex flex-col gap-1 pb-2 border-secondary border-b">
        <div className="font-title text-3xl italic">Settings:</div>
        <div className="text-md">Expand your vocabulary as you browse. </div>
      </div>
      <div className="flex w-full pr-10 justify-end">
        <LinkButton text="Home" to="/" />
      </div>
    </div>
  );
}

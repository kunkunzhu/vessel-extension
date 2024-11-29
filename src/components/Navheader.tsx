/** @format */

import { IoIosSettings } from "react-icons/io";

export function Navheader() {
  return (
    <div className="flex justify-between px-12 pt-8 pb-4 items-center bg-background bg-opacity-25">
      <div className="font-title text-4xl lowercase">Vessel</div>
      <IoIosSettings className="text-2xl text-accent" />
    </div>
  );
}

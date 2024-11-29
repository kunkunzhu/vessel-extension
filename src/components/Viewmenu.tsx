/** @format */

import lexicoIcon from "../assets/lexicographically.svg";
import chronoIcon from "../assets/chronologically.svg";
import { useState } from "react";

export function Viewmenu() {
  const [view, setView] = useState<"lexico" | "chrono">("lexico");

  return (
    <div className="flex gap-2 rounded-lg">
      <div
        className={`p-1 cursor-crosshair rounded-lg ${
          view == "lexico" && " border border-accent bg-white"
        }`}
        onClick={() => setView("lexico")}
      >
        <img src={lexicoIcon} className="size-8" />
      </div>
      <div
        className={`p-1 cursor-crosshair rounded-lg ${
          view == "chrono" && "border border-accent bg-white"
        }`}
        onClick={() => setView("chrono")}
      >
        <img src={chronoIcon} className="size-8" />
      </div>
    </div>
  );
}

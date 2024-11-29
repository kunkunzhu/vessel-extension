/** @format */

import { FaArrowRight } from "react-icons/fa6";
import { Link } from "react-router-dom";

export function LinkButton({ to, text }: { to: string; text: string }) {
  return (
    <Link to={to}>
      <div className="bg-secondary flex gap-2 items-center rounded-full py-2 px-4 min-w-[100px] hover:scale-105 hover:drop-shadow-bullet transition-all cursor-crosshair">
        <span className="capitalize">{text}</span>
        <FaArrowRight className="text-background" />
      </div>
    </Link>
  );
}

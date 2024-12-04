/** @format */

import { FaArrowRight } from "react-icons/fa6";
import { Link } from "react-router-dom";

interface ButtonBaseI {
  text: string;
  link?: boolean;
}

interface ButtonI extends ButtonBaseI {
  onClick: () => void;
}

interface LinkButtonI extends ButtonBaseI {
  to: string;
}

export function ButtonBase({ text, link = false }: ButtonBaseI) {
  return (
    <div className="bg-secondary flex gap-2 items-center rounded-full py-2 px-4 min-w-[100px] hover:scale-105 hover:drop-shadow-bullet transition-all cursor-crosshair">
      <span className="capitalize">{text}</span>
      {link && <FaArrowRight className="text-background" />}
    </div>
  );
}

export function Button({ text, onClick }: ButtonI) {
  return (
    <div onClick={onClick}>
      <ButtonBase text={text} />
    </div>
  );
}

export function LinkButton({ to, text }: LinkButtonI) {
  return (
    <Link to={to}>
      <ButtonBase text={text} link={true} />
    </Link>
  );
}

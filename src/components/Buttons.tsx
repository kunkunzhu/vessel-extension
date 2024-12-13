/** @format */

import { FaArrowRight } from "react-icons/fa6";
import { Link } from "react-router-dom";

interface ButtonBaseI {
  text: string;
  link?: boolean;
  type?: "primary" | "secondary";
}

interface ButtonI extends ButtonBaseI {
  onClick: () => void;
}

interface LinkButtonI extends ButtonBaseI {
  to: string;
}

export function ButtonBase({
  text,
  link = false,
  type = "primary",
}: ButtonBaseI) {
  return (
    <div
      className={`${
        type === "primary" ? "bg-secondary" : "bg-white border border-secondary"
      } justify-center flex gap-2 items-center rounded-full py-2 px-4 min-w-[100px] hover:scale-105 hover:drop-shadow-bullet transition-all cursor-crosshair`}
    >
      <span className="capitalize">{text}</span>
      {link && <FaArrowRight className="text-background" />}
    </div>
  );
}

export function Button({
  text,
  onClick,
  type = "primary",
  link = false,
}: ButtonI) {
  return (
    <div onClick={onClick}>
      <ButtonBase text={text} type={type} link={link} />
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

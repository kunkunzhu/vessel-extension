/** @format */

import { ChangeEvent, ReactNode } from "react";

interface InputI {
  icon?: ReactNode;
  placeholder: string;
  setInput: (e: ChangeEvent<HTMLInputElement>) => void;
  classname?: string;
  type?: string
}

export function Input({ icon, placeholder, setInput, classname = "", type = "text" }: InputI) {
  return (
    <div
      className={`flex items-center gap-2 border border-secondary  bg-white rounded-lg p-2 pl-4 ${classname}`}
    >
      {icon && icon}
      <input
        type={type}
        className="italic font-title outline-none text-accent w-full"
        placeholder={placeholder}
        onChange={setInput}
      />
    </div>
  );
}

/** @format */

import { useState } from "react";
import { IoIosSearch } from "react-icons/io";

export function Search() {
  const [query, setQuery] = useState<string>("Search...");

  return (
    <div className="flex items-center gap-2 border border-secondary text-secondary bg-white rounded-lg w-[800px] p-2 pl-4 h-[40px]">
      <IoIosSearch className="4xl" />
      <div className="italic font-title" onClick={() => setQuery("test")}>
        {query}
      </div>
    </div>
  );
}

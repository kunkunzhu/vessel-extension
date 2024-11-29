/** @format */

import { Card } from "../components/browser/Card";
import { Collection } from "../components/Collection";
import { Navheader } from "../components/Navheader";
import { Search } from "../components/Search";
import { Viewmenu } from "../components/Viewmenu";

const sampleWords = [
  "paradigm",
  "parochial",
  "paternalistic",
  "patronizing",
  "physicomorphs",
  "physiurgic",
  "pleasantries",
  "pliability",
  "pretentious",
];

function Home() {
  return (
    <div className="overflow-hidden w-screen h-screen font-text bg-background text-primary">
      <Navheader />
      <div className="flex mx-auto items-center gap-20 pl-40 pt-8">
        <Viewmenu />
        <Search />
      </div>
      <div className="px-40 mt-20 ">
        <Collection words={sampleWords} />
      </div>
      <Card />
    </div>
  );
}

export default Home;

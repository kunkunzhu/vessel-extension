/** @format */

import { Card } from "../components/browser/Card";
import { LinkButton } from "../components/Buttons";

interface DefaultPopupI {
  msg: string;
}

interface HomeI {
  error: string;
  word: string;
}

function DefaultPopup({ msg }: DefaultPopupI) {
  return (
    <div className="flex flex-col gap-4 px-6 py-4 text-primary rounded-lg border-accent border w-96 h-auto bg-white">
      <div className="flex flex-col gap-1 pb-2 border-secondary border-b">
        <div className="font-title text-3xl italic">Welcome to Vessel.</div>
        <div className="text-md">Expand your vocabulary as you browse. </div>
      </div>
      <div>{msg}</div>
      <div className="flex w-full justify-between pr-10">
        {/* <Button text="sign in" onClick={} */}
        <LinkButton text="Collection" to="/home" />
        <LinkButton text="Settings" to="/setting" />
      </div>
    </div>
  );
}

function Home({ error, word }: HomeI) {
  console.log("word", word);
  console.log("error", error);

  if (error || !word) {
    // if there is an error or if no word is selected, display default popup view
    return <DefaultPopup msg={error} />;
  } else {
    // otherwise, display the word card !
    return <Card word={word} />;
  }
}

export default Home;

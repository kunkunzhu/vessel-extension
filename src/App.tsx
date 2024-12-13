/** @format */

import { Route, MemoryRouter as Router, Routes } from "react-router-dom";

import { useEffect, useState } from "react";

import Home from "./views/Home";
import { handleTabQuery } from "./lib/utils";
import Login from "./views/Login";
import { AuthContextProvider } from "./context/AuthContext";

function App() {
  const [error, setError] = useState<string>("");
  const [word, setWord] = useState<string>("");

  function queryFunc({ activeTab }: { activeTab: chrome.tabs.Tab }) {
    const msg = {
      type: "word selection",
    };
    if (activeTab.id) {
      chrome.tabs.sendMessage(activeTab.id, msg, (response) => {
        if (!response) {
          console.log("case 1!");
          setError("Please refresh the page and try again ᴖ̈");
        } else if (response.swor === "_TextNotSelected_") {
          console.log("case 2!");
          setError("Please select any word to learn about its meaning ᵕ̈");
        } else {
          console.log("case 3!");
          let word = response.swor;
          // remove all non-alphabetical characters
          word = word.replace(/[^a-zA-Z ]/g, "");
          setWord(word);
        }
      });
    }
  }

  useEffect(() => {
    handleTabQuery({ queryFunc, setError });
  }, []);

  console.log(error);
  console.log(word);

  return (
    <AuthContextProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home error={error} word={word} />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </AuthContextProvider>
  );
}

export default App;

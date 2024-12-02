/** @format */

import { Route, MemoryRouter as Router, Routes } from "react-router-dom";

import { useEffect, useState } from "react";

import Setting from "./views/Settings";
import Home from "./views/Home";

function App() {
  const [error, setError] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [word, setWord] = useState<string>("");

  useEffect(() => {
    const handleTabQuery = () => {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const activeTab = tabs[0];
        const tabUrl = activeTab?.url;

        if (!tabUrl) {
          setError(true);
          setErrorMsg("No page found ᴖ̈");
        }

        let msg = {
          txt: "selecting words",
        };

        if (activeTab.id) {
          // inject content.js if it's not already loaded
          chrome.scripting.executeScript(
            {
              target: { tabId: activeTab.id },
              files: ["content.js"],
            },
            () => {
              console.log("Content script injected.");
              if (activeTab.id) {
                chrome.tabs.sendMessage(activeTab.id, msg, (response) => {
                  if (!response) {
                    setError(true);
                    setErrorMsg("Please refresh the page and try again ᴖ̈");
                  } else if (response.swor === "_TextNotSelected_") {
                    setError(false);
                    setErrorMsg(
                      "Please select any word to learn about its meaning ᵕ̈"
                    );
                  } else {
                    let word = response.swor;
                    // remove all non-alphabetical characters
                    word = word.replace(/[^a-zA-Z ]/g, "");
                    setWord(word);
                  }
                });
              }
            }
          );
        }
      });
    };

    handleTabQuery();
  }, []);

  console.log(error, errorMsg);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<Home error={error} errorMsg={errorMsg} word={word} />}
        ></Route>
        <Route path="/setting" element={<Setting />}></Route>
      </Routes>
    </Router>
  );
}

export default App;

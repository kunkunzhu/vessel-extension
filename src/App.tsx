/** @format */

import { Route, MemoryRouter as Router, Routes } from "react-router-dom";
import Home from "./views/Home";
import Popup from "./views/Popup";
import { useState } from "react";

function App() {
  const [error, setError] = useState<boolean>(false);
  const [msg, setMsg] = useState<string>("");

  const getActiveTab = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs.length > 0) {
        const activeTab = tabs[0];
        const tabUrl = activeTab.url;

        if (!tabUrl) {
          setError(true);
          setMsg("This page is not supported!");
        }

        let msg = {
          txt: "hello from popup",
        };

        if (activeTab.id) {
          chrome.tabs.sendMessage(activeTab.id, msg, (response) => {
            if (!response) {
              setError(true);
              setMsg("Please refresh the page and try again ᴖ̈");
            } else if (response.swor === "_TextNotSelected_") {
              setError(false);
              setMsg("Please select any word to learn about its meaning ᵕ̈");
            } else {
              let swo = response.swor;
              swo = swo.replace(/[^a-zA-Z ]/g, "");
              setMsg(swo);
            }
          });
        }
      }
    });
  };

  getActiveTab();
  console.log(error);

  return (
    <Router>
      <Routes>
        {/* TO DO: figure out external routing */}
        <Route path="/" element={<Popup message={msg} />}></Route>
        <Route path="/home" element={<Home />}></Route>
      </Routes>
    </Router>
  );
}

export default App;

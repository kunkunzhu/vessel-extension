/** @format */

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log(sender);
  if (request.txt === "hello from popup") {
    const selectedText = window.getSelection().toString();
    sendResponse({ swor: selectedText || "_TextNotSelected_" });
  }
  return true; // indicates that the response will be sent asynchronously
});

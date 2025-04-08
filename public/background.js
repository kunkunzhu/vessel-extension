/** @format */

chrome.contextMenus.create({
  id: "HeadlineFetcher",
  title: "collect into vessle",
  contexts: ["all"],
});

chrome.contextMenus.onClicked.addListener(() => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { txt: "word selection" });
  });
});

// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//   console.log("sign in request!", sender);
//   if (message.type === "sign in") {
//     // implement sign-in logic here
//     signInWithEmailAndPassword(auth, message.email, message.password)
//       .then((userCredential) => {
//         sendResponse({ success: true, user: userCredential.user });
//       })
//       .catch((error) => {
//         sendResponse({ success: false, error: error.message });
//       });
//     return true; // indicates we'll respond asynchronously
//   }
// });

// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//   console.log("sign out request!", sender);
//   if (message.action === "sign out") {
//     signOut()
//       .then(() => {
//         sendResponse({ success: true });
//       })
//       .catch((error) => {
//         sendResponse({ success: false, error: error.message });
//       });
//     return true; // Indicates we'll respond asynchronously
//   }
// });

/** @format */

interface handleTabQueryProps {
  queryFunc: ({ activeTab }: { activeTab: chrome.tabs.Tab }) => void;
  setError?: (error: string) => void;
}

export const handleTabQuery = ({
  queryFunc,
  setError,
}: handleTabQueryProps) => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    console.log("active tab!");

    const activeTab = tabs[0];
    const tabUrl = activeTab?.url;

    if (!tabUrl && setError) {
      setError("No page found ᴖ̈");
    }

    if (activeTab.id) {
      // inject content.js if it's not already loaded
      chrome.scripting.executeScript(
        {
          target: { tabId: activeTab.id },
          files: ["content.js"],
        },
        () => {
          console.log("content script injected!");
          queryFunc({ activeTab });
        }
      );
    }
  });
};

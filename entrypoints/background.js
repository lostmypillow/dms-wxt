export default defineBackground(() => {
  let tempObj;
  browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "importFromDash") {
      tempObj = message.data;
      const url = message.data.url;
      console.log('injecting script')
      browser.tabs
        .create({ url: url, active: false })
        .then((newTab) => {
          browser.scripting.executeScript({
            target: { tabId: newTab.id },
            files: ["content-scripts/content.js"],
          });
        })
        .catch((error) => {
          console.error("Error creating tab or injecting script:", error);
        });
    } else if (message.action === "processLink") {

    }
  });
});
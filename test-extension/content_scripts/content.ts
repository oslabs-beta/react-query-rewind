// Immediatly-Invoked Function Expression (IIFE)
(function () {
  // Check if the content script has already been loaded into the current tab
  // Prevents it from injecting into the same page twice if the developer opens and closes the dev tool
  if (window.myContentScriptLoaded) {
    console.log("CONTENT.TS: Content script already injected");
    return;
  } else {
    // Set the flag on the window to indicate the content script has already been loaded in the tab
    window.myContentScriptLoaded = true;
    console.log("CONTENT.TS: Loaded");
  }

  let appConnected = false;
  let appMessageQueue: any = [];
  let backgroundPort: chrome.runtime.Port | null = null;

  // Initialize the port
  setupPort();

  // Function to setup and initialize the background port
  function setupPort() {
    console.log("CONTENT.TS: Background.ts Connected");

    // Connect to background script
    backgroundPort = chrome.runtime.connect({ name: "content-background" });

    // Handle background.ts messages - send message if connected to app otherwise add to queue
    backgroundPort.onMessage.addListener((message) => {
      if (appConnected) {
        console.log("CONTENT.TS: Message to app", message);
        window.postMessage(message);
      } else {
        appMessageQueue.push(message);
      }
    });

    backgroundPort.onDisconnect.addListener(() => {
      console.log("CONTENT.TS: Background.ts Disconnected");
      // Reset the port to trigger reconnection attempt
      backgroundPort = null;
      setupPort();
    });
  }

  function sendMessageToBackground(message: any) {
    // console.log('CONTENT.TS: Message to background.ts', message.data);
    backgroundPort?.postMessage(message.data);
  }

  // Add listener to the window to handle messages from the app
  window.addEventListener("message", handleMessageFromApp, false);

  function handleMessageFromApp(message: MessageEvent) {
    // Initial message from the app to confirm connection
    if (message.data?.type === "app-connected") {
      console.log("CONTENT.TS: App Connected");
      clearInterval(appConnectionInterval);
      appConnected = true;
      appMessageQueue.forEach((message: any) => window.postMessage(message));
      appMessageQueue = [];
    }

    // All other messages are sent to background.ts
    if (message.data?.type === "event") {
      // console.log('CONTENT.TS: Message from App:', message);
      sendMessageToBackground(message);
    }
  }

  // Notify app that content.ts is ready
  function establishAppConnection() {
    if (!appConnected) {
      window.postMessage({ type: "content-script-ready" }, "*");
    }
  }

  // Send a message to the app until it sends back a confirmation message
  // Prevents a situation where the app recieves a message before it is able to setup its event listeners
  const appConnectionInterval = setInterval(establishAppConnection, 200);

  // Function to send a heartbeat message to the background script to keep it active
  function sendHeartbeat() {
    backgroundPort?.postMessage({ type: "heartbeat" });
    // console.log('heartbeat');
  }

  // Call sendHeartbeat function every 25 seconds
  setInterval(sendHeartbeat, 25000);

  // Function to send a message to the app when the component tree is ready
  window.addEventListener("message", (event) => {
    // console.log("message from inject.js", event.data.eventListStr);
    if (event.data.type && event.data.type === "tree") {
      console.log("CONTENT.ts: component tree sending event: ", event);
      backgroundPort?.postMessage({type: event.data.type, data: event.data.eventListStr});
      // chrome.runtime.sendMessage({
      //   action: event.data.type,
      //   data: event.data.eventListStr,
      // });
    }
  });
})();

// *** Component Tree ***
//inject script into current DOM (because content scripts run in isolation, I'm unable to inject the script like this from background.ts)
/*
  chrome.scripting.executeScript({
    target: { tabId: message.tabId },
    files: ["inject.js"],
})
*/
const inject = (fileName: string) => {
  // console.log("CONTENTSCRIPT.JS: INJECTING SCRIPT");
  const treeScript = document.createElement("script");
  treeScript.setAttribute("type", "text/javascript");
  treeScript.setAttribute("src", chrome.runtime.getURL(fileName));
  document.body.appendChild(treeScript);
};

//invoke inject function to inject script
inject("inject.js");

export {};

// // Function to perform cleanup of script when no longer used
// function cleanup() {
//   if (backgroundPort) {
//     backgroundPort.disconnect();
//     backgroundPort = null;
//     console.log('CONTENT.TS: Disconnected from background script');
//   }
//   window.removeEventListener('message', handleMessageFromApp);
//   appConnected = false;
//   appMessageQueue = [];
//   console.log('CONTENT.TS: Old content.ts cleaned up.');
// }

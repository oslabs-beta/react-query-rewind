// This variable will hold the reference to the DevTools page port
let devToolsPort: chrome.runtime.Port | null = null;

// Listener for connections from the DevTools page
chrome.runtime.onConnect.addListener((port: chrome.runtime.Port) => {
  if (port.name === 'devtools-panel') {
    // Store the port for communication with the DevTools panel
    devToolsPort = port;

    // Handle disconnection
    devToolsPort.onDisconnect.addListener(() => {
      devToolsPort = null;
    });

    // Listen for messages from the content script
    chrome.runtime.onMessage.addListener(
      (message: any, sender, sendResponse) => {
        // Check if the DevTools panel is connected
        if (devToolsPort) {
          console.log(message, 'background');
          // Forward the message from the content script to the DevTools panel
          devToolsPort.postMessage(message);
        }
      }
    );
  }
});

console.log('background.ts loaded');

let devToolsPort: chrome.runtime.Port | null = null;

chrome.runtime.onMessage.addListener((message: any, sender, sendResponse) => {
  if (devToolsPort) {
    console.log(message, 'BACKGROUND.JS');
    devToolsPort.postMessage(message);
  }
});

chrome.runtime.onConnect.addListener((port: chrome.runtime.Port) => {
  if (port.name === 'devtools-panel') {
    devToolsPort = port;

    devToolsPort.onDisconnect.addListener(() => {
      devToolsPort = null;
    });
  }
});

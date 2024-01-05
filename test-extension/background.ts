console.log('BACKGROUND.TS: Loaded');

let devToolPort: chrome.runtime.Port | null = null;
let activeContentPort: chrome.runtime.Port | null = null;
let activeTabId: number | null = null;

let devToolMessageQueue: any = [];
let contentMessageQueue: any = [];

// Listen for connection from content.ts and devtools panel
chrome.runtime.onConnect.addListener(port => {
  if (port.name === 'content-background') {
    handleContentConnection(port);
  } else if (port.name === 'background-devtool') {
    handleDevToolsConnection(port);
  }
});

function handleContentConnection(port: chrome.runtime.Port) {
  console.log('BACKGROUND.TS: Content.ts Connected');

  // Disconnect previous content script if a new tab becomes active
  if (activeTabId !== port.sender?.tab?.id) {
    activeContentPort?.disconnect();
    if (port.sender?.tab?.id) {
      activeTabId = port.sender?.tab?.id;
    }
  }

  activeContentPort = port;

  // Send queued messages from content.ts before connection was established
  contentMessageQueue.forEach((message: any) => {
    activeContentPort?.postMessage(message);
  });
  contentMessageQueue = [];

  // If devtool is connected send messages otherwise place in queue
  activeContentPort.onMessage.addListener(message => {
    // The background script goes inactive after 30 seconds idle so we log every 25 seconds
    if (message.type === 'heartbeat') {
      console.log('Logging to keep service worker connected');
    }

    if (devToolPort) {
      devToolPort.postMessage(message);
    } else {
      devToolMessageQueue.push(message);
    }
  });

  port.onDisconnect.addListener(() => {
    console.log('BACKGROUND.TS: Content.ts Disconnected');
    activeContentPort = null;
  });
}

function handleDevToolsConnection(port: chrome.runtime.Port) {
  console.log('BACKGROUND.TS: DevTool Connected');
  devToolPort = port;

  // Send queued messages from the devtool before connection was established
  devToolMessageQueue.forEach((message: any) => {
    devToolPort?.postMessage(message);
  });
  devToolMessageQueue = [];

  // If content.ts is connected send messages otherwise place in queue
  devToolPort.onMessage.addListener(message => {
    if (message.action === 'injectContentScript' && message.tabId) {
      console.log('Injecting Content Script Into Tab:', message.tabId);
      chrome.scripting.executeScript({
        target: { tabId: message.tabId },
        files: ['content.js'],
      });
    } else if (activeContentPort) {
      console.log('message to content', message);
      activeContentPort.postMessage(message);
    } else {
      console.log('added to queue');
      contentMessageQueue.push(message);
    }
  });

  port.onDisconnect.addListener(() => {
    console.log('BACKGROUND.TS: DevTool Disconnected');
    devToolPort = null;
  });
}

console.log('BACKGROUND.TS: Loaded');

let devToolPort: chrome.runtime.Port | null = null;
let contentPort: chrome.runtime.Port | null = null;

let devToolMessageQueue: any = [];
let contentMessageQueue: any = [];

// listen for connection from content.ts and devtools panel
chrome.runtime.onConnect.addListener(port => {
  if (port.name === 'content-background') {
    handleContentConnection(port);
  } else if (port.name === 'background-devtool') {
    handleDevToolsConnection(port);
  }
});

function handleContentConnection(port: chrome.runtime.Port) {
  console.log('BACKGROUND.TS: Content.ts Connected');
  contentPort = port;

  // send queued messages from content.ts before connection
  contentMessageQueue.forEach((message: any) => {
    contentPort?.postMessage(message);
  });
  contentMessageQueue = [];

  // if devtool is connected send messages otherwise place in queue
  contentPort.onMessage.addListener(message => {
    if (devToolPort) {
      console.log('message to devtool', message);
      devToolPort.postMessage(message);
    } else {
      devToolMessageQueue.push(message);
    }
  });

  port.onDisconnect.addListener(() => {
    console.log('BACKGROUND.TS: Content.ts Disconnected');
    contentPort = null;
  });
}

function handleDevToolsConnection(port: chrome.runtime.Port) {
  console.log('BACKGROUND.TS: DevTool Connected');
  devToolPort = port;

  // send queued messages from the devtool before connection
  devToolMessageQueue.forEach((message: any) => {
    devToolPort?.postMessage(message);
  });
  devToolMessageQueue = [];

  // if content.ts is connected send messages otherwise place in queue
  devToolPort.onMessage.addListener(message => {
    if (message.action === 'injectContentScript' && message.tabId) {
      console.log('Injecting Content Script Into Tab:', message.tabId);
      chrome.scripting.executeScript({
        target: { tabId: message.tabId },
        files: ['content.js'],
      });
    } else if (contentPort) {
      console.log('message to content', message);
      contentPort.postMessage(message);
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

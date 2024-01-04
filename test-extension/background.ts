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
    if (contentPort) {
      console.log('message to content', message);
      contentPort.postMessage(message);
    } else {
      contentMessageQueue.push(message);
    }
  });

  port.onDisconnect.addListener(() => {
    console.log('BACKGROUND.TS: DevTool Disconnected');
    devToolPort = null;
  });
}

// listen for messages from content.ts
// chrome.runtime.onMessage.addListener(handleMessageFromContent);

// function handleMessageFromContent(
//   message: any,
//   sender: chrome.runtime.MessageSender
// ) {
//   // handle connection messages from the app
//   if (message.type === 'app-connected') {
//     console.log('RECIEVED CONNECTION MESSAGE', message);

//     // if initial tabId set it and confirm connection with content.ts
//     if (tabId === undefined || tabId === sender.tab?.id) {
//       tabId = sender.tab?.id;
//       console.log(`BACKGROUND.TS: Content.ts Connected at TabId ${tabId}`);
//       messageToContent(tabId, { type: 'background-connected' });
//     }
//     // if new tabId refresh the page so data is reset
//     else if (tabId !== sender.tab?.id && typeof sender.tab?.id === 'number') {
//       tabId = sender.tab?.id;
//       console.log(`BACKGROUND.TS: New TabId Detected: ${tabId}`);
//       chrome.tabs.reload(tabId, {}, () => {
//         if (chrome.runtime.lastError) {
//           console.error(
//             `Error Refreshing Tab: ${chrome.runtime.lastError.message}`
//           );
//         }
//       });
//     }
//   } else if (devToolsPort && tabId === sender.tab?.id) {
//     devToolsPort.postMessage(message);
//   } else if (!devToolsPort && tabId === sender.tab?.id) {
//     devToolMessageQueue.push(message);
//   }
// }

// function to send messages to content.js – retries 3 times after first failed attempt
// function messageToContent(tabId: any, message: any, retryCount: number = 0) {
//   chrome.tabs.sendMessage(tabId, message).catch(err => {
//     if (retryCount < 3) {
//       console.error(
//         `BACKGROUND.TS: Retry ${
//           retryCount + 1
//         }: Error sending connection message to content.ts`,
//         err,
//         message
//       );
//       setTimeout(
//         () => messageToContent(tabId, message, retryCount + 1),
//         (retryCount + 1) * 2000
//       );
//     } else {
//       console.error(
//         'BACKGROUND.TS: Max retries reached. Error sending message to content.ts:',
//         err,
//         message
//       );
//     }
//   });
// }

// AM NOW SENDING BOTH IN JUST A MESSAGE
// devToolsPort.onMessage.addListener(message => {
//   if (message.type === 'time-travel') {
//     console.log('BACKGROUND.TS: TimeTravel Setting Changed');
//     messageToContent(tabId, message);
//   }

//   if (message.type === 'update-ui') {
//     console.log('BACKGROUND.TS: Updated UI');
//     messageToContent(tabId, message);
//   }
// });

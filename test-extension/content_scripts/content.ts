// Immediatly-Invoked Function Expression (IIFE)
(function () {
  // Check if the content script has already been loaded into the current tab
  // Prevents it from injecting into the same page twice if the developer opens and closes the dev tool
  if (window.myContentScriptLoaded) {
    console.log('CONTENT.TS: Content script already injected');
    return;
  } else {
    // Set the flag on the window to indicate the content script has already been loaded in the tab
    window.myContentScriptLoaded = true;
    console.log('CONTENT.TS: Loaded');
  }

  let appConnected = false;
  let appMessageQueue: any = [];
  let backgroundPort: chrome.runtime.Port | null = null;

  // Initialize the port
  setupPort();

  // Function to setup and initialize the background port
  function setupPort() {
    console.log('CONTENT.TS: Connecting to background.ts');

    // Connect to background script
    backgroundPort = chrome.runtime.connect({ name: 'content-background' });

    // Handle background.ts messages - send message if connected to app otherwise add to queue
    backgroundPort.onMessage.addListener(message => {
      if (appConnected) {
        window.postMessage(message);
      } else {
        appMessageQueue.push(message);
      }
    });

    backgroundPort.onDisconnect.addListener(() => {
      console.log('CONTENT.TS: Disconnected from background script');
      // Reset the port to trigger reconnection attempt
      backgroundPort = null;
      setupPort();
    });
  }

  function sendMessageToBackground(message: any) {
    console.log('CONTENT.TS: Message to background.ts', message.data);
    backgroundPort?.postMessage(message.data);
  }

  // Add listener to the window to handle messages from the app
  window.addEventListener('message', handleMessageFromApp, false);

  function handleMessageFromApp(message: MessageEvent) {
    // Initial message from the app to confirm connection
    if (message.data?.type === 'app-connected') {
      console.log('CONTENT.TS: App Connected');
      clearInterval(appConnectionInterval);
      appConnected = true;
      appMessageQueue.forEach((message: any) => window.postMessage(message));
      appMessageQueue = [];
    }

    // All other messages are sent to background.ts
    if (message.data?.type === 'event') {
      console.log('CONTENT.TS: Message from App:', message);
      sendMessageToBackground(message);
    }
  }

  // Notify app that content.ts is ready
  function establishAppConnection() {
    if (!appConnected) {
      console.log('CONTENT.TS: Sent connection message to app');
      window.postMessage({ type: 'content-script-ready' }, '*');
    }
  }

  // establishAppConnection();
  const appConnectionInterval = setInterval(establishAppConnection, 200);

  // Function to send a heartbeat message to the background script to keep it active
  function sendHeartbeat() {
    backgroundPort?.postMessage({ type: 'heartbeat' });
    // console.log('heartbeat');
  }

  // Call sendHeartbeat function every 25 seconds
  setInterval(sendHeartbeat, 25000);
})();

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

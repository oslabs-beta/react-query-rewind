// Immediatly-Invoked Function Expression (IIFE)
(function () {
  // Check if the content script has already been loaded
  if (window.myContentScriptLoaded) {
    console.log('CONTENT.TS: Content script already loaded');
    return;
  } else {
    // Set the flag indicating the content script has been loaded
    window.myContentScriptLoaded = true;
    console.log('CONTENT.TS: Loaded');
  }

  let appConnected = false;
  let appMessageQueue: any = [];

  // Notify app that content.ts is ready
  window.postMessage({ type: 'content-script-ready' }, '*');

  // Create port and connect with background.ts
  let backgroundPort: chrome.runtime.Port | null = chrome.runtime.connect({
    name: 'content-background',
  });

  // Handle background.ts messages and send message if connected to app otherwise add to queue
  backgroundPort.onMessage.addListener(message => {
    if (appConnected) {
      window.postMessage(message);
    } else {
      appMessageQueue.push(message);
    }
  });

  // Handle disconnection of the port
  backgroundPort.onDisconnect.addListener(() => {
    console.log('CONTENT.TS: Disconnected from background script');
    // Re-establish the port connection
    backgroundPort = chrome.runtime.connect({ name: 'content-background' });
    console.log('CONTENT.TS: Reconnected');
    console.log(backgroundPort);
  });

  // Function to perform cleanup of script when no longer used
  function cleanup() {
    if (backgroundPort) {
      backgroundPort.disconnect();
      backgroundPort = null;
      console.log('CONTENT.TS: Disconnected from background script');
    }
    window.removeEventListener('message', handleMessageFromApp);
    appConnected = false;
    appMessageQueue = [];
    console.log('CONTENT.TS: Old content.ts cleaned up.');
  }

  // Add listener to the window to handle messages from the app
  window.addEventListener('message', handleMessageFromApp, false);

  function handleMessageFromApp(message: MessageEvent) {
    // Initial message from the app to confirm connection
    if (message.data?.type === 'app-connected') {
      console.log('CONTENT.TS: App Connected');
      appConnected = true;
      appMessageQueue.forEach((message: any) => window.postMessage(message));
      appMessageQueue = [];
    }

    // All other messages are sent to background.ts
    if (message.data?.type === 'event') {
      backgroundPort?.postMessage(message.data);
    }
  }
})();

export {};

// Generate a unique identifier for this instance
// const scriptInstanceId = Date.now() + Math.random().toString();
// console.log(scriptInstanceId);

// Define a custom event for signaling cleanup
// const cleanupEvent = new CustomEvent('contentScriptCleanup', {
//   detail: { id: scriptInstanceId },
// });

// Check for existing script instance and signal cleanup
// if (window.myContentScriptLoaded) {
//   console.log('new script');
//   window.dispatchEvent(cleanupEvent);
// } else {
//   console.log('cleaning up');
//   window.myContentScriptLoaded = true;
//   // Setup listener for cleanup
//   window.addEventListener('contentScriptCleanup', cleanup);
// }

// Function to perform cleanup of script when no longer used
function cleanup() {
  backgroundPort.disconnect();
  window.removeEventListener('message', handleMessageFromApp);
  appConnected = false;
  appMessageQueue = [];
  console.log('CONTENT.TS: Old content.ts cleaned up.');
}

console.log('CONTENT.TS: Loaded');

let appConnected = false;
let appMessageQueue: any = [];

// Notify app that content.ts is ready
window.postMessage({ type: 'content-script-ready' }, '*');

// Create port and connect with background.ts
const backgroundPort = chrome.runtime.connect({ name: 'content-background' });

// Handle background.ts messages - send message if connected to app otherwise add to queue
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
  cleanup();
  // Re-establish the port connection if necessary
  // backgroundPort = chrome.runtime.connect({ name: 'content-background' });
});

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
    backgroundPort.postMessage(message.data);
  }
}

export {};

console.log('content.ts loaded');

function handleMessage(event: MessageEvent) {
  if (event.source === window && event.data?.type === 'vue-query-rewind') {
    console.log(event, 'CONTENT.JS');
    chrome.runtime.sendMessage(event.data);
  }
}

window.addEventListener('message', handleMessage, false);

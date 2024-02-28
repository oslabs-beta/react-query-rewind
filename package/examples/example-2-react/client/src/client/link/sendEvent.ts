function sendEvent(event: any) {
  console.log('SEND_EVENT:', event);

  window.postMessage(
    {
      framework: 'react',
      type: 'event',
      payload: event,
    },
    '*'
  );
}

export default sendEvent;

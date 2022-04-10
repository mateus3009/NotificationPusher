const APPLICATION_SERVER_KEY = 'BNkqtzLx0k8ZAAivOc2mS2J8CUs2goCdFM_viOqI2zOiVHOnNgqdLwo-2GOd0-KQamB_IMDyxLsGeoanadb5Nuc';

const urlB64ToUint8Array = base64String => {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');

  const rawData = atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
};

self.addEventListener('activate', async event => {
  console.log('Service Worker: Activated');
  const options = {
    'userVisibleOnly': true,
    'applicationServerKey': urlB64ToUint8Array(APPLICATION_SERVER_KEY)
  }
  const subscription = await self.registration.pushManager.subscribe(options);
  console.log(subscription);
  const requisition = await fetch('/subscribe', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(subscription)
  });
  console.log(requisition);
});

self.addEventListener('push', event => {
  console.log('Service Worker: Push Received');
  console.log(event);
  const data = event.data.json();
  console.log(data);
  self.registration.showNotification('Notification Title', {
    body: data.body
  });
});

const registerServiceWorker = async () => {
  if (!navigator.serviceWorker)
    throw new Error('Service workers are not supported');
  return await navigator.serviceWorker.register('serviceWorker.js');
};

const requestNotificationPermission = async () => {
  if (!window.Notification)
    throw new Error('Notifications are not supported');
  const permission = await Notification.requestPermission();
  if (permission !== 'granted')
    throw new Error('Permission to show notifications was denied');
    registerServiceWorker();
};

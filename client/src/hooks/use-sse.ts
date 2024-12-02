import { useEffect, useState } from 'react';
import { INotification } from "@/features/home/types/home-page-types";


const useSSE = (url: string, userId: string, intialNotifications: INotification[]) => {
  const [notifications, setNotifications] = useState<INotification[]>([]);
  useEffect(() => {
    const eventSource = new EventSource(`${url}?userId=${userId}`);

    eventSource.onopen = () => {
      console.log('SSE connection established');
    };

    eventSource.onmessage = (event) => {
      try {
        const data: INotification = JSON.parse(event.data);
        setNotifications((prev)=>([data, ...prev]));
      } catch (err) {
        console.error('Failed to parse notification', err);
      }
    };

    eventSource.addEventListener('notification', (event) => {
      try {
        const data: INotification = JSON.parse(event.data);
        setNotifications((prev)=>([data, ...prev]));
      } catch (err) {
        console.error('Failed to parse custom notification event', err);
      }
    });

    eventSource.onerror = (err) => {
      console.error('SSE error:', err);
      eventSource.close();
    };

    // Clean up the connection on unmount
    return () => {
      eventSource.close();
    };
  }, [url, userId]);

  return notifications.concat(intialNotifications);
  // return notifications;
};

export default useSSE;

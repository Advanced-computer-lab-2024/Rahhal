import { useEffect } from 'react';
import { INotification } from "@/features/home/types/home-page-types";

const useSSE = (
  url: string, 
  userId: string,
  onNewNotification: (notification: INotification) => void
) => {
  useEffect(() => {
    const eventSource = new EventSource(`${url}?userId=${userId}`);

    eventSource.onmessage = (event) => {
      try {
        const data: INotification = JSON.parse(event.data);
        onNewNotification(data);
      } catch (err) {
        console.error('Failed to parse notification', err);
      }
    };

    eventSource.addEventListener('notification', (event) => {
      try {
        const data: INotification = JSON.parse(event.data);
        onNewNotification(data);
      } catch (err) {
        console.error('Failed to parse custom notification event', err);
      }
    });

    return () => eventSource.close();
  }, [url, userId, onNewNotification]);
};

export default useSSE;

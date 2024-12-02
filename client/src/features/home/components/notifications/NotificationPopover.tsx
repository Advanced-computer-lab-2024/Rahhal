import { Bell, MailOpen, MailCheck } from 'lucide-react'
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import useSSE from '@/hooks/use-sse';
import { useState, useEffect } from 'react';
import { SERVICES_URLS } from '@/lib/constants';
import { fetchUserNotifications, markUserNotificationsAsSeen } from "@/api-calls/notifications-api-calls";
import { INotification } from '../../types/home-page-types';
import { ScrollArea } from "@/components/ui/scroll-area"

interface NotificationPopoverProps{
  userId: string;
}

export default function NotificaionPopover({userId}: NotificationPopoverProps) {
  const [initialNotifications, setInitialNotifications] = useState<INotification[]>([]);

  // Fetch initial notifications on mount
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const initialNotifications = await fetchUserNotifications(userId);
        setInitialNotifications(initialNotifications);
      } catch (error) {
        console.error('Failed to fetch notifications:', error);
      }
    };

    fetchNotifications();
  }, []);

  let notifications = useSSE(SERVICES_URLS.NOTIFICATION + '/notifications/stream', userId, initialNotifications);

  function markAllAsRead() {
    markUserNotificationsAsSeen(userId);
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
      <Button
        variant="ghost"
        size="icon"
        className="relative"
      >
        <Bell className="h-6 w-6" />
        {notifications.length > 0 && (
          <span className="absolute -top-2 -right-2 h-5 w-5 bg-[--primary-color-dark] rounded-full text-xs text-primary-foreground flex items-center justify-center">
            {notifications.length}
          </span>
        )}
          
      </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0 w-[400px]">
        <Card className="shadow-none border-0">
          <CardHeader className="border-b px-6 py-4">
            <div className="flex items-center justify-between">
              <CardTitle>Notifications</CardTitle>
              {notifications.length > 0 &&(<Button variant="ghost" size="sm" onClick={markAllAsRead}>
                Mark all as read
              </Button>)}
            </div>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
          <ScrollArea className="flex max-h-80 flex-col overflow-y-auto ">
            <div className="grid gap-4">
              
              {notifications.length > 0 ? (notifications.map((notification,index) => (
                <div className="grid grid-cols-[32px_1fr] items-start gap-4">
                  {notification.seen 
                  ?(<div className="rounded-full bg-green-500 p-2 text-blue-50">
                      <MailCheck className="w-4 h-4" />
                    </div>) 
                  :(<div className="rounded-full bg-blue-500 p-2 text-blue-50">
                      <MailOpen className="w-4 h-4" />
                    </div>)
                  }
                <div>
                  <p className="text-sm font-medium">System Notification</p>
                  <p className="text-sm text-muted-foreground">{notification.message}.</p>
                </div>
              </div>
              ))) 
              : (
                <p> You don't have any notifications for now</p>
              )}
              
            </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </PopoverContent>
    </Popover>
  )
}

import { Bell, MailOpen, MailCheck } from "lucide-react";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import useSSE from "@/hooks/use-sse";
import { useState, useEffect } from "react";
import { SERVICES_URLS } from "@/lib/constants";
import {
  fetchUserNotifications,
  markUserNotificationsAsSeen,
} from "@/api-calls/notifications-api-calls";
import type { INotification } from "@/types/shared.d.ts";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SidebarMenuButton } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

interface NotificationPopoverProps {
  userId: string;
  isAdmin?: boolean;
}

export default function NotificaionPopover({ userId, isAdmin = false }: NotificationPopoverProps) {
  const [notifications, setNotifications] = useState<INotification[]>([]);

  // Fetch initial notifications on mount
  useEffect(() => {
    const fetchInitialNotifications = async () => {
      try {
        const initialNotifications = await fetchUserNotifications(userId);
        setNotifications(initialNotifications);
      } catch (error) {
        console.error("Failed to fetch notifications:", error);
      }
    };

    fetchInitialNotifications();
  }, [userId]);

  async function markAllAsRead() {
    await markUserNotificationsAsSeen(userId);
    setNotifications((prev) => prev.map((notification) => ({ ...notification, seen: true })));
  }

  useSSE(
    SERVICES_URLS.NOTIFICATION + "/notifications/stream",
    userId,
    (newNotification: INotification) => {
      setNotifications((prev) => {
        const exists = prev.some((n) => n._id === newNotification._id);
        if (exists) return prev;
        return [newNotification, ...prev];
      });
    },
  );

  return (
    <Popover>
      <PopoverTrigger asChild>
        {isAdmin ? (
          <div className="pt-1">
            <SidebarMenuButton asChild tooltip="Notifications">
              <a>
                <Bell />
                <span>Notifications</span>
              </a>
            </SidebarMenuButton>
          </div>
        ) : (
          <Button variant="clean" size="icon" className="relative group">
            <Bell className="h-6 w-6 transition-transform duration-200 ease-in-out group-hover:scale-110" />
            {notifications.filter((notification) => !notification.seen).length > 0 && (
              <span className="absolute -top-0.5 -right-0.5 h-5 w-5 bg-red-500 rounded-full text-xs text-primary-foreground flex items-center justify-center transition-transform duration-200 ease-in-out group-hover:scale-110">
                {notifications.filter((notification) => !notification.seen).length}
              </span>
            )}
          </Button>
        )}
      </PopoverTrigger>
      {isAdmin && (
        <>
          {notifications.filter((notification) => !notification.seen).length > 0 && (
            <span className="absolute bottom-16 left-5 h-4 w-4 bg-red-500 rounded-full text-xs text-primary-foreground flex items-center justify-center transition-transform duration-200 ease-in-out group-hover:scale-110">
              {notifications.filter((notification) => !notification.seen).length}
            </span>
          )}
        </>
      )}
      <PopoverContent className={cn("p-0 w-[400px]", isAdmin && "ml-10")}>
        <Card className="shadow-none border-0">
          <CardHeader className="border-b px-6 py-4">
            <div className="flex items-center justify-between">
              <CardTitle>Notifications</CardTitle>
              {notifications.length > 0 && (
                <Button variant="ghost" size="sm" onClick={markAllAsRead}>
                  Mark all as read
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <ScrollArea className="flex max-h-80 flex-col overflow-y-auto ">
              <div className="grid gap-4">
                {notifications.length > 0 ? (
                  notifications.map((notification, index) => (
                    <div className="grid grid-cols-[32px_1fr] items-start gap-4">
                      {notification.seen ? (
                        <div className="rounded-full bg-green-500 p-2 text-blue-50">
                          <MailCheck className="w-4 h-4" />
                        </div>
                      ) : (
                        <div className="rounded-full bg-blue-500 p-2 text-blue-50">
                          <MailOpen className="w-4 h-4" />
                        </div>
                      )}
                      <div>
                        <p className="text-sm font-medium">System Notification</p>
                        <p className="text-sm text-muted-foreground">{notification.message}.</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p> You don't have any notifications for now</p>
                )}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </PopoverContent>
    </Popover>
  );
}

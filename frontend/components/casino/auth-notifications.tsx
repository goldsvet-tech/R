"use client"
import React, { useState, useEffect } from 'react';
import { useAuth } from "@/hooks/auth";
import {
  Check,
  ArrowRightCircle,
  Gift,
  User,
  Loader2,
  Trash,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

import { ScrollArea } from "@/components/ui/scroll-area"
import { ToastAction } from "@/components/ui/toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useRouter } from "next/navigation";

export function AuthNotifications({openDialog}) {
  const router = useRouter();

  const { toast } = useToast();
  const [lastNotifications, setLastNotifications] = useState("");
  const [mappedNotifications, setMappedNotifications] = useState([]);
  const [errors, setErrors] = useState([]);
  const [notificationsCount, setNotificationsCount] = useState(0);
  const [notificationsAll, setNotificationsAll] = useState([]);
  const [notificationsLoaded, setNotificationsLoaded] = useState(false);
  const { user, notifications } = useAuth({
    middleware: 'user',
  })
  const [currentPage, setCurrentPage] = useState(false)
  const [isOpen, setIsOpen] = React.useState(false)
  const [selectedCategory, setSelectedCategory] = useState("all");

  const notificationIconAndComponentMap = {
    all: <Trash />,
    account: <User />,
    bonus: <Gift />,
  }

  useEffect(() => {
      if(openDialog === true) {
        setCurrentPage(true);
        setSelectedCategory("all")
      }
  }, [openDialog]);
  
  useEffect(() => {
      if(currentPage === true) {
        const fetchData = async () => {
          await notifications({
            setErrors,
            setNotificationsAll,
            setNotificationsCount,
         });
        }
        try {
        fetchData();
        } catch(error) {
          console.log(error);
        }
      }
  }, [currentPage]);

  useEffect(() => {
    if(notificationsAll !== mappedNotifications) {
        setMappedNotifications(notificationsAll);
    }
  }, [notificationsAll]);

  useEffect(() => {
        if(mappedNotifications.length > 0) {
          setNotificationsLoaded(true);
        }
  }, [mappedNotifications]);

  
  useEffect(() => {
    if(user) {
    if(lastNotifications !== user.notifications) {
      setLastNotifications(user.notifications);
      if(user.notifications.latest.read_at === null) {
        toast({
          title: "Notification: " + user.notifications.latest.title,
          description: user.notifications.latest.short_message,
          action: <ToastAction altText="Undo" onClick={event => setCurrentPage(true)}>Read</ToastAction>,
        })
      }
    }
  }
  }, [user.notifications]);
  
  const allNotifications = mappedNotifications;
  const accountNotifications = mappedNotifications.filter(notification => notification.type === "account");
  const bonusNotifications = mappedNotifications.filter(notification => notification.type === "bonus");

  
  const getFilteredNotifications = () => {
    switch(selectedCategory) {
      case "all":
        return allNotifications;
        break;
      case "account":
        return accountNotifications;
        break;
      case "bonus":
        return bonusNotifications;
        break;
      default:
        return allNotifications;
    }
  };

  const filteredNotifications = getFilteredNotifications();

  return (
    <Dialog open={currentPage}>
      <DialogContent forceMount={true} onInteractOutside={event => setCurrentPage(false)} onCloseAutoFocus={event => setCurrentPage(false)}  className="sm:max-w-[625px] sm:border p-1">
			<Card className="border-0">
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
          <CardDescription>{notificationsLoaded ? `You have ${allNotifications.length} notifications.` : ""}</CardDescription>
        </CardHeader>
              <CardContent className="text-xs grid gap-4">
              <Tabs defaultValue="all" className="w-full" onChange={value => setSelectedCategory(value)}>
              <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger onClick={(event => setSelectedCategory("all"))} value="all">All</TabsTrigger>
                <TabsTrigger onClick={(event => setSelectedCategory("account"))} value="account">Account</TabsTrigger>
                <TabsTrigger onClick={(event => setSelectedCategory("bonus"))} value="bonus">Bonus</TabsTrigger>
              </TabsList>
				        <div className="mt-2 mb-2">
                <ScrollArea className="h-[100%] md:max-h-[50vh] w-full">
                  {notificationsLoaded ? 
                  <>
                  {filteredNotifications.map((notification, index) => (
                  <div key={notification.id}>
                    <div className={cn(
                      "flex items-center space-x-4 mb-2 rounded border p-4",
                      (notification.read_at !== null ? "bg-opacity-90" : "bg-secondary"),                      
                      )}>
    				          {notificationIconAndComponentMap[notification.type]}
    				          <div className="flex-1 space-y-1">
    				            <p className="text-sm font-medium leading-none">
    				            {notification.title}
                        
                        <span className="text-xs text-muted-foreground font-light">
                          {notification.created_at}
    				            </span>
    				            </p>
    				            <p className="text-sm font-normal">
                        {notification.short_message}
    				            </p>
    				          </div>
                    {notification.action !== "none" ? <Button onClick={event => router.push(notification.action)} variant="ghost" size="sm"><ArrowRightCircle /></Button> : ""}
                      </div>
                    </div>
				          ))}
                  </>
                  :
                  <>
                      <p className="text-sm font-medium leading-none">
                        <Loader2 className="animate-spin" />
                      </p>
                  </>
                  }
                 </ScrollArea>

				        </div>
              </Tabs>
           </CardContent>

				      <CardFooter>
				        <Button className="w-full">
				          <Check className="mr-2 h-4 w-4" /> Mark all as read
				        </Button>
				      </CardFooter>
				    </Card>

      </DialogContent>
    </Dialog>
  )
}

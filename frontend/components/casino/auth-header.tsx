"use client"

import React, { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/auth";
import { AuthDialog } from "@/components/casino/auth-dialog";
import { AuthNotifications } from "@/components/casino/auth-notifications"
import { AuthBalance } from "@/components/casino/auth-balance";
import {
  CreditCard,
  Keyboard,
  LogOut,
  X,
  Mail,
  MessageSquare,
  Loader2,
  PlusCircle,
  Settings,
  User,
  UserPlus,
  Users,
} from "lucide-react";
import {
  Avatar,
  AvatarFallback,
} from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import VIPprogress from "@/components/casino/auth-vip-progress";

export function AuthHeader() {
  const { user } = useAuth({ middleware: "guest" });
  const [openNotificationsClick, setOpenNotificationsClick] = useState(false)
  const [openNotificationsDialog, setOpenNotificationsDialog] = useState(false)
  const wait = () => new Promise((resolve) => setTimeout(resolve, 55));
  const waitLoad = () => new Promise((resolve) => setTimeout(resolve, 500));
  const [loadedCompletely, setLoadedCompletely] = useState(false)

  useEffect(() => {
    if(openNotificationsClick === true) {
      setOpenNotificationsDialog(true);
      setOpenNotificationsClick(false);
      wait().then(() => setOpenNotificationsDialog(false));
    }
}, [openNotificationsClick]);


  useEffect(() => {
    if(!loadedCompletely) {
      waitLoad().then(() => setLoadedCompletely(true));
    }
  }, []);


  if (!user) {
      return (
      <div className="flex">
        <div className="border-l ml-2"></div>
        <div className="pr-2 pl-2"></div>
        {loadedCompletely ? <AuthDialog tabsDefault="register" /> : <Button variant="outline" size="default" className="min-w-[100px]"><Loader2 className="mr-2 h-4 w-4 animate-spin" /></Button>}
      </div>
      )
  }

  
  return (
    <div className="flex">
      <div className="border-l ml-2" />
        <nav className="flex items-center space-x-1">
            <div className="pr-2 pl-2" />
            {user.notifications?.unread > 0 ? 
                <>
                <span className="text-xs absolute pt-[10px] pl-[12px] font-extrabold">{user.notifications.unread}</span> 
                </>
                : 
                <></>  
            }
            <Button variant="ghost" size="sm" className="w-8 px-0">
                <Mail onClick={event => setOpenNotificationsClick(true)}/>
                <span className="sr-only">Messages</span>
            </Button>
            <AuthNotifications
              openDialog={openNotificationsDialog}
            />
        <div className="pr-2 pl-2" />
        <AuthBalance
          userLoad={user}
          walletActionsEnabled={true}
          displayActionsEnabled={true}
        />       
         </nav>

      <div className="pr-2 pl-2"></div>
        <AuthMenu userLoad={user} />
      </div>
        );
}

export function AuthMenu({userLoad}) {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(false)
  const [userData, setUserData] = useState(false)
  const [userName, setUserName] = useState('un')
  const [loadingClicked, setLoadingClicked] = useState('');
  const [openPageClick, setOpenPageClick] = useState(false)
  const wait = () => new Promise((resolve) => setTimeout(resolve, 1500));

  useEffect(() => {
      if(openPageClick === true) {
        setCurrentPage(true);
        setOpenPageClick(false);
        wait().then(() => setCurrentPage(false));
      }
  }, [openPageClick]);

  useEffect(() => {
    if(userLoad?.name) {
      if(userLoad !== userData) {
        setUserData(userLoad);
        setUserName((userLoad.name));
      }
    }
}, [userLoad]);


  const handleProfileClick = (e) => {
    setLoadingClicked('ripple-effect disabled');
    e.preventDefault();
  };



return (
  <>
  <DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button
      variant="ghost"
      className="relative h-10 w-10 rounded-full"
    >
      <Avatar>
        <AvatarFallback>
          <span className="pt-1 text-xs font-semibold spacing-1">
            {((userName).substring(0, 3)).toUpperCase()}
            </span>
         </AvatarFallback>
      </Avatar>
    </Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent className="w-56" align="end" forceMount>
    <DropdownMenuLabel><span className="leading-wide text-muted-foreground">{((userName).toLowerCase())}</span></DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuGroup>
      <DropdownMenuItem className={loadingClicked} onClick={(event => handleProfileClick(event))}>
        <User className="mr-2 h-4 w-4" />
        <span>Profile</span>
        <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
      </DropdownMenuItem>
      <DropdownMenuItem>
        <CreditCard className="mr-2 h-4 w-4" />
        <span>Deposit</span>
        <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
      </DropdownMenuItem>
      <DropdownMenuItem>
        <Settings className="mr-2 h-4 w-4" />
        <span>Settings</span>
        <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
      </DropdownMenuItem>
      <DropdownMenuItem>
        <Keyboard className="mr-2 h-4 w-4" />
        <span>Keyboard shortcuts</span>
        <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
      </DropdownMenuItem>
    </DropdownMenuGroup>
    <DropdownMenuSeparator />
    <DropdownMenuGroup>
      <DropdownMenuItem>
        <Users className="mr-2 h-4 w-4" />
        <span>Linked Play</span>
      </DropdownMenuItem>
      <DropdownMenuSub>
        <DropdownMenuSubTrigger>
          <UserPlus className="mr-2 h-4 w-4" />
          <span>Invite users</span>
        </DropdownMenuSubTrigger>
        <DropdownMenuPortal>
          <DropdownMenuSubContent forceMount>
            <DropdownMenuItem>
              <Mail className="mr-2 h-4 w-4" />
              <span>Email</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <MessageSquare className="mr-2 h-4 w-4" />
              <span>Message</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <PlusCircle className="mr-2 h-4 w-4" />
              <span>More...</span>
            </DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuPortal>
      </DropdownMenuSub>
    </DropdownMenuGroup>
    <DropdownMenuSeparator />
    <DropdownMenuItem
      onClick={event => setOpenPageClick(true)}
    >
      <LogOut className="mr-2 h-4 w-4" />
      <span>Logout</span>

    </DropdownMenuItem>
  </DropdownMenuContent>
  </DropdownMenu>
  <DialogLogout open={currentPage} />
  </>
  )
}

export function DialogLogout({open}) {
  const [currentPage, setCurrentPage] = useState(false)
  const [confirmLogout, setConfirmLogout] = useState(false)
  const { user, logout } = useAuth({
    middleware: 'user',
  })
  
  useEffect(() => {
      if(open === true) {
        setCurrentPage(true);
      }
  }, [open]);
  
  
  useEffect(() => {
    if(confirmLogout === true) {
      logout({});
      setConfirmLogout(false);
      setCurrentPage(false);
    }
}, [confirmLogout]);
  
return (
  <Dialog open={currentPage}>
  <DialogContent forceMount={true} onInteractOutside={event => setCurrentPage(false)} onCloseAutoFocus={event => setCurrentPage(false)}  className="sm:max-w-[425px]">
    <DialogHeader>
       <div 
        className="absolute cursor-pointer right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
        onClick={event => setCurrentPage(false)}
        >
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </div>
      <DialogTitle>Are you sure to logout?</DialogTitle>
      <DialogDescription>
            Make sure to remember your account details. 
      </DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <Button 
        type="submit"
        variant="outline"
        onClick={event => setCurrentPage(false)}
      >
        Cancel
      </Button>
      <Button 
        variant="destructive"
        type="submit"
        onClick={event => setConfirmLogout(true)}
      >
        Logout
      </Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
);
}
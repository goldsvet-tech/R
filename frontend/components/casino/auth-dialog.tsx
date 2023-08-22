"use client"

import React, { useEffect, useState } from 'react';
import { buttonVariants, Button } from "@/components/ui/button"
import {Metamask} from "@/components/casino/metamask"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  UserPlus,
} from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AuthFormLogin } from "@/components/casino/auth-form-login"
import { AuthFormRegister } from "@/components/casino/auth-form-register"

interface AuthDialogProps {
  triggerType: "button" | "text"
  triggerClass: string
  triggerText: string
  tabsDefault: "register" | "login"
}

export function AuthDialog({ ...AuthDialogProps }: AuthDialogProps) {
  
  return (
     <div key="auth-dialog" className="space-between flex items-center">
      <Metamask /> 
      <Tabs defaultValue={AuthDialogProps.tabsDefault === "register" ? "register" : "login"} className="h-full ml-2 space-y-6">
          <Dialog>
            <DialogTrigger>
              {AuthDialogProps.triggerType === "text" ? <div className={AuthDialogProps.triggerClass ?? "trigger-undefined-class"}>
                  {(AuthDialogProps.triggerText ?? "Authenticate")}</div> :
              <div
                  className={buttonVariants({ variant: "outline", size: "default" })}
                >
                <UserPlus className="mr-2 h-4 w-4" />
                {AuthDialogProps.triggerText ?? "Authenticate"}
              </div>}
            </DialogTrigger>
            <DialogContent className="">
              <DialogHeader>
                <DialogTitle>Authenticate</DialogTitle>
                <DialogDescription>
                  <p>Welcome (back). Sign in to your account or register a new one.</p>
                </DialogDescription>
              </DialogHeader>
              <TabsList>
                  <TabsTrigger
                    value="login">
                      Login
                  </TabsTrigger>
                  <TabsTrigger
                    value="register">
                      Register
                  </TabsTrigger>
              </TabsList>
              <TabsContent value="login" className="border-none p-0">
                  <AuthFormLogin />
              </TabsContent>

              <TabsContent value="register" className="border-none p-0">
                <AuthFormRegister />

              </TabsContent>

              <DialogFooter>
 

              </DialogFooter>
            </DialogContent>
          </Dialog>
      </Tabs>
     </div>
  )
}

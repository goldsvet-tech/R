"use client"

import React, { useEffect, useState } from 'react';

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Icons } from "@/components/icons"
import { useAuth } from "@/hooks/auth"
import { usePathname } from 'next/navigation';
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/components/ui/use-toast"

interface AuthFormLoginProps extends React.HTMLAttributes<HTMLDivElement> {}

export function AuthFormLogin({ className, ...props }: AuthFormLoginProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [password, setPassword] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [errors, setErrors] = React.useState([])
  const [status, setStatus] = React.useState(null)
  const [infoMessage, setInfoMessage] = React.useState('')
  const pathname = usePathname();
  const [remember, setRemember] = React.useState(true)
  const { toast } = useToast()

  const { login, register } = useAuth({
    middleware: 'guest',
    redirectIfAuthenticated: pathname,
    })

    useEffect(() => {
        setEmail('');
        setPassword('');
    }, []);


    useEffect(() => {
        setIsLoading(false);
        if(errors.message) {
            if(errors.message !== infoMessage) {
                setInfoMessage(errors.message);
                toast({
                  title: "Auth: Login",
                  description: errors.message,
                })
            }
        }
    }, [errors]);

    async function checkboxToggle(checkboxId) {
        if(checkboxId === 'remember') {
            if(remember) {
                setRemember(false);
            } else {
                setRemember(true);
            }
        }
    }

  async function onSubmit(event: React.SyntheticEvent) {
    await setInfoMessage('');
    await event.preventDefault();
    await setIsLoading(true)
    await login({
        email,
        password,
        remember,
        setErrors,
        setStatus,
     })
  }

  return (
    <div className={cn("grid gap-4", className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="email@example.com"
              type="email"
              value={email}
              onChange={event => setEmail(event.target.value)}
              autoCapitalize="none"
              autoComplete="off"
              autoCorrect="off"
              disabled={isLoading}
            />
          </div>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="password">
              Password
            </Label>
            <Input
              id="password"
              placeholder="password"
              value={password}
              onChange={event => setPassword(event.target.value)}
              type="password"
              autoCapitalize="none"
              autoComplete="off"
              autoCorrect="off"
              disabled={isLoading}
            />
          </div>
          <div className="grid gap-1">
          <div className="flex pr-2 pl-2 mt-2 mb-2
           items-center space-x-2">
            <Checkbox className="opacity-90 rounded-[0%]" onCheckedChange={event => checkboxToggle('remember')} checked={remember} id="terms1" />
            <label
                htmlFor="terms"
                onClick={event => checkboxToggle('remember')}
                className="text-sm cursor-pointer text-muted-foreground leading-none"
            >
                Remember this device
            </label>
            </div>
      </div>
          <Button disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Login
          </Button>
        </div>
      </form>
      <div className="relative flex h-5 justify-center text-xs">
            {infoMessage}
        </div>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or
          </span>
        </div>
      </div>
      <Button variant="outline" type="button" disabled={isLoading}>
        <Icons.forgotpassword className="mr-2 h-4 w-4" />
        Forgot Password
      </Button>
    </div>
  )
}
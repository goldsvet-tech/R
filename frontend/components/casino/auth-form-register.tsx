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

interface AuthFormRegisterProps extends React.HTMLAttributes<HTMLDivElement> {}

export function AuthFormRegister({ className, ...props }: AuthFormRegisterProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [password, setPassword] = React.useState('')
  const [passwordConfirmation, setPasswordConfirmation] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [errors, setErrors] = React.useState([])
  const [status, setStatus] = React.useState(null)
  const [infoMessage, setInfoMessage] = React.useState('')
  const pathname = usePathname();
  const [remember, setRemember] = React.useState(true)
  const [nickname, setNickname] = React.useState('')

  const { toast } = useToast()

  const { login, register } = useAuth({
    middleware: 'guest',
    redirectIfAuthenticated: pathname,
    })

    useEffect(() => {
        setEmail('');
        setPassword('');
        setNickname('');
    }, []);


    useEffect(() => {
        setIsLoading(false);

        if(errors.message) {
            if(errors.message !== infoMessage) {
                setInfoMessage(errors.message);
                toast({
                  title: "Auth: Registration",
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
    await register({
        name: nickname,
        email,
        password,
        password_confirmation: passwordConfirmation,
        setErrors,
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
            <Label className="sr-only" htmlFor="nickname">
              Nickname
            </Label>
            <Input
              id="nickname"
              placeholder="nickname"
              type="name"
              value={nickname}
              onChange={event => setNickname(event.target.value)}
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
            <Label className="sr-only" htmlFor="passwordConfirmation">
              Password Confirmation
            </Label>
            <Input
              id="passwordConfirmation"
              placeholder="confirm password"
              value={passwordConfirmation}
              onChange={event => setPasswordConfirmation(event.target.value)}
              type="password"
              autoCapitalize="none"
              autoComplete="off"
              autoCorrect="off"
              disabled={isLoading}
            />
          </div>
          <Button className="mt-2" disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Create Account
          </Button>
        </div>
      </form>
      <div className="relative flex h-5 justify-center text-xs">
            {infoMessage}
        </div>
    </div>
  )
}
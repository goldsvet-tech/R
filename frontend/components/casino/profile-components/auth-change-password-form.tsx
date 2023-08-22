"use client"

import React, { useEffect, useState } from 'react';
import { useToast } from "@/components/ui/use-toast"
import { buttonVariants, Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/hooks/auth"
interface ChangePasswordProps {
  defaultEmail: string
  defaultToken: string
}
export function ChangePasswordForm({ ...ChangePasswordProps }: ChangePasswordProps) {
    const { resetPassword } = useAuth({
        middleware: 'guest',
    })
    const [newPassword, setNewPassword] = useState('')
    const [newPasswordStatus, setNewPasswordStatus] = useState(null)
    const [loading, setLoading] = useState(false)
    const { toast } = useToast()

    const validatePasswordRegex = (value) => {
        return value.match(/^(?=.*?[a-z])(?=.*?[0-9]).{8,32}$/);
     };

    const magicChangePasswordClick = async (e) => {
        await e.preventDefault()
        await submitMagicChangePassword()
    }

    if(newPasswordStatus !== null) {
       setNewPasswordStatus(null)
       toast({
          title: "Magic Password Change",
          description: newPasswordStatus,
        })
    }



    const submitMagicChangePassword = async event => {
        var regexCheckNewPassword = validatePasswordRegex(newPassword)
        if(regexCheckNewPassword) {
        await resetPassword({
            setNewPasswordErrors,
            setNewPasswordStatus,
            magicToken: ChangePasswordProps.defaultToken,
            magicEmail: ChangePasswordProps.defaultEmail,
            newPassword: btoa(newPassword),
          })
          } else {
             toast({
                title: "Change Password",
                description: "Your password should atleast be 8+ characters and include 1 numeric character",
              })
          }
    }



    return (
        <div key="login-form">
          <div className="grid gap-2 p-1">
            <div className="space-y-1">
              <Label htmlFor="name">New Password</Label>
              <Input
                id="new-password"
                type="password"
                onChange={event => (loading ? "void" : setNewPassword(event.target.value))}
                placeholder="your new password"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="name">E-mail</Label>
              <Input
                id="email"
                type="email"
                disabled
                value={ChangePasswordProps.defaultEmail}
                onChange={event => (loading ? "void" : setMagicEmail(event.target.value))}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="name">Magic Token</Label>
              <Input
                id="magic-token"
                type="token"
                disabled
                value={ChangePasswordProps.defaultToken}
                onChange={event => (loading ? "void" : setMagicToken(event.target.value))}
                placeholder="your password"
              />
            </div>
          </div>
          <div className="flex p-1">
            <div
                key="verify-email-button"
                onClick={magicChangePasswordClick}
                className={buttonVariants({ variant: "outline", size: "default" }) + " min-w-[100px] cursor-pointer disabled mr-2 "}
              >
                Change Password
            </div>
          </div>
        </div>
    )
}

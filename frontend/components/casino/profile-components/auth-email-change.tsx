import React, { useState } from 'react';
import { buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/hooks/auth"
import { useToast } from "@/components/ui/use-toast"
export function EmailChangeRequest() {
    const { user, updateEmailAddress } = useAuth({
        middleware: 'auth',
    })
    const [newEmail, setNewEmail] = useState('')
    const [updateEmailStatus, setUpdateEmailStatus] = useState(null)
    const { toast } = useToast()
    const validateEmailRegex = (value) => {
       return value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);
    };
    const handleEmailChangeClick = async (e) => {
        await e.preventDefault()
        await submitEmailChangeRequest()
    }

    if(updateEmailStatus !== null) {
       setUpdateEmailStatus(null)
       toast({
          title: "Change Email",
          description: updateEmailStatus,
        })
    }

    const submitEmailChangeRequest = async event => {
        var regexCheckEmail = validateEmailRegex(newEmail)
        if(regexCheckEmail) {
        await setUpdateEmailStatus(null);
        await updateEmailAddress({
            newEmail,
            setUpdateEmailStatus,
          })
          } else {
                 toast({
                    title: "Change Email",
                    description: "Please enter a valid email address.",
                  })
          }
    }

  return (
      <div key="login-form">
        <div className="grid gap-2 p-1">
          <div className="space-y-1">
            <Input
              id="email"
              onChange={event => setNewEmail(event.target.value)}
              placeholder={user.email}
            />
          </div>
        </div>
        <div className="flex p-1">
            <div
                key="verify-email-button"
                onClick={handleEmailChangeClick}
                className={buttonVariants({ variant: "outline", size: "default" }) + " min-w-[100px] cursor-pointer disabled mr-2 "}
              >
                Change
            </div>
        </div>
      </div>
  )
}

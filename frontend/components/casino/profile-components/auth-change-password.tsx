import React, { useState } from 'react';
import { buttonVariants } from "@/components/ui/button"
import { useAuth } from "@/hooks/auth"
import { useToast } from "@/components/ui/use-toast"
export function ChangePasswordRequest() {
    const { user, changePassword } = useAuth({
        middleware: 'auth',
    })


    const [changePasswordErrors, setChangePasswordErrors] = useState([])
    const [changePasswordStatus, setChangePasswordStatus] = useState(null)
    const { toast } = useToast()

    const resetPasswordRequestClick = async (e) => {
        await e.preventDefault()
        await submitPasswordResetRequest()
    }

    if(changePasswordStatus !== null) {
       setChangePasswordStatus(null)
       toast({
          title: "Password Reset",
          description: changePasswordStatus,
        })
    }
    const submitPasswordResetRequest = async event => {
        if(user.email_verified_at)
        await changePassword({
            setChangePasswordStatus,
            setChangePasswordErrors,
            email: user.email,
          })
        if(!user.email_verified_at) {
            toast({
              title: "Auth Error",
              description: "We are unable to send you a magic link as you have not yet verified your e-mail address.",
            })
        }
    }

  return (
      <div key="login-form">
        <div className="flex p-1">
            <div
                key="verify-email-button"
                onClick={resetPasswordRequestClick}
                className={buttonVariants({ variant: "outline", size: "default" }) + " min-w-[100px] cursor-pointer disabled mr-2 "}
              >
                Request Password Reset
            </div>
        </div>
      </div>
  )
}

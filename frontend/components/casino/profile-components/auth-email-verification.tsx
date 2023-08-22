import React, { useState } from 'react';
import { buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/hooks/auth"
import { useToast } from "@/components/ui/use-toast"
export function EmailVerificationRequest() {
    const { user, resendEmailVerification } = useAuth({
        middleware: 'auth',
    })
    const [verificationStatus, setVerificationStatus] = useState(null)
    const { toast } = useToast()

    const validateEmailRegex = (value) => {
       return value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);
    };
    const handleEmailVerifyClick = async (e) => {
        await e.preventDefault()
        await submitEmailVerificationRequest()
    }

    if(verificationStatus !== null) {
       toast({
          title: "Verify Email",
          description: verificationStatus,
        })
       setVerificationStatus(null)
    }
    const submitEmailVerificationRequest = async event => {
          await resendEmailVerification({setVerificationStatus})
    }
  return (
      <div key="login-form">
        <div className="grid gap-2 p-1">
          <div className="space-y-1">
            <Input
              id="email"
              disabled
              value={user.email}
              placeholder="your email"
            />
          </div>
        </div>
        <div className="flex p-1">
            <div
                key="verify-email-button"
                onClick={handleEmailVerifyClick}
                className={buttonVariants({ variant: "outline", size: "default" }) + " min-w-[100px] cursor-pointer disabled mr-2 "}
              >
                Verify
            </div>
        </div>
      </div>
  )
}

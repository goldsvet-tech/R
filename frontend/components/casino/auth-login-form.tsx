"use client"

import React, { useEffect, useState } from 'react';
import { buttonVariants, Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/hooks/auth"
import { useToast } from "@/components/ui/use-toast"

export function LoginForm() {
    const { login } = useAuth({
        middleware: 'guest',
        redirectIfAuthenticated: '/',
    })
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [shouldRemember, setShouldRemember] = useState(false)
    const [errors, setErrors] = useState([])
    const [status, setStatus] = useState(null)
    const [loading, setLoading] = useState(false)
    const [validationChecked, setValidationChecked] = useState(false)
    const [validationFailed, setValidationFailed] = useState(false)
    const [message, setMessage] = useState(null)
    const [name, setName] = useState('')
    const { toast } = useToast()
    const [authType, setAuthType] = useState('')

    const validatePasswordRegex = (value) => {
        return value.match(/^(?=.*?[a-z])(?=.*?[0-9]).{8,32}$/);
     };
    const validateEmailRegex = (value) => {
       return value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);
    };
    const handleClick = async (e) => {
      if(!loading) {
        await setAuthType('login')
        await setLoading(true)
        await submitAuth()
        setTimeout(() => {
          setMessage(null)
          setLoading(false);
        }, 450);
      }
    }


      const validationChecks = async () => {
        var regexCheckEmail = validateEmailRegex(email)
        var regexCheckPassword = validatePasswordRegex(password)
        if(authType === "register") {
          var regexUserTag = validateUserTag(name)
        }

        if(!regexCheckEmail) {
            setValidationFailed(true);
            setValidationChecked(true);
              toast({
                title: "Auth Error",
                description: "You did not enter a valid email address.",
              })
            setMessage("You did not enter a valid email address.");
            return;
        }

         if(!regexCheckPassword) {
              setValidationFailed(true);
              setValidationChecked(true);
              setMessage("Password requires to be 8 characters and include 1 numeric character.");
              toast({
                title: "Auth Error",
                description: "Password requires to be 8 characters and include 1 numeric character.",
              })
            return;
         }
        if(authType === 'register') {
          if(!regexUserTag) {
              setValidationFailed(true);
              setValidationChecked(true);
              toast({
                title: "Auth Error",
                description: "Your usertag must be between 4 and 20 characters. Only numeric & alphabet characters.",
              })
              setMessage("Your usertag must be between 4 and 20 characters. Only numeric & alphabet characters.");
              return;
            }
        }
       setValidationChecked(true);
       return;
  }
  const submitAuth = async event => {
      setValidationChecked(false);
      setValidationFailed(false);
      var checkValidation = await validationChecks()
      if(!checkValidation) {
        if(validationFailed) {
            await setLoading(false);
            return;
        }
        if(!validationFailed & validationChecked) {
           if(authType === "register") {
             await register({
                 name,
                 email,
                 password,
                 password_confirmation: password,
                 setErrors,
             })
           }
           if(authType === "login") {
              await login({
                 email,
                 password,
                 remember: shouldRemember,
                 setErrors,
                 setStatus,
              })
           }
            if(status === null) {
              if(errors.message) {
               toast({
                  title: "Auth Error",
                  description: (errors.message ?? "Unknown Error (possibly API down?)"),
                })
              setMessage(errors.message ?? "Unknown Error (possibly API down?)");
              return;
            }
          }
    }
    }
  }

  return (
      <div key="login-form">
        <div className="grid gap-2 p-1">
          <div className="space-y-1">
            <Label htmlFor="name">E-mail</Label>
            <Input
              id="email"
              value={email}
              onChange={event => setEmail(event.target.value)}
              placeholder="your email"
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="name">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={event => (loading ? "void" : setPassword(event.target.value))}
              placeholder="your password"
            />
          </div>
        </div>
        <div className="flex p-1">
            {loading ?
            <Button
                key="login-button-disabled"
                disabled
                className={buttonVariants({ variant: "subtle", size: "sm" }) + " min-w-[100px] cursor-pointer disabled ml-0 "}
              >
                Loading...
            </Button>
            :
            <div
                key="login-button"
                onClick={handleClick}
                className={buttonVariants({ variant: "outline", size: "default" }) + " min-w-[100px] cursor-pointer disabled mr-2 "}
              >
                Login
            </div>
            }
        </div>
      </div>
  )
}

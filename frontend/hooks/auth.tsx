"use client"

import useSWR from 'swr'
import { useRouter } from 'next/navigation'
import { useToast } from "@/components/ui/use-toast"
import { useState, useEffect } from 'react'
import { apiRequest } from '@/lib/axios'

export const useAuth = ({ middleware, redirectIfAuthenticated } = {}) => {
  const { toast } = useToast();
 
  const router = useRouter();

  
  const { data: user, error, mutate } = useSWR('/casino/auth/user', () =>
    apiRequest.get('/casino/auth/user').then(res => res.data),
    {
      onError: error => {
        if(error.response) {
          if(error.response.status === 409) {
            router.push('/verify-email')
          }
        } else {
        toast({
          title: "Unknown Error",
          description: "An unknown error occured trying to contact authentication server.",
        });
      }
      },
    }
  )

  const csrf = async () => {
    await apiRequest.get('/sanctum/csrf-cookie')
  }

  const register = async ({ setErrors, ...props }) => {
    try {
      await csrf()
      setErrors([])
      await apiRequest.post('/casino/auth/register', props)
      mutate()
      window.location.reload();
    } catch (error) {
      console.log(error.response.data)
      setErrors(error.response.data)
    }
  }

  const login = async ({ setErrors, setStatus, ...props }) => {
    try {
      await csrf()
      setErrors([])
      setStatus(null)
      await apiRequest.post('/casino/auth/login', props)
      mutate()
      window.location.reload();
    } catch (error) {
      console.log(error.response.data)
      setErrors(error.response.data)
    }
  }

  const web3login = async ({ setErrors, setStatus, ...props }) => {
    try {
      await csrf()
      setErrors([])
      setStatus(null)
      await apiRequest.post('/casino/auth/metamask/login', props)
      mutate()
      window.location.reload();
    } catch (error) {
      console.log(error.response.data)
      setErrors(error.response.data)
    }
  }

  const changePassword = async ({ setChangePasswordStatus, setChangePasswordErrors, email }) => {
    setChangePasswordErrors([])
    setChangePasswordStatus(null)
    try {
      const response = await apiRequest.post('/casino/auth/change-password', { email })
      setChangePasswordStatus(response.data.status)
    } catch (error) {
      setChangePasswordErrors(error.response.data)
    }
  }

  const forgotPassword = async ({ setErrors, setStatus, email }) => {
    try {
      await csrf()
      setErrors([])
      setStatus(null)
      const response = await apiRequest.post('/casino/auth/forgot-password', { email })
      setStatus(response.data.status)
    } catch (error) {
      setErrors(error.response.data)
    }
  }

  const resetPassword = async ({ setNewPasswordErrors, setNewPasswordStatus, magicToken, magicEmail, newPassword, ...props }) => {
    try {
      await csrf()
      setNewPasswordErrors([])
      setNewPasswordStatus(null)
      const response = await apiRequest.post('/casino/auth/reset-password', { token: magicToken, email: magicEmail, password: newPassword, password_confirmation: newPassword, ...props })
      setNewPasswordStatus(response.data.status)
    } catch (error) {
      if (error.response.status === 422) {
        setNewPasswordErrors(error.response.data.errors)
      } else {
        throw error
      }
    }
  }

  const updateEmailAddress = async ({ newEmail, setUpdateEmailStatus, ...props }) => {
    setUpdateEmailStatus(null)
    try {
      const response = await apiRequest.post('/casino/auth/email/update-email', { email: newEmail, ...props })
      setUpdateEmailStatus(response.data.status)
    } catch (error) {
      console.log(error.response.data)
    }
  }
  
    
  const paymentDeposit = async ({ setErrors, setStatus, ...props }) => {
    try {
      await csrf()
      setErrors([])
      const response = await apiRequest.get('/casino/auth/payment/deposit', { ...props })
      //console.log(response);
      setStatus(response.data);

    } catch (error) {
      setErrors(error.response.data);
      console.log(error);
    }
  }

  const paymentGenerateAddress = async ({ setErrors, setCryptoMethodDepositAddress, currency, ...props }) => {
    try {
      await csrf()
      setErrors([])
      const response = await apiRequest.get('/casino/auth/payment/generateAddress?currency='+currency, { ...props })
      //console.log(response);
      setCryptoMethodDepositAddress(response.data);

    } catch (error) {
      setErrors(error.response.data);
      console.log(error);
    }
  }
  
  const notifications = async ({ setErrors, setNotificationsAll, setNotificationsCount, ...props }) => {
    try {
      await csrf()
      setErrors([])
      const response = await apiRequest.get('/casino/auth/notifications/all', { ...props })
      console.log(response);
      setNotificationsAll(response.data.data.notifications);
      setNotificationsCount(response.data.data.notificationsCount);

    } catch (error) {
      console.log(error);
    }
  }
  
  
    const resendEmailVerification = ({ setVerificationStatus }) => {
        apiRequest
            .post('/casino/auth/email/verification-notification')
            .then(response => setVerificationStatus(response.data.status))
    }

    const logout = async () => {
        if (! error) {
            await apiRequest.post('/casino/auth/logout').then(() => mutate())
        }
        window.location.reload();
    }

    useEffect(() => {
        if (middleware === 'guest' && redirectIfAuthenticated && user)
            router.push(redirectIfAuthenticated)
        if (
            window.location.pathname === '/verify-email' &&
            user?.email_verified_at
        )
            router.push(redirectIfAuthenticated)
        if (middleware === 'auth' && error) logout()
    }, [user, error])

    return {
        user,
        register,
        web3login,
        login,
        notifications,
        changePassword,
        forgotPassword,
        resetPassword,
        updateEmailAddress,
        paymentDeposit,
        paymentGenerateAddress,
        resendEmailVerification,
        logout,
    }
}

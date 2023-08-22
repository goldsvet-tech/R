"use client"

import React, { useEffect, useState } from 'react';
import Image from "next/image"
import { useAuth } from '@/hooks/auth'

import {
  Album,
  LayoutGrid,
  ListMusic,
  Verified,
  Key,
  Mic2,
  Music2,
  PlusCircle,
  Podcast,
  User,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Button } from "@/components/ui/button"
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"

import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { EmailVerificationRequest } from "@/components/casino/profile-components/auth-email-verification"
import { EmailChangeRequest } from "@/components/casino/profile-components/auth-email-change"
import { ChangePasswordRequest } from "@/components/casino/profile-components/auth-change-password"

import { useRouter } from 'next/navigation'
import { useToast } from "@/components/ui/use-toast"

export function AuthProfile() {
  const { user } = useAuth({ middleware: 'auth' })
  const [currentPage, setCurrentPage] = useState(null)
  const [loadedInit, setLoadedInit] = useState(false)
  const { toast } = useToast()

  if(!user) {
      return (
          <div>
          </div>
      );
  }

  const router = useRouter()

  if(loadedInit === false) {
    if(user) {
      setLoadedInit(true)
      if(user.email_verified_at === null) {
        setCurrentPage('verify-email');
      } else {
        if(router.query.verified) {
           setCurrentPage('verify-email');
           toast({
              title: "Verify Email",
              description: "You have succesfully verified your e-mail!",
            })
        } else {
          setCurrentPage('change-email');
        }
      }

    }
  }

  return (
          <div className="overflow-hidden">
            <div className="p-0">
              <div className="rounded-md transition-all">
                <div className="lg:grid lg:grid-cols-4 xl:grid-cols-5">
                  <aside className="hidden lg:block pb-12">
                    <div className="px-8 py-6">
                      <p className="flex items-center text-2xl font-semibold tracking-tight">
                          Profile
                      </p>
                    </div>
                    <div className="space-y-4">
                      <div className="px-6 py-2">
                        <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">
                          Security
                        </h2>
                        <div className="space-y-1">
                                <Button
                                  variant={currentPage === "change-email" ? "subtle" : "ghost"}
                                  size="sm"
                                  onClick={event => setCurrentPage('change-email')}
                                  className="w-full justify-start"
                                  >
                                  <LayoutGrid className="mr-2 h-4 w-4" />
                                  Change E-mail
                                </Button>
                                {user.email_verified_at ?
                                    <Button
                                      variant={currentPage === "verify-email" ? "subtle" : "ghost"}
                                      size="sm"
                                      className="w-full justify-start"
                                      onClick={event => setCurrentPage('verify-email')}
                                      >
                                      <Verified className="mr-2 h-4 w-4 text-green-50" />Verify Email
                                    </Button>
                                     :
                                    <Button
                                      variant={currentPage === "verify-email" ? "subtle" : "ghost"}
                                      size="sm"
                                      onClick={event => setCurrentPage('verify-email')}
                                      className="w-full justify-start"
                                      >
                                      <Verified className="mr-2 h-4 w-4" />
                                      Verify Email <ProfileIndicator dotWrapClass="relative top-0" dotInnerClass="bg-red-400"/>
                                    </Button>
                                }
                          <Button
                            variant={currentPage === "change-password" ? "subtle" : "ghost"}
                            size="sm"
                            onClick={event => setCurrentPage('change-password')}
                            className="w-full justify-start"
                            >
                            <Key className="mr-2 h-4 w-4" />
                            Change Password
                          </Button>
                        </div>
                      </div>
                      <div className="px-6 py-2">
                        <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">
                          Profile
                        </h2>
                        <div className="space-y-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="w-full justify-start"
                            >
                            <ListMusic className="mr-2 h-4 w-4" />
                            Overview
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="w-full justify-start"
                            >
                            <Music2 className="mr-2 h-4 w-4" />
                            Achievements
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="w-full justify-start"
                            >
                            <User className="mr-2 h-4 w-4" />
                            Privacy Settings
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="w-full justify-start"
                            >
                            <Mic2 className="mr-2 h-4 w-4" />
                            Bonus
                          </Button>
                        </div>
                      </div>
                    </div>
                  </aside>
                  <div className="w-full lg:col-span-3 lg:border-l lg:border-l-slate-200 dark:border-l-slate-700 xl:col-span-4">
                    <div className="h-full px-8 py-6">
                      <Tabs value={currentPage} className="h-full space-y-6">
                        <div className="space-between flex items-center">
                          <TabsList>
                            <TabsTrigger onClick={event => setCurrentPage('change-email')} value="change-email">Change Email</TabsTrigger>
                            <TabsTrigger onClick={event => setCurrentPage('verify-email')} value="verify-email" id="verify-email" className="relative">
                              Verify Email
                            </TabsTrigger>
                            <TabsTrigger value="change-password" onClick={event => setCurrentPage('change-password')}>
                              Change Password
                            </TabsTrigger>
                          </TabsList>
                          <div className="hidden md:block ml-auto mr-4">
                            <h3 className="text-sm font-semibold">{user.name}'s profile</h3>
                          </div>
                        </div>
                        <TabsContent
                          value="verify-email"
                          className="h-full flex-col border-none p-0 data-[state=active]:flex"
                          >
                          <div className="flex items-center justify-between">
                            <div className="space-y-1">
                              <h2 className="text-2xl font-semibold tracking-tight">
                                Verify E-mail
                              </h2>
                              <p className="text-sm text-slate-500 dark:text-slate-400">
                                Make sure to verify your email for your own account security.
                              </p>
                            </div>
                          </div>
                          <Separator className="my-4" />
                          <div className="flex h-[450px] shrink-0 items-center justify-center rounded-md border border-dashed border-slate-200 dark:border-slate-700">
                            <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
                                <Verified className={(user.email_verified_at ? "text-green-500" : "text-red-500") + " h-10 w-10 text-slate-400"} />
                                <h3 className="mt-4 text-lg font-semibold text-slate-900 dark:text-slate-50">
                                  Email Verification
                                </h3>
                                <p className="mt-2 mb-4 text-sm text-slate-500 dark:text-slate-400">
                                   {user.email_verified_at ? "You have succesfully verified your e-mail address." : <EmailVerificationRequest />}
                                </p>
                            </div>
                          </div>
                        </TabsContent>
                        <TabsContent
                          value="change-password"
                          className="h-full flex-col border-none p-0 data-[state=active]:flex"
                          >
                          <div className="flex items-center justify-between">
                            <div className="space-y-1">
                              <h2 className="text-2xl font-semibold tracking-tight">
                                Change Password
                              </h2>
                              <p className="text-sm text-slate-500 dark:text-slate-400">
                                To change your password you need to have verified your e-mail address.
                              </p>
                            </div>
                          </div>
                          <Separator className="my-4" />
                          <div className="flex h-[450px] shrink-0 items-center justify-center rounded-md border border-dashed border-slate-200 dark:border-slate-700">
                            <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
                              <Key className="h-10 w-10 text-slate-400" />
                              <h3 className="mt-4 text-lg font-semibold text-slate-900 dark:text-slate-50">
                                Change Password
                              </h3>
                              <p className="text-sm text-slate-500 dark:text-slate-400">
                                 We will send you an e-mail that contains a magic link which allows to change your password.
                              </p>
                              <p className="mt-2 mb-4 text-sm text-slate-500 dark:text-slate-400">
                                <ChangePasswordRequest />
                              </p>
                            </div>
                          </div>
                        </TabsContent>
                        <TabsContent
                          value="change-email"
                          className="h-full flex-col border-none p-0 data-[state=active]:flex"
                          >
                          <div className="flex items-center justify-between">
                            <div className="space-y-1">
                              <h2 className="text-2xl font-semibold tracking-tight">
                                Change Email
                              </h2>
                              <p className="text-sm text-slate-500 dark:text-slate-400">
                                Change your registered email.
                              </p>
                            </div>
                          </div>
                          <Separator className="my-4" />
                          <div className="flex h-[450px] shrink-0 items-center justify-center rounded-md border border-dashed border-slate-200 dark:border-slate-700">
                            <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
                              <Podcast className="h-10 w-10 text-slate-400" />
                              <h3 className="mt-4 text-lg font-semibold text-slate-900 dark:text-slate-50">
                                Change E-mail
                              </h3>
                              <p className="mt-2 mb-4 text-sm text-slate-500 dark:text-slate-400">
                                <EmailChangeRequest />
                              </p>
                            </div>
                          </div>
                        </TabsContent>
                      </Tabs>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          )
}

interface AlbumArtworkProps extends React.HTMLAttributes<HTMLDivElement> {
  album: Album
  aspectRatio?: number
}

function AlbumArtwork({
  album,
  aspectRatio = 3 / 4,
  className,
  ...props
}: AlbumArtworkProps) {
  return (
          <div className={cn("space-y-3", className)} {...props}>
            <ContextMenu>
              <ContextMenuTrigger>
                <AspectRatio
                  ratio={aspectRatio}
                  className="overflow-hidden rounded-md"
                  >
                  <Image
                    src={album.cover}
                    alt={album.name}
                    fill
                    className="object-cover transition-all hover:scale-105"
                  />
                </AspectRatio>
              </ContextMenuTrigger>
              <ContextMenuContent className="w-40">
                <ContextMenuItem>Add to Library</ContextMenuItem>
                <ContextMenuSub>
                  <ContextMenuSubTrigger>Add to Playlist</ContextMenuSubTrigger>
                  <ContextMenuSubContent className="w-48">
                    <ContextMenuItem>
                      <PlusCircle className="mr-2 h-4 w-4" />
                      New Playlist
                    </ContextMenuItem>
                    <ContextMenuSeparator />
                    {playlists.map((playlist) => (
                            <ContextMenuItem key={playlist}>
                              <ListMusic className="mr-2 h-4 w-4" /> {playlist}
                            </ContextMenuItem>
                            ))}
                  </ContextMenuSubContent>
                </ContextMenuSub>
                <ContextMenuSeparator />
                <ContextMenuItem>Play Next</ContextMenuItem>
                <ContextMenuItem>Play Later</ContextMenuItem>
                <ContextMenuItem>Create Station</ContextMenuItem>
                <ContextMenuSeparator />
                <ContextMenuItem>Like</ContextMenuItem>
                <ContextMenuItem>Share</ContextMenuItem>
              </ContextMenuContent>
            </ContextMenu>
            <div className="space-y-1 text-sm">
              <h3 className="font-medium leading-none">{album.name}</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {album.artist}
              </p>
            </div>
          </div>
          )
}

interface ProfileIndicatorProps {
  dotWrapClass: string
  dotPingClass: string
  dotInnerClass: string
}
export function ProfileIndicator({ ...ProfileIndicatorProps }: ProfileIndicatorProps) {
  return (
          <span
            className={cn(
                    "absolute top-2 right-0 flex h-4 w-4 items-center justify-center",
                    ProfileIndicatorProps.dotWrapClass
                    )}
            >
            <span
              className={cn(
                    "absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75",
                    ProfileIndicatorProps.dotPingClass
                    )}
            />
            <span
              className={cn(
                    "relative inline-flex h-2 w-2 rounded-full bg-sky-500",
                    ProfileIndicatorProps.dotInnerClass
                    )}
            />
          </span>
          )
}

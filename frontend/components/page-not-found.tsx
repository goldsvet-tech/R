"use client"

import * as React from 'react';
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header"
import {
  Home,
  Shield,
} from "lucide-react"
import { useRouter } from 'next/navigation'
import { buttonVariants } from "@/components/ui/button"
import Link from "next/link"
import { cn } from "@/lib/utils"

export default function PageNotFoundContainer() {

  return (
    <div className="flex h-[75vh] flex-col">
      <div className="flex flex-1 justify-center items-center">
    <PageHeader>
      <PageHeaderHeading>Whatdafuck?</PageHeaderHeading>
      <PageHeaderDescription>
         Page not found, if this keeps occuring please contact support.
         <PageNotFoundButtons />
      </PageHeaderDescription>

    </PageHeader>
     </div></div>
  )
}

export function PageNotFoundButtons() {
    const router = useRouter()

    return (
        <div className="mx-0 px-0 mt-4 mb-4 flex">
        <Link href="/" className={cn(buttonVariants({ variant: "secondary", size: "default" }))}>
        <Home className="mr-2 h-4 w-4" />
              Home
        </Link>
        <Link href="/help" className={"ml-2 " + cn(buttonVariants({ variant: "secondary", size: "default" }))}>
         <Shield className="mr-2 h-4 w-4" />
            Support
        </Link>
        </div>
    )

}




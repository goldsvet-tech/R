"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"

export function HeaderNav() {
  const pathname = usePathname()
  return (
    <div className="hidden md:flex">
      <Link href="/" className="mr-2 sm:mr-4 flex items-center space-x-2">
        <Icons.logo className="h-5 w-5" />
        <span className="hidden font-bold lg:inline-block">
          {siteConfig.header.long}
        </span>
        <span className="hidden font-bold md:inline-block lg:hidden">
          {siteConfig.header.medium}
        </span>
      </Link>
      <nav className="flex items-center space-x-6 text-sm font-medium">
        <Link
          href={(pathname === '/' ? '#' : '/')}
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname?.startsWith("/")
            ? "text-foreground"
            : "disabled text-foreground/70 "
          )}
        >
          Home
        </Link>
        <Link
          href={(pathname === '/bonus' ? '#' : '/bonus')}
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname?.startsWith("/bonus")
            ? "text-foreground"
            : "disabled text-foreground/70 "
          )}
        >
          Bonus
        </Link>
      </nav>
    </div>
  )
}

"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { ThemeProviderProps } from "next-themes/dist/types"
import { useAuth } from "@/hooks/auth";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const { user } = useAuth({ middleware: "guest" });

  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}

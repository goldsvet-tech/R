import * as React from 'react';
import { StyleSwitcher } from "@/components/style-switcher"
import PageNotFoundContainer from "@/components/page-not-found"

export default function NotFoundPage() {
  return (
    <div className="container flex justify-center">
      <StyleSwitcher />
      <PageNotFoundContainer />
     </div>
  )
}
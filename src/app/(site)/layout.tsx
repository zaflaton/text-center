import Header from '@/components/landing-page/header'
import React from 'react'

export default function HomePageLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  )
}

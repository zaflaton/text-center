import MobileSidebar from '@/components/sidebar/mobile-sidebar'
import Sidebar from '@/components/sidebar/sidebar'
import React from 'react'

type Props = {
  children: React.ReactNode
  params: any
}

export default function Layout({ children, params }: Props) {
  return (
    <main className="flex h-screen w-screen overflow-hidden">
      <Sidebar params={params} />
      <MobileSidebar>
        <Sidebar params={params} className="inline-block w-screen sm:hidden" />
      </MobileSidebar>
      <div className="relative w-full overflow-y-auto border-l">{children}</div>
    </main>
  )
}

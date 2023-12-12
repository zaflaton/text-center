'use client'
import { Menu } from 'lucide-react'
import { useState } from 'react'
import CypressPageIcon from '../icons/cypressPageIcon'
import { cn } from '@/lib/utils'

type MobileSidebarProps = {
  children: React.ReactNode
}

export const nativeNavigation = [
  {
    title: 'Sidebar',
    id: 'sidebar',
    customIcon: Menu,
  },
  {
    title: 'Pages',
    id: 'pages',
    customIcon: CypressPageIcon,
  },
] as const

export default function MobileSidebar({ children }: MobileSidebarProps) {
  const [selectedNav, setSelectedNav] = useState('')
  return (
    <>
      {selectedNav === 'sidebar' && <>{children}</>}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-black/10  backdrop-blur-lg sm:hidden">
        <ul className="flex items-center justify-between p-4">
          {nativeNavigation.map((item) => (
            <li
              className="flex flex-col items-center justify-center"
              key={item.id}
              onClick={() => {
                setSelectedNav(item.id)
              }}
            >
              <item.customIcon />
            </li>
          ))}
        </ul>
      </nav>
    </>
  )
}

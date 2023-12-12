import Link from 'next/link'
import { cn } from '@/lib/utils'
import CypressHomeIcon from '../icons/cypressHomeIcon'
import CypressSettingsIcon from '../icons/cypressSettingsIcon'
import CypressTrashIcon from '../icons/cypressTrashIcon'
import Settings from '../settings/settings'
import Trash from '../trash/trash'

type NativeNavigationProps = {
  myWorkspaceId: string
  className?: string
}

export default function NativeNavigation({
  myWorkspaceId,
  className,
}: NativeNavigationProps) {
  return (
    <nav className={cn('my-2', className)}>
      <ul className="flex flex-col gap-2">
        <li>
          <Link
            className="group/native flex gap-2 transition-all"
            href={`/dashboard/${myWorkspaceId}`}
          >
            <CypressHomeIcon />
            <span>My Workspace</span>
          </Link>
        </li>

        <Settings>
          <li className="group/native flex cursor-pointer gap-2 transition-all">
            <CypressSettingsIcon />
            <span>Settings</span>
          </li>
        </Settings>

        <Trash>
          <li className="group/native flex gap-2 transition-all">
            <CypressTrashIcon />
            <span>Trash</span>
          </li>
        </Trash>
      </ul>
    </nav>
  )
}

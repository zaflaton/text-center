import { cn } from '@/lib/utils'
import {
  getCollaboratingWorkspaces,
  getFolders,
  getPrivateWorkspaces,
  getSharedWorkspaces,
  getUserSubscriptionStatus,
} from '@/supabase/queries'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import WorkspaceDropdown from './workspace-dropdown'
import PlanUsage from './plan-usage'
import { ScrollArea } from '../ui/scroll-area'
import NativeNavigation from './native-navigation'
import FoldersDropdownList from './folders-dropdown-list'
import UserCard from './user-card'

type SidebarProps = {
  params: { workspaceId: string }
  className?: string
}

export default async function Sidebar({ params, className }: SidebarProps) {
  const supabase = createServerComponentClient({ cookies })

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return

  const { data: subscriptionData, error: subscriptionError } =
    await getUserSubscriptionStatus(user.id)

  const { data: workspaceFolderData, error: foldersError } = await getFolders(
    params.workspaceId,
  )

  if (subscriptionError || foldersError) redirect('/dashboard')

  const [privateWorkspaces, collaboratingWorkspaces, sharedWorkspaces] =
    await Promise.all([
      getPrivateWorkspaces(user.id),
      getCollaboratingWorkspaces(user.id),
      getSharedWorkspaces(user.id),
    ])

  return (
    <aside
      className={cn(
        'hidden w-[280px] shrink-0 !justify-between p-4 sm:flex sm:flex-col md:gap-4',
        className,
      )}
    >
      <>
        <WorkspaceDropdown
          privateWorkspaces={privateWorkspaces}
          sharedWorkspaces={sharedWorkspaces}
          collaboratingWorkspaces={collaboratingWorkspaces}
          defaultValue={[
            ...privateWorkspaces,
            ...collaboratingWorkspaces,
            ...sharedWorkspaces,
          ].find((workspace) => workspace.id === params.workspaceId)}
        />
        <PlanUsage
          foldersLength={workspaceFolderData?.length || 0}
          subscription={subscriptionData}
        />
        <NativeNavigation myWorkspaceId={params.workspaceId} />
        <ScrollArea className="relative h-[300px] overflow-y-auto">
          <div className="pointer-events-none absolute bottom-0 z-40 h-20 w-full bg-gradient-to-t from-background to-transparent" />
          <FoldersDropdownList
            workspaceFolders={workspaceFolderData || []}
            workspaceId={params.workspaceId}
          />
        </ScrollArea>
      </>
      <UserCard subscription={subscriptionData} />
    </aside>
  )
}

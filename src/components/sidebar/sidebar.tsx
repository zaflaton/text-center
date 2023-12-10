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
      </>
    </aside>
  )
}

import DashboardSetup from '@/components/dashboard/dashboard-setup'
import db from '@/supabase/db'
import { getUserSubscriptionStatus } from '@/supabase/queries'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function DashboardPage() {
  const supabase = createServerComponentClient({ cookies })

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return
  const workspace = await db.query.workspaces.findFirst({
    where: (workspace, { eq }) => eq(workspace.workspaceOwner, user.id),
  })

  const { data: subscription, error: subscriptionError } =
    await getUserSubscriptionStatus(user.id)

  if (subscriptionError) return

  if (!workspace)
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-background">
        <DashboardSetup user={user} subscription={subscription} />
      </div>
    )

  redirect(`/dashboard/${workspace.id}`)
}

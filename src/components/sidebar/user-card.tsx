import { Subscription } from '@/supabase/supabase.types'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import db from '@/supabase/db'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import CypressProfileIcon from '../icons/cypressProfileIcon'
import ModeToggle from '../shared/mode-toggle'
import { LogOut } from 'lucide-react'
import LogoutButton from '../shared/logout-button'

type UserCardProps = {
  subscription: Subscription | null
}

export default async function UserCard({ subscription }: UserCardProps) {
  const supabase = createServerComponentClient({ cookies })
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return
  const response = await db.query.users.findFirst({
    where: (u, { eq }) => eq(u.id, user.id),
  })
  let avatarPath
  if (!response) return
  if (!response.avatarUrl) avatarPath = ''
  else {
    avatarPath = supabase.storage
      .from('avatars')
      .getPublicUrl(response.avatarUrl)?.data.publicUrl
  }
  const profile = {
    ...response,
    avatarUrl: avatarPath,
  }

  return (
    <article className="dark:bg-Neutrals/neutrals-12 hidden flex-col gap-4 rounded-3xl sm:flex">
      <aside className="flex items-center gap-2">
        <Avatar>
          <AvatarImage src={profile.avatarUrl} />
          <AvatarFallback>
            <CypressProfileIcon />
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="text-muted-foreground">
            {subscription?.status === 'active' ? 'Pro Plan' : 'Free Plan'}
          </span>
          <small className="overflow-hidden overflow-ellipsis">
            {profile.email}
          </small>
        </div>
      </aside>
      <div className="flex items-center justify-between">
        <LogoutButton>
          <LogOut />
        </LogoutButton>
        <ModeToggle />
      </div>
    </article>
  )
}

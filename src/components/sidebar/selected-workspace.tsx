'use client'

import { workspace } from '@/supabase/supabase.types'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

type SelectedWorkspaceProps = {
  workspace: workspace
  onClick?: (option: workspace) => void
}

export default function SelectedWorkspace({
  workspace,
  onClick,
}: SelectedWorkspaceProps) {
  const supabase = createClientComponentClient()
  const [workspaceLogo, setWorkspaceLogo] = useState('/cypresslogo.svg')
  useEffect(() => {
    if (workspace.logo) {
      const path = supabase.storage
        .from('workspace-logos')
        .getPublicUrl(workspace.logo)?.data.publicUrl
      setWorkspaceLogo(path)
    }
  }, [supabase.storage, workspace])
  return (
    <Link
      href={`/dashboard/${workspace.id}`}
      onClick={() => {
        if (onClick) onClick(workspace)
      }}
      className="flex cursor-pointer flex-row items-center gap-4 rounded-md border p-2 transition-all hover:bg-muted"
    >
      <Image
        src={workspaceLogo}
        alt="workspace logo"
        width={26}
        height={26}
        objectFit="cover"
      />
      <div className="flex flex-col">
        <p className="overflow-hidden overflow-ellipsis whitespace-nowrap text-lg">
          {workspace.title}
        </p>
      </div>
    </Link>
  )
}

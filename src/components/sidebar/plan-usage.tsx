'use client'

import { useEffect, useState } from 'react'
import { useAppState } from '@/providers/state-provider'
import { Subscription } from '@/supabase/supabase.types'
import { MAX_FOLDERS_FREE_PLAN } from '@/lib/constants'
import { Progress } from '../ui/progress'
import CypressDiamondIcon from '../icons/cypressDiamondIcon'

type PlanUsageProps = {
  foldersLength: number
  subscription: Subscription | null
}

export default function PlanUsage({
  foldersLength,
  subscription,
}: PlanUsageProps) {
  const { workspaceId, state } = useAppState()
  const [usagePercentage, setUsagePercentage] = useState(
    (foldersLength / MAX_FOLDERS_FREE_PLAN) * 100,
  )

  useEffect(() => {
    const stateFoldersLength = state.workspaces.find(
      (workspace) => workspace.id === workspaceId,
    )?.folders.length
    if (stateFoldersLength === undefined) return
    setUsagePercentage((stateFoldersLength / MAX_FOLDERS_FREE_PLAN) * 100)
  }, [state, workspaceId])

  return (
    <article className="mb-4">
      {subscription?.status !== 'active' && (
        <div className="mb-2 flex items-center gap-2 text-muted-foreground">
          <div className="h-4 w-4">
            <CypressDiamondIcon />
          </div>
          <div className="flex w-full items-center justify-between">
            <div>Free Plan</div>
            <small>{usagePercentage.toFixed(0)}% / 100%</small>
          </div>
        </div>
      )}
      {subscription?.status !== 'active' && (
        <Progress value={usagePercentage} className="h-1" />
      )}
    </article>
  )
}

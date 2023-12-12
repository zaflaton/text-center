'use client'
import { useAppState } from '@/providers/state-provider'
import { Folder } from '@/supabase/supabase.types'
import React, { useEffect, useState } from 'react'
import TooltipComponent from '../shared/tooltip-component'
import { PlusIcon } from 'lucide-react'
import { useSupabaseUser } from '@/providers/supabase-user-provider'
import { v4 } from 'uuid'
import { createFolder } from '@/supabase/queries'

import { Accordion } from '../ui/accordion'
import { useToast } from '../ui/use-toast'
import Dropdown from './Dropdown'
import useSupabaseRealtime from '@/hooks/useSupabaseRealtime'
import { useSubscriptionModal } from '@/providers/subscription-modal-provider'

type FoldersDropdownListProps = {
  workspaceFolders: Folder[]
  workspaceId: string
}

export default function FoldersDropdownList({
  workspaceFolders,
  workspaceId,
}: FoldersDropdownListProps) {
  useSupabaseRealtime()
  const { state, dispatch, folderId } = useAppState()
  const { open, setOpen } = useSubscriptionModal()
  const { toast } = useToast()
  const [folders, setFolders] = useState(workspaceFolders)
  const { subscription } = useSupabaseUser()

  useEffect(() => {
    if (workspaceFolders.length > 0) {
      dispatch({
        type: 'SET_FOLDERS',
        payload: {
          workspaceId,
          folders: workspaceFolders.map((folder) => ({
            ...folder,
            files:
              state.workspaces
                .find((workspace) => workspace.id === workspaceId)
                ?.folders.find((f) => f.id === folder.id)?.files || [],
          })),
        },
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [workspaceFolders, workspaceId])

  useEffect(() => {
    setFolders(
      state.workspaces.find((workspace) => workspace.id === workspaceId)
        ?.folders || [],
    )
  }, [state, workspaceId])

  const addFolderHandler = async () => {
    if (folders.length >= 3 && !subscription) {
      setOpen(true)
      return
    }
    const newFolder: Folder = {
      data: null,
      id: v4(),
      createdAt: new Date().toISOString(),
      title: 'Untitled',
      iconId: '📄',
      inTrash: null,
      workspaceId,
      bannerUrl: '',
    }
    dispatch({
      type: 'ADD_FOLDER',
      payload: { workspaceId, folder: { ...newFolder, files: [] } },
    })
    const { data, error } = await createFolder(newFolder)
    if (error) {
      toast({
        title: 'Error',
        variant: 'destructive',
        description: 'Could not create the folder',
      })
    } else {
      toast({
        title: 'Success',
        description: 'Created folder.',
      })
    }
  }

  return (
    <>
      <div className="group/title sticky top-0 z-20 flex h-10 w-full items-center justify-between  bg-background pr-4">
        <span className="text-xs font-bold">FOLDERS</span>
        <TooltipComponent message="Create Folder">
          <PlusIcon
            onClick={addFolderHandler}
            size={16}
            className="hidden cursor-pointer group-hover/title:inline-block hover:dark:text-white"
          />
        </TooltipComponent>
      </div>
      <Accordion
        type="multiple"
        defaultValue={[folderId || '']}
        className="pb-20"
      >
        {folders
          .filter((folder) => !folder.inTrash)
          .map((folder) => (
            <Dropdown
              key={folder.id}
              title={folder.title}
              listType="folder"
              id={folder.id}
              iconId={folder.iconId}
            />
          ))}
      </Accordion>
    </>
  )
}

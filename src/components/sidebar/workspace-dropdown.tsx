'use client'

import { useAppState } from '@/providers/state-provider'
import { workspace } from '@/supabase/supabase.types'

import { useEffect, useState } from 'react'
import SelectedWorkspace from './selected-workspace'
import CustomDialogTrigger from '../shared/custom-dialog'
import WorkspaceCreator from '../shared/workspace-creator'
import { Plus } from 'lucide-react'

type WorkspaceDropdownProps = {
  privateWorkspaces: workspace[] | []
  sharedWorkspaces: workspace[] | []
  collaboratingWorkspaces: workspace[] | []
  defaultValue: workspace | undefined
}

export default function WorkspaceDropdown({
  privateWorkspaces,
  collaboratingWorkspaces,
  sharedWorkspaces,
  defaultValue,
}: WorkspaceDropdownProps) {
  const { dispatch, state } = useAppState()
  const [selectedOption, setSelectedOption] = useState(defaultValue)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (!state.workspaces.length) {
      dispatch({
        type: 'SET_WORKSPACES',
        payload: {
          workspaces: [
            ...privateWorkspaces,
            ...sharedWorkspaces,
            ...collaboratingWorkspaces,
          ].map((workspace) => ({ ...workspace, folders: [] })),
        },
      })
    }
  }, [
    privateWorkspaces,
    collaboratingWorkspaces,
    sharedWorkspaces,
    state.workspaces.length,
    dispatch,
  ])

  const handleSelect = (option: workspace) => {
    setSelectedOption(option)
    setIsOpen(false)
  }

  useEffect(() => {
    const findSelectedWorkspace = state.workspaces.find(
      (workspace) => workspace.id === defaultValue?.id,
    )
    if (findSelectedWorkspace) setSelectedOption(findSelectedWorkspace)
  }, [state, defaultValue])

  return (
    <div className="relative inline-block text-left">
      <div className=" mb-2 ">
        <span onClick={() => setIsOpen(!isOpen)}>
          {selectedOption ? (
            <SelectedWorkspace workspace={selectedOption} />
          ) : (
            'Select a workspace'
          )}
        </span>
      </div>
      {isOpen && (
        <div className="group absolute z-50 h-fit w-full origin-top-right overflow-y-auto rounded-md border border-muted shadow-md backdrop-blur-lg">
          <div className="flex flex-col p-2">
            <div className="flex flex-col gap-2">
              {!!privateWorkspaces.length && (
                <div className="flex flex-col gap-2 rounded-md border p-2">
                  <p className=" text-muted-foreground">Private</p>
                  <hr />
                  {privateWorkspaces.map((option) => (
                    <SelectedWorkspace
                      key={option.id}
                      workspace={option}
                      onClick={handleSelect}
                    />
                  ))}
                </div>
              )}
              {!!sharedWorkspaces.length && (
                <div className="mb-2 rounded-md border p-2">
                  <p className="pb-2 text-muted-foreground">Shared</p>
                  <hr />
                  {sharedWorkspaces.map((option) => (
                    <SelectedWorkspace
                      key={option.id}
                      workspace={option}
                      onClick={handleSelect}
                    />
                  ))}
                </div>
              )}
              {!!collaboratingWorkspaces.length && (
                <div className="mb-2 rounded-md border p-2">
                  <p className="text-muted-foreground">Collaborating</p>
                  <hr />
                  {collaboratingWorkspaces.map((option) => (
                    <SelectedWorkspace
                      key={option.id}
                      workspace={option}
                      onClick={handleSelect}
                    />
                  ))}
                </div>
              )}
            </div>
            <CustomDialogTrigger
              header="Create A Workspace"
              content={<WorkspaceCreator />}
              description="Workspaces give you the power to collaborate with others. You can change your workspace privacy settings after creating the workspace too."
            >
              <div className="flex w-full items-center justify-center gap-2 rounded-md border p-2 transition-all hover:bg-muted">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-800 text-slate-500">
                  <Plus className="h-4 w-4" />
                </span>
                Create workspace
              </div>
            </CustomDialogTrigger>
          </div>
        </div>
      )}
    </div>
  )
}

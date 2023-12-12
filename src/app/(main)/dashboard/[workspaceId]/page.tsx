export const dynamic = 'force-dynamic'

import QuillEditor from '@/components/quill-editor/quill-editor'
import { getWorkspaceDetails } from '@/supabase/queries'
import { redirect } from 'next/navigation'

export default async function WorkspacePage({
  params,
}: {
  params: { workspaceId: string }
}) {
  const { data, error } = await getWorkspaceDetails(params.workspaceId)
  if (error || !data.length) redirect('/dashboard')
  return (
    <div className="relative">
      <QuillEditor
        dirType="workspace"
        fileId={params.workspaceId}
        dirDetails={data[0] || {}}
      />
    </div>
  )
}

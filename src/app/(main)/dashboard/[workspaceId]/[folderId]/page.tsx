export const dynamic = 'force-dynamic'

import React from 'react'
import QuillEditor from '@/components/quill-editor/quill-editor'
import { getFolderDetails } from '@/supabase/queries'
import { redirect } from 'next/navigation'

export default async function Folder({
  params,
}: {
  params: { folderId: string }
}) {
  const { data, error } = await getFolderDetails(params.folderId)
  if (error || !data.length) redirect('/dashboard')

  return (
    <div className="relative ">
      <QuillEditor
        dirType="folder"
        fileId={params.folderId}
        dirDetails={data[0] || {}}
      />
    </div>
  )
}

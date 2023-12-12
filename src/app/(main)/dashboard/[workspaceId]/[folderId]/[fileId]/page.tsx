export const dynamic = 'force-dynamic'

import React from 'react'
import QuillEditor from '@/components/quill-editor/quill-editor'
import { getFileDetails } from '@/supabase/queries'
import { redirect } from 'next/navigation'

export default async function File({ params }: { params: { fileId: string } }) {
  const { data, error } = await getFileDetails(params.fileId)
  if (error || !data.length) redirect('/dashboard')

  return (
    <div className="relative ">
      <QuillEditor
        dirType="file"
        fileId={params.fileId}
        dirDetails={data[0] || {}}
      />
    </div>
  )
}

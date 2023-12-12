import { appFoldersType, appWorkspacesType } from '@/providers/state-provider'
import { Folder, workspace } from '@/supabase/supabase.types'
import CustomDialogTrigger from '../shared/custom-dialog'
import BannerUploadForm from './banner-upload-form'

type BannerUploadProps = {
  children: React.ReactNode
  className?: string
  dirType: 'workspace' | 'file' | 'folder'
  id: string
}

export default function BannerUpload({
  id,
  dirType,
  children,
  className,
}: BannerUploadProps) {
  return (
    <CustomDialogTrigger
      header="Upload Banner"
      content={<BannerUploadForm dirType={dirType} id={id} />}
      className={className}
    >
      {children}
    </CustomDialogTrigger>
  )
}

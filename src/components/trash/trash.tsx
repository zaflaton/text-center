import CustomDialogTrigger from '../shared/custom-dialog'
import TrashRestore from './trash-restore'

type TrashProps = {
  children: React.ReactNode
}

export default function Trash({ children }: TrashProps) {
  return (
    <CustomDialogTrigger header="Trash" content={<TrashRestore />}>
      {children}
    </CustomDialogTrigger>
  )
}

import CustomDialogTrigger from '../shared/custom-dialog'
import SettingsForm from './settings-form'

type SettingsProps = {
  children: React.ReactNode
}

export default function Settings({ children }: SettingsProps) {
  return (
    <CustomDialogTrigger header="Settings" content={<SettingsForm />}>
      {children}
    </CustomDialogTrigger>
  )
}

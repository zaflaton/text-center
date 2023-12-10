import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { cn } from '@/lib/utils'

type CustomDialogTriggerProps = {
  header?: string
  content?: React.ReactNode
  children: React.ReactNode
  description?: string
  className?: string
}

export default function CustomDialogTrigger({
  header,
  content,
  children,
  description,
  className,
}: CustomDialogTriggerProps) {
  return (
    <Dialog>
      <DialogTrigger className={cn('', className)}>{children}</DialogTrigger>
      <DialogContent className="block h-screen w-full overflow-auto sm:h-[450px]">
        <DialogHeader>
          <DialogTitle>{header}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {content}
      </DialogContent>
    </Dialog>
  )
}

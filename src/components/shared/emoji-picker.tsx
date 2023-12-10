import dynamic from 'next/dynamic'

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

interface Props {
  children: React.ReactNode
  getValue?: (emoji: string) => void
}

export default function EmojiPicker({ children, getValue }: Props) {
  const Picker = dynamic(() => import('emoji-picker-react'))
  const onClick = (selectedEmoji: any) => {
    if (getValue) getValue(selectedEmoji.emoji)
  }
  return (
    <div className="flex items-center">
      <Popover>
        <PopoverTrigger className="cursor-pointer">{children}</PopoverTrigger>
        <PopoverContent className="border-none p-0">
          <Picker onEmojiClick={onClick} />
        </PopoverContent>
      </Popover>
    </div>
  )
}

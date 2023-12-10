'use client'
import { useSupabaseUser } from '@/providers/supabase-user-provider'
import { User } from '@/supabase/supabase.types'
import React, { useEffect, useRef, useState } from 'react'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Search } from 'lucide-react'
import { Input } from '../ui/input'
import { ScrollArea } from '../ui/scroll-area'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Button } from '../ui/button'
import { getUsersFromSearch } from '@/supabase/queries'

type CollaboratorSearchProps = {
  existingCollaborators: User[] | []
  getCollaborator: (collaborator: User) => void
  children: React.ReactNode
}

export default function CollaboratorSearch({
  children,
  existingCollaborators,
  getCollaborator,
}: CollaboratorSearchProps) {
  const { user } = useSupabaseUser()
  const [searchResults, setSearchResults] = useState<User[] | []>([])
  const timerRef = useRef<ReturnType<typeof setTimeout>>()

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [])

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (timerRef) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(async () => {
      const res = await getUsersFromSearch(e.target.value)
      setSearchResults(res)
    }, 450)
  }

  const addCollaborator = (user: User) => {
    getCollaborator(user)
  }

  return (
    <Sheet>
      <SheetTrigger className="w-full">{children}</SheetTrigger>
      <SheetContent className="w-[400px] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle>Search Collaborator</SheetTitle>
          <SheetDescription>
            <p className="text-sm text-muted-foreground">
              You can also remove collaborators after adding them from the
              settings tab.
            </p>
          </SheetDescription>
        </SheetHeader>
        <div className="mt-2 flex items-center justify-center gap-2">
          <Search />
          <Input
            name="name"
            className="bg-background"
            placeholder="Email"
            onChange={onChangeHandler}
          />
        </div>
        <ScrollArea className="mt-6 w-full overflow-y-auto rounded-md">
          {searchResults
            .filter(
              (result) =>
                !existingCollaborators.some(
                  (existing) => existing.id === result.id,
                ),
            )
            .filter((result) => result.id !== user?.id)
            .map((user) => (
              <div
                key={user.id}
                className=" flex items-center justify-between p-4"
              >
                <div className="flex items-center gap-4">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/avatars/7.png" />
                    <AvatarFallback>CP</AvatarFallback>
                  </Avatar>
                  <div className="w-[180px] gap-2 overflow-hidden overflow-ellipsis text-sm text-muted-foreground">
                    {user.email}
                  </div>
                </div>
                <Button
                  variant="secondary"
                  onClick={() => addCollaborator(user)}
                >
                  Add
                </Button>
              </div>
            ))}
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}

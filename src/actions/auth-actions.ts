'use server'

import { z } from 'zod'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'

import { cookies } from 'next/headers'
import { FormSchema } from '@/lib/types'

export async function loginAction({
  email,
  password,
}: z.infer<typeof FormSchema>) {
  const supabase = createRouteHandlerClient({ cookies })
  const response = await supabase.auth.signInWithPassword({
    email,
    password,
  })
  return response
}

export async function signUpAction({
  email,
  password,
}: z.infer<typeof FormSchema>) {
  const supabase = createRouteHandlerClient({ cookies })
  const { data } = await supabase
    .from('profiles')
    .select('*')
    .eq('email', email)

  if (data?.length) return { error: { message: 'User already exists', data } }
  const response = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}api/auth/callback`,
    },
  })
  return response
}

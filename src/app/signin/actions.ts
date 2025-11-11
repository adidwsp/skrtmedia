// server action
import { createServerSupabase } from '@/utils/supabase/server'

export async function login(formData: FormData) {
  'use server'
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const supabase = await createServerSupabase()
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  })

  if (error) throw new Error(error.message)
  return data
}

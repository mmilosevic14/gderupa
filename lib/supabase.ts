import { createClient } from '@supabase/supabase-js'

// Environment variables - user needs to set these
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.warn('⚠️  Supabase environment variables are not set')
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

// Types for our data
export type Report = {
  id: string
  title: string
  description: string
  category: string
  latitude: number
  longitude: number
  photo_url?: string
  status: 'pending' | 'in_progress' | 'resolved'
  created_at: string
  updated_at: string
  user_id: string
}

export type User = {
  id: string
  email: string
  role: 'citizen' | 'deputy' | 'admin'
  created_at: string
}

import type { SupabaseClient, User } from '@supabase/supabase-js'

type SyncProfileOptions = {
  fullName?: string
}

export const syncUserProfile = async (
  supabase: SupabaseClient,
  user: User,
  options: SyncProfileOptions = {},
) => {
  const fullName =
    options.fullName ??
    (typeof user.user_metadata?.full_name === 'string'
      ? user.user_metadata.full_name
      : null)

  const { error } = await supabase.from('users').upsert(
    {
      id: user.id,
      email: user.email,
      full_name: fullName,
      role: 'citizen',
    },
    {
      onConflict: 'id',
      ignoreDuplicates: false,
    },
  )

  if (error) {
    throw error
  }
}
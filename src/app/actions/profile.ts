'use server';

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';

export async function updateProfile(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: 'Not authenticated' };

  const inGameName = formData.get('inGameName')?.toString();
  const uid = formData.get('uid')?.toString();
  const timezone = formData.get('timezone')?.toString();

  if (!inGameName || !uid || !timezone) {
    return { error: 'All fields are required.' };
  }

  const { error } = await supabase
    .from('profiles')
    .update({
      in_game_name: inGameName,
      uid: uid,
      timezone: timezone,
    })
    .eq('id', user.id);

  if (error) {
    return { error: 'Failed to update profile.' };
  }

  revalidatePath('/');
  return { success: true };
}

'use server';

import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export async function submitOnboarding(formData: FormData) {
  const supabase = await createClient();
  
  const { data: { user }, error: userError } = await supabase.auth.getUser();
  
  if (userError || !user) {
    redirect('/login');
  }

  const inGameName = formData.get('inGameName')?.toString();
  const uid = formData.get('uid')?.toString();
  const timezone = formData.get('timezone')?.toString();

  if (!inGameName || !uid || !timezone) {
    return { error: 'All fields are required.' };
  }

  // Upsert profile (since the row might not exist yet)
  const discordId = user.user_metadata?.custom_claims?.global_name || user.user_metadata?.full_name || user.email || user.id;

  const { error } = await supabase
    .from('profiles')
    .upsert({
      id: user.id,
      discord_id: discordId,
      in_game_name: inGameName,
      uid: uid,
      timezone: timezone,
    });

  if (error) {
    console.error('Failed to update profile', error);
    return { error: 'Failed to save profile. Please try again.' };
  }

  // Success, redirect to home
  redirect('/');
}

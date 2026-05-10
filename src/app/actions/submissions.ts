'use server';

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';

export async function submitLog(data: {
  category: string;
  menteeIgn?: string;
  menteeUid?: string;
  guideLink?: string;
  requestScreenshotPath?: string;
  matchScreenshotPath?: string;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: 'Not authenticated' };

  const { error } = await supabase
    .from('submissions')
    .insert({
      profile_id: user.id,
      category: data.category,
      mentee_ign: data.menteeIgn || null,
      mentee_uid: data.menteeUid || null,
      guide_link: data.guideLink || null,
      request_screenshot_path: data.requestScreenshotPath || null,
      match_screenshot_path: data.matchScreenshotPath || null,
      status: 'Pending',
    });

  if (error) {
    console.error('Submission error:', error);
    return { error: 'Failed to submit log. Please try again.' };
  }

  revalidatePath('/');
  return { success: true };
}

import prisma from "$lib/prisma";
import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load = (async () => {
  const moods = await prisma.mood.findMany({
    orderBy: { name: 'asc' }
  });
  return { moods };
}) satisfies PageServerLoad;

export const actions = {
    default: async ({ request, locals }) => {
      const auth = await locals.auth();  // Get the session
      
      if (!auth?.user?.email) {
        console.log(auth?.user);
        return fail(401, { error: 'Not authenticated' });
      }

      const user = await prisma.user.findUnique({
        where: {
         email: auth.user.email
        }
      });
      console.log(user);
      const data = await request.formData();
      const title = data.get("title");
      const content = data.get("content");
      const moodId = Number(data.get('moodId'));
      const tags = data.get('tags')?.toString().split(',')
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0);
  
      if (!title || !content || !moodId) {
        return fail(400, { content, title, missing: true });
      }
  
      if (typeof title !== "string" || typeof content !== "string") {
        return fail(400, { incorrect: true });
      }
  
        // First create the entry
        if(user) {
          const entry = await prisma.journalEntry.create({
            data: {
              title,
              content,
              moodId,
              userId: user.id
            }
          });
    
          // Then handle tags separately if they exist
          if (tags && tags.length > 0) {
            for (const tagName of tags) {
              // Find or create tag
              const tag = await prisma.tag.findFirst({
                where: { name: tagName }
              }) || await prisma.tag.create({
                data: { name: tagName, userId: user.id }
              });
    
              // Create the tag-entry relationship
              await prisma.tagOnEntries.create({
                data: {
                  journalEntryId: entry.id,
                  tagId: tag.id
                }
              });
            }
          }
          redirect(303, `entry/${entry.id}`);
        }
    }
  } satisfies Actions;
// src/routes/entry/[id]/+page.server.ts
import { fail, redirect } from '@sveltejs/kit';
import prisma from "$lib/prisma";
import type { Actions, PageServerLoad } from '../$types';

// 1.
export const load = (async ({ params }) => {
    // 2.
    const moods = await prisma.mood.findMany({
        orderBy: { name: 'asc' }
    });

    const entry  = await prisma.journalEntry.findUnique({
        where: { id: Number(params.id) },
        include: {
            tags: { include: { tag: true}},
            mood: true
        }
    });

    // 3.
    return { entry, moods };
}) satisfies PageServerLoad;


export const actions = {
    default: async ({ request, params }) => {
        
      const data = await request.formData();
    
      const id = Number(params.id)
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
        const entry = await prisma.journalEntry.update({
          where: {
            id
          },  
          data: {
            title,
            content,
            moodId,
          }
        });
  
        // Then handle tags separately if they exist
        if (tags && tags.length > 0) {
          for (const tagName of tags) {
            // Find or create tag
            const tag = await prisma.tag.findFirst({
              where: { name: tagName }
            }) || await prisma.tag.create({
              data: { name: tagName }
            });
  
            // Create the tag-entry relationship
            await prisma.tagOnEntries.upsert({
              where: {
                tagId_journalEntryId: {
                  tagId: tag.id,
                  journalEntryId: entry.id
                }
              },
              update: {},
              create: {
                journalEntryId: entry.id,
                tagId: tag.id
              }
            });
          }
        }
  
        // Make sure the path matches your actual route structure
        throw redirect(303, `/entry/${entry.id}`);
    }
  } satisfies Actions;
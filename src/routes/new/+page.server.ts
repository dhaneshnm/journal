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
  default: async ({ request }) => {
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

    try {
      const entry = await prisma.journalEntry.create({
        data: {
          title,
          content,
          moodId,
          tags: {
            create: tags ? await Promise.all(
              tags.map(async (tagName) => {
                const tag = await prisma.tag.upsert({
                  where: { name: tagName },
                  create: { name: tagName },
                  update: {}
                });
                return {
                  tag: { connect: { id: tag.id } }
                };
              })
            ) : []
          }
        }
      });


      throw redirect(307, `/`);
    } catch (error) {
      console.log(error);  
      return fail(500, { error: 'Failed to create entry' });
    }
  }
} satisfies Actions;
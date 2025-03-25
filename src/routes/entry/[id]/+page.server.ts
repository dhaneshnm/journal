// src/routes/entry/[id]/+page.server.ts
import prisma from "$lib/prisma";
import type { PageServerLoad } from '../$types';

// 1.
export const load = (async ({ params }) => {
    // 2.
    const entry  = await prisma.journalEntry.findUnique({
        where: { id: Number(params.id) },
        include: {
            tags: { include: { tag: true}},
            mood: true
        }
    });

    // 3.
    return { entry };
}) satisfies PageServerLoad;
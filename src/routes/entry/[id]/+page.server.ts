// src/routes/entry/[id]/+page.server.ts
import prisma from "$lib/prisma";
import type { PageServerLoad } from '../$types';

import { fail, redirect } from '@sveltejs/kit';

async function deleteEntryWithTags(entryId: number) {
    // First, delete the tags associated with the journal entry
    await prisma.tagOnEntries.deleteMany({
        where: { journalEntryId: entryId }
    });

    // Then, delete the journal entry itself
    await prisma.journalEntry.delete({
        where: { id: entryId }
    });
}

export const actions = {
    default: async ({ params }) => {
        try {
            await deleteEntryWithTags(Number(params.id));
            throw redirect(303, '/');
        } catch (error) {
            console.log(error);
            return fail(500, { error: 'Failed to delete entry' });
        }
    }
};

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
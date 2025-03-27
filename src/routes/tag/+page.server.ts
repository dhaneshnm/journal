import prisma from "$lib/prisma";
import type { PageServerLoad } from "../$types";
import { fail, redirect } from '@sveltejs/kit';


async function deleteEntryWithTags(tagId: number) {
    // First, delete the tags associated with the journal entry
    await prisma.tagOnEntries.deleteMany({
        where: { tagId: tagId }
    });

    // Then, delete the journal entry itself
    await prisma.tag.delete({
        where: { id: tagId }
    });
}

export const actions = {
    default: async ({ url }) => {
        let id = url.searchParams.get('id');
        console.log("here", url, id); 
        try {
            await deleteEntryWithTags(Number(id));
            throw redirect(303, '/tag');
        } catch (error) {
            console.log(error);
            return fail(500, { error: 'Failed to delete entry' });
        }
    }
};

export const load = (async () => {
    const response = await prisma.tag.findMany({
        include: {
            journalEntries: { include: { journalEntry: true}},
        }
    });
    return  { tags: response};

}) satisfies PageServerLoad;
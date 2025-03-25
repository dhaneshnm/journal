import prisma from "$lib/prisma";
import type { PageServerLoad } from "./$types";

export const load = (async () => {
    const response = await prisma.journalEntry.findMany({
        include: {
            tags: { include: { tag: true}},
            mood: true
        }
    });
    return  { feed: response};

}) satisfies PageServerLoad;
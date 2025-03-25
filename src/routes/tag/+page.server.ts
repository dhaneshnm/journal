import prisma from "$lib/prisma";
import type { PageServerLoad } from "../$types";

export const load = (async () => {
    const response = await prisma.tag.findMany({
        include: {
            journalEntries: { include: { journalEntry: true}},
        }
    });
    return  { tags: response};

}) satisfies PageServerLoad;
import prisma from "$lib/prisma";
import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { hash } from "bcrypt";

export const actions = {
    default: async ({ request }) => {
        const data = await request.formData();
        const email = data.get("email");
        const password = data.get("password");

        const name = data.get("name");

        if (!email || !password || !name) {
            return fail(400, { missing: true });
        }

        if (typeof email !== "string" || typeof password !== "string" || typeof name !== "string") {
            return fail(400, { incorrect: true });
        }


        const hashedPassword = await hash(password, 10);
        const user = await prisma.user.create({
          data: { email, password: hashedPassword, name },
        });

        redirect(303, '/auth/signin');
    }
} satisfies Actions;

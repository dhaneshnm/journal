import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";
import { json } from "@sveltejs/kit";

const prisma = new PrismaClient();

export async function POST({ request }) {
  const { email, password, name } = await request.json();

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    return json({ error: "User already exists" }, { status: 400 });
  }

  const hashedPassword = await hash(password, 10);
  const user = await prisma.user.create({
    data: { email, password: hashedPassword, name },
  });

  return json({ message: "User created", userId: user.id });
}

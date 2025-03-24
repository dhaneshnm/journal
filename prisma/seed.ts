import { PrismaClient } from '@prisma/client';
import { randText, randPastDate, randWord, randNumber } from '@ngneat/falso';

const prisma = new PrismaClient();

async function main() {
  // Create 5 moods
  const moods = await Promise.all(
    ['Happy', 'Sad', 'Excited', 'Calm', 'Anxious'].map(name =>
      prisma.mood.create({ data: { name } })
    )
  );

  // Create 10 tags
  const tags = await Promise.all(
    Array.from({ length: 10 }, () =>
      prisma.tag.create({
        data: { name: randWord() }
      })
    )
  );

  // Create 10 journal entries with random tags and moods
  await Promise.all(
    Array.from({ length: 10 }, () => {
      // Get 1-3 random tags
      const randomTags = tags
        .sort(() => Math.random() - 0.5)
        .slice(0, randNumber({ min: 1, max: 3 }));

      return prisma.journalEntry.create({
        data: {
          title: randText({ charCount: 50 }),
          content: randText({ charCount: 500 }),
          moodId: moods[Math.floor(Math.random() * moods.length)].id,
          tags: {
            create: randomTags.map(tag => ({
              tag: { connect: { id: tag.id } },
              assignedAt: randPastDate()
            }))
          }
        }
      });
    })
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
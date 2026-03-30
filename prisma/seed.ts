import { PrismaClient } from "@prisma/client";
import { hashPassword } from "../lib/auth";
import { slugify } from "../lib/utils";

const prisma = new PrismaClient();

async function main() {
  const email = "admin@manik.local";
  const passwordHash = await hashPassword("Admin12345");

  await prisma.user.upsert({
    where: { email },
    update: {},
    create: {
      email,
      name: "Main Admin",
      passwordHash,
      role: "admin",
    },
  });

  const samples = [
    {
      title: "Balloon Set Pink Story",
      description: "Delicate premium set for birthday and baby shower events.",
      category: "Birthday",
      price: 5500,
      imageUrl:
        "https://images.unsplash.com/photo-1560008581-09826d1de69e?auto=format&fit=crop&w=1200&q=80",
      isFeatured: true,
      inStock: true,
    },
    {
      title: "Metallic Blue Ceiling Pack",
      description: "A vivid ceiling setup for an impactful party atmosphere.",
      category: "Ceiling",
      price: 4200,
      imageUrl:
        "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=1200&q=80",
      isFeatured: false,
      inStock: true,
    },
    {
      title: "Luxury Wedding Arc",
      description: "Premium arc composition for wedding welcome zones.",
      category: "Wedding",
      price: 14900,
      imageUrl:
        "https://images.unsplash.com/photo-1513278974582-3e1b4a4fa21d?auto=format&fit=crop&w=1200&q=80",
      isFeatured: true,
      inStock: true,
    },
  ];

  for (const item of samples) {
    await prisma.product.upsert({
      where: { slug: slugify(item.title) },
      update: item,
      create: {
        ...item,
        slug: slugify(item.title),
      },
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });

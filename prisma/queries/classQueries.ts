import { ITEMS_PER_PAGE } from "@/constants";
import prisma from "@/app/lib/prisma";
import { Prisma } from "@prisma/client";

export const getAllClasses = async (p: number, query: Prisma.ClassWhereInput) => {
  if (query !== undefined) {
    const [classes, count] = await prisma.$transaction([
      prisma.class.findMany({
        where: query,
        include: {
          supervisor: true,
        },
        take: ITEMS_PER_PAGE,
        skip: ITEMS_PER_PAGE * (p - 1),
      }),

      prisma.class.count({ where: query }),
    ]);
    return [classes, count];
  } else {
    return [{}, 0];
  }
};
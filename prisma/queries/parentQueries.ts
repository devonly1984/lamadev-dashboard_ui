import { ITEMS_PER_PAGE } from "@/constants";
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export const getAllParents = async (p: number, query: Prisma.ParentWhereInput) => {
  if (query !== undefined) {
    const [parents, count] = await prisma.$transaction([
      prisma.parent.findMany({
        where: query,
        include: {
          students: true,
        },
        take: ITEMS_PER_PAGE,
        skip: ITEMS_PER_PAGE * (p - 1),
      }),

      prisma.parent.count({ where: query }),
    ]);
    return [parents, count];
  } else {
    return [{}, 0];
  }
};
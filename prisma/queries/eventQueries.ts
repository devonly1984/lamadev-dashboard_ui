import { ITEMS_PER_PAGE } from "@/constants";
import prisma from "@/app/lib/prisma";
import { Prisma } from "@prisma/client";

export const getAllEvents = async (p: number, query: Prisma.EventWhereInput) => {
  if (query !== undefined) {
    const [events, count] = await prisma.$transaction([
      prisma.event.findMany({
        where: query,
        include: {
          class: true,
        },
        take: ITEMS_PER_PAGE,
        skip: ITEMS_PER_PAGE * (p - 1),
      }),

      prisma.event.count({ where: query }),
    ]);
    return [events, count];
  } else {
    return [{}, 0];
  }
};
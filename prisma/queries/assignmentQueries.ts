import { ITEMS_PER_PAGE } from "@/constants";
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export const getAllAssignments = async (p: number, query: Prisma.AssignmentWhereInput) => {
  if (query !== undefined) {
    const [assignments, count] = await prisma.$transaction([
      prisma.assignment.findMany({
        where: query,
        include: {
          lesson: {
            select: {
              subject: { select: { name: true } },
              teacher: { select: { name: true, surname: true } },
              class: { select: { name: true } },
            },
          },
        },
        take: ITEMS_PER_PAGE,
        skip: ITEMS_PER_PAGE * (p - 1),
      }),

      prisma.assignment.count({ where: query }),
    ]);
    return [assignments, count];
  } else {
    return [{}, 0];
  }
};
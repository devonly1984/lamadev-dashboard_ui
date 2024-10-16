import { ITEMS_PER_PAGE } from "@/constants";
import prisma from "@/app/lib/prisma";
import { Prisma } from "@prisma/client";

export const getAllExams = async (p: number, query: Prisma.ExamWhereInput) => {
  if (query !== undefined) {
    const [exams, count] = await prisma.$transaction([
      prisma.exam.findMany({
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

      prisma.exam.count({ where: query }),
    ]);
    return [exams, count];
  } else {
    return [{}, 0];
  }
};
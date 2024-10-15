import { ITEMS_PER_PAGE } from "@/constants";
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export const getAllLessons = async (p: number, query: Prisma.LessonWhereInput) => {
  if (query !== undefined) {
    const [lessons, count] = await prisma.$transaction([
      prisma.lesson.findMany({
        where: query,
        include: {
          class: {select: {name:true}},
          subject:  {select: {name:true}},
          teacher:  {select: {name:true,surname:true}},
        },
        take: ITEMS_PER_PAGE,
        skip: ITEMS_PER_PAGE * (p - 1),
      }),

      prisma.lesson.count({ where: query }),
    ]);
    return [lessons, count];
  } else {
    return [{}, 0];
  }
};
"use server";
import { ITEMS_PER_PAGE } from "@/constants";
import prisma from "@/app/lib/prisma";
import { Prisma } from "@prisma/client";

export const getTeachers = async (
  p: number,
  query?: Prisma.TeacherWhereInput
) => {
  if (query !== undefined) {
    const [teachers, count] = await prisma.$transaction([
      prisma.teacher.findMany({
        where: query,
        include: {
          subjects: true,
          classes: true,
        },
        take: ITEMS_PER_PAGE,
        skip: ITEMS_PER_PAGE * (p - 1),
      }),
      prisma.teacher.count({
        where: query,
      }),
    ]);
    return [teachers, count];
  } else {
    return [{}, 0];
  }

 
 
};

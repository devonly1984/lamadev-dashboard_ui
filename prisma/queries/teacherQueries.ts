"use server";
import { ITEMS_PER_PAGE } from "@/constants";
import prisma from "@/lib/prisma";

export const getTeachers = async (p: number,classId?:string) => {
  const [teachers, count] = await prisma.$transaction([
    prisma.teacher.findMany({
      where: {
        lessons: {
          some: { classId: parseInt(classId!) },
        },
      },
      include: {
        subjects: true,
        classes: true,
      },
      take: ITEMS_PER_PAGE,
      skip: ITEMS_PER_PAGE * (p - 1),
    }),
    prisma.teacher.count({
      where: {
        lessons: {
          some: { classId: parseInt(classId!) },
        },
      },
    }),
  ]);
  return [teachers, count];
};

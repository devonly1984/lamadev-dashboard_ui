import { ITEMS_PER_PAGE } from "@/constants";
import prisma from "@/app/lib/prisma";
import { Prisma } from "@prisma/client";

export const getAllLessons = async (
  p: number,
  query: Prisma.LessonWhereInput
) => {
  if (query !== undefined) {
    const [lessons, count] = await prisma.$transaction([
      prisma.lesson.findMany({
        where: query,
        include: {
          class: { select: { name: true } },
          subject: { select: { name: true } },
          teacher: { select: { name: true, surname: true } },
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
export const getCalendar = async (
  type: "teacherId" | "classId",
  id: string | number
) => {
  const dataRes = await prisma.lesson.findMany({
    where: {
      ...(type === "teacherId"
        ? { teacherId: id as string }
        : { classId: id as number }),
    },
  });
  const data = dataRes.map((lesson) => ({
    title: lesson.name,
    start: lesson.startTime,
    end: lesson.endTime,
  }));
  return data;
};
export const getStudents = async (userId: string | null) => {
  const data = await prisma.class.findMany({
    where: {
      students: {
        some: { id: userId! },
      },
    },
  });
  return data;
};
import { ITEMS_PER_PAGE } from "@/constants";
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export const getAllResults = async (p: number, query: Prisma.ResultWhereInput) => {
  if (query !== undefined) {
    const [resultsRes, count] = await prisma.$transaction([
      prisma.result.findMany({
        where: query,
        include: {
          student: { select: { name: true, surname: true } },
          exam: {
            include: {
              lesson: {
                select: {
                  class: { select: { name: true } },
                  teacher: { select: { name: true, surname: true } },
                },
              },
            },
          },
          assignment: {
            include: {
              lesson: {
                select: {
                  class: { select: { name: true } },
                  teacher: { select: { name: true, surname: true } },
                },
              },
            },
          },
        },
        take: ITEMS_PER_PAGE,
        skip: ITEMS_PER_PAGE * (p - 1),
      }),

      prisma.result.count({ where: query }),
    ]);
    const data = resultsRes.map(item=>{
      const assessment = item.exam || item.assignment
      if (!assessment) return null;
      const isExam = "startTime" in assessment;
      return {
        id: item.id,
        title: assessment.title,
        studentName: item.student.name,
        studentSurname: item.student.surname,
        teacherName: assessment.lesson.teacher.name,
        teacherSurname: assessment.lesson.teacher.surname,
        score: item.score,
        className: assessment.lesson.class.name,
        startTime : isExam? assessment.startTime : assessment.startDate
      };
    })
    return [data, count];


  } else {
    return [{}, 0];
  }
};
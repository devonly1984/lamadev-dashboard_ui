import { ITEMS_PER_PAGE } from "@/constants"
import prisma from "@/lib/prisma"

export const getAllStudents = async (p:number)=>{
    const [students, count] = await prisma.$transaction([
      prisma.student.findMany({
        take: ITEMS_PER_PAGE,
        skip: ITEMS_PER_PAGE * (p - 1),
      }),

      prisma.student.count(),
    ]);
    return [
        students,count
    ]

}
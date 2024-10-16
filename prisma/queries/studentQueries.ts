import { ITEMS_PER_PAGE } from "@/constants"
import prisma from "@/app/lib/prisma"
import { Prisma } from "@prisma/client";

export const getAllStudents = async (p:number,query:Prisma.StudentWhereInput)=>{
    
      if (query !==undefined) {
        const [students, count] = await prisma.$transaction([
          prisma.student.findMany({
            where: query,
            include: {
              class: true,
              
            },
            take: ITEMS_PER_PAGE,
            skip: ITEMS_PER_PAGE * (p - 1),
          }),

          prisma.student.count({ where: query }),
        ]);
    return [students,count];
  }
   else {
    return [{}, 0];
   }
   

 

}
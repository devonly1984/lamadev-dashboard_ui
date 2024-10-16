import { ITEMS_PER_PAGE } from "@/constants"
import prisma from "@/app/lib/prisma"
import { Prisma } from "@prisma/client";

export const getAllSubjects = async (p:number,query:Prisma.SubjectWhereInput)=>{
    
      if (query !==undefined) {
        const [subjects, count] = await prisma.$transaction([
          prisma.subject.findMany({
            where: query,
            include: {
              teachers: true,
            },
            take: ITEMS_PER_PAGE,
            skip: ITEMS_PER_PAGE * (p - 1),
          }),

          prisma.subject.count({ where: query }),
        ]);
    return [subjects, count];
  }
   else {
    return [{}, 0];
   }
   

 

}
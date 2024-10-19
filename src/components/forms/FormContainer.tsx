import { FormContainerProps } from "@/types/formTypes";
import FormModal from "@/components/modals/FormModal";
import prisma from "@/app/lib/prisma";

const FormContainer = async ({ table, type, data, id }: FormContainerProps) => {
    let relatedData = {}
    if (type!=='delete') {
        switch(table) {
            case 'subject':
                const subjectTeachers = await prisma.teacher.findMany({
                    select: {id:true,name:true,surname:true}
                })
                relatedData = { teachers: subjectTeachers };
            break;
            case 'class':
              const classGrades = await prisma.grade.findMany({
                select: {id:true,level:true}
              })
              const classTeachers = await prisma.teacher.findMany({
                select: {id:true,name:true,surname:true}
              })
              relatedData = { teachers: classTeachers, grades: classGrades };
              break;
              case 'teacher':
                const teacherSubjects = await prisma.subject.findMany({
                  select: {id:true,name:true}
                })
                relatedData = { subjects: teacherSubjects };
                break;
            default: 
            break;
        }
    }
  return (
    <div>
      <FormModal
        table={table}
        type={type}
        data={data}
        id={id}
        relatedData={relatedData}
      />
    </div>
  );
};
export default FormContainer;
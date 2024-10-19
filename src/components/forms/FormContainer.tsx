import { FormContainerProps } from "@/types/formTypes";
import FormModal from "@/components/modals/FormModal";
import prisma from "@/app/lib/prisma";

const FormContainer = async ({ table, type, data, id }: FormContainerProps) => {
    let relatedData = {

    }
    if (type!=='delete') {
        switch(table) {
            case 'subject':
                const subjectTeachers = await prisma.teacher.findMany({
                    select: {id:true,name:true,surname:true}
                })
                relatedData = { teachers: subjectTeachers };
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
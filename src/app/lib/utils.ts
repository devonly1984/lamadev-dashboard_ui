import { deleteClass } from "@/actions/ClassActions";
import { deleteSubject } from "@/actions/SubjectActions";
import { deleteTeacher } from "@/actions/TeacherActions";



const currentWorkWeek = ()=>{
    const today = new Date();
    const dayOfWeek = today.getDay();
    const startOfWeek = new Date(today);
    if (dayOfWeek ===0 ) {
        startOfWeek.setDate(today.getDate()+1)
    }
    else if (dayOfWeek ===6) {
        startOfWeek.setDate(today.getDate() + 2);
    } else {
        startOfWeek.setDate(today.getDate() - (dayOfWeek - 1));
    }
    startOfWeek.setHours(0,0,0,0);
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate()+4);
    endOfWeek.setHours(23, 59, 59, 999);
    return {
      startOfWeek,
      
    };
}
export const adjustScheduleToCurrentWeek = (lessons:{title:string,start:Date,end:Date}[])=>{
    const {startOfWeek} = currentWorkWeek()
    return lessons.map(lesson=>{
        const lessonDoW = lesson.start.getDay();
        const daysFromMonday = lessonDoW === 0 ? 6 : lessonDoW - 1;
        const adjustedStartDate = new Date(startOfWeek);
        const adjustedEndDate = new Date(adjustedStartDate);
        adjustedStartDate.setDate(startOfWeek.getDate() + daysFromMonday);
        adjustedStartDate.setHours(
          lesson.start.getHours(),
          lesson.start.getMinutes(),
          lesson.start.getSeconds()
        );
       adjustedEndDate.setHours(
         lesson.end.getHours(),
         lesson.end.getMinutes(),
         lesson.end.getSeconds()
       );
       return {
         title: lesson.title,
         start: adjustedStartDate,
         end: adjustedEndDate,
       };
    })
}

export const deleteActionMap = {
  announcement: deleteSubject,
  assignment: deleteSubject,
  class: deleteClass,
  event: deleteSubject,
  exam: deleteSubject,
  lesson: deleteSubject,
  parent: deleteSubject,
  subject: deleteSubject,
  student: deleteSubject,
  teacher: deleteTeacher,
};
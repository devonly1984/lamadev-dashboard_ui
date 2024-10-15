import {
  Announcement,
  Assignment,
  Class,
  Event,
  Exam,
  Lesson,
  Parent,
  Result,
  Student,
  Subject,
  Teacher,
} from "@prisma/client";
export type ParentList = Parent & { students: Student[] };
export type SubjectList = Subject & { teachers: Teacher[] };
export type TeacherList = Teacher & { subjects: Subject[] } & {
  classes: Class[];
};
export type StudentList = Student & { class: Class };
export type ClassList = Class & { supervisor: Teacher };
export type LessonList = Lesson & { class: Class } & { subject: Subject } & {
  teacher: Teacher;
};
export type ExamList = Exam & {
  lesson: {
    subject: Subject;
    teacher: Teacher;
    class: Class;
  };
};
export type AssignmentList = Assignment & {
  lesson: {
    subject: Subject;
    class: Class;
    teacher: Teacher;
  };
};
export type ResultList = {
  id: number;
  title: string;
  studentName: string;
  studentSurname: string;
  teacherName: string;
  teacherSurname: string;
  score: number;
  className: string;
  startTime: Date;
};
export type EventList = Event & { class: Class };
export type AnnouncementList = Announcement & { class: Class };
export type  Teacher = {
    id: number,
    teacherId: string;
    name: string;
    email?: string;
    photo:string;
    phone: string
    subjects: string[]
    classes: string[]
    address: string;
}
export type Student = {
    id: number;
    studentId: string;
    name: string;
    email: string;
    photo: string;
    phone?: string;
    grade: number;
    class: string;
    address: string;
}
export type Parent = {
    id: number;
    name: string;
    students: string[];
    email: string;
    phone: string;
    address: string;
}
export type Subjects = {
    id: number;
    name: string;
    teachers: string[];
}
export type Classes = {
    id: number;
    name: string;
    capacity: number;
    grade: number;
    supervisor: string;
}
export type Lessons = {
    id: number;
    subject: string;
    class: string;
    teacher: string;
}
export type Exams = {
  id: number;
  subject: string;
  class: string;
  teacher: string;
  date: string;
};
export type Assignments = {
    id: number;
    subject: string;
    class: string;
    teacher: string;
    dueDate: string;
}
export type Results = {
  id: number;
  subject: string;
  class: string;
  teacher: string;
  student: string;
  date: string;
  type: string;
  score: number;
};
export type Events = {
    id: number;
    title: string;
    class: string;
    date: string;
    startTime: string;
    endTime: string;
}
export type Announcements = {
    id: number;
    title: string;
    class: string;
    date: string;
}
export type FormModalProps = {
  table:
    | "teacher"
    | "student"
    | "parent"
    | "subject"
    | "class"
    | "lesson"
    | "exam"
    | "assignment"
    | "result"
    | "attendance"
    | "event"
    | "announcement";
  type: "create" | "update" | "delete";
  data?: any;
  id?: number | string;
};
  export type FormProps = {
    table:
      | "teacher"
      | "student"
      | "parent"
      | "subject"
      | "class"
      | "lesson"
      | "exam"
      | "assignment"
      | "result"
      | "attendance"
      | "event"
      | "announcement";
    type: "create" | "update" | "delete";
    id?: number | string;
    data?: any;
  };
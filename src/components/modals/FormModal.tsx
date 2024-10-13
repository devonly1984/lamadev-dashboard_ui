"use client"


import { FormModalProps, FormProps } from "@/types";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useState } from "react";
//import TeacherForm from "../form/TeacherForm";
//import StudentForm from "../form/StudentForm";
const TeacherForm = dynamic(() => import("../form/TeacherForm"), {
  loading: () => <h1>Loading...</h1>,
});
const StudentForm = dynamic(() => import("../form/StudentForm"), {
  loading: () => <h1>Loading...</h1>,
});
const AnnouncementForm = dynamic(() => import("../form/AnnoucementForm"), {
  loading: () => <h1>Loading...</h1>,
});
const AssignmentForm = dynamic(() => import("../form/AssignmentForm"), {
  loading: () => <h1>Loading...</h1>,
});
const SubjectForm = dynamic(() => import("../form/SubjectForm"), {
  loading: () => <h1>Loading...</h1>,
});
const EventForm = dynamic(() => import("../form/EventForm"), {
  loading: () => <h1>Loading...</h1>,
});
const ExamForm = dynamic(() => import("../form/ExamForm"), {
  loading: () => <h1>Loading...</h1>,
});
const ResultForm = dynamic(() => import("../form/ResultForm"), {
  loading: () => <h1>Loading...</h1>,
});
const AttendanceForm = dynamic(() => import("../form/AttendanceForm"), {
  loading: () => <h1>Loading...</h1>,
});
const ClassForm = dynamic(() => import("../form/ClassForm"), {
  loading: () => <h1>Loading...</h1>,
});
const LessonForm = dynamic(() => import("../form/LessonForm"), {
  loading: () => <h1>Loading...</h1>,
});
const ParentForm = dynamic(() => import("../form/ParentForm"), {
  loading: () => <h1>Loading...</h1>,
});
const forms: {
  [key: string]: (type: "create" | "update", data?: any) => JSX.Element;
} = {
  teacher: (type, data) => <TeacherForm type={type} data={data} />,
  student: (type, data) => <StudentForm type={type} data={data} />,
  parent: (type, data) => <ParentForm type={type} data={data} />,
  subject: (type, data) => <SubjectForm type={type} data={data} />,
  class: (type, data) => <ClassForm type={type} data={data} />,
  lesson: (type, data) => <LessonForm type={type} data={data} />,
  exam: (type, data) => <ExamForm type={type} data={data} />,
  assignment: (type, data) => <AssignmentForm type={type} data={data} />,
  result: (type, data) => <ResultForm type={type} data={data} />,
  attendance: (type, data) => <AttendanceForm type={type} data={data} />,
  event: (type, data) => <EventForm type={type} data={data} />,
  announcement: (type, data) => <AnnouncementForm type={type} data={data} />,
};


const FormModal = ({table,type,data,id}:FormModalProps) => {
  const size = type==='create'?'w-8 h-8':'w-7 h-8';
  const bgColor =
    type === "create"
      ? "bg-lamaYellow"
      : type === "update"
        ? "bg-lamaSky"
        : "bg-lamaPurple";
        const [open, setOpen] = useState(false);

    return (
      <>
        <button
          className={`${size} flex items-center justify-center rounded-full ${bgColor}`}
          onClick={() => setOpen(true)}
        >
          <Image src={`/${type}.png`} alt="icon" height={16} width={16} />
        </button>
        {open && (
          <div className="w-screen h-screen absolute top-0 left-0 bg-black bg-opacity-60 z-50 flex items-center justify-center ">
            <div className="bg-white p-4 rounded-md relative w-[90%] md:w-[70%] lg:w-[60%] xl:w-[50%] 2xl:w-[40%]">
              <Form table={table} type={type} id={id} data={data} />
              <div
                className="absolute top-4 right-4 cursor-pinter "
                onClick={() => setOpen(false)}
              >
                <Image src="/close.png" alt="" width={14} height={14} />
              </div>
            </div>
          </div>
        )}
      </>
    );
};
const Form = ({ type, id, table, data }: FormProps) => {
  return type === "delete" && id ? (
    <form className="p-4 flex flex-col gap-4">
      <span className="text-center font-medium">
        All data will be lost. Are you sure you want to delete this {table}?
      </span>
      <button
        type="submit"
        className="bg-red-700 text-white py-2 px-4 rounded-md border-none w-max self-center"
      >
        Delete
      </button>
    </form>
  ) : type === "create" || type === "update" ? (
    forms[table](type, data)
  ) : (
    "Form not found"
  );
};
export default FormModal;
"use client"

import Image from "next/image";

type FormModalProps = {
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
  id?: number;
};
const FormModal = ({table,type,data,id}:FormModalProps) => {
  const size = type==='create'?'w-8 h-8':'w-7 h-8';
  const bgColor =
    type === "create"
      ? "bg-lamaYellow"
      : type === "update"
        ? "bg-lamaSky"
        : "bg-lamaPurple";
    return (
      <>
        <button
          className={`${size} flex items-center justify-center rounded-full ${bgColor}`}
        >
          <Image src={`/${type}.png`} alt="icon" height={16} width={16} />
        </button>
      </>
    );
};
export default FormModal;
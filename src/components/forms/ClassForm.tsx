"use client"

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ClassInputs,classSchema } from "../../app/lib/formSchema/ClassSchema";
import InputField from "./InputField";
import { useFormState } from "react-dom";
import { createClass, updateClass } from "@/actions/ClassActions";
import { FormProps } from "@/types/formTypes";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-toastify";


const ClassForm = ({ type, data, setOpen, relatedData }: FormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ClassInputs>({
    resolver: zodResolver(classSchema),
  });
  const [state, formAction] = useFormState(
    type === "create" ? createClass : updateClass ,
    {
      success: false,
      error: false,
    }
  );
  const onSubmit = (data: ClassInputs) => {
    formAction(data);
  };
  const router = useRouter();
  useEffect(() => {
    if (state.success) {
      toast(`Class has been ${type === "create" ? "Created" : "Updated"}`);
      router.refresh();
      setOpen(false);
    }
  }, [state, router, setOpen, type]);
  const { teachers, grades } = relatedData;
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
      <h1 className="text-xl font-semibold capitalize">
        {type === "create" ? ` Create a new Class` : `Update an existing Class`}
      </h1>
      <InputField
        label="Class Name"
        name="name"
        defaultValue={data?.name}
        register={register}
        error={errors?.name}
      />
      <InputField
        label="Capacity"
        name="capacity"
        defaultValue={data?.capacity}
        register={register}
        error={errors?.capacity}
      />
      {data && (
        <InputField
          label="Id"
          name="id"
          defaultValue={data?.id}
          register={register}
          error={errors?.id}
          hidden
        />
      )}
      <div className="flex flex-col gap-8 w-full md:w-1/4">
        <label className="text-xs text-gray-500">Supervisor</label>
        <select
          className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
          {...register("supervisorId")}
          defaultValue={data?.teachers}
        >
          {teachers.map(
            (teacher: { id: string; name: string; surname: string }) => (
              <option
                value={teacher.id}
                key={teacher.id}
                selected={data && teacher.id === data.supervisorId}
              >
                {teacher.name + " " + teacher.surname}
              </option>
            )
          )}
        </select>
        {errors.supervisorId?.message && (
          <p className="text-xs text-red-400">
            {errors?.supervisorId.message.toString()}
          </p>
        )}
      </div>
      <div className="flex flex-col gap-8 w-full md:w-1/4">
        <label className="text-xs text-gray-500">Grade</label>
        <select
          className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
          {...register("gradeId")}
          defaultValue={data?.grades}
        >
          {grades.map((grade: { id: number; level: number }) => (
            <option
              value={grade.id}
              key={grade.id}
              selected={data && grade.id === data.gradeId}
            >
              {grade.level}
            </option>
          ))}
        </select>
        {errors.gradeId?.message && (
          <p className="text-xs text-red-400">
            {errors?.gradeId.message.toString()}
          </p>
        )}
      </div>
      <button className="bg-blue-400 text-white p-2 rounded-md" type="submit">
        {type == "create" ? "Create" : "Update"}
      </button>
    </form>
  );
};
export default ClassForm;
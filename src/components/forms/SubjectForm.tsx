"use client"

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFormState } from "react-dom";
import InputField from "./InputField";
import { subjectFormSchema, SubjectInputs } from "@/app/lib/formSchema/SubjectFormSchema";
import { createSubject, updateSubject } from "@/actions/SubjectActions";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { SubjectFormProps } from "@/types/formTypes";


const SubjectForm = ({
  type,
  data,
  setOpen,
  relatedData,
}: SubjectFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SubjectInputs>({
    resolver: zodResolver(subjectFormSchema),
  });
  const [state, formAction] = useFormState(
    type === "create" ? createSubject : updateSubject,
    {
      success: false,
      error: false,
    }
  );

  const onSubmit = (data: SubjectInputs) => {
    formAction(data);
  };
  const router = useRouter();
  useEffect(() => {
    if (state.success) {
      toast(`Subject has been ${type === "create" ? "Created" : "Updated"}`);
      router.refresh();
      setOpen(false);
    }
  }, [state]);
  const  {teachers} = relatedData;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
      <h1 className="text-xl font-semibold capitalize">
        {type === "create"
          ? `Create a new Subject`
          : `Update an existing Subject`}
      </h1>
      <div className="flex justify-between gap-4">
        <InputField
          label="Subject Name"
          name="name"
          defaultValue={data?.name}
          register={register}
          error={errors?.name}
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
          <label className="text-xs text-gray-500">Teachers</label>
          <select
            multiple
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            {...register("teachers")}
            defaultValue={data?.teachers}
          >
            {teachers.map(
              (teacher: { id: string; name: string; surname: string }) => (
                <option value={teacher.id} key={teacher.id}>
                  {teacher.name + " " + teacher.surname}
                </option>
              )
            )}
          </select>
          {errors.teachers?.message && (
            <p className="text-xs text-red-400">
              {errors?.teachers.message.toString()}
            </p>
          )}
        </div>
      </div>
      {state.error && (
        <span className="text-red-500">Something went wrong</span>
      )}
      <button className="bg-blue-400 text-white p-2 rounded-md" type="submit">
        {type == "create" ? "Create" : "Update"}
      </button>
    </form>
  );
};
export default SubjectForm;
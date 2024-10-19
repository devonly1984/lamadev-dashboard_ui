"use client"

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { TeacherInputs, TeacherSchema } from "../../app/lib/formSchema/TeacherSchema";
import InputField from "./InputField";
import Image from "next/image";

import { FormProps } from "@/types/formTypes";
import { useFormState } from "react-dom";
import { createTeacher, updateTeacher } from "@/actions/TeacherActions";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { CldUploadWidget } from "next-cloudinary";

const TeacherForm = ({ setOpen, type, data, relatedData }: FormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TeacherInputs>({
    resolver: zodResolver(TeacherSchema),
  });
  const [state, formAction] = useFormState(
    type === "create" ? createTeacher : updateTeacher,
    {
      success: false,
      error: false,
    }
  );
  const onSubmit = (data: TeacherInputs) => {
    formAction(data);
  };
  const router = useRouter();
  useEffect(() => {
    if (state.success) {
      toast(`Teacher has been ${type === "create" ? "Created" : "Updated"}`);
      router.refresh();
      setOpen(false);
    }
  }, [state, router, setOpen, type]);
  const { subjects } = relatedData;
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
      <h1 className="text-xl font-semibold capitalize">
        {" "}
        {type === "create"
          ? ` Create a new Teacher`
          : `Update an existing Teacher`}
      </h1>
      <span className="text-xs text-gray-400 font-medium">
        Authentication Information
      </span>
      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="Username"
          register={register}
          name="username"
          defaultValue={data?.username}
          error={errors?.username}
        />

        <InputField
          label="Email"
          register={register}
          type="email"
          name="email"
          defaultValue={data?.email}
          error={errors?.email}
        />
        <InputField
          label="Password"
          type="password"
          register={register}
          name="password"
          error={errors?.password}
        />
      </div>
      <span className="text-xs text-gray-400 font-medium">
        Personal Information
      </span>
      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="First Name"
          register={register}
          name="firstName"
          defaultValue={data?.name}
          error={errors?.name}
        />

        <InputField
          label="Last Name"
          register={register}
          name="surname"
          defaultValue={data?.surname}
          error={errors?.surname}
        />
        <InputField
          label="Phone"
          register={register}
          name="phone"
          defaultValue={data?.phone}
          error={errors?.phone}
        />
        <InputField
          label="Address"
          register={register}
          name="address"
          defaultValue={data?.address}
          error={errors?.address}
        />
        <InputField
          label="Blood Type"
          register={register}
          name="bloodType"
          defaultValue={data?.bloodType}
          error={errors?.bloodType}
        />
        <InputField
          label="Birthday"
          register={register}
          name="birthday"
          defaultValue={data?.birthday}
          error={errors?.birthday}
          type="date"
        />
        <div className="flex flex-col gap-8 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Sex</label>
          <select
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            {...register("sex")}
            defaultValue={data?.sex}
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          {errors.sex?.message && (
            <p className="text-xs text-red-400">
              {errors?.sex.message.toString()}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-8 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Subject</label>
          <select
            multiple
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            {...register("subjects")}
            defaultValue={data?.subjects}
          >
            {subjects.map((subject: { id: number; name: string }) => (
              <option value={subject.id} key={subject.id}>
                {subject.name}
              </option>
            ))}
          </select>
          {errors.subjects?.message && (
            <p className="text-xs text-red-400">
              {errors?.subjects.message.toString()}
            </p>
          )}
        </div>
        <CldUploadWidget uploadPreset="school">
          {({ open }) => {
            return (
              <div
                className="text-xs text-gray-500 flex items-center gap-2 cursor-pointer"
                onClick={() => open()}
              >
                <Image src="/upload.png" alt="" width={28} height={28} />
                <span>Upload a photo</span>
              </div>
            );
          }}
        </CldUploadWidget>
      </div>
      <button className="bg-blue-400 text-white p-2 rounded-md" type="submit">
        {type == "create" ? "Create" : "Update"}
      </button>
    </form>
  );
};
export default TeacherForm
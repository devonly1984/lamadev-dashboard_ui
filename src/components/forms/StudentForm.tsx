"use client"

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {z} from 'zod'
import { StudentInputs, StudentSchema } from "../../app/lib/formSchema/StudentSchema";
import InputField from "./InputField";
import Image from "next/image";

import { StudentFormProps } from "@/types/formTypes";

const StudentForm = ({ type, data }: StudentFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<StudentInputs>({
    resolver: zodResolver(StudentSchema),
  });
  const onSubmit = (data: StudentInputs) => {
    console.log(data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
      <h1 className="text-xl font-semibold capitalize">
        {type === "create"
          ? ` Create a new Student`
          : `Update an existing Student`}
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
          defaultValue={data?.firstName}
          error={errors?.firstName}
        />

        <InputField
          label="Last Name"
          register={register}
          name="lastName"
          defaultValue={data?.lastName}
          error={errors?.lastName}
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
        <div className="flex flex-col gap-8 w-full md:w-1/4 justify-center items-center">
          <label
            className="text-xs text-gray-500 flex items-center gap-2 cursor-pointer"
            htmlFor="img"
          >
            <Image
              src="/upload.png"
              height={28}
              width={28}
              alt="Upload Button"
            />
            <span>Upload a photo</span>
          </label>
          <input type="file" id="img" {...register("img")} className="hidden" />
          {errors.img?.message && (
            <p className="text-xs text-red-400">
              {errors?.img.message.toString()}
            </p>
          )}
        </div>
      </div>
      <button className="bg-blue-400 text-white p-2 rounded-md" type="submit">
        {type == "create" ? "Create" : "Update"}
      </button>
    </form>
  );
};
export default StudentForm;
"use server";
import { TeacherInputs } from "@/app/lib/formSchema/TeacherSchema";
import prisma from "@/app/lib/prisma";
import { CurrentState } from "@/types/formTypes";
import { clerkClient } from "@clerk/nextjs/server";

export const createTeacher = async (
  currentState: CurrentState,
  data: TeacherInputs
) => {
  try {
    const user = await clerkClient.users.createUser({
      username: data.username,
      password: data.password,
      firstName: data.name,
      lastName: data.surname,

    });
    await prisma.teacher.create({
      data: {
        id: user.id,
        username: data.username,
        name: data.name,
        surname: data.surname,
        email: data.email,
        phone: data.phone,
        address: data.address,
        img: data.img,
        bloodType: data.bloodType,
        sex: data.sex,
        birthday: data.birthday,
        subjects: {
          connect: data.subjects?.map((subjectId: string) => ({
            id: parseInt(subjectId),
          })),
        },
      },
    });
    return { success: true, error: false };
  } catch (error) {
    return {success:false,error:true}
  }
};

export const updateTeacher = async (
  currentState: CurrentState,
  data: TeacherInputs
) => {
  if (!data.id) {
    return { success: false, error: true };
  }
  try {
    const user = await clerkClient.users.updateUser(data.id,{
      username: data.username,
     ...(data.password !=="" && {password:data.password}),
      firstName: data.name,
      lastName: data.surname,

    });
    await prisma.teacher.update({
      where: { id: data.id },
      data: {
        ...(data.password !== "" && { password: data.password }),
        id: user.id,
        username: data.username,
        name: data.name,
        surname: data.surname,
        email: data.email,
        phone: data.phone,
        address: data.address,
        img: data.img,
        bloodType: data.bloodType,
        sex: data.sex,
        birthday: data.birthday,
        subjects: {
          set: data.subjects?.map((subjectId: string) => ({
            id: parseInt(subjectId),
          })),
        },
      },
    });

    return { success: true, error: false };
  } catch (error) {
    console.log(error);
    return { success: false, error: true };
  }
};
  export const deleteTeacher = async (
    currentState: CurrentState,
    data: FormData
  ) => {
    const id = data.get("id") as string;
    try {
      await prisma.teacher.delete({
        where: {
          id: id,
        },
      });
      return { success: true, error: false };
    } catch (error) {
      return {success:false,error:true}
    }
  };
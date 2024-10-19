"use server";
import { TeacherInputs } from "@/app/lib/formSchema/TeacherSchema";
import prisma from "@/app/lib/prisma";
import { CurrentState } from "@/types/formTypes";

export const createTeacher = async (
  currentState: CurrentState,
  data: TeacherInputs
) => {
  try {
    await prisma.teacher.create({ data });
    return { success: true, error: false };
  } catch (error) {
    return {success:false,error:true}
  }
};

export const updateTeacher = async (
  currentState: CurrentState,
  data: TeacherInputs
) => {
  try {
    await prisma.teacher.update({
      where: {
        id: data.id,
      },
      data,
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
          id: parseInt(id),
        },
      });
      return { success: true, error: false };
    } catch (error) {
      return {success:false,error:true}
    }
  };
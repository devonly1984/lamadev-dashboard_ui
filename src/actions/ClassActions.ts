"use server";
import { ClassInputs } from "@/app/lib/formSchema/ClassSchema";
import prisma from "@/app/lib/prisma";
import { CurrentState } from "@/types/formTypes";

export const createClass = async (
  currentState: CurrentState,
  data: ClassInputs
) => {
  try {
    await prisma.class.create({ data });
    return { success: true, error: false };
  } catch (error) {
    return {success:false,error:true}
  }
};

export const updateClass = async (
  currentState: CurrentState,
  data: ClassInputs
) => {
  try {
    await prisma.subject.update({
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
  export const deleteClass = async (
    currentState: CurrentState,
    data: FormData
  ) => {
    const id = data.get("id") as string;
    try {
      await prisma.class.delete({
        where: {
          id: parseInt(id),
        },
      });
      return { success: true, error: false };
    } catch (error) {
      return {success:false,error:true}
    }
  };
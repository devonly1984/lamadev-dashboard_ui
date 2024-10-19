"use server";

import {SubjectInputs} from "@/app/lib/formSchema/SubjectSchema";
import prisma from "@/app/lib/prisma";
import { CurrentState } from "@/types/formTypes";



export const createSubject = async (
  currentState: CurrentState,
  data: SubjectInputs
) => {
  try {
    await prisma.subject.create({
      data: {
        name: data.name,
        teachers: {
          connect: data.teachers.map((teacher) => ({ id: teacher })),
        },
      },
    });
  
    return { success: true, error: false };
  } catch (error) {
    console.log(error);
    return { success: false, error: true };
  }
};

export const updateSubject = async (
  currentState: CurrentState,
  data: SubjectInputs
) => {
  try {
    await prisma.subject.update({
      where: {
        id: data.id,
      },
      data: {
        name: data.name,
        teachers: {
          set: data.teachers.map((teacher) => ({ id: teacher })),
        },
      },
    });
  
    return { success: true, error: false };
  } catch (error) {
    console.log(error);
    return { success: false, error: true };
  }
};
export const deleteSubject = async (
  currentState: CurrentState,
  data: FormData
) => {
  const id = data.get("id") as string;
   try {
    await prisma.subject.delete({
      where: {
        id: parseInt(id),
      },
    });
  
    return { success: true, error: false };
  } catch (error) {
    console.log(error);
    return { success: false, error: true };
  }
};
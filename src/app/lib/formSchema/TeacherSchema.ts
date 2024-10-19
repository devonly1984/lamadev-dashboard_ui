import * as z from "zod";

export const TeacherSchema = z.object({
  id: z.string().optional(),
  username: z
    .string()
    .min(8, { message: "Username must be at least 8 characters" })
    .max(20, { message: "Username can't be more than 20 characters" }),
  email: z
    .string()
    .email({ message: "Invalid Email Address!" })
    .optional()
    .or(z.literal("")),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long!" }),
  name: z
    .string()
    .min(1, { message: "First Name must be longer than 1 characters" }),
  surname: z.string().min(1, { message: "Last Name is required" }),
  phone: z.string(),
  address: z.string(),
  bloodType: z.string(),
  birthday: z.coerce.date(),
  sex: z.enum(["MALE", "FEMALE"]),
  img: z.string().optional(),
  subjects: z.array(z.string()).optional(),
});
export type TeacherInputs = z.infer<typeof TeacherSchema>;
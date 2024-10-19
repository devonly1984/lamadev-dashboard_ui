import * as z from "zod";

export const StudentSchema = z.object({
  username: z
    .string()
    .min(8, { message: "Username must be at least 8 characters" })
    .max(20, { message: "Username can't be more than 20 characters" }),
  email: z.string().email({ message: "Invalid Email Address!" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long!" }),
  firstName: z
    .string()
    .min(1, { message: "First Name must be longer than 1 characters" }),
  lastName: z.string().min(1, { message: "Last Name is required" }),
  phone: z.string(),
  address: z.string(),
  bloodType: z.string(),
  birthday: z.date(),
  sex: z.enum(["male", "female"]),
  img: z.instanceof(File, { message: "Image is required" }),
});
export type StudentInputs = z.infer<typeof StudentSchema>;
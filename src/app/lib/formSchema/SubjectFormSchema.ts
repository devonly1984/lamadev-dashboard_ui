import { z } from "zod";

export const subjectFormSchema = z.object({
  id: z.coerce.number().optional(),
  name: z.string(),
  teachers: z.array(z.string()),
});
export type SubjectInputs = z.infer<typeof subjectFormSchema>;
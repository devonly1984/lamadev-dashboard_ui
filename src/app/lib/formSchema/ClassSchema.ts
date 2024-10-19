import { z } from "zod";

export const classSchema = z.object({
  id: z.coerce.number().optional(),
  name: z.string(),
  capacity: z.coerce.number(),
  gradeId: z.coerce.number(),
  supervisorId: z.coerce.string().optional(),
});
export type ClassInputs = z.infer<typeof classSchema>;
import { z } from "zod";

export const TaskCompletionZodSchema = z.object({
  owner: z.string().nonempty("Owner is required"),
  taskId: z
    .string()
    .nonempty("Task ID is required")
    .regex(/^[a-f\d]{24}$/, "Invalid ObjectId"),
  date: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid date format",
  }),
});


export const TaskCompletionWithIdSchema = TaskCompletionZodSchema.extend({
  _id: z.string(),
});

export const TaskCompletionArraySchema = z.array(TaskCompletionWithIdSchema);

export type TaskCompletion = z.infer<typeof TaskCompletionZodSchema>;
export type TaskCompletionWithId = z.infer<typeof TaskCompletionWithIdSchema>;
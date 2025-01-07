import { z } from "zod";

export const DailyTaskZodSchema = z.object({
    owner: z.string().nonempty("Owner is required"),
    title: z.string().nonempty("Title is required"),
  });


export const DailyTaskWithIdSchema = DailyTaskZodSchema.extend({
  _id: z.string(), 
});

export const DailyTaskArraySchema = z.array(DailyTaskWithIdSchema);

export type DailyTask = z.infer<typeof DailyTaskZodSchema>;
export type DailyTaskWithId = z.infer<typeof DailyTaskWithIdSchema>;
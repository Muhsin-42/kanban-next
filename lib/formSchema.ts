import { z } from "zod";

export const formSchema = z.object({
  title: z.string().min(2, {
    message: "Task must be at least 3 characters.",
  }),
  description: z
    .string()
    .min(10, {
      message: "Description must be at least 10 characters.",
    })
    .max(160, {
      message: "Description must not be longer than 30 characters.",
    }),
  dueDate: z.date({
    required_error: "A date of birth is required.",
  }),
  priority: z.enum(["high", "medium", "low"], {
    description: "Data should be of type high, medium, low",
  }),
});

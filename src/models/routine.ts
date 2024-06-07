import { taskSchema } from "@/lib/schemas";
import { z } from "zod";

export type Task = z.infer<typeof taskSchema>

export type Routine = {
  schedule: Record<number, Task[]>;
};

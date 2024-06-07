import { z } from "zod";

export const taskSchema = z.object({
  name: z
    .string({ message: "Campo obrigatório" })
    .min(1, { message: "Campo obrigatório" }),
  description: z
  .string()
  .optional(),
  start: z
    .number({ message: "Campo obrigatório" })
    .min(0, { message: "O início da tarefa deve ser no mínimo as 0h" })
    .max(23, { message: "O início da tarefa deve ser no máximo as 23h" }),
  end: z
    .number({ message: "Campo obrigatório" })
    .min(1, { message: "O término da tarefa deve ser no mínimo as 1h" })
    .max(24, { message: "O término da tarefa deve ser no máximo as 24h" }),
});

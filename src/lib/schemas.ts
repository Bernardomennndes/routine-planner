import { z } from "zod";

export const taskSchema = z.object({
  name: z.string({ message: "Campo obrigatório" }),
  description: z
    .string()
    .min(20, {
      message: "A descrição da tarefa deve conter no mínimo 20 caracteres",
    })
    .optional(),
  start: z
    .number({ message: "Campo obrigatório" })
    .min(0, { message: "O início da tarefa deve ser no mínimo as 0h" })
    .max(23, { message: "O início da tarefa deve ser no máximo as 0h" }),
  end: z
    .number({ message: "Campo obrigatório" })
    .min(1, { message: "O término da tarefa deve ser no mínimo as 1h" })
    .max(24, { message: "O término da tarefa deve ser no máximo as 24h" }),
});

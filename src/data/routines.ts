import type { Routine } from "../models/routine";

export const routines: Routine[] = [
  {
    id: "1",
    name: "Primeiro Semestre 2024",
    schedule: {
      0: [],
      1: [
        {
          name: "Aula",
          description: "Universidade Estadual de Montes Claros",
          start: 7,
          end: 11,
        },
        { name: "Almoço", start: 13, end: 14 },
      ],
      2: [
        {
          name: "Aula",
          description: "Universidade Estadual de Montes Claros",
          start: 7,
          end: 13,
        },
        { name: "Almoço", start: 13, end: 14 },
      ],
      3: [
        {
          name: "Aula",
          description: "Universidade Estadual de Montes Claros",
          start: 7,
          end: 13,
        },
        { name: "Almoço", start: 13, end: 14 },
      ],
      4: [
        {
          name: "Aula",
          description: "Universidade Estadual de Montes Claros",
          start: 7,
          end: 9,
        },
        { name: "Almoço", start: 13, end: 14 },
      ],
      5: [
        {
          name: "Aula",
          description: "Universidade Estadual de Montes Claros",
          start: 7,
          end: 9,
        },
        { name: "Almoço", start: 13, end: 14 },
      ],
      6: [],
    },
  },
];

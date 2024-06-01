import type { Routine } from "@/models/routine";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

import { z } from "zod";
import { taskSchema } from "@/lib/schemas";

type RoutineStoreState = {
  routine: Routine;
  addTask: (values: {
    day: number;
    values: z.infer<typeof taskSchema>;
  }) => void;
  deleteTask: (values: { day: number; taskIndex: number }) => void;
};

type PersistedState = Pick<RoutineStoreState, "routine">;

export const useRoutineStore = create(
  persist<RoutineStoreState, [], [], PersistedState>(
    (set) => ({
      routine: {
        schedule: { 0: [], 1: [], 2: [], 3: [], 4: [], 5: [], 6: [] },
      },
      addTask: ({ day, values }) =>
        set((state) => ({
          routine: {
            ...state.routine,
            schedule: {
              ...state.routine.schedule,
              [day]: [...state.routine.schedule[day], values],
            },
          },
        })),
      deleteTask: ({ day, taskIndex }) =>
        set((state) => ({
          routine: {
            ...state.routine,
            schedule: {
              ...state.routine.schedule,
              [day]: state.routine.schedule[day].filter(
                (_, index) => index !== taskIndex
              ),
            },
          },
        })),
    }),
    {
      name: "routine-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ routine: state.routine }),
      merge: (persistedState, currentState) => ({
        ...currentState,
        routines:
          (persistedState as PersistedState)?.routine ??
          currentState.routine ??
          [],
      }),
    }
  )
);

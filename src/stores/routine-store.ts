import type { Routine } from "@/models/routine";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

import { z } from "zod";
import { taskSchema } from "@/lib/schemas";

type RoutineStoreState = {
  routines: Routine[];
  routineIndex: number | undefined;
  setRoutine: (routineIndex: number) => void;
  addTask: (values: {
    routineIndex: number;
    day: number;
    values: z.infer<typeof taskSchema>;
  }) => void;
  deleteTask: (values: {
    routineIndex: number;
    day: number;
    taskIndex: number;
  }) => void;
};

type PersistedState = Pick<RoutineStoreState, "routines">;

export const useRoutineStore = create(
  persist<RoutineStoreState, [], [], PersistedState>(
    (set) => ({
      routines: [],
      routineIndex: undefined,
      setRoutine: (routineIndex: number) => set({ routineIndex }),
      addTask: ({ routineIndex, day, values }) =>
        set((state) => ({
          routines: state.routines.map((routine, index) =>
            index === routineIndex
              ? {
                  ...routine,
                  schedule: {
                    ...routine.schedule,
                    [day]: [...routine.schedule[day], values],
                  },
                }
              : routine
          ),
        })),
      deleteTask: ({ routineIndex, day, taskIndex }) =>
        set((state) => ({
          routines: state.routines.map((routine, index) =>
            index === routineIndex
              ? {
                  ...routine,
                  schedule: {
                    ...routine.schedule,
                    [day]: routine.schedule[day].filter(
                      (_, index) => index !== taskIndex
                    ),
                  },
                }
              : routine
          ),
        })),
    }),
    {
      name: "routine-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ routines: state.routines }),
      merge: (persistedState, currentState) => ({
        ...currentState,
        routines:
          (persistedState as PersistedState)?.routines ??
          currentState.routines ??
          [],
      }),
    }
  )
);

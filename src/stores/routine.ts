import type { Routine, Task } from "@/models/routine";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type RoutineStoreState = {
  routine: Routine;
  addTask: (values: { day: number; values: Task }) => void;
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
        routine:
          (persistedState as PersistedState)?.routine ??
          currentState.routine ??
          [],
      }),
    }
  )
);

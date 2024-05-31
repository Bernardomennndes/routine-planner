import type { Routine } from "@/models/routine";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

import { routines as mockedRoutines } from "@/data/routines";

type RoutineStoreState = {
  routines: Routine[];
  routine: Routine | undefined;
  setRoutine: (id: string) => void;
};

type PersistedState = Pick<RoutineStoreState, "routines">;

export const useRoutineStore = create(
  persist<RoutineStoreState, [], [], PersistedState>(
    (set, get) => ({
      routines: mockedRoutines,
      routine: undefined,
      setRoutine: (id: string) =>
        set({ routine: get().routines.find((routine) => routine.id === id) }),
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

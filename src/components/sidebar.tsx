import React from "react";
import { Ellipsis } from "lucide-react";
import type { Routine } from "../models/routine";
import { useRoutineStore } from "@/stores/routine-store";
import { cn } from "@/lib/utils";

interface RoutineProps {
  routine: Routine;
  selected: boolean;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

function RoutineItem(props: RoutineProps) {
  const { routine, selected, onClick } = props;

  return (
    <button
      className={cn(
        "px-3 py-2 rounded-lg text-left inline-flex justify-between items-center hover:bg-muted group",
        selected && "border border-border"
      )}
      onClick={onClick}
    >
      {routine.name}

      <div role="button" className="hidden group-hover:block">
        <Ellipsis className="text-muted-foreground" />
      </div>
    </button>
  );
}

interface SidebarProps {
  routine: Routine | undefined;
}

export function Sidebar(props: SidebarProps) {
  const { routine: selectedRoutine } = props;

  const routines = useRoutineStore((store) => store.routines);

  const setRoutine = useRoutineStore((store) => store.setRoutine);

  return (
    <div className="w-[320px] py-8 px-6 border-r border-border flex flex-col gap-3">
      <div className="text-sm font-semibold text-muted-foreground">
        Rotinas Planejadas
      </div>

      <div className="flex flex-col gap-2">
        {routines.map((routine, index) => (
          <RoutineItem
            key={routine.id}
            routine={routine}
            selected={routine.id === selectedRoutine?.id}
            onClick={() => {
              setRoutine(index);
            }}
          />
        ))}
      </div>
    </div>
  );
}

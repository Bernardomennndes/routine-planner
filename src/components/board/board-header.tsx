import { useBoard } from "./context";
import { Routine } from "@/models/routine";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "../ui/drawer";
import React from "react";
import { formatDayOfWeek } from "@/lib/format";
import { BoardTaskForm } from "./board-task-form";
import { Badge } from "../ui/badge";
import { useRoutineStore } from "@/stores/routine";
import { Plus } from "lucide-react";

type DrawerContentValues = {
  open: boolean;
  day?: number;
  unavailableTime?: {
    start: Set<number>;
    end: Set<number>;
  };
};

interface BoardHeaderProps {
  routine: Routine | undefined;
}

export function BoardHeader(props: BoardHeaderProps) {
  const { routine } = props;

  const {
    settings: {
      dayRange: [rangeStart, rangeEnd],
    },
  } = useBoard();

  const addTask = useRoutineStore((store) => store.addTask);

  const [contentValues, setContentValues] = React.useState<DrawerContentValues>(
    {
      open: false,
    }
  );

  function handleAddNewTask(day: number) {
    if (routine) {
      const routineDaySchedule = routine.schedule[day];

      const unavailableStartTime = routineDaySchedule.reduce(
        (previousValue, currentValue) => {
          const taskTimeRange = Array.from(
            {
              length: currentValue.end - currentValue.start,
            },
            (_, index) => index + currentValue.start
          );

          return [...previousValue, ...taskTimeRange];
        },
        [] as number[]
      );

      const unavailableEndTime = routineDaySchedule.reduce(
        (previousValue, currentValue) => {
          const taskTimeRange = Array.from(
            {
              length: currentValue.end - currentValue.start,
            },
            (_, index) => index + currentValue.start + 1
          );

          return [...previousValue, ...taskTimeRange];
        },
        [] as number[]
      );

      setContentValues({
        open: true,
        day,
        unavailableTime: {
          start: new Set(unavailableStartTime),
          end: new Set(unavailableEndTime),
        },
      });
    }
  }

  return (
    <>
      <div className="w-full flex">
        {Array.from(
          { length: rangeEnd - rangeStart + 1 },
          (_, index) => index + rangeStart
        ).map((day) => (
          <div
            key={day}
            className="flex-1 flex justify-center gap-1 items-center text-muted-foreground capitalize text-sm"
          >
            {formatDayOfWeek(day)}

            <button
              onClick={() => {
                handleAddNewTask(day);
              }}
            >
              <Plus size={16} />
            </button>
          </div>
        ))}
      </div>

      <Drawer
        open={contentValues.open}
        onOpenChange={(open) =>
          setContentValues((prevValues) => ({ ...prevValues, open }))
        }
      >
        <DrawerContent className="pb-4">
          <div className="container max-w-[800px]">
            <DrawerHeader>
              <DrawerTitle>Adicionar Nova Tarefa</DrawerTitle>
              <DrawerDescription>
                Verifique e defina a faixa de horários disponíveis para a nova
                tarefa
              </DrawerDescription>
            </DrawerHeader>

            <div className="p-4 flex flex-col gap-4">
              {contentValues.day !== undefined && (
                <div className="flex gap-1 items-center">
                  <div className="text-sm font-semibold">Dia:</div>
                  <Badge
                    variant="outline"
                    className="text-xs rounded-lg capitalize"
                  >
                    {formatDayOfWeek(contentValues.day)}
                  </Badge>
                </div>
              )}

              <BoardTaskForm
                onSubmit={(values) => {
                  if (contentValues.day !== undefined) {
                    addTask({ day: contentValues.day, values });
                    setContentValues({ open: false });
                  }
                }}
                unavailableTime={{
                  start: contentValues.unavailableTime?.start,
                  end: contentValues.unavailableTime?.end,
                }}
              />
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
}

import React from "react";
import { useRoutineStore } from "@/stores/routine";

import type { Routine, Task } from "../../models/routine";

import { BoardAxis } from "./board-axis";
import { BoardColumns } from "./board-columns";
import { BoardHeader } from "./board-header";
import { BoardTimeTracker } from "./board-time-tracker";
import { BoardContext, BoardProvider } from "./context";

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "../ui/drawer";
import { Badge } from "../ui/badge";
import { formatDayOfWeek } from "@/lib/format";
import { getUnavailableEndTime, getUnavailableStartTime } from "@/lib/task";
import { TaskForm } from "../task/task-form";
interface BoardProps {
  routine: Routine | undefined;
}

type DrawerContentValues = {
  open: boolean;
  day?: number;
  defaultValues?: Partial<Task>;
  unavailableTime?: {
    start: Set<number>;
    end: Set<number>;
  };
};

export function Board(props: BoardProps) {
  const { routine } = props;

  const addTask = useRoutineStore((store) => store.addTask);

  const [contentValues, setContentValues] = React.useState<DrawerContentValues>(
    {
      open: false,
    }
  );

  function handleAddNewTask(day: number, defaultValues?: Partial<Task>) {
    if (routine) {
      const routineDaySchedule = routine.schedule[day];

      const unavailableStartTime = getUnavailableStartTime(routineDaySchedule);

      const unavailableEndTime = getUnavailableEndTime(routineDaySchedule);

      setContentValues({
        open: true,
        day,
        defaultValues,
        unavailableTime: {
          start: unavailableStartTime,
          end: unavailableEndTime,
        },
      });
    }
  }

  return (
    <BoardProvider>
      <section className="flex-1 pl-[40px] flex flex-col relative">
        <div className="py-4 border border-b sticky top-0 backdrop-blur-sm z-50">
          <BoardHeader handleAddNewTask={handleAddNewTask} />
        </div>

        <div className="relative">
          <div className="relative">
            <BoardAxis />
            <BoardTimeTracker />
          </div>

          <BoardColumns routine={routine} handleAddNewTask={handleAddNewTask} />

          <div className="top-0 left-0 -z-10 absolute w-full h-full bg-dot-black/[0.15]">
            <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_95%,black)]"></div>
          </div>
        </div>
      </section>

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

              <BoardContext.Consumer>
                {(props) => {
                  const timeRange = props?.settings.timeRange ?? [0, 24];

                  return (
                    <TaskForm
                      timeRange={timeRange}
                      onSubmit={(values) => {
                        if (contentValues.day !== undefined) {
                          addTask({ day: contentValues.day, values });
                          setContentValues({ open: false });
                        }
                      }}
                      defaultValues={contentValues.defaultValues}
                      unavailableTime={{
                        start: contentValues.unavailableTime?.start,
                        end: contentValues.unavailableTime?.end,
                      }}
                    />
                  );
                }}
              </BoardContext.Consumer>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </BoardProvider>
  );
}

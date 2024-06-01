import { useBoard } from "./context";
import { Plus } from "lucide-react";
import { Routine } from "@/models/routine";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import React from "react";
import { formatDayOfWeek } from "@/lib/format";
import { BoardTaskForm } from "./board-task-form";
import { Badge } from "../ui/badge";
import { useRoutineStore } from "@/stores/routine-store";

type DialogContentValues = {
  open: boolean;
  day?: number;
  unavailableTime?: {
    start: Set<number>;
    end: Set<number>;
  };
};

interface BoardLabelsProps {
  routine: Routine | undefined;
}

export function BoardLabels(props: BoardLabelsProps) {
  const { routine } = props;

  const { days } = useBoard();

  const routineIndex = useRoutineStore((store) => store.routineIndex);
  const addTask = useRoutineStore((store) => store.addTask);

  const [dialogValues, setDialogValues] = React.useState<DialogContentValues>({
    open: false,
  });

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

      setDialogValues({
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
      <div className="w-full pl-[40px] flex">
        {Array.from({ length: days }, (_, index) => index).map((day) => (
          <div
            key={day}
            className="flex-1 flex justify-center gap-1 items-center text-muted-foreground capitalize text-sm"
          >
            {formatDayOfWeek(day)}

            <button onClick={() => handleAddNewTask(day)}>
              <Plus size={16} />
            </button>
          </div>
        ))}
      </div>

      <Dialog
        open={dialogValues.open}
        onOpenChange={(open) =>
          setDialogValues((prevValues) => ({ ...prevValues, open }))
        }
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Adicionar Nova Tarefa</DialogTitle>
            <DialogDescription>
              Verifique e defina a faixa de horários disponíveis para a nova
              tarefa
            </DialogDescription>
          </DialogHeader>

          <div className="py-4 flex flex-col gap-4">
            {dialogValues.day && (
              <div className="flex gap-1 items-center">
                <div className="text-sm font-semibold">Dia:</div>
                <Badge variant="outline" className="text-xs rounded-lg">
                  {formatDayOfWeek(dialogValues.day)}
                </Badge>
              </div>
            )}

            <BoardTaskForm
              onSubmit={(values) => {
                if (routineIndex !== undefined && dialogValues.day) {
                  addTask({ routineIndex, day: dialogValues.day, values });
                  console.log({ routineIndex, day: dialogValues.day, values });
                  setDialogValues({ open: false });
                }
              }}
              unavailableTime={{
                start: dialogValues.unavailableTime?.start,
                end: dialogValues.unavailableTime?.end,
              }}
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

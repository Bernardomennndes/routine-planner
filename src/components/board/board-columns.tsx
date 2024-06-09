import { useRoutineStore } from "@/stores/routine";
import type { Routine, Task } from "../../models/routine";
import { useBoard } from "./context";
import { getAvailableStartTime } from "@/lib/task";
import { Plus } from "lucide-react";
import { TaskCard } from "../task/task-card";

interface BoardColumnsProps {
  routine: Routine | undefined;
  handleAddNewTask: (day: number, defaultValues?: Partial<Task>) => void;
}

export function BoardColumns(props: BoardColumnsProps) {
  const { routine, handleAddNewTask } = props;

  const {
    settings: {
      dayRange: [rangeStart, rangeEnd],
      timeRange: [timeRangeStart, timeRangeEnd],
      cellHeight,
    },
  } = useBoard();

  const columnHeight = (timeRangeEnd - timeRangeStart) * cellHeight;

  const deleteTask = useRoutineStore((store) => store.deleteTask);

  return (
    <div className="flex w-full">
      {Array.from(
        { length: rangeEnd - rangeStart + 1 },
        (_, index) => index + rangeStart
      ).map((day) => {
        const daySchedule = routine?.schedule[day] ?? [];

        const availableTime = getAvailableStartTime(daySchedule, {
          range: [timeRangeStart, timeRangeEnd],
        });

        return (
          <div
            style={{ height: columnHeight }}
            className="flex-1 min-w-[320px] first:border-l border-r border-border grid grid-cols-1 grid-rows-[repeat(24,minmax(0,1fr))]"
          >
            {Array.from(availableTime).map((time) => (
              <div
                className="group p-2 z-20"
                style={{
                  gridRowStart: time + 1,
                  gridRowEnd: time + 2,
                }}
              >
                <button
                  key={time}
                  onClick={() => {
                    handleAddNewTask(day, { start: time, end: time + 1 });
                  }}
                  className="hidden w-full h-full group-hover:flex items-center justify-center gap-1 text-muted-foreground bg-muted/50 rounded-lg border border-dashed dashed text-sm"
                >
                  <Plus className="h-4 w-4" />
                  Adicionar tarefa
                </button>
              </div>
            ))}

            {daySchedule.map((task, index) => (
              <TaskCard
                key={task.start}
                task={task}
                handleDeleteTask={() => {
                  deleteTask({ day, taskIndex: index });
                }}
              />
            ))}
          </div>
        );
      })}
    </div>
  );
}

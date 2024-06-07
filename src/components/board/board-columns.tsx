import { useRoutineStore } from "@/stores/routine";
import type { Routine } from "../../models/routine";
import { BoardTask } from "./board-task";
import { useBoard } from "./context";

interface BoardColumnsProps {
  routine: Routine | undefined;
}

export function BoardColumns(props: BoardColumnsProps) {
  const { routine } = props;

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

        return (
          <div
            style={{ height: columnHeight }}
            className="flex-1 min-w-[320px] first:border-l border-r border-border grid grid-cols-1 grid-rows-[repeat(24,minmax(0,1fr))]"
          >
            {daySchedule.map((task, index) => (
              <BoardTask
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

import { useRoutineStore } from "@/stores/routine";
import type { Routine } from "../../models/routine";
import { BoardColumn } from "./board-column";
import { BoardTask } from "./board-task";
import { useBoard } from "./context";

interface BoardColumnsProps {
  routine: Routine | undefined;
}

export function BoardColumns(props: BoardColumnsProps) {
  const { routine } = props;

  const {
    config: {
      dayRange: [rangeStart, rangeEnd],
    },
  } = useBoard();

  const deleteTask = useRoutineStore((store) => store.deleteTask);

  return (
    <div className="flex w-full">
      {Array.from(
        { length: rangeEnd - rangeStart + 1 },
        (_, index) => index + rangeStart
      ).map((day) => {
        const daySchedule = routine?.schedule[day] ?? [];

        return (
          <BoardColumn key={day}>
            {daySchedule.map((task, index) => (
              <BoardTask
                key={task.start}
                task={task}
                handleDeleteTask={() => {
                  deleteTask({ day, taskIndex: index });
                }}
              />
            ))}
          </BoardColumn>
        );
      })}
    </div>
  );
}

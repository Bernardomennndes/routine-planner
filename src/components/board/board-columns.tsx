import { useRoutineStore } from "@/stores/routine-store";
import type { Routine } from "../../models/routine";
import { BoardColumn } from "./board-column";
import { BoardTask } from "./board-task";
import { useBoard } from "./context";

interface BoardColumnsProps {
  routine: Routine | undefined;
}

export function BoardColumns(props: BoardColumnsProps) {
  const { routine } = props;

  const { days } = useBoard();

  const deleteTask = useRoutineStore((store) => store.deleteTask);

  return (
    <div className="flex w-full">
      {Array.from({ length: days }, (_, index) => index).map((day) => {
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
